#!/usr/bin/env python3
"""Prüft eine Webseite auf die Grundlagen vor dem Livegang.

    python3 seite_pruefen.py https://deine-seite.de/unterseite
    python3 seite_pruefen.py index.html           Datei auf dem Rechner (ohne Link-Prüfung)
    python3 seite_pruefen.py URL --ohne-links     ohne die Prüfung der Links
    python3 seite_pruefen.py --selbsttest         prüft das Skript selbst, ohne Netz

Prüft: Titel, Beschreibung, Hauptüberschrift, Fragen in Überschriften, Bilder ohne Beschreibung (alt),
Handy-Einstellung (viewport), Sprache, Canonical, noindex, Vorschaubild (og:image), Impressum und Datenschutz,
vorab gesetzte Häkchen, kaputte Links auf derselben Seite (höchstens 40) und, wenn der Skill menschlich-schreiben
daneben liegt, die Sprache des sichtbaren Textes. Ausgang 1 bei Fehlern, sonst 0.
Python 3.8 oder neuer, keine Zusatzpakete. © 2026 Ilja Krasevskij, sabala-mentoring.com
"""
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

KENNUNG = "Mozilla/5.0 (Skill-Paket seite_pruefen.py)"
# Was hier steht, ist kein Fließtext: Skripte, Stile, Grafiken und Code (Befehle wie „claude --version“).
STILL = ("script", "style", "noscript", "svg", "code", "pre", "kbd", "samp")
FRAGEWORTE = ("was", "wie", "warum", "wieso", "weshalb", "wer", "wem", "wen", "wann", "wo", "woher", "wohin", "welche", "welcher", "welches", "wieviel", "wie viel", "kann", "brauche", "lohnt")


