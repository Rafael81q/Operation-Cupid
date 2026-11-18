# Operation Cupid: The Search of the Missing Heart

A desktop point-and-click adventure built with vanilla HTML, CSS, and JavaScript. Open index.html in a current browser; there is no build step or JavaScript dependency. If local image loading is blocked, serve this folder with a local web server such as VS Code Live Server. Save data stays in that browser's local storage.

## Implemented

- Five connected rooms: Reception, Kitchen, Bedroom, Observatory, Heart Engine.
- Clickable hotspots, inspection dialogue, inventory, clue notebook, hints, save/load, restart, fullscreen, sound toggle.
- Puzzles: telephone extension 1142; strawberry cake scale lock 5374; bedroom mirror sequence music → moon → eye → flame; observatory rings R–L–U–D; five Heart Engine stages (1142, 5374, the clickable mirror sequence, broken-heart constellation, date 2503).
- Photo hallway finale.
- CSS drawn room stand-ins make the game playable before adding artwork.

Generated images mentioned in the referenced chat were not attached to this workspace, including the two Reception variations and title/play art. They cannot be previewed here, so the stand-ins are not substitutes. The final Heart Engine date answer is 2503, as requested. Add four personal hallway photos later under assets/photographs/.

## Artwork filenames and sizes

Put supplied art under assets/. Backgrounds are 1920 × 1080 PNG. The game scales each room image to fill its scene.

| Filename | Size | Content |
|---|---:|---|
| assets/title-screen.png | 1920 × 1080 | Existing gothic title artwork: moon, Cupid statue, castle, heart clock, cage and title. |
| assets/ui/play-button.png | 360 × 120 | Transparent ornate PLAY button (CSS button used until supplied). |
| assets/backgrounds/reception.png | 1920 × 1080 | Reception desk, lamp, clock, telephone, kitchen door. |
| assets/backgrounds/kitchen.png | 1920 × 1080 | Gothic kitchen, fridge, counter, scale, cupboards. |
| assets/backgrounds/bedroom.png | 1920 × 1080 | Surreal bedroom, mirror, bed, wardrobe, portrait, candle. |
| assets/backgrounds/observatory.png | 1920 × 1080 | Circular observatory, telescope, chart, four rings. |
| assets/backgrounds/heart-engine.png | 1920 × 1080 | Large mechanical heart chamber with five sockets. |

### Separate transparent item art

Use transparent PNGs, about 256 × 256 each, with the object centered. These are future visual slots; hotspot interactions already work without them.

assets/items/telephone.png
assets/items/appointment-register.png
assets/items/wall-clock.png
assets/items/desk-drawer.png
assets/items/desk-lamp.png
assets/items/recipe-book.png
assets/items/broken-scale.png
assets/items/refrigerator.png
assets/items/cupboard.png
assets/items/ornate-mirror.png
assets/items/music-box.png
assets/items/wardrobe.png
assets/items/portrait.png
assets/items/candle.png
assets/items/telescope.png
assets/items/star-chart.png
assets/items/astronomical-rings.png
assets/items/star-cabinet.png
assets/items/heart-engine.png
assets/items/key-i.png
assets/items/key-ii.png
assets/items/key-iii.png
assets/items/key-iv.png
assets/items/recipe-card.png
assets/items/memory-photo-item.png

### Personal photographs

| Filename | Size | Content |
|---|---:|---|
| assets/photographs/memory-01.png | 1200 × 900 | Personal hallway photograph 1. |
| assets/photographs/memory-02.png | 1200 × 900 | Personal hallway photograph 2. |
| assets/photographs/memory-03.png | 1200 × 900 | Personal hallway photograph 3. |
| assets/photographs/memory-04.png | 1200 × 900 | Personal hallway photograph 4. |

Missing photographs are handled gracefully. Include only images you are comfortable sharing in the game folder.

### Audio files (now wired up)

Put these files directly in assets/audio. Use OGG Vorbis audio (.ogg). The code starts title music after the first click on the title screen, switches to the game theme after Play, and loops the ambience during play. The Sound button pauses/resumes music, ambience, and effects together. Missing files are ignored, so you can add them one at a time.

| Filename | What it plays | Loop? |
|---|---|---|
| assets/audio/title-theme.ogg | Music on the title screen, after the first click | Yes |
| assets/audio/game-theme.ogg | Main game music, starts just after pressing Play | Yes |
| assets/audio/ambience.ogg | Quiet background room ambience | Yes |
| assets/audio/telephone-voice.ogg | Your recorded telephone dialogue, after entering 1142 | No |
| assets/audio/puzzle-solved.ogg | Short success chime when a puzzle step is solved | No |
| assets/audio/heart-engine.ogg | Heart Engine finale sound | No |
| assets/audio/ui-click.ogg | Soft sound on hotspot clicks | No |

Keep music and ambience gentle so they do not cover the telephone recording. For an easier first pass, add only title-theme.ogg, game-theme.ogg, and telephone-voice.ogg. Refresh the browser after adding files. The paths are defined in js/audio.js if you want to rename them.

## Personalize the memory

The final Heart Engine date answer is 2503, as requested. Add the four personal hallway photos later under assets/photographs/. The code modules are intentionally small: room content in js/game-data.js, save state in js/state.js, interface helpers in js/ui.js, game logic in js/app.js.
