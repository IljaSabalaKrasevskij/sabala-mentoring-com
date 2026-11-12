#!/usr/bin/env python3
"""Prüft einen deutschen Text auf typische Zeichen von KI- und Werbetexten.

    python3 pruefen.py text.md          eine oder mehrere Dateien
    pbpaste | python3 pruefen.py -      Text aus der Zwischenablage (Mac), „-“ liest die Standardeingabe
    python3 pruefen.py --selbsttest     prüft das Skript selbst

FEHLER:  Gedankenstriche, verneinende Satzbauten („kein X, sondern Y“), Wörter aus der Liste unten
         und die eigenen aus meine-stimme.md (Abschnitt „Wörter, die ich nie benutze“).
HINWEIS: sehr lange Sätze, viele Ausrufezeichen, großes „Du“ mitten im Satz, Wörter in GROSSBUCHSTABEN,
         Bindestrich mit Leerzeichen als Ersatz für den Gedankenstrich, „nicht nur …, sondern auch“.
Codeblöcke, Inline-Code und Webadressen werden übersprungen. Ausgang 1 bei Fehlern, sonst 0.
Python 3.8 oder neuer, keine Zusatzpakete. © 2026 Ilja Krasevskij, sabala-mentoring.com
"""
import re
import sys
from pathlib import Path

# Kleinschreibung. Ein * am Ende erlaubt Endungen („innovativ*“ trifft „innovative“), ein * dazwischen genau ein Wort.
WOERTER = [
    "game-changer", "gamechanger", "revolutionär*", "bahnbrechend*", "transformation*", "transformier*",
    "authentisch*", "authentizität", "empowerment", "nahtlos*", "mühelos*", "spielend leicht",
    "innovativ*", "modernste*", "ganzheitlich*", "maßgeschneidert*", "mehrwert*", "synergie*",
    "potenzial entfalten", "potential entfalten", "nächste level", "nächsten level",
    "eintauchen", "tauchen wir ein", "entfesseln", "entfesselt*",
    "in der heutigen zeit", "in der heutigen schnelllebigen zeit", "in der heutigen digitalen welt",
    "wichtig zu beachten", "wichtig zu betonen", "sichere dir jetzt", "sichern sie sich jetzt",
    "nur noch * plätze", "hier klicken", "mehr als nur", "herzensmission", "in deine kraft",
]
GROSS_ERLAUBT = {"DSGVO", "HTTPS", "OPENAI", "CLAUDE"}  # Abkürzungen und Namen, die so geschrieben werden
LANGER_SATZ = 30  # Wörter
AUSRUFEZEICHEN = 3  # höchstens im ganzen Text


def muster(wort):
    ende = wort.endswith("*")
    teile = (wort[:-1] if ende else wort).split("*")
    kern = r"\S+".join(re.escape(t) for t in teile).replace(r"\ ", r"\s+")
    return re.compile(r"(?<!\w)" + kern + (r"\w*" if ende else r"(?!\w)"), re.IGNORECASE)


def eigene_woerter(pfad):
    """Liest die Liste „Wörter, die ich nie benutze“ aus meine-stimme.md."""
    if not pfad.is_file():
        return []
    woerter, drin = [], False
    for zeile in pfad.read_text(encoding="utf-8", errors="replace").splitlines():
        if zeile.startswith("## "):
            drin = zeile[3:].strip().lower().startswith("wörter, die ich nie")
        elif drin and zeile.lstrip().startswith("- "):
            wort = zeile.lstrip()[2:].strip().strip("„“\"'").lower()
            if wort:
                woerter.append(wort)
    return woerter


def bereinigt(zeile):
    """Webadressen, Link-Ziele und Inline-Code fallen weg, sie sind keine Sprache."""
    zeile = re.sub(r"`[^`]*`", " ", zeile)
    zeile = re.sub(r"\]\([^)]*\)", "]", zeile)
    return re.sub(r"(?:https?://|www\.)\S+", " ", zeile)


