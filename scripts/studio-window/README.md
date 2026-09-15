# Positionierung als Globus

Das erste Exponat im Schaufenster ist ein dunkler Globus mit goldener Kartografie, geneigtem Messingring und kleinem Holzfuß. Er ersetzt Dossier und Lupe. Die Beschriftung bleibt Positionierung. Deutsch: Der Globus. Englisch: The globe.

## Bild und Hover

`public/webseiten/studio-london-v1/exterior-globe-v2.webp` entstand mit dem integrierten imagegen-Werkzeug als gezielte Bearbeitung von `exterior.webp`. Die übrige Szene, der Adler, alle anderen Exponate und der Bildausschnitt bleiben in der bestehenden Gestaltung. Das PNG-Original und der vollständige Prompt liegen im Arbeitsordner `outputs/london-studio/globus/`. Die WebP-Fassung hat dieselben 1672 × 941 Pixel wie die Vorlage. Die aktive Fläche und der Hover-Ausschnitt sind auf die neue runde Silhouette abgestimmt.

## Eintrittsfilm

`entry-globe-v2.mp4` und `entry-globe-v2-mobil.mp4` verwenden die vorhandene Aufnahme `entry.mp4`. Ein kleiner, weich begrenzter Ausschnitt aus dem neuen Bild ersetzt das erste Exponat in den ersten 60 Frames. Die räumliche Bewegung ist über die ursprüngliche Vitrine registriert. Sobald der Globus links aus dem Blickfeld verschwindet, läuft die Aufnahme unverändert weiter. Der Adler und die Tür bleiben aus der Originalaufnahme.

Neu rendern:

```sh
python3 scripts/studio-window/compose-globe.py --output-dir /tmp/sabala-globe
```

Benötigt numpy, OpenCV und ffmpeg. Beide Ausgaben sind 1280 × 720, 24 fps, acht Sekunden, H.264 ohne Ton mit faststart und sechs Frames pro Keyframe-Gruppe. Neue Dateinamen vermeiden alte Bilder und Filme aus dem Browser-Cache. Das Generieren und Rendern geschieht nur bei der Erstellung, nicht im Browser.
