# From the gallery to the coffee table

The gallery CTA returns to the wide view and opens a personal invitation with coffee without sugar or with sugar. The invitation mounts on the completed camera frame and leaves the actual gallery visible underneath; it never replaces the room with a different photograph. A centered speech bubble and a transparent porcelain cup sit above the two centered choices. Choosing a drink immediately starts the walk; there is no separate confirmation screen or second button. The existing analysis form starts in the seated scene. Coffee preferences stay in component state and are never submitted as lead data.

## Media

- `gallery-coffee.webp`: poster for the coffee film; the invitation itself uses the live gallery.
- `coffee-cup-v1.webp`: transparent porcelain cup generated with built-in imagegen, resized to 420px with its alpha channel preserved.
- `coffee-walk-v1.mp4`: eight seconds, 1280 × 720, 24 fps, silent H.264 with faststart.
- `coffee-walk-v1-mobil.mp4`: lighter encode of the same take. The full walk remains visible on portrait screens.
- `consultation.webp`: unchanged final composition.

All five assets are in `public/webseiten/studio-consultation-v1/`.

Generated through the existing KIE account using `veo3_fast`, with the furnished gallery as first reference and the existing consultation photograph as last reference. Task: `085e1c6a4488d020a17dbbb1a68b17b3`. The full-quality request was rejected for insufficient credits and created no task. Fast fitted the remaining balance; no top-up or subscription change was made.

The take follows the host past the bench through the side passage, then to his seat at the table. The wall displays remain furnished. The generated route uses the side passage revealed by the camera; it replaces the former digital zoom into the rear arch.

Encode from the preserved source film:

```sh
ffmpeg -i original.mp4 -an -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart coffee-walk-v1.mp4
ffmpeg -i original.mp4 -an -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart coffee-walk-v1-mobil.mp4
```

The film starts with the coffee choice. The film uses the same desktop/mobile camera framing as the gallery overview. The gallery stays visible until a decoded video frame is available, and the last frame stays underneath until the destination photograph has loaded. The film blends in over that same room; the whole room never fades through black. Reduced motion and the visitor's “Without camera moves” setting preserve the dialogue and go directly to the table. A skip button remains available during playback. Loading errors, rejected playback and an eight-second stall fall back to the existing seated photograph. Escape restores focus to the invitation button at the same gallery work. Background scrolling is stopped while the dialog is open.

Generation requests, source footage and frame inspections: workspace `work/coffee-walk-20260915/`.