def pruefe(text, eigene=()):
    """Gibt eine Liste aus (Zeile, Art, Meldung) zurück. Zeile 0 meint den ganzen Text."""
    funde = []
    woerter = [(w, muster(w)) for w in WOERTER + [w for w in eigene if w not in WOERTER]]
    im_code, ausrufe = False, 0
    for nr, roh in enumerate(text.splitlines(), 1):
        if roh.lstrip().startswith("```"):
            im_code = not im_code
            continue
        if im_code or roh.strip() in {"---", "***", "___"}:
            continue
        z = bereinigt(roh)
        ausrufe += z.count("!")

        for m in re.finditer("—", z):
            funde.append((nr, "FEHLER", f"Gedankenstrich „—“: {auszug(z, m)}"))
        for m in re.finditer("–", z):
            if re.search(r"\d\s*$", z[: m.start()]) and re.match(r"\s*\d", z[m.end():]):
                continue  # Spanne bei Zahlen ist erlaubt, etwa 9–17 Uhr
            funde.append((nr, "FEHLER", f"Gedankenstrich „–“: {auszug(z, m)}"))
        for m in re.finditer(r"(?<!-)--(?!-)", z):
            vor = z[m.start() - 1] if m.start() else " "
            nach = z[m.end()] if m.end() < len(z) else " "
            if vor.isspace() and nach.isalpha():
                continue  # Option in einem Befehl, etwa „brew install --cask“
            funde.append((nr, "FEHLER", f"doppelter Bindestrich als Gedankenstrich: {auszug(z, m)}"))
        for m in re.finditer(r"(?<=\S) - (?=\S)", z):
            if not (z[m.start() - 1].isdigit() and z[m.end()].isdigit()):
                funde.append((nr, "HINWEIS", f"Bindestrich als Gedankenstrich: {auszug(z, m)}"))

        for m in re.finditer(r"\b(?:nicht|kein\w*)\b[^.!?]{0,80}?\bsondern\b", z, re.IGNORECASE):
            if re.match(r"nicht\s+nur\b", m.group(0), re.IGNORECASE):
                funde.append((nr, "HINWEIS", f"„nicht nur …, sondern auch“, oft ein KI-Muster: {m.group(0)[:70]}"))
            else:
                funde.append((nr, "FEHLER", f"verneinender Satzbau „kein X, sondern Y“: {m.group(0)[:70]}"))
        for m in re.finditer(r"\bgeht(?:\s+es)?\s+nicht\s+um\b[^.!?;,]{0,80}[.!?;,]\s*(?:es\s+geht|geht\s+es)\s+um\b", z, re.IGNORECASE):
            funde.append((nr, "FEHLER", f"verneinender Satzbau „Es geht nicht um X. Es geht um Y.“: {m.group(0)[:70]}"))

        for m in re.finditer(r"\b(?:ist|sind)\s+kein\w*\b[^.!?]{0,60}[.!?]\s+(?:das|es|sie|er|wir|ich)\s+(?:ist|sind|bin)\b", z, re.IGNORECASE):
            funde.append((nr, "HINWEIS", f"erst verneinen, dann behaupten: {m.group(0)[:70]}"))

        for wort, rx in woerter:
            for m in rx.finditer(z):
                funde.append((nr, "FEHLER", f"Wort aus der Liste „{m.group(0)}“ (Eintrag: {wort})"))

        for m in re.finditer(r"(?<=[a-zäöüß,;]\s)(?:Du|Dich|Dir|Dein|Deine|Deinen|Deinem|Deiner|Deines)\b", z):
            funde.append((nr, "HINWEIS", f"großes „{m.group(0)}“ mitten im Satz, klein schreiben: {auszug(z, m)}"))
        for m in re.finditer(r"(?<![\w.])[A-ZÄÖÜ]{5,}(?![\w.])", z):
            if m.group(0) not in GROSS_ERLAUBT:
                funde.append((nr, "HINWEIS", f"Wort in GROSSBUCHSTABEN „{m.group(0)}“"))
        for satz in re.split(r"(?<=[.!?])\s+", z):
            n = len(satz.split())
            if n > LANGER_SATZ:
                funde.append((nr, "HINWEIS", f"langer Satz ({n} Wörter): {' '.join(satz.split()[:8])} …"))

    if ausrufe > AUSRUFEZEICHEN:
        funde.append((0, "HINWEIS", f"{ausrufe} Ausrufezeichen im ganzen Text, höchstens {AUSRUFEZEICHEN} wirken"))
    return funde


