// Poster (dev clip, not in the film): 07-jerusalem's widest frame, without the banderole.
// node preview.mjs poster 0 --cols 1 --w 1920 → frames/poster-strip.png
window.CLIP = {
  id: 'poster',
  duration: 1,
  uses: ['_glass', '07-jerusalem', '_grab'],
  timing: { fadeIn: [-1, -.9], fade: [99, 100] },
  nosub: true,
  caps: [],
  state(t, E) { const S = window.GRAB; return S.state.call(S, 17.6, E); },
};
