#!/usr/bin/env python3
"""Prüft eine Webseite auf die Grundlagen vor dem Livegang.

    python3 seite_pruefen.py https://deine-seite.de/unterseite
    python3 seite_pruefen.py index.html           Datei auf dem Rechner (Links ins Netz bleiben offen)
    python3 seite_pruefen.py URL --ohne-links     ohne die Prüfung der Links
    python3 seite_pruefen.py --selbsttest         prüft das Skript selbst, ohne Netz

Die Ausgabe ist schon nach der Ampel des Berichts sortiert:
    ROT     so geht die Seite nicht online (Recht, etwas ist kaputt, am Handy nicht bedienbar)
    GELB    bald beheben (Auffindbarkeit, Eindruck, Zugänglichkeit)
    OFFEN   konnte das Skript nicht prüfen

Prüft: Titel, Beschreibung, Überschriften, Bilder ohne Beschreibung (alt), Formularfelder ohne Beschriftung,
Handy-Einstellung (viewport), Sprache, Canonical, noindex, Vorschaubild (og:image), Impressum und Datenschutz,
vorab gesetzte Häkchen, https, fremde Server, kaputte Links und Bilder (höchstens 40) und, wenn der Skill
menschlich-schreiben daneben liegt, die Sprache des sichtbaren Textes. Ausgang 1 bei Rot, sonst 0.
Python 3.8 oder neuer, keine Zusatzpakete. © 2026 Ilja Krasevskij, sabala-mentoring.com
"""
import re
import sys
import tempfile
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

KENNUNG = "Mozilla/5.0 (Skill-Paket seite_pruefen.py)"
# Was hier steht, ist kein Fließtext: Skripte, Stile, Grafiken und Code (Befehle wie „claude --version“).
STILL = ("script", "style", "noscript", "svg", "code", "pre", "kbd", "samp")
FRAGEWORTE = ("was", "wie", "warum", "wieso", "weshalb", "wer", "wem", "wen", "wann", "wo", "woher", "wohin", "welche", "welcher", "welches", "wieviel", "kann", "brauche", "lohnt")
# Ein Titel, der so anfängt, sagt nichts über das Angebot.
LEERE_TITEL = ("home", "startseite", "start", "willkommen", "welcome", "index", "untitled", "unbenannt", "neue seite", "new page", "document", "dokument")
# Woran ein Pflicht-Link erkannt wird: am sichtbaren Text oder am letzten Stück der Adresse.
PFLICHT = {
    "Impressum": (("impressum", "imprint", "legal notice", "anbieterkennzeichnung"), ("impressum", "imprint", "legal-notice", "legal", "anbieterkennzeichnung")),
    "Datenschutz": (("datenschutz", "privacy"), ("datenschutz", "datenschutzerklaerung", "datenschutzerklärung", "datenschutzhinweise", "privacy", "privacy-policy", "dsgvo")),
}
KEIN_ZIEL = re.compile(r"(?i)(mailto|tel|sms|javascript|data):")
REIHE = {"ROT": 0, "GELB": 1, "OFFEN": 2}


