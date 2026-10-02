// 06 · 復活 Resurrection — night in the garden: the tomb with its round stone in lancet II, Mary Magdalene kneeling in
// III; lancet I carries the scars of the rent veil, healed into lead; lancet IV is dark. The camera pushes to the
// stone; a silence; the stone rolls aside along its lead and light comes out of the empty tomb. Dawn comes up over the
// window, the scars catch gold, and lancet IV lights from the risen Christ outward (the matting lifts, as in 03);
// "Mary" — she turns to him. Beats (TREATMENT §4), one continuous camera: 06-1 the tomb · 06-2 the stone · 06-3 the garden.
window.CLIP = {
  id: '06-resurrection',
  uses: ['_glass', '07-jerusalem'],
  duration: 26,
  timing: { fadeIn: [-1, 0], fade: [26, 26] },   // J5 brings the picture in, J6 hands it on
  caps: [
    [0.8, 6.6, 'The first day of the week cometh Mary Magdalene early, when it was yet dark, unto the sepulchre.', '七日的頭一日，清早天還黑的時候，抹大拉的馬利亞來到墳墓那裡。'],
    [8.4, 12.4, 'He is not here: for he is risen, as he said.', '他不在這裡，照他所說的，已經復活了。'],
    [16.0, 21.4, 'Jesus saith unto her, Mary. She turned herself, and saith unto him, Rabboni; which is to say, Master.', '耶穌說：馬利亞！馬利亞就轉過來，對他說：拉波尼！（就是夫子的意思）'],
    [22.4, 25.4, 'The Seventh Window · The New Jerusalem', '第七扇窗 · 新耶路撒冷'],   // the next chapter's name (J6)
  ],
  // J6 · Easter dawn → no sun: the dawn band goes out as the camera rises toward the rose (the last sun of the film);
  // in the dark the glass changes; the rose's centre sparks, the first light of the first window (Genesis reversed)
  J: { next: '07-jerusalem', t0: 22.0,
    A(E, a, b, u) {
      const { ss, seg, lerp, ROSE } = E, GX = window.GX, M = [0, -120, .9];
      const pre = u < .5, o = pre ? { ...a } : { ...b };
      if (pre) { const g = ss(seg(u, 0, .4)); o.sunI = a.sunI * (1 - g); o.skyI = lerp(a.skyI, .04, g); o.roseI = lerp(a.roseI, .1, g); }
      o.cam = pre ? GX.camMix(a.cam, M, ss(seg(u, 0, .5))) : GX.camMix(M, b.cam, ss(seg(u, .5, 1)));
      return GX.blackout(o, pre ? ss(seg(u, .36, .47)) : 1 - ss(seg(u, .53, .66)));
    } },
  T: { roll: 7.0, rolled: 10.0, glow: 8.0, dawn: 11.0, day: 14.6, reveal: 13.2, shown: 15.8, mary: 16.2 },
  HALO: [-14, 352],   // the risen Christ's head in lancet IV (x relative to LX[3])
  DOOR: [-30, 470],   // the tomb door (x relative to LX[1])

  // heavy matting over a pane, cut away around (x, y) out to r with a ragged edge (as 03-light's dim)
  dim(E, P, cx, k, x, y, r, id) {
    const p = new Path2D(); p.addPath(E.lancetPath(cx));
    if (r > 0) { const R = E.mulberry(id), n = 16;
      for (let j = 0; j < n; j++) { const a = j / n * Math.PI * 2, rr = r * (.78 + .44 * R()); p[j ? 'lineTo' : 'moveTo'](x + rr * Math.cos(a), y + rr * Math.sin(a)); }
      p.closePath(); }
    P.g.save(); P.g.fillStyle = `rgba(6,6,14,${k})`; P.g.fill(p, 'evenodd'); P.g.restore();
  },

  panes(E, t) {
    const { COL, step, seg, ss, roundel, tree } = E, GX = window.GX, T = this.T, s = step(t);
    const glass = GX.glass(E, 'tomb'), roll = ss(seg(s, T.roll, T.rolled)), dawn = s >= T.dawn + 1.5;
    const gold = ss(seg(s, T.dawn + 1, T.day)), turn = ss(seg(s, T.mary, T.mary + 1));
    const n = Math.floor(8 * seg(s, T.reveal, T.shown) + 1e-6), [hx, hy] = this.HALO;
    return [0, 1, 2, 3].map((k) => ({ glass, content: (P, cx, b) => {
      roundel(P, cx, -150, 78, dawn ? COL.sky : COL.deepblue, 9700 + k * 30);
      if (k !== 1) { GX.garden(E, P, cx, 9800 + k); tree(P, cx + (k - 1.5) * 40, 530, 1.2, 9810 + k * 3); }
      if (k === 0) GX.scars(E, P, GX.tear(E, cx, 9350), gold);   // 05's veil, healed: the break that shines
      if (k === 1) GX.tomb(E, P, cx, 9850, roll, roll > .3 ? 1 : 0);
      if (k === 2) { GX.fig(E, P, cx, b, 'magdalene', ['kneelLook', 'kneelSee', turn], 0, .74); P.setTransform(b); }
      if (k === 3) { GX.fig(E, P, cx, b, 'jesusRisen', 'blessStaff', -10, .76, true); P.setTransform(b);
        if (n < 8) this.dim(E, P, cx, .82, cx + hx, hy, n ? 50 + n * 80 : 0, 9890 + n); }
    } }));
  },

  state(t, E) {
    const { key, seg, ss, LX } = E, T = this.T, GX = window.GX;
    // one camera: the night wide holds → pushes to the stone and holds through the silence and the roll → pans right
    // and eases back to Mary and the risen Christ (III–IV) as the dawn comes → pulls back to the window, where the
    // scars of the rent veil (I) now shine gold
    const mid = (LX[2] + LX[3]) / 2;
    const cam = key(t, [[0, [0, 300, .5]], [2.4, [0, 305, .55]], [4.6, [LX[1] * .6, 400, .95]], [6.8, [LX[1], 465, 1.8]], [T.dawn, [LX[1] + 10, 462, 1.85]],
      [T.day, [mid, 400, 1.3]], [19.4, [mid, 396, 1.4]], [22, [-40, 320, .64]], [26, [-40, 320, .64]]]);
    // night (the dim moon band) → dawn
    const night = GX.light(E, 'night', { cam, sunI: 1.0, skyI: .1 }), day = GX.light(E, 'dawn', { cam });
    const st = GX.mixState(night, day, ss(seg(t, T.dawn, T.day)));
    st.lancets = this.panes(E, t); st.time = t;
    // light from inside the tomb as the stone rolls; the risen Christ's light as his pane lights
    const [dx, dy] = this.DOOR, [hx, hy] = this.HALO, warm = [1, .85, .55], white = [1, .97, .9];
    const g = ss(seg(t, T.glow, T.rolled + .6)), r = seg(t, T.reveal, T.shown + 1.2);
    st.pts = [];
    if (g > 0) st.pts.push([LX[1] + dx, dy, 50 + 70 * g, 2.2 * g * (1 - .5 * ss(seg(t, T.dawn, T.day))), warm]);
    if (r > 0) st.pts.push([LX[3] + hx, hy, 40 + 220 * Math.min(r, 1), 2.4 * Math.sin(Math.PI * Math.min(r, 1)) + .9 * ss(seg(t, T.shown, T.shown + 1)), white]);
    return GX.joint(E, this, st, t);
  },
};
// sound: night air; silence before the stone; the stone's long grind (low air + lead creak) and a warm bell as the
// light comes out; dawn air; eight rising glass notes as his pane lights; a bell at "Mary"
window.CLIP.sfx = [
  [0.3, 'air', { d: 4.4, v: .4 }],
  [window.CLIP.T.roll, 'air', { d: 3.0, v: .6 }], [window.CLIP.T.roll + .1, 'crack', { v: .35, snap: .1 }],
  [window.CLIP.T.glow + .6, 'bell', { m: 50, v: .6 }], [window.CLIP.T.dawn, 'air', { d: 3.4, v: .4 }],
  ...[0, 1, 2, 3, 4, 5, 6, 7].map((k) => [window.CLIP.T.reveal + (k + 1) * 2.6 / 8, 'glass', { m: [74, 76, 78, 79, 81, 83, 85, 86][k], v: .35 }]),
  [window.CLIP.T.mary, 'bell', { m: 57, v: .7 }], [20.8, 'air', { d: 2.0, v: .35 }], [23.4, 'air', { d: 2.4, v: .3 }],
];
(window.CLIPS ||= {})[window.CLIP.id] = window.CLIP;   // chapter joints: the previous chapter's tail reads this one
