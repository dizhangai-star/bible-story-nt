// 04 · 最後的晚餐 The Last Supper — dusk; the long table across lancets II–III, Jesus and the disciples, an amber band
// sinking. The camera pushes to the bread in Jesus' hands: it parts along its lead (a clean, willed break); then it
// pans along the table to the cup, which kindles ruby from within while the dusk band dies away: the light is now in
// the cup. Beats (TREATMENT §4), one continuous camera: 04-1 the table · 04-2 the bread · 04-3 the cup.
window.CLIP = {
  id: '04-supper',
  uses: ['_glass'],
  duration: 22,
  timing: { fadeIn: [-1, 0], fade: [22, 22] },   // J3 brings the picture in; J4 (→ 05) comes with 05 in Sprint 4
  caps: [
    [0.8, 4.8, 'And when the hour was come, he sat down, and the twelve apostles with him.', '時候到了，耶穌坐席，使徒也和他同坐。'],
    [6.0, 10.6, 'And he took bread, and brake it, saying, This is my body which is given for you.', '又拿起餅來，擘開，說：這是我的身體，為你們捨的。'],
    [12.4, 17.6, 'This cup is the new testament in my blood, which is shed for you.', '這杯是用我血所立的新約，是為你們流出來的。'],
    [18.6, 21.6, 'The Fifth Window · The Cross', '第五扇窗 · 十字架'],   // the next chapter's name (J4)
  ],
  T: { brk: 7.4, broken: 9.0, cup: 12.4, kindled: 15.6, out: 17.4 },
  BREAD: [78, 420],  // the loaf in Jesus' hands (world, x relative to LX[1])
  CUP: [-60, 480],   // the cup's foot (x relative to LX[2]); the wine 64 above

  panes(E, t) {
    const { COL, step, seg, ss, LX, roundel, hills } = E, GX = window.GX, T = this.T, s = step(t);
    const glass = GX.glass(E, 'supper'), brk = ss(seg(s, T.brk, T.broken)), [bx, by] = this.BREAD, [ux, uy] = this.CUP;
    const green = { ...E.CAST.disciple, torso: COL.green2, skirt: COL.green2, sleeve: COL.green2, mantle: COL.ruby, id: 1450 };
    return [0, 1, 2, 3].map((k) => ({ glass, content: (P, cx, b) => {
      roundel(P, cx, -150, 78, k % 3 ? COL.ruby : COL.purple, 9000 + k * 30);
      if (k === 0 || k === 3) { hills(P, cx, 520, [{ y: 0, a: 10, ph: k, c: COL.brown }], 9100 + k); GX.star(E, P, cx, 150, 14, 9110 + k); }
      if (k === 1) { GX.fig(E, P, cx, b, 'disciple', 'handsPray', -100, .7); P.setTransform(b); GX.fig(E, P, cx, b, 'jesus', 'breakBread', 0, .78); P.setTransform(b); }
      if (k === 2) { GX.fig(E, P, cx, b, 'peter', 'bow', -30, .76, true); P.setTransform(b); GX.fig(E, P, cx, b, green, 'stand', 80, .7, true); P.setTransform(b); }
      if (k === 1 || k === 2) { GX.table(E, P, LX[1] - 150, LX[2] + 150, 480, 9200);
        if (k === 2) GX.cup(E, P, cx + ux, uy, 1, 9230); }
      if (k === 1) GX.loaf(E, P, cx + bx, by, 1.1, 9220, brk);   // held over the table
    } }));
  },

  state(t, E) {
    const { key, seg, ss, LX } = E, T = this.T, GX = window.GX;
    // one camera: the table holds → slow push to the bread → pans along the table to the cup and holds
    const [bx] = this.BREAD, [ux, uy] = this.CUP;
    const cam = key(t, [[0, [0, 400, 1.2]], [4.0, [0, 405, 1.25]], [7.2, [LX[1] + bx - 30, 420, 2.8]], [10.6, [LX[1] + bx - 25, 418, 3.0]],
      [T.cup, [LX[2] + ux, 432, 3.0]], [22, [LX[2] + ux, 428, 3.25]]]);
    // the amber band sinks (lower, longer, weaker) and leaves as the cup kindles
    const st = GX.light(E, 'dusk', { cam, sunI: key(t, [[0, 2.6], [T.cup, 2.2], [T.out, .7], [22, .6]]), sz: key(t, [[0, 2.1], [T.out, 2.8]]),
      roseI: key(t, [[0, .8], [T.out, .3]]), skyI: key(t, [[0, .1], [T.out, .07]]) });
    st.lancets = this.panes(E, t); st.time = t;
    // the cup's ruby light, from within, slowly pulsing; a faint warm light on the broken bread
    const [, by] = this.BREAD, c = ss(seg(t, T.cup, T.kindled)), br = ss(seg(t, T.brk, T.broken));
    st.pts = [];
    if (c > 0) st.pts.push([LX[2] + ux, uy - 66, 30 + 80 * c, 3.6 * c * (1 + .07 * Math.sin(t * 2)), [1, .35, .3]]);
    if (br > 0) st.pts.push([LX[1] + bx, by - 10, 50, 1.4 * br * (1 - c), [1, .8, .5]]);
    return st;   // Sprint 4: GX.joint(E, this, st, t) with J4 → 05-cross
  },
};
// sound: dusk air; a soft clean crack as the bread parts; a low bell and a rising glass line as the cup kindles
window.CLIP.sfx = [
  [0.3, 'air', { d: 3.8, v: .45 }], [window.CLIP.T.brk + .2, 'crack', { v: .5, snap: .3 }],
  [window.CLIP.T.cup, 'bell', { m: 45, v: .7 }],
  ...[0, 1, 2, 3].map((k) => [window.CLIP.T.cup + .6 + k * .7, 'glass', { m: [81, 83, 86, 88][k], v: .3 }]),
  [18.6, 'air', { d: 2.4, v: .35 }],
];
(window.CLIPS ||= {})[window.CLIP.id] = window.CLIP;   // chapter joints: the previous chapter's tail reads this one
