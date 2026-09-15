# Studio soundtrack

The German and English website pages share one opt-in recording through `StudioSoundProvider`. Its audio element stays mounted across gallery and consultation transitions. The native consultation dialog gets its own control connected to that same player.

- No audio request or autoplay before the visitor presses the music button.
- Web Audio gain fades the music in and lowers it at the consultation table, including on iOS where media-element volume is not adjustable.
- Explicit pause is respected; a hidden document pauses playback and returning resumes only an already enabled session. Leaving the page releases audio resources.
- No API key, cookies or third-party music embed. A fresh visit starts silently.
- The recording repeats with a soft entrance and ending. It is not advertised as a musically seamless loop.

## Source

Original instrumental generated in the owner’s Suno Pro account on 15 September 2026, model v6. Title: **Sabala Studios · Mayfair at Dusk**.

Suno clip: https://suno.com/song/7d29f3cc-7296-4abc-80d4-e6bc247adc5c

The recording was unlocked through Suno’s official Pro **Unlock & Download** flow and downloaded as WAV. The download balance changed from 27 to 26. Commercial-use eligibility was checked against the active Pro plan and the following source at download time:

- https://help.suno.com/en/articles/9601665
- https://about.suno.com/terms

Brief: original restrained instrumental acoustic jazz for a warm Mayfair boutique and private gallery; intimate piano, upright bass, delicate brushed drums, sparse celesta, 70 BPM. No voices, dramatic crescendos or prominent solo instruments.

## Asset

`public/webseiten/studio-audio/mayfair-at-dusk-v1.mp3`, 205 seconds, stereo, 44.1 kHz, 128 kbps. Source loudness: -16.19 LUFS; gain adjustment -6.81 dB; 1.5-second entrance and 4-second ending fades. Personal file metadata removed. Playback gain is 0.30, lowered to 0.16 at the consultation table.

The original WAV and acquisition notes are kept in the local project work artifacts. A Suno API connection is not needed for visitors. The separate official API portal did not provision this account at the time of implementation.
