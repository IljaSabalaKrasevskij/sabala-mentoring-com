#!/bin/sh
# Baut public/downloads/skill-paket.zip aus skillpaket/skill-paket.
# Dabei entsteht für jeden Skill eine eigene ZIP für die Claude-App (Ordner „fuer-die-claude-app“), dort lädt man
# jeden Skill einzeln hoch. Die ZIP muss den Skill-Ordner enthalten, sein Name gleich dem name im SKILL.md.
# Aufruf aus dem Projektordner: sh skillpaket/bauen.sh
set -eu
export PYTHONDONTWRITEBYTECODE=1
cd "$(dirname "$0")"
python3 skill-paket/skills/menschlich-schreiben/pruefen.py --selbsttest
python3 skill-paket/skills/vor-dem-livegang/seite_pruefen.py --selbsttest
for skill in skill-paket/skills/*/; do
  name=$(basename "$skill")
  grep -q "^name: $name\$" "$skill/SKILL.md" || { echo "name im SKILL.md passt nicht zum Ordner: $name"; exit 1; }
done

bau=$(mktemp -d)
mkdir -p "$bau/skill-paket/fuer-die-claude-app"
cp -Rp skill-paket/. "$bau/skill-paket/"  # -p: Zeitstempel bleiben, gleiche Quellen ergeben dieselbe ZIP
(cd skill-paket/skills && for skill in */; do
  zip -q -r -X "$bau/skill-paket/fuer-die-claude-app/${skill%/}.zip" "${skill%/}" -x '*.DS_Store' '*__pycache__*'
  touch -r "${skill%/}/SKILL.md" "$bau/skill-paket/fuer-die-claude-app/${skill%/}.zip"
done)
touch -r skill-paket/LIZENZ.md "$bau/skill-paket/fuer-die-claude-app"
(cd "$bau" && zip -q -r -X skill-paket.zip skill-paket -x '*.DS_Store' '*__pycache__*')
mv "$bau/skill-paket.zip" ../public/downloads/skill-paket.zip
unzip -l ../public/downloads/skill-paket.zip | tail -n 1
