#!/bin/bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless --disable-gpu --virtual-time-budget=5000 --print-to-pdf="$(pwd)/Sabala Final Assets/Premium-Angebot.pdf" "file://$(pwd)/files/Angebot-Export.html"
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless --disable-gpu --virtual-time-budget=5000 --print-to-pdf="$(pwd)/Sabala Final Assets/LinkedIn-Banner.pdf" "file://$(pwd)/files/LinkedIn-Banner.html"
