// Style frames (dev clip, not in the film): the board's key shots at full size, clean (no camera marks), with a caption
// each to test type over the grade. 0–1 s 01-3 Nativity (the child's own light) · 1–2 s 04-3 Supper (the cup) ·
// 2–3 s 07-3 New Jerusalem (no sun; colour on the floor, no shafts). Preview: node preview.mjs sf 0.5 1.5 2.5
const SF = ['01-3', '04-3', '07-3'];
window.CLIP = {
  id: 'sf',
  duration: SF.length,
  uses: ['_glass', 'board'],
  timing: { fadeIn: [-1, -.9], fade: [99, 100] },
  nosub: false,
  caps: [
    [0.05, 0.95, 'For unto you is born this day a Saviour.', '因今天為你們生了救主。'],
    [1.05, 1.95, 'This cup is the new testament in my blood.', '這杯是用我血所立的新約。'],
    [2.05, 2.95, 'And there shall be no night there.', '在那裡不再有黑夜。'],
  ],
  state(t, E) {
    const B = window.BOARD;
    return B.shot(SF[Math.min(SF.length - 1, Math.floor(t))], E);
  },
};
