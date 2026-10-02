// 07 · 新耶路撒冷 The New Jerusalem — no sun, no band from outside. The rose's centre is already alight (J6, Genesis
// reversed); its petals light clockwise from the top, then its ring of 36 jewels is set again as the twelve
// foundation stones (Rev 21:19–20), one stone at a time. The camera pulls back and down to the holy city across the
// four lancets: each pane lights from its pearl gate outward (the matting lifts, as in 03 and 06), a light with no
// shafts in the air, only colour on the floor. Widest: the whole window, LVX · MVNDI gilded; the film fades out.
// Beats (TREATMENT §4), one continuous camera: 07-1 the rose · 07-2 the city · 07-3 the window and the floor.
window.CLIP = {
  id: '07-jerusalem',
  uses: ['_glass'],
  duration: 22.5,
  timing: { fadeIn: [-1, 0], fade: [20, 22.5] },   // J6 brings the picture in; the film fades out here
  caps: [
    [0.8, 4.8, 'And he that sat upon the throne said, Behold, I make all things new.', '坐寶座的說：看哪，我將一切都更新了！'],
    [8.6, 13.4, 'And the city had no need of the sun, neither of the moon, to shine in it: for the glory of God did lighten it.', '那城內又不用日月光照，因有神的榮耀光照。'],
    [14.2, 19.4, 'And there shall be no night there; and they need no candle, neither light of the sun; for the Lord God giveth them light.', '不再有黑夜；他們也不用燈光、日光，因為主神要光照他們。'],
  ],
  T: { petals: .6, petalsD: 2.8, stones: 3.8, stonesD: 3.4, pull: 7.0, city: 9.4, cityStep: .8, cityD: 1.6, wide: 17.0 },
  STEP: 8,   // a pane lights in 8 ragged steps

  // the pearl gate of lancet k (where its light starts)
  gate(E, k) { return [E.LX[k], 330 + (k % 2) * 40 + 80]; },
  cityAt(k) { return this.T.city + k * this.T.cityStep; },

  // heavy matting over a pane, cut away around (x, y) out to r with a ragged edge (as 03-light's dim)
  dim(E, P, cx, k, x, y, r, id) {
    const p = new Path2D(); p.addPath(E.lancetPath(cx));
    if (r > 0) { const R = E.mulberry(id), n = 16;
      for (let j = 0; j < n; j++) { const a = j / n * Math.PI * 2, rr = r * (.78 + .44 * R()); p[j ? 'lineTo' : 'moveTo'](x + rr * Math.cos(a), y + rr * Math.sin(a)); }
      p.closePath(); }
    P.g.save(); P.g.fillStyle = `rgba(6,6,14,${k})`; P.g.fill(p, 'evenodd'); P.g.restore();
  },

  panes(E, t) {
    const { COL, roundel, seg } = E, GX = window.GX, glass = GX.glass(E, 'jerusalem'), N = this.STEP;
    return [0, 1, 2, 3].map((k) => ({ glass, content: (P, cx) => {
      roundel(P, cx, -150, 78, COL.gold, 9900 + k * 30);
      GX.bigStar(E, P, cx, -150, 40, 9920 + k * 30, COL.white);
      GX.city(E, P, cx, 10000 + k * 40, 330 + (k % 2) * 40);
      const a = this.cityAt(k), n = Math.floor(N * seg(t, a, a + this.T.cityD) + 1e-6), [gx, gy] = this.gate(E, k);
      if (n < N) this.dim(E, P, cx, .9, gx, gy, n ? 60 + n * 130 : 0, 10090 + k * 10 + n);
    } }));
  },

  // the rose: petals light clockwise from the top (petal 9 is at the top); the ring's 36 jewels become 12 stones,
  // three segments each, from the top clockwise, each set in its foundation colour (GX.JEWELS) with a flare
  rose(E, t) {
    const { seg } = E, T = this.T, J = window.GX.JEWELS;
    const petal = (i) => ((i - 9) % 12 + 12) % 12, stone = (k) => Math.floor(((k - 27) % 36 + 36) % 36 / 3);
    const pOn = (i) => t >= T.petals + petal(i) * T.petalsD / 12, sOn = (j) => t >= T.stones + j * T.stonesD / 12;
    const sAge = (j) => seg(t, T.stones + j * T.stonesD / 12, T.stones + j * T.stonesD / 12 + .5);
    return {
      col: (q) => q.ring && sOn(stone(q.id - 5100)) ? J[stone(q.id - 5100)] : q.c,
      lit: (q) => q.petal < 0 ? 1 : q.ring ? (sOn(stone(q.id - 5100)) ? .85 + .15 * (1 - sAge(stone(q.id - 5100))) : .1) : pOn(q.petal) ? 1 : .08,
    };
  },

  state(t, E) {
    const { key, seg, ss, lerp, LX, ROSE } = E, T = this.T, GX = window.GX;
    // one camera: the rose ECU, nearly still while it lights → a long pull back and down to the city → the widest
    const cam = key(t, [[0, [0, ROSE.y, 2.6]], [T.pull, [0, ROSE.y + 8, 2.4]], [9.6, [0, -80, 1.15]], [12, [0, 270, .82]], [13.4, [0, 282, .78]],
      [T.wide, [0, 300, .5]], [22.5, [0, 302, .48]]]);
    // no sun (Rev 21:23): the white light comes up only as the first gate lights; shadowless, no shafts, a long floor patch
    const g = ss(seg(t, this.cityAt(0) - .8, this.cityAt(0) + .8)), w = ss(seg(t, 13.4, T.wide));
    const st = GX.light(E, 'noon', { cam, sunI: 1.6 * g, sunCol: [1, .97, .9], sx: 0, sz: 1.3, raysK: 0, haze: lerp(.2, .08, g),
      roseI: lerp(2.2, 1.8, g), roseCol: [1, .95, .85], skyI: lerp(.04, .3, g), amb: lerp(.04, .075, g), gild: lerp(.08, .3, w), time: t });
    st.rose = this.rose(E, t);
    st.lancets = this.panes(E, t);
    st.pts = [];
    // each gate's light: a flare as its pane opens, then a steady glow from within
    for (let k = 0; k < 4; k++) { const r = seg(t, this.cityAt(k), this.cityAt(k) + T.cityD + .4); if (r <= 0) continue;
      const [gx, gy] = this.gate(E, k); st.pts.push([gx, lerp(gy, 150, ss(r)), 60 + 110 * r, 1.8 * r + 1.4 * Math.sin(Math.PI * r), [1, .97, .9]]); }
    // while the stones are set (no lancet light yet): a flare on the stone being set
    const j = Math.floor(seg(t, T.stones, T.stones + T.stonesD) * 12);
    if (!st.pts.length && t >= T.stones && j < 12) { const a = ((27 + 3 * j + 1.5) / 36) * Math.PI * 2, u = (t - T.stones - j * T.stonesD / 12) / (T.stonesD / 12);
      st.pts.push([ROSE.x + Math.cos(a) * ROSE.r * .89, ROSE.y + Math.sin(a) * ROSE.r * .89, 36, 1.6 * (1 - u), [1, .95, .85]]); }
    return st;
  },
};
// sound: the rose's petals on a rising air; twelve glass notes, one per stone (D Dorian, rising from D5); a bell at each gate;
// the long held air of the wide
window.CLIP.sfx = [
  [window.CLIP.T.petals, 'air', { d: 3.2, v: .35 }],
  ...Array.from({ length: 12 }, (_, j) => [window.CLIP.T.stones + j * window.CLIP.T.stonesD / 12, 'glass', { m: [74, 76, 77, 79, 81, 83, 84, 86, 88, 89, 91, 93][j], v: .3 }]),
  ...[0, 1, 2, 3].map((k) => [window.CLIP.cityAt(k), 'bell', { m: [50, 57, 62, 69][k], v: .5 }]),
  [13.4, 'air', { d: 6, v: .35 }],
];
(window.CLIPS ||= {})[window.CLIP.id] = window.CLIP;   // chapter joints: the previous chapter's tail reads this one
