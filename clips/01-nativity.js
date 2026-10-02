// 01 · 降生 Nativity — night; the window comes out of the dark full of pinhole stars, one of them (the star of
// Bethlehem) already moving. The camera closes on it in lancet I and follows it across the mullion into lancet II,
// where it stops over the stable; then the camera sinks and pushes to the manger as the child kindles from within
// (a warm `pts`), lighting Mary's face, while the moon band dims: the light is now inside the glass.
// Beats (TREATMENT §4), one continuous camera: 01-1 wide, stillness · 01-2 follow the star · 01-3 the stable.
window.CLIP = {
  id: '01-nativity',
  uses: ['_glass', '02-baptism'],
  duration: 21,
  timing: { fadeIn: [0, 1.4], fade: [21, 21] },   // in from black after the opening card; out = the joint J1
  caps: [
    [1.4, 5.6, 'And the light shineth in darkness; and the darkness comprehended it not.', '光照在黑暗裡，黑暗卻不接受光。'],
    [6.4, 11.0, 'The star went before them, till it came and stood over where the young child was.', '那星在他們前頭行，直行到小孩子的地方，就在上頭停住了。'],
    [12.6, 17.6, 'For unto you is born this day a Saviour, which is Christ the Lord.', '因今天為你們生了救主，就是主基督。'],
    [18.4, 20.8, 'The Second Window · The Baptism', '第二扇窗 · 受洗'],   // the next chapter's name, while its glass comes (J1)
  ],
  // J1 · the star → the dawn: the camera leaves the manger and rises to the star, which flares until the window
  // whites out (the glass changes under the glare); the glare settles into the cold dawn over the Jordan and the
  // camera pulls back to 02's opening wide
  J: { next: '02-baptism', t0: 17.6,
    A(E, a, b, u) {
      const { ss, seg, lerp, LX } = E, GX = window.GX, S = [LX[1] + 40, 70], C = [S[0], 150, 1.45];
      const o = GX.mixState(a, b, ss(seg(u, .45, .9)), () => u >= .56);
      o.cam = u < .5 ? GX.camMix(a.cam, C, ss(seg(u, 0, .5))) : GX.camMix(C, b.cam, ss(seg(u, .6, 1)));
      const g = ss(seg(u, .15, .5)), off = ss(seg(u, .56, .85));   // the star swells and whitens, then gives way to the dawn
      o.pts = [[S[0], S[1], lerp(80, 420, g), lerp(1.8, 5, g) * (1 - off), [1, .97, .9]], ...o.pts].slice(0, 4);
      o.expo = 1 + 4 * Math.pow(Math.sin(Math.PI * seg(u, .36, .76)), 3);
      return o;
    } },
  T: { go: 3.2, stop: 11.2, kindle: 12.0, full: 14.5 },
  CHILD: [0, 510],   // the child's glow (world, x relative to LX[1]); the manger at LX[1] + 60, 604
  // the star's path (world): high in lancet I → over the mullion → above the stable roof in lancet II
  path(E, t) {
    const { LX, key } = E, T = this.T;   // it drifts in lancet I, crosses the mullion quickly, settles in lancet II
    return key(t, [[T.go, [LX[0] - 30, -170, 78]], [6.9, [LX[0] + 20, -70, 66]], [7.7, [LX[1] - 90, -30, 58]], [T.stop, [LX[1] + 40, 70, 42]]]);
  },

  panes(E, t) {
    const { COL, step, seg, ss, LX, hills } = E, GX = window.GX, T = this.T, s = step(t);
    const glass = GX.glass(E, 'nativity'), [sx, sy, sr] = this.path(E, s);
    const kin = ss(seg(s, T.kindle, T.full));
    const stars = (P, cx, id) => {   // pinholes, a few twinkling (white ↔ gold) in held steps
      const r = E.mulberry(id);
      for (let k = 0; k < 20; k++) {
        const x = cx - 120 + r() * 240, y = -260 + r() * 640, rr = 4 + r() * 7;
        if (Math.hypot(x - sx, y - sy) < sr + 14) continue;   // clear of the big star
        GX.star(E, P, x, y, rr, id + 1 + k, Math.sin(s * 2.7 + k * 1.9 + id) > .8 ? COL.gold2 : COL.white);
      }
    };
    return [0, 1, 2, 3].map((k) => ({ glass, content: (P, cx, b) => {
      stars(P, cx, 8000 + k * 40);
      hills(P, cx, 560, [{ y: 0, a: 10, ph: k, c: COL.purple2 }], 8200 + k);
      if (k === 1) {
        GX.stable(E, P, cx, 8310);
        GX.fig(E, P, cx, b, 'mary', 'pray', -80, .62); P.setTransform(b);
        GX.manger(E, P, cx + 60, 604, .9, 8330); E.drawChild(P, b.translate(cx + 60, 604 - 94), 8340); P.setTransform(b);
      }
      if (k === 2) { GX.fig(E, P, cx, b, 'joseph', 'holdStaff', -30, .72, true); P.setTransform(b); }
      if (k <= 1) GX.bigStar(E, P, sx, sy, sr, 8300, kin > .5 ? COL.white : COL.gold2);   // drawn in both: it crosses the mullion
    } }));
  },

  state(t, E) {
    const { key, seg, ss, lerp, LX } = E, T = this.T, GX = window.GX;
    const [sx, sy] = this.path(E, E.step(t)), kin = ss(seg(t, T.kindle, T.full));
    // one camera: the wide holds → closes on the star in lancet I → follows it right → sinks and pushes to the manger
    const cam = key(t, [[0, [0, 300, .5]], [T.go, [0, 300, .5]], [6.2, [LX[0] + 40, 120, .95]], [T.stop, [LX[1] + 30, 170, 1.0]],
      [16.5, [LX[1] + 40, 450, 1.6]], [21, [LX[1] + 50, 460, 1.72]]]);
    const st = GX.light(E, 'night', { cam, sunI: key(t, [[0, 1.0], [T.kindle, 1.0], [T.full, .7]]), skyI: .1,
      roseI: key(t, [[0, .15], [T.full, .08]]), bloom: .6 });
    st.lancets = this.panes(E, t); st.time = t;
    // the star's glow travels with it; the child's warm light kindles under it and lights Mary's face
    const [cx, cy] = this.CHILD, pulse = 1 + .08 * Math.sin(t * 2.2);
    st.pts = [[sx, sy, lerp(170, 80, ss(seg(t, T.go, T.stop))), lerp(4.2, 1.8, kin), [1, .97, .9]]];
    if (kin > 0) st.pts.push([LX[1] + cx + 60, cy, 30 + 90 * kin, 3.1 * kin * pulse, [1, .8, .5]], [LX[1] - 30, 470, 70, 1.6 * kin, [1, .75, .45]]);
    return GX.joint(E, this, st, t);
  },
};
// sound: night air; a high glass note as the star sets off and as it stops; a low bell when the child kindles
window.CLIP.sfx = [
  [0.2, 'air', { d: 3.4, v: .45 }], [window.CLIP.T.go, 'glass', { m: 93, v: .4 }],
  ...[0, 1, 2, 3, 4].map((k) => [5 + k * 1.2, 'glass', { m: [86, 88, 90, 91, 93][k], v: .22 }]),
  [window.CLIP.T.stop, 'glass', { m: 98, v: .5 }], [window.CLIP.T.kindle, 'bell', { m: 50, v: .7 }], [window.CLIP.T.kindle + .2, 'air', { d: 3.0, v: .5 }],
];
(window.CLIPS ||= {})[window.CLIP.id] = window.CLIP;   // chapter joints: the previous chapter's tail reads this one