class Leser(HTMLParser):
    """Sammelt, was für die Prüfung zählt. Text in STILL zählt nicht als Fließtext."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.titel, self.meta, self.links, self.bilder = "", {}, [], []
        self.lang, self.canonical, self.haekchen = "", "", 0
        self.ueberschriften, self.absaetze = [], []
        self.felder, self.label_fuer, self.geladen = [], set(), []
        self._stapel, self._puffer, self._in_titel, self._still = [], [], False, 0
        self._link, self._label = None, 0

    def _link_zu(self):
        if self._link:
            self.links.append((self._link[0], re.sub(r"\s+", " ", "".join(self._link[1])).strip()))
        self._link = None

    def handle_starttag(self, tag, attrs):
        a = {k: (v or "") for k, v in attrs}
        if tag == "html":
            self.lang = a.get("lang", "")
        elif tag == "title":
            self._in_titel = True
        elif tag == "meta":
            name = (a.get("name") or a.get("property") or "").lower()
            if name:
                self.meta[name] = a.get("content", "")
        elif tag == "link":
            rel = a.get("rel", "").lower().split()
            if "canonical" in rel:
                self.canonical = a.get("href", "")
            elif a.get("href") and {"stylesheet", "preload", "preconnect"} & set(rel):
                self.geladen.append(a["href"])
        elif tag == "a" and a.get("href"):
            self._link_zu()
            self._link = [a["href"], []]
        elif tag == "img":
            self.bilder.append(a)
            if self._link:
                self._link[1].append(" " + a.get("alt", "") + " ")
        elif tag == "label":
            self._label += 1
            if a.get("for"):
                self.label_fuer.add(a["for"])
        elif tag in ("input", "textarea", "select"):
            art = a.get("type", "text").lower() if tag == "input" else tag
            if art == "checkbox" and "checked" in a:
                self.haekchen += 1
            # Ein Feld, das Besucher nie erreichen (etwa die Falle für Spam-Programme), braucht keine Beschriftung.
            versteckt = a.get("aria-hidden") == "true" or a.get("tabindex") == "-1" or "hidden" in a
            if art not in ("hidden", "submit", "button", "reset", "image") and not versteckt:
                beschriftet = bool(self._label or a.get("aria-label") or a.get("aria-labelledby") or a.get("title"))
                self.felder.append((a.get("id", ""), beschriftet))
        if tag in ("script", "iframe", "img", "video", "audio", "source", "embed") and a.get("src"):
            self.geladen.append(a["src"])
        if tag in STILL:
            self._still += 1
        if tag in ("h1", "h2", "h3", "p", "li"):
            self._stapel.append(tag)
            self._puffer.append([])

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_titel = False
        elif tag == "a":
            self._link_zu()
        elif tag == "label" and self._label:
            self._label -= 1
        if tag in STILL and self._still:
            self._still -= 1
        if self._stapel and tag == self._stapel[-1]:
            self._stapel.pop()
            text = re.sub(r"\s+", " ", "".join(self._puffer.pop())).strip()
            if text:
                (self.ueberschriften if tag.startswith("h") else self.absaetze).append((tag, text))
                if self._puffer:
                    self._puffer[-1].append(" " + text + " ")

    def handle_data(self, data):
        if self._in_titel:
            self.titel += data
            return
        if self._still:
            return
        if self._link:
            self._link[1].append(data)
        if self._puffer:
            self._puffer[-1].append(data)


def holen(adresse):
    anfrage = urllib.request.Request(adresse, headers={"User-Agent": KENNUNG})
    with urllib.request.urlopen(anfrage, timeout=20) as antwort:
        zeichensatz = antwort.headers.get_content_charset() or "utf-8"
        return antwort.read().decode(zeichensatz, errors="replace"), antwort.geturl()


def status(adresse):
    for methode in ("HEAD", "GET"):
        try:
            anfrage = urllib.request.Request(adresse, method=methode, headers={"User-Agent": KENNUNG})
            with urllib.request.urlopen(anfrage, timeout=10) as antwort:
                return antwort.status
        except urllib.error.HTTPError as e:
            if methode == "GET" or e.code not in (403, 405, 501):
                return e.code
        except Exception:
            if methode == "GET":
                return 0
    return 0


def sprachpruefung():
    """Holt pruefe() aus dem Skill menschlich-schreiben, wenn er im Nachbarordner liegt."""
    nachbar = Path(__file__).resolve().parent.parent / "menschlich-schreiben"
    if not (nachbar / "pruefen.py").is_file():
        return None
    sys.path.insert(0, str(nachbar))
    sys.dont_write_bytecode = True  # keine __pycache__-Ordner im Skill
    try:
        from pruefen import pruefe, eigene_woerter
        return lambda text: pruefe(text, eigene_woerter(nachbar / "meine-stimme.md"))
    except Exception:
        return None


def mz(zahl, ein, mehr):
    """Einzahl oder Mehrzahl: „1 Bild“, „3 Bilder“."""
    return f"{zahl} {ein if zahl == 1 else mehr}"


def ist_frage(ueberschrift):
    """Fragezeichen am Ende oder ein Fragewort als erstes ganzes Wort. „Wochenendkurse“ ist keine Frage."""
    erstes = re.split(r"[^a-zäöüß]+", ueberschrift.lower().strip(), maxsplit=1)[0]
    return ueberschrift.rstrip().endswith("?") or erstes in FRAGEWORTE


def hat_pflichtlink(links, im_text, in_adresse):
    for ziel, text in links:
        if KEIN_ZIEL.match(ziel):  # eine Mail-Adresse datenschutz@… ist keine Datenschutzerklärung
            continue
        if len(text) <= 60 and any(w in text.lower() for w in im_text):
            return True
        teile = urllib.parse.urlparse(ziel)
        letztes = re.sub(r"\.(html?|php|aspx?)$", "", teile.path.rstrip("/").rsplit("/", 1)[-1].lower())
        if letztes in in_adresse or teile.fragment.lower() in in_adresse:
            return True
    return False


def rechner(adresse):
    name = urllib.parse.urlparse(adresse).netloc.lower().split(":")[0]
    return name[4:] if name.startswith("www.") else name


def pruefe_seite(html, basis="", links_pruefen=False, ordner=None):
    """Gibt eine Liste aus (Farbe, Meldung) zurück. basis: Adresse der Seite. ordner: Ordner einer Datei auf dem Rechner."""
    s = Leser()
    s.feed(html)
    s._link_zu()
    funde = []
    f = lambda art, text: funde.append((art, text))
    titel = re.sub(r"\s+", " ", s.titel).strip()
    beschreibung = s.meta.get("description", "").strip()
    h1 = [t for tag, t in s.ueberschriften if tag == "h1"]
    unter = [t for tag, t in s.ueberschriften if tag in ("h2", "h3")]
    text = "\n".join(t for _, t in s.ueberschriften + s.absaetze)

    # Recht und Bedienung
    for name, (im_text, in_adresse) in PFLICHT.items():
        if not hat_pflichtlink(s.links, im_text, in_adresse):
            f("ROT", f"Kein Link zum {name} gefunden. Er gehört auf jede Seite, meist in die Fußzeile.")
    if s.haekchen:
        f("ROT", f"{s.haekchen} Häkchen {'ist' if s.haekchen == 1 else 'sind'} vorab gesetzt. Geht es um Werbung, Newsletter oder eine Einwilligung, muss es leer sein.")
    if "width=device-width" not in s.meta.get("viewport", "").replace(" ", ""):
        f("ROT", "Keine Handy-Einstellung (meta viewport mit width=device-width). Am Handy wird die Seite winzig.")
    if basis.startswith("http://") and rechner(basis) not in ("localhost", "127.0.0.1"):
        f("ROT", "Die Seite läuft ohne https. Browser warnen davor, und Formulare gehen unverschlüsselt durchs Netz.")
    if "noindex" in s.meta.get("robots", "").lower():
        f("ROT", "Die Seite sagt Google „noindex“: Sie erscheint nicht in der Suche. Ist das gewollt (etwa bei einer Dankeseite), streich diesen Punkt.")

    # Auffindbarkeit und Eindruck
    if not titel:
        f("GELB", "Kein Seitentitel (<title>). Er steht im Reiter des Browsers und als Überschrift bei Google.")
    elif re.split(r"\s+[|·–—-]\s+", titel.lower())[0] in LEERE_TITEL:
        f("GELB", f"Der Titel beginnt mit einem Wort, das nichts sagt: „{titel}“. Schreib nach vorn, was die Seite anbietet und für wen.")
    elif len(titel) > 60:
        f("GELB", f"Titel hat {len(titel)} Zeichen, Google zeigt etwa 60: „{titel}“")
    if not beschreibung:
        f("GELB", "Keine Beschreibung (meta description). Google nimmt dann irgendeinen Satz der Seite.")
    elif len(beschreibung) > 160:
        f("GELB", f"Beschreibung hat {len(beschreibung)} Zeichen, sichtbar sind etwa 160.")
    if not h1:
        f("GELB", "Keine Hauptüberschrift (H1). Jede Seite braucht genau eine.")
    elif len(h1) > 1:
        f("GELB", f"{len(h1)} Hauptüberschriften (H1), richtig ist genau eine.")
    if unter and not any(ist_frage(t) for t in unter):
        f("GELB", "Keine Überschrift ist eine Frage. Fragen wie „Was kostet das?“ helfen Lesern und KI-Suchen.")
    elif not unter and len(text.split()) > 150:
        f("GELB", "Keine Zwischenüberschriften (H2). Sie gliedern die Seite für Leser, Google und KI-Suchen.")
    ohne_alt = [b.get("src", "?") for b in s.bilder if "alt" not in b]
    if ohne_alt:
        f("GELB", f"{mz(len(ohne_alt), 'Bild', 'Bilder')} ohne Beschreibung (alt), zum Beispiel {ohne_alt[0][:80]}")
    ohne_schild = sum(1 for kennung, beschriftet in s.felder if not beschriftet and kennung not in s.label_fuer)
    if ohne_schild:
        f("GELB", f"{mz(ohne_schild, 'Formularfeld', 'Formularfelder')} ohne Beschriftung (label). Ein Platzhalter im Feld reicht nicht, er verschwindet beim Tippen.")
    eigener = rechner(basis) if basis else ""
    fremde = []
    for quelle in s.geladen:
        name = rechner(quelle)
        if name and name != eigener and not (eigener and name.endswith("." + eigener)) and name not in fremde:
            fremde.append(name)
    if fremde:
        schrift = " Schriften lädst du besser vom eigenen Server." if any("fonts.g" in n for n in fremde) else ""
        f("GELB", f"Die Seite lädt von fremden Servern: {', '.join(fremde[:6])}. Stehen sie in der Datenschutzerklärung, und braucht es eine Zustimmung?{schrift}")
    if not s.lang:
        f("GELB", "Keine Sprache angegeben (<html lang=\"de\">).")
    if not s.canonical:
        f("GELB", "Kein Canonical. Damit sagst du Google, welche Adresse die richtige ist.")
    if not s.meta.get("og:image"):
        f("GELB", "Kein Vorschaubild (og:image). WhatsApp und LinkedIn zeigen dann kein Bild.")

    # Links und Bilder
    ziele = [("Link", z) for z, _ in s.links] + [("Bild", b.get("src", "")) for b in s.bilder]
    if basis and links_pruefen:
        eigene = []
        for art, z in ziele:
            if not z or KEIN_ZIEL.match(z):
                continue
            ziel = urllib.parse.urljoin(basis, z).split("#")[0]
            if rechner(ziel) == eigener and ziel not in [e for _, e in eigene]:
                eigene.append((art, ziel))
        for art, ziel in eigene[:40]:
            code = status(ziel)
            if code == 0 or code >= 400:
                f("ROT", f"{'Bild lädt nicht' if art == 'Bild' else 'Link führt ins Leere'} ({code or 'keine Antwort'}): {ziel}")
        if len(eigene) > 40:
            f("OFFEN", f"Nur die ersten 40 von {len(eigene)} Links und Bildern geprüft.")
    elif basis:
        f("OFFEN", "Links und Bilder nicht geprüft (--ohne-links).")
    elif ordner is not None:
        for art, z in ziele:
            pfad = urllib.parse.unquote(z.split("#")[0].split("?")[0])
            if not pfad or re.match(r"(?i)[a-z][a-z0-9+.-]*:|/", z):
                continue  # Netz-Adresse oder Pfad ab der Wurzel: lässt sich an einer Datei nicht prüfen
            if art == "Link" and "." not in pfad.rsplit("/", 1)[-1]:
                continue  # Adresse ohne Dateiname, die erst der Server auflöst
            if not (ordner / pfad).exists():
                f("ROT", f"{'Bilddatei fehlt' if art == 'Bild' else 'Link führt ins Leere (Datei fehlt)'}: {pfad}")
        if s.links:
            f("OFFEN", "Links ins Netz nicht geprüft. Das geht erst mit der Adresse der Seite (https://…), also nach dem Hochladen.")

    # Sprache
    sprache = sprachpruefung()
    if sprache and text:
        treffer = [m for m in sprache(text) if m[1] == "FEHLER"]
        for _, _, meldung in treffer[:8]:
            f("GELB", f"Sprache: {meldung}")
        if len(treffer) > 8:
            f("GELB", f"Sprache: {len(treffer) - 8} weitere Stellen. Ganzen Text mit pruefen.py ansehen.")
    elif not sprache:
        f("OFFEN", "Sprache nicht geprüft: Der Skill menschlich-schreiben (Paket Texte) liegt nicht im Nachbarordner.")
    return sorted(funde, key=lambda fund: REIHE[fund[0]])


def selbsttest():
    def alles(funde):
        return " | ".join(f"{art} {meldung}" for art, meldung in funde)

    gut = """<!doctype html><html lang="de"><head><title>Startpaket für Claude Code</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Kurz und klar.">
    </head><body><h1>Dein Startpaket</h1><h2>Was kostet das?</h2><p>Nichts. Du trägst dich ein.</p>
    <img src="a.jpg" alt="Skizze"><img src="b.jpg"><input type="checkbox" checked aria-label="Newsletter">
    <label for="mail">E-Mail</label><input id="mail" type="email"><label>Name <input type="text"></label>
    <input type="text" placeholder="Telefon"><input type="hidden" name="quelle"><input type="text" name="fax" tabindex="-1" aria-hidden="true">
    <p>Tippe <code>claude --version</code> ein.</p>
    <a href="/rechtliches">Impressum</a><a href="/seite-7"><span>Datenschutzerklärung</span></a>
    <script>var x = "—";</script></body></html>"""
    t = alles(pruefe_seite(gut))
    assert "GELB 1 Bild ohne Beschreibung" in t and "ROT 1 Häkchen ist vorab gesetzt" in t, t
    assert "GELB 1 Formularfeld ohne Beschriftung" in t, t
    for darf_nicht in ("Hauptüberschrift", "Impressum", "Datenschutz gefunden", "Handy-Einstellung", "Keine Überschrift ist eine Frage", "Gedankenstrich", "fremden Servern", "nichts sagt"):
        assert darf_nicht not in t, (darf_nicht, t)

    # Pflicht-Links: Eine Mail-Adresse und ein Blog-Artikel über das Impressum zählen nicht.
    falsch = gut.replace('<a href="/rechtliches">Impressum</a><a href="/seite-7"><span>Datenschutzerklärung</span></a>',
                         '<a href="mailto:datenschutz@beispiel.de">Schreib uns</a><a href="/blog/impressum-pflicht">Zum Artikel</a>')
    t = alles(pruefe_seite(falsch))
    assert "Kein Link zum Impressum" in t and "Kein Link zum Datenschutz" in t, t

    # Fragen: nur ganze Fragewörter. Dazu Titel ohne Aussage, fremde Server, http.
    schwach = gut.replace("Was kostet das?", "Wochenendkurse</h2><h2>Wasserarbeit").replace("Startpaket für Claude Code", "Home | Hundeschule")
    schwach = schwach.replace("</head>", '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter"></head>')
    t = alles(pruefe_seite(schwach, basis="http://beispiel.de/kurse", links_pruefen=False))
    for erwartet in ("Keine Überschrift ist eine Frage", "nichts sagt", "fonts.googleapis.com", "vom eigenen Server", "ROT Die Seite läuft ohne https", "OFFEN Links und Bilder nicht geprüft"):
        assert erwartet in t, (erwartet, t)
    assert "https" not in alles(pruefe_seite(gut, basis="http://localhost:3000/")).split("OFFEN")[0], "localhost braucht kein https"

    # Datei auf dem Rechner: fehlende Bilddatei fällt auf, Links ins Netz bleiben offen.
    with tempfile.TemporaryDirectory() as ordner:
        (Path(ordner) / "a.jpg").write_bytes(b"x")
        t = alles(pruefe_seite(gut, ordner=Path(ordner)))
        assert "ROT Bilddatei fehlt: b.jpg" in t and "a.jpg" not in t, t
        assert "OFFEN Links ins Netz nicht geprüft" in t, t

    leer = alles(pruefe_seite("<html><body><p>Hallo</p></body></html>"))
    for erwartet in ("Kein Seitentitel", "Keine Beschreibung", "Keine Hauptüberschrift", "Handy-Einstellung", "Impressum", "Datenschutz"):
        assert erwartet in leer, erwartet
    assert leer.index("ROT") < leer.index("GELB"), "Rot steht vor Gelb"
    print("Selbsttest: alles in Ordnung.")


def main(argumente):
    if argumente[:1] == ["--selbsttest"]:
        selbsttest()
        return 0
    ziele = [a for a in argumente if not a.startswith("--")]
    if not ziele:
        print(__doc__)
        return 0
    ziel = ziele[0]
    if re.match(r"https?://", ziel):
        try:
            html, basis = holen(ziel)
        except Exception as e:
            print(f"{ziel}: nicht erreichbar ({e})")
            return 1
        funde = pruefe_seite(html, basis, links_pruefen="--ohne-links" not in argumente)
    else:
        pfad = Path(ziel)
        if not pfad.is_file():
            print(f"{ziel}: Datei nicht gefunden")
            return 1
        funde = pruefe_seite(pfad.read_text(encoding="utf-8", errors="replace"), ordner=pfad.resolve().parent)
    print(ziel)
    for art, meldung in funde:
        print(f"  {art:<6} {meldung}")
    zahl = {farbe: sum(1 for a, _ in funde if a == farbe) for farbe in REIHE}
    print(f"  {zahl['ROT']} Rot, {zahl['GELB']} Gelb, {zahl['OFFEN']} offen. Danach die Liste im Skill von Hand durchgehen.")
    return 1 if zahl["ROT"] else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
