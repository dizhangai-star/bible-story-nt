# 光之窗 · 新約 · The New Covenant: Progress

**Resume here:** read this file (and `TREATMENT.md`), then continue from **Next step**.
Sequel to `../bible-story` (the Old Testament, finished 2026-09-30). Everything in its PROGRESS.md "How it works" and
"Notes" applies here too (same engine, `sg/`, `clips/_glass.js`); read those sections there instead of re-learning.

## Next step
**Sprint 5 done — draft waiting for the user's review** (`out/sprint5-draft.mp4`, scored: 00-title + 01–07 ≈ 2:51,
first draft with sound; 06 now 26 s with J6, 07-jerusalem 22.5 s, fading out). After sign-off: Sprint 6 (Deliver):
rewrite `08-end` (still the OT end card), joint review, newcomer review → captions, compile, check, srt, poster, GitHub.

## Decisions (locked)
- **Folder / repo:** own folder `bible-nt/`, own git repo; `bible-story/` and `_kit/` are never edited from here.
  Scaffolded by `new-film.mjs --style cg-lab`, then the style pack replaced by bible-story's film-local files:
  `engine.html`, `sg/`, `preview/render/compile.mjs`, `timeline.js`, `tools/storyboard.mjs`, `audio/music.mjs`,
  `audio/score.mjs`, `clips/_glass.js`, and the dev clips `cast`, `board`, `sf`, `00-title`, `08-end` as templates.
  `clips/ot-genesis.js` = the OT opening, kept as a look reference (dev clip).
- **Jesus is drawn** as a glass figure (cross halo), as in the window tradition — the Word made flesh.
  **The Father is never drawn; God is the light** (as in the OT film).
- **Scope:** 7 chapters ≈ 2:30 + opening and end cards, each chapter answering one OT chapter (TREATMENT §2).
- **The hall:** the same hall, the facing window (same rose + 4 lancets, all world units unchanged).
  Carved title `LVX · MVNDI` (John 8:12, Vulgate), answering `FIAT · LVX`; `GX.TITLE`.
- **Arc of the light:** the OT's light came from outside (the sun band); here the light moves inside the glass, until
  07 needs no sun at all (Rev 21:23).
- **Joints are built in the sprint that builds the chapters** (user, 2026-09-30; the OT film deferred them to the
  Deliver sprint and drafts showed one-frame hard cuts). Every boundary between two chapters of the same sprint gets
  its `J` (camera move + hidden glass swap) before the draft is rendered; the sprint's last chapter gets its joint in
  the next sprint, together with the chapter after it. A draft never shows a hard cut between windows.
- Carried over from the OT film (locked there): 16:9 1920×1080, 24 fps, figures step at 8 fps; 繁體中文 (和合本) above,
  English (KJV) below, no narration; Cinzel / IM Fell English / Noto Serif TC; music in code (organ, recorder, harp,
  D Dorian, 80 BPM) + glass foley; one window and one glass per chapter; continuous camera inside a chapter; glass swaps
  fully hidden (`GX.blackout`); breaks are shards; no fades between chapters (in at 01, out at 07); night chapters
  keep a dim band; ≤ 4 `pts`; `gild` ≤ .15 in daylight; seeded `R(seed)` only.

