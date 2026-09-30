# 光之窗 · 新約 · The New Covenant: Progress

**Resume here:** read this file (and `TREATMENT.md`), then continue from **Next step**.
Sequel to `../bible-story` (the Old Testament, finished 2026-09-30). Everything in its PROGRESS.md "How it works" and
"Notes" applies here too (same engine, `sg/`, `clips/_glass.js`); read those sections there instead of re-learning.

## Next step
**Sprint 1 — cast sheet v1 + storyboard v1 waiting for the user's review** (`docs/castsheet.png`,
`docs/storyboard.png`). After sign-off: push to https://github.com/dizhangai-star/bible-story-nt.git (remote `origin`
set), then Sprint 2 (01-nativity, 02-baptism), starting each chapter from its board shots in `clips/board.js`.
Open items from the board: 07 has colour but no floor patch (the floor light comes from the sun band; with `sunI` 0
there is none — 07 may need a floor patch from `pts` or a very soft white band); the 01 star is small at the wide.

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
- Carried over from the OT film (locked there): 16:9 1920×1080, 24 fps, figures step at 8 fps; 繁體中文 (和合本) above,
  English (KJV) below, no narration; Cinzel / IM Fell English / Noto Serif TC; music in code (organ, recorder, harp,
  D Dorian, 80 BPM) + glass foley; one window and one glass per chapter; continuous camera inside a chapter; glass swaps
  fully hidden (`GX.blackout`); breaks are shards; no fades between chapters (in at 01, out at 07); night chapters
  keep a dim band; ≤ 4 `pts`; `gild` ≤ .15 in daylight; seeded `R(seed)` only.

## Sprints
Numbered from 0 in this repo (the OT film's Sprints 0–6 are in `../bible-story`).
- [x] **0 · Scaffold** — `bible-nt/` from bible-story's engine; LVX · MVNDI; 00-title text (2026-09-30)
- [ ] **1 · Brief + cast + storyboard**: TREATMENT · cast sheet v1 · glass keys · board v1 — drafted 2026-09-30, in review
  (style frames: the board thumbnails serve; `sf.js` still holds the OT frames)
- [ ] **2 · 01-nativity, 02-baptism**
- [ ] **3 · 03-light, 04-supper**
- [ ] **4 · 05-cross, 06-resurrection**
- [ ] **5 · 07-jerusalem + score**
- [ ] **6 · Deliver**: joints, cards, newcomer review → captions, compile, check, srt, poster, GitHub

## Notes
- `clips/ot-genesis.js` has no joint (`uses` without `02-eden`; `GX.joint` returns the state as is when the next
  clip isn't loaded). `sf.js` and `08-end.js` still hold the OT content (rewrite in Sprint 6).
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