class Leser(HTMLParser):
    """Sammelt, was für die Prüfung zählt. Text in STILL zählt nicht als Fließtext."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.titel, self.meta, self.links, self.bilder = "", {}, [], []
        self.lang, self.canonical, self.haekchen = "", "", 0
        self.ueberschriften, self.absaetze = [], []
        self._stapel, self._puffer, self._in_titel, self._still = [], [], False, 0

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
        elif tag == "link" and "canonical" in a.get("rel", "").lower().split():
            self.canonical = a.get("href", "")
        elif tag == "a" and a.get("href"):
            self.links.append(a["href"])
        elif tag == "img":
            self.bilder.append(a)
        elif tag == "input" and a.get("type", "").lower() == "checkbox" and "checked" in a:
            self.haekchen += 1
        if tag in STILL:
            self._still += 1
        if tag in ("h1", "h2", "h3", "p", "li"):
            self._stapel.append(tag)
            self._puffer.append([])

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_titel = False
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
        elif not self._still and self._puffer:
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


def pruefe_seite(html, basis="", links_pruefen=False):
    """Gibt eine Liste aus (Art, Meldung) zurück."""
    s = Leser()
    s.feed(html)
    funde = []
    f = lambda art, text: funde.append((art, text))
    titel = re.sub(r"\s+", " ", s.titel).strip()
    beschreibung = s.meta.get("description", "").strip()
    h1 = [t for tag, t in s.ueberschriften if tag == "h1"]

    if not titel:
        f("FEHLER", "Kein Seitentitel (<title>).")
    elif len(titel) > 60:
        f("HINWEIS", f"Titel hat {len(titel)} Zeichen, Google zeigt etwa 60: „{titel}“")
    if not beschreibung:
        f("FEHLER", "Keine Beschreibung (meta description). Google nimmt dann irgendeinen Satz der Seite.")
    elif len(beschreibung) > 160:
        f("HINWEIS", f"Beschreibung hat {len(beschreibung)} Zeichen, sichtbar sind etwa 160.")
    if len(h1) != 1:
        f("FEHLER" if not h1 else "HINWEIS", f"{len(h1)} Hauptüberschriften (H1), richtig ist genau eine.")
    unter = [t for tag, t in s.ueberschriften if tag in ("h2", "h3")]
    if unter and not any(t.endswith("?") or t.lower().startswith(FRAGEWORTE) for t in unter):
        f("HINWEIS", "Keine Überschrift ist eine Frage. Fragen wie „Was kostet das?“ helfen Lesern und KI-Suchen.")
    if "noindex" in s.meta.get("robots", "").lower():
        f("FEHLER", "Die Seite sagt Google „noindex“: Sie erscheint nicht in der Suche.")
    if "width=device-width" not in s.meta.get("viewport", "").replace(" ", ""):
        f("FEHLER", "Keine Handy-Einstellung (meta viewport mit width=device-width). Am Handy wird die Seite winzig.")
    if not s.lang:
        f("HINWEIS", "Keine Sprache angegeben (<html lang=\"de\">).")
    if not s.canonical:
        f("HINWEIS", "Kein Canonical. Damit sagst du Google, welche Adresse die richtige ist.")
    if not s.meta.get("og:image"):
        f("HINWEIS", "Kein Vorschaubild (og:image). WhatsApp und LinkedIn zeigen dann kein Bild.")
    ohne_alt = [b.get("src", "?") for b in s.bilder if "alt" not in b]
    if ohne_alt:
        f("FEHLER", f"{len(ohne_alt)} Bilder ohne Beschreibung (alt), zum Beispiel {ohne_alt[0][:80]}")
    ziele = " ".join(s.links).lower()
    for wort in ("impressum", "datenschutz"):
        if wort not in ziele:
            f("FEHLER", f"Kein Link zum {wort.capitalize()} gefunden. Er gehört auf jede Seite, meist in die Fußzeile.")
    if s.haekchen:
        f("FEHLER", f"{s.haekchen} Häkchen sind vorab gesetzt. Für Werbung und Newsletter nie vorab ankreuzen.")

    if links_pruefen and basis:
        host = urllib.parse.urlparse(basis).netloc
        eigene = []
        for h in s.links:
            ziel = urllib.parse.urljoin(basis, h).split("#")[0]
            if urllib.parse.urlparse(ziel).netloc == host and ziel not in eigene:
                eigene.append(ziel)
        kaputt = [(z, c) for z, c in ((z, status(z)) for z in eigene[:40]) if c == 0 or c >= 400]
        for ziel, code in kaputt:
            f("FEHLER", f"Link führt ins Leere ({code or 'keine Antwort'}): {ziel}")
        if len(eigene) > 40:
            f("HINWEIS", f"Nur die ersten 40 von {len(eigene)} Links geprüft.")

    sprache = sprachpruefung()
    text = "\n".join(t for _, t in s.ueberschriften + s.absaetze)
    if sprache and text:
        treffer = [m for m in sprache(text) if m[1] == "FEHLER"]
        for _, _, meldung in treffer[:8]:
            f("FEHLER", f"Sprache: {meldung}")
        if len(treffer) > 8:
            f("HINWEIS", f"Sprache: {len(treffer) - 8} weitere Fehler. Ganzen Text mit pruefen.py ansehen.")
    elif not sprache:
        f("HINWEIS", "Sprache nicht geprüft: Der Skill menschlich-schreiben liegt nicht im Nachbarordner.")
    return funde


def selbsttest():
    html = """<!doctype html><html><head><title>Startpaket</title>
    <meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Kurz und klar.">
    </head><body><h1>Dein Startpaket</h1><h2>Was kostet das?</h2><p>Nichts. Du trägst dich ein.</p>
    <img src="a.jpg" alt="Skizze"><img src="b.jpg"><input type="checkbox" checked>
    <p>Tippe <code>claude --version</code> ein.</p><a href="/impressum">Impressum</a><a href="/datenschutz">Datenschutz</a><script>var x = "—";</script></body></html>"""
    funde = pruefe_seite(html)
    texte = " ".join(t for _, t in funde)
    assert "Bilder ohne Beschreibung" in texte and "vorab gesetzt" in texte, texte
    assert "Hauptüberschriften" not in texte and "Impressum" not in texte and "Handy-Einstellung" not in texte, texte
    assert "Keine Überschrift ist eine Frage" not in texte, texte
    assert not any("Gedankenstrich" in t for _, t in funde), "Text in <script> und <code> darf nicht zählen"
    leer = " ".join(t for _, t in pruefe_seite("<html><body><p>Hallo</p></body></html>"))
    for erwartet in ("Kein Seitentitel", "Keine Beschreibung", "0 Hauptüberschriften", "Handy-Einstellung", "Impressum", "Datenschutz"):
        assert erwartet in leer, erwartet
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
        funde = pruefe_seite(pfad.read_text(encoding="utf-8", errors="replace"))
    print(ziel)
    for art, meldung in sorted(funde, key=lambda x: x[0] != "FEHLER"):
        print(f"  {art:<8} {meldung}")
    fehler = sum(1 for a, _ in funde if a == "FEHLER")
    print(f"  {fehler} Fehler, {len(funde) - fehler} Hinweise." if funde else "  Keine Funde. Jetzt noch die Liste im Skill von Hand durchgehen.")
    return 1 if fehler else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