def auszug(z, m, rand=28):
    a, e = max(0, m.start() - rand), min(len(z), m.end() + rand)
    return ("…" if a else "") + z[a:e].strip() + ("…" if e < len(z) else "")


def bericht(name, funde):
    print(name)
    for nr, art, meldung in sorted(funde, key=lambda f: (f[0] or 10**9, f[1] != "FEHLER")):
        ort = f"Zeile {nr}" if nr else "gesamt"
        print(f"  {ort:<10} {art:<8} {meldung}")
    fehler = sum(1 for f in funde if f[1] == "FEHLER")
    hinweise = len(funde) - fehler
    if not funde:
        print("  Keine Funde. Jetzt noch einmal laut lesen.")
    else:
        print(f"  {fehler} Fehler, {hinweise} Hinweis{'' if hinweise == 1 else 'e'}. Fehler beheben, Hinweise ansehen.")
    return fehler


def selbsttest():
    arten = lambda t: [a for _, a, _ in pruefe(t)]
    assert arten("Die Seite ist fertig — und sie verkauft.") == ["FEHLER"]
    assert arten("Offen von 9–17 Uhr, Jahre 2024–2026.") == []
    assert arten("Das ist gut -- wirklich.") == ["FEHLER"]
    assert arten("Das ist gut--wirklich.") == ["FEHLER"]
    assert arten("Tippe brew install --cask claude-code ein.") == []
    assert arten("Das ist kein Kurs, sondern eine Begleitung.") == ["FEHLER"]
    assert arten("Es geht nicht um Likes. Es geht um Substanz.") == ["FEHLER"]
    assert arten("Das hilft nicht nur dir, sondern auch deinem Team.") == ["HINWEIS"]
    assert arten("Das ist kein Kurs. Das ist eine Begleitung.") == ["HINWEIS"]
    assert arten("Eine nahtlose Lösung mit Mehrwert.") == ["FEHLER", "FEHLER"]
    assert arten("Nur noch 3 Plätze frei.") == ["FEHLER"]
    assert arten("Dabei ist es wichtig zu beachten, dass es klappt.") == ["FEHLER"]
    assert arten("Ich schicke dir die Vorlage, du füllst sie aus.") == []
    assert arten("Danke, weil Du es kannst.") == ["HINWEIS"]
    assert arten("Du kannst das. Dein Team auch.") == []
    assert arten("Das ist WIRKLICH wichtig, sagt die DSGVO.") == ["HINWEIS"]
    assert arten("```\nDas ist — Code\n```\nMehr unter https://beispiel.de/a--b") == []
    assert arten("Ja! Ja! Ja! Ja!") == ["HINWEIS"]
    assert arten(" ".join(["Wort"] * 31) + ".") == ["HINWEIS"]
    assert [a for _, a, _ in pruefe("Das ist ein Gamechanger und spitze.", eigene=["spitze"])] == ["FEHLER", "FEHLER"]
    print("Selbsttest: alles in Ordnung.")


def main(argumente):
    if argumente[:1] == ["--selbsttest"]:
        selbsttest()
        return 0
    eigene = eigene_woerter(Path(__file__).resolve().parent / "meine-stimme.md")
    if not argumente:
        print(__doc__)  # nie still auf Eingabe warten, das hängt in Werkzeugen ohne Tastatur
        return 2
    if argumente == ["-"]:
        return 1 if bericht("Eingabe", pruefe(sys.stdin.read(), eigene)) else 0
    fehler = 0
    for datei in argumente:
        pfad = Path(datei)
        if not pfad.is_file():
            print(f"{datei}: Datei nicht gefunden")
            fehler += 1
            continue
        fehler += bericht(datei, pruefe(pfad.read_text(encoding="utf-8", errors="replace"), eigene))
    return 1 if fehler else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
