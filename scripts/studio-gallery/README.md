# Galerie: bereits gehängte Werke beim Eintritt

Der Film `gallery-hung-v4.mp4` verwendet die bestehende durchgehende Aufnahme `public/webseiten/studio-salon-v2/gallery-doorway-v3.mp4`. Der Adler, die Tür und die Kamerabewegung bleiben im Original. Die Webseiten sitzen ab dem Sichtbarwerden in ihren Wandrahmen.

Sechs feste Werke, in der Reihenfolge der interaktiven Galerie: RFQ to PO, YUNA, Stefanie Lommel, Vega Leads, Stefan Pons, Cyber Sales. Das zusätzliche Bild direkt am Eingang zeigt ebenfalls RFQ to PO und verschwindet beim Schwenk aus dem Blickfeld.

`arrival-tracks.json` enthält die geprüften vier Eckpunkte jeder Fläche pro Videoframe (1280 × 720, 24 fps). `arrival-foreground.json` enthält die Vordergrundkonturen des Adlers. Seine Silhouette wird innerhalb eines schmalen Randbereichs mit GrabCut an die Originalaufnahme angepasst. Tür und Messingrahmen bleiben über den Einsätzen. Es werden keine Bilder oder Personen durch KI neu erzeugt.

Neu rendern, wenn ein Website-Screenshot geändert wird:

```sh
python3 scripts/studio-gallery/compose-arrival.py --output-dir /tmp/gallery-arrival --review
```

Erfordert Python mit `numpy` und `opencv-python`, außerdem `ffmpeg`. Die Abhängigkeiten werden nur zum Rendern gebraucht, nicht im Browser. Die Ausgabe enthält eine Desktop- und eine kleinere Mobilfassung mit kurzen Keyframe-Abständen für vorwärts und rückwärts gesteuertes Scrollen. Nach visueller Prüfung beide Dateien nach `public/webseiten/studio-salon-v2/` übernehmen; bei weiteren Fassungen einen neuen Dateinamen verwenden, damit Browser-Caches keine alte Aufnahme zeigen.

Die fertigen Dateien sind eingecheckt, Vercel rendert sie nicht neu. Die Standbildansicht in `StudioCinema.tsx` verwendet die Projektbilder und Positionen aus denselben Galeriedaten wie `StudioGallery.tsx`, einschließlich der Vordergrundmaske des Adlers.
