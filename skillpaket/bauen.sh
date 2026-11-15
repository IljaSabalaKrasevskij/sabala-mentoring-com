#!/bin/sh
# Baut die Skill-Pakete nach public/downloads/skill-pakete/:
#   <paket>.zip   je Paket (texte, design, seo, recherche, social, entwicklung)
#   alle.zip      alle Pakete in einem Ordner
# In jedem Paket liegt jeder Skill zusätzlich als eigene ZIP für die Claude-App (Ordner „fuer-die-claude-app“),
# dort lädt man jeden Skill einzeln hoch. Die ZIP muss den Skill-Ordner enthalten, sein Name gleich dem name im SKILL.md.
# Gleiche Quellen ergeben dieselben ZIP-Dateien (Zeitstempel bleiben erhalten).
# Die Anleitungen „Dein Setup als …“ stehen nicht hier, sie kommen aus src/components/skill-pakete/daten.ts.
# Aufruf aus dem Projektordner: sh skillpaket/bauen.sh
set -eu
export PYTHONDONTWRITEBYTECODE=1
cd "$(dirname "$0")"

# 1 Prüfen, bevor etwas gebaut wird
python3 pakete/texte/skills/menschlich-schreiben/pruefen.py --selbsttest
python3 pakete/design/skills/vor-dem-livegang/seite_pruefen.py --selbsttest
for skill in pakete/*/skills/*/; do
  name=$(basename "$skill")
  grep -q "^name: $name\$" "$skill/SKILL.md" || { echo "name im SKILL.md passt nicht zum Ordner: $name"; exit 1; }
  grep -q "^description: ." "$skill/SKILL.md" || { echo "description fehlt im SKILL.md: $name"; exit 1; }
done
doppelt=$(for skill in pakete/*/skills/*/; do basename "$skill"; done | sort | uniq -d)
[ -z "$doppelt" ] || { echo "Skill liegt in zwei Paketen: $doppelt"; exit 1; }
for paket in pakete/*/; do
  [ -f "$paket/00 Start hier.md" ] || { echo "00 Start hier.md fehlt in $paket"; exit 1; }
  if grep -q "VORHER-NACHHER" "$paket/00 Start hier.md"; then echo "Vorher und Nachher fehlt noch in $paket"; exit 1; fi
  zahl=$(ls -d "$paket"skills/*/ | wc -l | tr -d ' ')
  [ "$zahl" -eq 3 ] || { echo "$paket hat $zahl Skills, erwartet sind 3"; exit 1; }
done

# Name des Ordners, den man nach dem Entpacken sieht
titel() {
  case "$1" in
    texte) echo "Skill-Paket Texte" ;;
    design) echo "Skill-Paket Design" ;;
    seo) echo "Skill-Paket SEO und KI-Suche" ;;
    recherche) echo "Skill-Paket Marktrecherche" ;;
    social) echo "Skill-Paket Social Media" ;;
    entwicklung) echo "Skill-Paket Entwicklung" ;;
    *) echo "Kein Titel für das Paket $1" >&2; exit 1 ;;
  esac
}

ziel=$(cd .. && pwd)/public/downloads/skill-pakete
mkdir -p "$ziel"
bau=$(mktemp -d)
alle="$bau/Skill-Pakete"
mkdir -p "$alle"

# 2 Jedes Paket zusammenstellen: Anleitung, Skills, dazu jeder Skill als ZIP für die Claude-App
for paket in pakete/*/; do
  id=$(basename "$paket")
  ordner="$alle/$(titel "$id")"
  mkdir -p "$ordner/fuer-die-claude-app"
  cp -Rp "$paket." "$ordner/"  # -p: Zeitstempel bleiben, gleiche Quellen ergeben dieselbe ZIP
  cp -p "gemeinsam/01 Installation.md" gemeinsam/LIZENZ.md gemeinsam/AENDERUNGEN.md "$ordner/"
  (cd "$paket/skills" && for skill in */; do
    zip -q -r -X "$ordner/fuer-die-claude-app/${skill%/}.zip" "${skill%/}" -x '*.DS_Store' '*__pycache__*'
    touch -r "${skill%/}/SKILL.md" "$ordner/fuer-die-claude-app/${skill%/}.zip"
  done)
  touch -r "$paket/00 Start hier.md" "$ordner/fuer-die-claude-app" "$ordner/skills" "$ordner"
  (cd "$alle" && zip -q -r -X "$ziel/$id.zip.neu" "$(titel "$id")" -x '*.DS_Store' '*__pycache__*')
  mv "$ziel/$id.zip.neu" "$ziel/$id.zip"
done

# 3 Alle Pakete in einem Ordner, mit Überblick
cp -p "gemeinsam/00 Start hier.md" "gemeinsam/01 Installation.md" gemeinsam/LIZENZ.md gemeinsam/AENDERUNGEN.md "$alle/"
touch -r "gemeinsam/00 Start hier.md" "$alle"
(cd "$bau" && zip -q -r -X "$ziel/alle.zip.neu" "Skill-Pakete" -x '*.DS_Store' '*__pycache__*')
mv "$ziel/alle.zip.neu" "$ziel/alle.zip"

for datei in "$ziel"/*.zip; do
  printf '%s  %s Dateien  %s Bytes\n' "$(basename "$datei")" "$(unzip -l "$datei" | tail -n 1 | awk '{print $2}')" "$(wc -c < "$datei" | tr -d ' ')"
done
