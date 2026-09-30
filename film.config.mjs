// Kit config for this film (see ../_kit/README.md). Style: cg-lab (three.js, ../_kit/styles/cg-lab/STYLE.md).
export default {
  title: '光之窗 · 新約 · The New Covenant',
  style: 'stained-glass',
  clipDir: 'clips', global: 'CLIP', param: 'clip', fallback: '00-title',
  film: 'out/bible-nt.mp4',
  fps: 24,
  blackGround: true,   // fades go to black: check.mjs reports black segments without failing
  soundtrack: 'film',   // one film-long score (audio/music.mjs → audio/build/film.wav)
  // .srt export: every caption of every clip
  subtitles: (A) => (A.caps || []).map(([a, b, en, zh]) => [a, b, `${en}\n${zh}`]),
  narration: null,
};
