"""Baut die runde Adler-Marke mit Goldring aus der Adler-Bildfolge von /webseiten (public/webseiten/adler).

  python3 scripts/adler-marke.py        (braucht Pillow)

Es entstehen drei Dateien in public/newsletter:
  adler-blick.gif          144 px, bewegt, für Mails (GIF läuft in jedem Mailprogramm; Outlook am PC zeigt nur das erste Bild)
  adler-blick.webp         264 px, bewegt, für die Webseite (scharf auf hochauflösenden Bildschirmen, kleiner als das GIF)
  adler-seitenblick.webp   264 px, Standbild mit Blick zur Seite

Ablauf der Bewegung: Blick nach vorn (lange), nach links, kurz halten, nach vorn, nach rechts, kurz halten, zurück.
Das erste Bild ist immer der Blick nach vorn.
"""
import os
from PIL import Image, ImageDraw

WURZEL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUELLE = os.path.join(WURZEL, "public", "webseiten", "adler")
ZIEL = os.path.join(WURZEL, "public", "newsletter")
KASTEN = (504, 40, 924, 460)  # Kopf und Kragen. Der Schnabel bleibt in jeder Stellung im Kreis, der Laptop mit Logo bleibt draußen.
GRUND, GOLD = (10, 8, 6), (184, 150, 62)
VORN, LINKS, RECHTS, SEITE = 32, 16, 48, 22
SCHRITT = 3  # jedes dritte Bild der Folge: 24 Bilder je Runde


def marke(nummer, px):
    """Ein Bild der Folge als runde Marke: dreifach groß zeichnen, dann verkleinern, damit Ring und Rand glatt werden."""
    g = px * 3
    bild = Image.open(os.path.join(QUELLE, f"f{nummer:03d}.webp")).convert("RGB").crop(KASTEN).resize((g, g), Image.LANCZOS)
    rand = round(g * 0.022)
    maske = Image.new("L", (g, g), 0)
    ImageDraw.Draw(maske).ellipse((rand, rand, g - rand, g - rand), fill=255)
    flaeche = Image.new("RGB", (g, g), GRUND)
    flaeche.paste(bild, (0, 0), maske)
    ImageDraw.Draw(flaeche).ellipse((rand, rand, g - rand, g - rand), outline=GOLD, width=round(g * 0.016))
    return flaeche.resize((px, px), Image.LANCZOS)


def ablauf():
    """Bildnummern und Standzeiten in Millisekunden für eine Runde."""
    folge, dauer = [VORN], [2600]

    def fahrt(von, bis, halten):
        s = SCHRITT if bis > von else -SCHRITT
        for n in range(von + s, bis + (1 if s > 0 else -1), s):
            folge.append(n); dauer.append(70)
        if folge[-1] != bis:
            folge.append(bis); dauer.append(70)
        dauer[-1] = halten

    fahrt(VORN, LINKS, 900)
    fahrt(LINKS, VORN, 1300)
    fahrt(VORN, RECHTS, 900)
    fahrt(RECHTS, VORN, 70)
    folge.pop(); dauer.pop()  # das letzte „vorn“ ist das erste Bild der nächsten Runde
    return folge, dauer


def groesse(name):
    return f"{name}: {os.path.getsize(os.path.join(ZIEL, name)) // 1024} KB"


folge, dauer = ablauf()

# GIF für Mails: eine gemeinsame Farbtafel für alle Bilder, sonst flackern die Farben. Ohne Raster, das hält die Datei klein.
klein = [marke(n, 144) for n in folge]
alle = Image.new("RGB", (144 * len(klein), 144))
for i, b in enumerate(klein):
    alle.paste(b, (i * 144, 0))
tafel = alle.quantize(colors=128, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
fertig = [b.quantize(palette=tafel, dither=Image.Dither.NONE) for b in klein]
fertig[0].save(os.path.join(ZIEL, "adler-blick.gif"), save_all=True, append_images=fertig[1:], duration=dauer, loop=0, optimize=True, disposal=1)

# WebP für die Webseite
gross = [marke(n, 264) for n in folge]
gross[0].save(os.path.join(ZIEL, "adler-blick.webp"), save_all=True, append_images=gross[1:], duration=dauer, loop=0, quality=78, method=6)
marke(SEITE, 264).save(os.path.join(ZIEL, "adler-seitenblick.webp"), quality=86, method=6)

print(f"{len(folge)} Bilder je Runde, {sum(dauer) / 1000:.1f} Sekunden")
for name in ("adler-blick.gif", "adler-blick.webp", "adler-seitenblick.webp"):
    print(" ", groesse(name))
