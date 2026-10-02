// 03 · 世界的光 Light of the World — full noon: every pane lit but one, lancet III, where the man born blind stands
// under heavy matting. The camera pushes to II–III: Jesus reaches across the mullion to his eyes and light gathers in
// his hand; then it tilts down to the pool of Siloam (IV), where the man kneels and washes, and back up to III, whose
// matting lifts from his eyes outward, piece by piece, until his pane is as bright as the rest.
// Beats (TREATMENT §4), one continuous camera: 03-1 the dim pane · 03-2 the touch · 03-3 Siloam, he sees.
window.CLIP = {
  id: '03-light',
  uses: ['_glass', '04-supper'],
  duration: 22,
  timing: { fadeIn: [-1, 0], fade: [22, 22] },   // J2 brings the picture in, J3 hands it on
  caps: [
    [0.8, 4.6, 'And as Jesus passed by, he saw a man which was blind from his birth.', '耶穌過去的時候，看見一個人生來是瞎眼的。'],
    [5.4, 9.6, 'As long as I am in the world, I am the light of the world.', '我在世上的時候，是世上的光。'],
    [10.4, 13.8, 'Go, wash in the pool of Siloam.', '你往西羅亞池子裡去洗。'],
    [14.6, 18.6, 'He went his way therefore, and washed, and came seeing.', '他去一洗，回頭就看見了。'],
    [19.4, 21.8, 'The Fourth Window · The Last Supper', '第四扇窗 · 最後的晚餐'],   // the next chapter's name (J3)
  ],
  // J3 · noon → dusk: the noon band slides off to the right (the window goes dark from the left, the day passing) as
  // the camera pulls back; in the dark the glass changes; the amber dusk band comes in from the left onto the table
  J: { next: '04-supper', t0: 18.8,
    A(E, a, b, u) {
      const { ss, seg, lerp } = E, GX = window.GX, M = [0, 330, .6];
      const pre = u < .5, o = pre ? { ...a } : { ...b };
      if (pre) { const g = seg(u, .02, .42); o.sunU = lerp(a.sunU, 1300, g); o.bandW = lerp(a.bandW, 600, g); }
      else { const g = ss(seg(u, .54, 1)); o.sunU = lerp(-1300, b.sunU, g); o.bandW = lerp(600, b.bandW, g); }
      o.cam = pre ? GX.camMix(a.cam, M, ss(seg(u, 0, .5))) : GX.camMix(M, b.cam, ss(seg(u, .5, 1)));
      return GX.blackout(o, pre ? ss(seg(u, .38, .47)) : 1 - ss(seg(u, .53, .64)));
    } },
  T: { touch: 5.0, glow: 6.0, full: 9.6, go: 10.0, wash: 13.0, see: 14.2, seen: 17.0, look: 15.4 },
  HAND: [94, 333],   // Jesus' hand at the blind man's eyes (world, x relative to LX[1])
  EYES: [-30, 372],  // the blind man's eyes in lancet III (x relative to LX[2])
  POOL: [-40, 470],  // where he washes in lancet IV (x relative to LX[3])

  // heavy matting over a pane, cut away around (x, y) out to r with a ragged edge (the pane lights piece by piece)
  dim(E, P, cx, k, x, y, r, id) {
    const p = new Path2D(); p.addPath(E.lancetPath(cx));
    if (r > 0) { const R = E.mulberry(id), n = 16;
      for (let j = 0; j < n; j++) { const a = j / n * Math.PI * 2, rr = r * (.78 + .44 * R()); p[j ? 'lineTo' : 'moveTo'](x + rr * Math.cos(a), y + rr * Math.sin(a)); }
      p.closePath(); }
    P.g.save(); P.g.fillStyle = `rgba(6,6,14,${k})`; P.g.fill(p, 'evenodd'); P.g.restore();
  },

  panes(E, t) {
    const { COL, step, seg, ss, LX, roundel, hills, tree } = E, GX = window.GX, T = this.T, s = step(t);
    const glass = GX.glass(E, 'light');
    const touch = ss(seg(s, T.touch, T.glow)), wash = ss(seg(s, T.wash, T.wash + 1)), look = ss(seg(s, T.look, T.look + 1));
    const glow = ss(seg(s, T.glow, T.full)) * (1 - ss(seg(s, T.go, T.go + 1.4)));
    // the matting lifts in 8 held steps from his eyes outward; each step a new ragged edge
    const n = Math.floor(8 * seg(s, T.see, T.seen) + 1e-6), [ex, ey] = this.EYES;
    return [0, 1, 2, 3].map((k) => ({ glass, content: (P, cx, b) => {
      roundel(P, cx, -150, 78, COL.sky, 8700 + k * 30);
      if (k !== 3) hills(P, cx, 540, [{ y: 0, a: 10, ph: k, c: COL.gold }, { y: 40, a: 8, ph: 3, c: COL.brown }], 8800 + k);
      if (k === 0) tree(P, cx, 540, 1.3, 8810);
      if (k === 1) { GX.fig(E, P, cx, b, 'jesus', ['bless', 'touchEyes', touch], 10, .78); P.setTransform(b);
        if (glow > 0) GX.bigStar(E, P, cx + this.HAND[0], this.HAND[1], 8 + 24 * glow, 8840, COL.white); }   // the light in his hand
      if (k === 2) { GX.fig(E, P, cx, b, 'blind', ['blindStand', 'lookUp', look], -10, .78, true); P.setTransform(b);
        if (n < 8) this.dim(E, P, cx, .78, cx + ex, ey, n ? 60 + n * 85 : 0, 8850 + n); }
      if (k === 3) { GX.waves(E, P, cx, 500, 1 + t * .6, 8900); GX.fig(E, P, cx, b, 'blind', ['kneelWash', 'kneelSee', wash], -30, .7); P.setTransform(b); }
    } }));
  },

  state(t, E) {
    const { key, seg, ss, lerp, LX } = E, T = this.T, GX = window.GX;
    // one camera: the wide holds on the dim pane → pushes to the touch (II–III) → tilts down to the pool (IV) → rises
    // and pulls back to III as it lights
    const mid = (LX[2] + LX[3]) / 2;
    const cam = key(t, [[0, [0, 300, .5]], [3.8, [0, 300, .5]], [6.4, [0, 390, 1.6]], [T.go, [20, 385, 1.7]],
      [12.2, [LX[3] - 40, 470, 1.7]], [T.see, [LX[3] - 50, 450, 1.75]], [16.6, [mid, 350, 1.25]], [22, [mid, 345, 1.32]]]);
    const st = GX.light(E, 'noon', { cam });
    st.lancets = this.panes(E, t); st.time = t;
    // light gathers in his hand; a white flare in the water as he washes; light at the man's eyes as his pane lights
    const [hx, hy] = this.HAND, [ex, ey] = this.EYES, [px, py] = this.POOL, white = [1, .97, .9];
    const g = ss(seg(t, T.glow, T.full)) * (1 - ss(seg(t, T.go, T.go + 1.4))), w = seg(t, T.wash, T.wash + 1.4), e = seg(t, T.see, T.seen + 1.2);
    st.pts = [];
    if (g > 0) st.pts.push([LX[1] + hx, hy, 30 + 70 * g, 3.4 * g * (1 + .08 * Math.sin(t * 2.4)), white]);
    if (w > 0 && w < 1) st.pts.push([LX[3] + px, py, 40 + 90 * w, 3 * Math.sin(Math.PI * w), white]);
    if (e > 0 && e < 1) st.pts.push([LX[2] + ex, ey, 40 + 260 * e, 2.6 * Math.sin(Math.PI * e), white]);
    return GX.joint(E, this, st, t);
  },
};
// sound: noon air; a glass note at the touch and a rising shimmer as the light gathers; water air as he washes; eight
// rising glass notes as his pane lights piece by piece; a bell at "came seeing"
window.CLIP.sfx = [
  [0.3, 'air', { d: 3.6, v: .5 }], [window.CLIP.T.glow, 'glass', { m: 86, v: .4 }],
  ...[0, 1, 2].map((k) => [7 + k * .9, 'glass', { m: [90, 93, 95][k], v: .22 }]),
  [window.CLIP.T.wash, 'air', { d: 1.4, v: .55 }],
  ...[0, 1, 2, 3, 4, 5, 6, 7].map((k) => [window.CLIP.T.see + (k + 1) * 2.8 / 8, 'glass', { m: [74, 76, 78, 79, 81, 83, 85, 86][k], v: .4 }]),
  [window.CLIP.T.seen, 'bell', { m: 50, v: .7 }], [19.2, 'air', { d: 2.0, v: .4 }],
];
(window.CLIPS ||= {})[window.CLIP.id] = window.CLIP;   // chapter joints: the previous chapter's tail reads this one