## Sprints
Numbered from 0 in this repo (the OT film's Sprints 0–6 are in `../bible-story`).
- [x] **0 · Scaffold** — `bible-nt/` from bible-story's engine; LVX · MVNDI; 00-title text (2026-09-30)
- [x] **1 · Brief + cast + storyboard**: TREATMENT · cast sheet v1 · glass keys · board v1.1 · style frames (2026-09-30)
  v1.1: 01 star r 64 + brighter glow at the wides; pearl gate redrawn (wide nacre arch, gold doorway, street widening
  toward us — v1's slim white arch read as a candle); 07 floor light (see Notes); `sf.js` = 01-3 · 04-3 · 07-3 clean
- [x] **2 · 01-nativity, 02-baptism** (2026-09-30, in review)
  01: in from black (fadeIn 0–1.4); the star of Bethlehem moves from the first frame (key path: drifts in I, crosses the
  mullion fast 6.9–7.7, settles over the stable in II at 11.2); camera follows; the child kindles 12–14.5 (warm `pts`
  on the manger + Mary's face), the moon band dims to .7. 02: truck along the Jordan → II–III; the heavens open = a
  gold/white ray cut into lancet II from the white roundel down, 7 pieces one by one, while the band narrows onto II;
  the dove comes out of the roundel down the ray (camera follows it), settles over Jesus' head in a flare at 14.2;
  John blends bless → bow. Both end on the next chapter's name.
  J1 (01 → 02, t0 17.6): the camera rises from the manger to the star, which swells and whitens into a white-out
  (`expo` up to 5, glass swap at u .56 under the glare); the glare settles into the cold dawn and the camera pulls back
  to 02's opening wide. 02 → 03 (J2) comes with 03 in Sprint 3.
- [x] **3 · 03-light, 04-supper** (2026-10-02, in review)
  J2 (02 → 03, t0 18.8; 02 now 23 s): all but the ray goes dark as the camera pulls back, so only Jesus' lancet shines;
  blackout (swap) at u .46–.54; the noon band grows outward from lancet II (`sunU` LX[1] → 0, `bandW` 300 → 3200).
  03: noon wide, lancet III (the man born blind) matted dark; push to II–III, Jesus blends bless → touchEyes, a white
  `bigStar` kindles in his hand (6.0–9.6); tilt down to the pool in IV, he washes (kneelWash → kneelSee, flare at 13);
  III's matting lifts from his eyes outward in 8 ragged steps (14.2–17), he blends blindStand → lookUp.
  J3 (03 → 04, t0 18.8): the noon band slides off to the right (`sunU` → 1300, `bandW` → 600: dark sweeps left → right),
  blackout at u .47–.53, the amber band enters from the left (−1300 → 0). 04: dusk table wide; push to the bread held
  in Jesus' hands (Jesus moved to x 0, loaf at (LX[1]+78, 420)), it parts 7.4–9; pan to the cup, which kindles ruby
  (`pts` 3.6) while the band sinks (`sunI` 2.6 → .6, `sz` 2.1 → 2.8).
- [x] **4 · 05-cross, 06-resurrection** (2026-10-02, in review)
  J4 (04 → 05, t0 18.8): the dusk band dies as the camera pulls back, so only the ruby cup shines; blackout u .36–.53;
  the hard noon band comes up on the hill (the central cross stands where the cup stood).
  05: noon wide, veil (ruby) in I, three crosses II–IV; slow push; the band fails 5.6–10 (`sunI` 2.7 → .22) as the
  camera arrives at the cross; a gold `pts` on the halo goes out at "gave up the ghost" (11.6–13); silence; in the dark
  the dim band narrows onto I (`sunU` → LX[0], `bandW` → 330) as the camera turns to the veil; 16.4 the veil is rent
  top to bottom (`GX.tear`: spine grows over 1.6 s, 4 rows of left/right shards part .4 s apart, branch cracks), a
  narrow white band strikes I, a flash runs down the tear, a short camera quake.
  J5 (05 → 06, t0 21): the light on the veil narrows (`bandW` → 120) as the camera pulls back; blackout u .34–.54;
  the night moon band on the garden.
  06: night wide → push to the tomb (II); silence; the stone rolls 7–10, the door turns gold, warm `pts` from inside;
  dawn 11–14.6 (`mixState(night, dawn)`); pan to III–IV, lancet IV's matting lifts from the risen Christ's halo in 8
  steps (13.2–15.8, as 03); "Mary" 16.2: Magdalene blends kneelLook → kneelSee; lancet I carries the veil's tear as
  lead scars (`GX.scars`) that turn gold with the dawn; pull back to the wide 19.4–23 to show them.
- [x] **5 · 07-jerusalem + score** (2026-10-02, in review)
  J6 (06 → 07, t0 22; 06 now 26 s): the dawn band goes out as the camera rises toward the rose (`sunI` → 0, `roseI` → .1);
  blackout u .36–.53; out of the dark the rose's centre sparks (07 frame 0: centre lit, petals at .08) — Genesis reversed.
  07: rose ECU; petals light clockwise from the top (.6–3.4); the 36-jewel ring is re-set as the 12 foundation stones
  (`GX.JEWELS`, 3 segments each, from the top, 3.8–7.2, a flare `pts` on each; `drawRose` got a `col(q, k)` hook);
  long pull back and down to the city (7–13.4); no sun until the first gate lights, then the shadowless white `glory`
  light (`raysK` 0, `haze` .08, `sz` 1.3); each lancet's matting lifts from its pearl gate outward (8 steps, 9.4 + .8 k),
  with a gate `pts` flare; widest at 17 (floor colour, LVX · MVNDI `gild` .3); fade 20–22.5.
  Score (`audio/score.mjs`, OT chapter scores removed — they stay in ../bible-story): 01 lullaby (open D, the star's glass
  is the melody, D major at the kindling) · 02 harp river, D major swell at the opening, the recorder descends with
  the dove, G–A–D · 03 thin D minor, D major note by note in his hand, the Genesis line in D major when he sees · 04
  chorale Bb–F–Gm, stops for the bread, A → D at the cup · 05 D minor lament, bass D–C–Bb–A as the light fails, the
  recorder stops at "gave up the ghost", silence 13–16.4, a bare fifth after the veil · 06 grief, silence before the
  stone, A pedal under the roll, D major at the light, the Genesis line at "Mary" · 07 harp per petal, a chord per
  gate (D · G/D · A/D · D), the Genesis line whole (Dorian, over F · Gm · A) resolving to D major on the widest.
  Joints ring 1.2 s and land in the next chapter's key. 07's stone glass notes D5…A6 (one per stone).
- [ ] **6 · Deliver**: joint review, cards, newcomer review → captions, compile, check, srt, poster, GitHub

## Notes
- `GX.joint` needs `this.J` (it reads `J.next`): a chapter without its joint yet (the sprint's last) returns `st`.
- A glass piece moving between lancets (the star): draw it in both lancets at the same world position; each lancet
  clips it, so it passes behind the mullion. Keep the crossing short (≈ .8 s), it vanishes there.
- White on white disappears: the dove on the ray needs a gold ray and a dove scaled 1.7 (wider than the ray).
- `clips/ot-genesis.js` has no joint (`uses` without `02-eden`; `GX.joint` returns the state as is when the next
  clip isn't loaded). `08-end.js` still holds the OT content (rewrite in Sprint 6).
- NT cast (`sg/figure.js` CAST): jesus, jesusRisen (gold mantle, cross-staff), mary (blue veil = `head: 'cloth'`,
  `band: false`), joseph, john, blind, peter, magdalene, disciple. New options: `halo: 'cross'|'plain'` (drawn first,
  behind the head), `lock: false` (no front hair lock; men with long hair), items `crossStaff`, `cup`, `bread`.
  New poses: bless, holdStaff, blessStaff, handsPray, bow, breakBread, touchEyes, blindStand, kneelWash, kneelSee,
  kneelLook; face `blind` (`EXPR.blind`, lids shut).
- A staff stands upright when the forearm angle plus `wF` is about 0: from `stand` use `wF` 78° (`holdStaff`);
  FPOSE.stand's `wF` 0 holds it horizontal.
- Frontal painters (not the profile rig), on E: `drawChild(P, base, id, o)` (swaddled, head right, cross halo) and
  `drawCrucified(P, base, id, { thief })` (origin = foot of the upright, ≈ 330 tall). New GX props: bigStar, stable,
  manger, table, loaf (broken 0..1), cup, veil, tomb (roll, glow), city (+ `GX.JEWELS`).
- Painters that set a transform (figures, drawChild, drawCrucified) leave it set: reset to the pane base before the next
  world-unit painter (board.js `fig` does it).
- An unlit pane in a lit window (03 blind man): heavy dark matting over the pane (`board.dim`), since the band lights
  whole lancets.
- 07 light (no sun, Rev 21:23): `glory` in board.js — a white band `sunI` 1.6, `sz` 1.3 (long floor patch), `raysK` 0 and
  `haze` .08 so there are no shafts in the air, only colour on the floor; window glow `pts` at y 150, 1.8.
- A glow `pts` on noon-lit glass is invisible: give a light in a hand a glass body too (03: white `bigStar` in the palm).
- A band swept off the window must finish before the blackout starts (J3 v1 blacked out mid-sweep and hid it):
  sweep u .02–.42, blackout .38–.47.
- Unlit-pane reveal: `03-light.js` `dim()` = matting over `lancetPath` minus a ragged polygon (evenodd), radius stepped.
- `GX.tear(E, cx, seed)` is cached geometry: 05 (rent) and 06 (scars) call it with the same cx/seed (LX[0], 9350) so
  the scars are the very tear. Gold over lead: `P.lead` paints over `P.g`, so the gold stroke must be wider (9) than the
  lead (thinned to 2) or it never shows.
- `GX.mixState` needs `cam` on both states (camMix), even when the clip sets `st.cam` afterwards.
- A log-zoom push from .5 to 1.8 over 3 s reads as a jump in the middle: add an intermediate key (06: 2.4 → 4.6 → 6.8).
- `board.js` sets `window.BOARD` (the runtime resets `window.CLIP` to the main clip after loading `uses`), so a dev
  clip can `uses: ['_glass', 'board']` and call `window.BOARD.shot(id, E)` (sf.js does).
- `drawRose(P, { lit, col })`: `q.ring` marks the 36 ring segments (`q.id − 5100` = k, top = k 27), `q.petal` the
  petal (top = 9), `q.petal < 0` the centre. Recolour with `col`, dim with `lit`.
- Drafts without 08-end: concat `out/00…07` with ffmpeg and cut `audio/build/film.wav` to that length (compile.mjs needs
  every `NN-*` render, and 08-end is still the OT card).
