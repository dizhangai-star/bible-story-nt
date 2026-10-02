// 05 · 十字架 The Cross — the hill of three crosses across lancets II–IV at noon, the temple veil (ruby) in lancet I.
// The camera pushes slowly in; the noon band fails to nothing (Luke 23:44) and the camera arrives at the cross in the
// dark: "It is finished", the last gold on the halo goes out, silence. In the dark the camera turns to the veil; it is
// rent from the top to the bottom, row by row, and white light comes through the gaps — the biggest break of both films.
// Beats (TREATMENT §4), one continuous camera: 05-1 the hill · 05-2 the cross · 05-3 the veil.
window.CLIP = {
  id: '05-cross',
  uses: ['_glass', '06-resurrection'],
  duration: 25,
  timing: { fadeIn: [-1, 0], fade: [25, 25] },   // J4 brings the picture in, J5 hands it on
  caps: [
    [0.8, 5.3, 'And when they were come to the place, which is called Calvary, there they crucified him.', '到了一個地方，名叫髑髏地，就在那裡把耶穌釘在十字架上。'],
    [5.8, 10.1, 'And it was about the sixth hour, and there was a darkness over all the earth.', '那時約有午正，遍地都黑暗了。'],
    [10.6, 14.2, 'It is finished: and he bowed his head, and gave up the ghost.', '成了！便低頭，將靈魂交付神了。'],
    [16.8, 20.9, 'And, behold, the veil of the temple was rent in twain from the top to the bottom.', '忽然，殿裡的幔子從上到下裂為兩半。'],
    [21.4, 24.4, 'The Sixth Window · The Resurrection', '第六扇窗 · 復活'],   // the next chapter's name (J5)
  ],
  // J5 · the torn veil → the night garden: the white light through the veil narrows and goes out as the camera pulls
  // back (the body laid in the tomb); in the dark the glass changes; the dim moon band comes up on the garden
  J: { next: '06-resurrection', t0: 21.0,
    A(E, a, b, u) {
      const { ss, seg, lerp, LX } = E, GX = window.GX, M = [LX[0] * .5, 300, .6];
      const pre = u < .5, o = pre ? { ...a } : { ...b };
      if (pre) { const g = ss(seg(u, 0, .4)); o.bandW = lerp(a.bandW, 120, g); o.sunI = a.sunI * (1 - .5 * g); }
      o.cam = pre ? GX.camMix(a.cam, M, ss(seg(u, 0, .5))) : GX.camMix(M, b.cam, ss(seg(u, .5, 1)));
      return GX.blackout(o, pre ? ss(seg(u, .34, .46)) : 1 - ss(seg(u, .54, .7)));
    } },
  T: { fail: 5.6, dark: 10.0, finished: 11.6, gone: 13.0, turn: 14.2, rend: 16.4 },
  HEAD: [5, 345],   // the halo of the central cross (x relative to LX[2]; drawCrucified at .95 from y 560)

  panes(E, t) {
    const { COL, step, seg, ss, LX, roundel, hills } = E, GX = window.GX, T = this.T, s12 = step(t, 12);
    const glass = GX.glass(E, 'cross');
    return [0, 1, 2, 3].map((k) => ({ glass, content: (P, cx, b) => {
      if (k === 0) {   // the veil: rent row by row from the top; the gaps carry the light
        GX.veil(E, P, cx, 9300);
        const tr = GX.tear(E, cx, 9350), r = seg(s12, T.rend, T.rend + 1.6);
        if (r <= 0) return;
        tr.rows.forEach((row, i) => { const h = T.rend + i * .4, u = 1.3 * ss(seg(s12, h, h + .3));
          P.setTransform(b); GX.shatter(E, P, row.sh, cx, row.m, () => u, 9360 + i); });
        P.setTransform(b);
        GX.drawCracks(E, P, [{ pts: tr.spine, delay: 0, w: 5.5 }], r, false);
        tr.rows.forEach((row, i) => { const h = T.rend + i * .4; GX.drawCracks(E, P, row.br, seg(s12, h, h + .5), false); });
        return;
      }
      roundel(P, cx, -150, 78, COL.purple, 9400 + k * 30);
      hills(P, cx, 540, [{ y: 0, a: 16, ph: k + 1, c: COL.brown }], 9500 + k);
      E.drawCrucified(P, b.translate(cx, 560).scale(k === 2 ? .95 : .75), 9600 + k * 40, k === 2 ? {} : { thief: true });
      P.setTransform(b);
    } }));
  },

  state(t, E) {
    const { key, seg, ss, lerp, LX } = E, T = this.T, GX = window.GX;
    // one camera: the hill → slow push to the central cross, arriving in the dark → holds → turns in the dark to the
    // veil and holds there for the break (a short quake as it tears)
    const cam = key(t, [[0, [120, 280, .6]], [T.fail, [LX[2] * .6, 320, .85]], [T.dark + .4, [LX[2], 380, 1.5]], [T.turn, [LX[2], 382, 1.56]],
      [15.8, [LX[0], 210, 1.3]], [25, [LX[0], 205, 1.36]]]);
    const q = seg(t, T.rend, T.rend + 1.2) * (1 - seg(t, T.rend + .8, T.rend + 1.6));
    if (q > 0) { cam[0] += 4 * q * Math.sin(t * 61); cam[1] += 3 * q * Math.sin(t * 47 + 1); }
    // the noon band fails to nothing; a dim band is left, narrowing onto the veil as the camera turns; at the rend a
    // narrow white light strikes through lancet I
    const rend = ss(seg(t, T.rend, T.rend + .5));
    const st = GX.light(E, 'noon', { cam,
      sunI: key(t, [[0, 2.7], [T.fail, 2.7], [T.dark, .22], [T.rend, .18], [T.rend + .5, 1.6], [25, 1.4]]),
      sunU: lerp(0, LX[0], ss(seg(t, 13.2, 15.6))), bandW: key(t, [[0, 3200], [13.2, 3200], [15.6, 330]]),
      skyI: key(t, [[0, .1], [T.dark, .03], [T.rend, .03], [T.rend + 1, .05]]), roseI: key(t, [[0, .8], [T.dark, .05]]),
      amb: key(t, [[0, .075], [T.dark, .04], [T.rend, .035]]) });
    st.lancets = this.panes(E, t); st.time = t;
    // the last gold on the halo, out at "gave up the ghost"; at the rend a flash at the rod and the light behind the tear
    const [hx, hy] = this.HEAD, white = [1, .96, .88], f = seg(t, T.rend, T.rend + 1.4);
    const halo = ss(seg(t, T.fail + 2, T.dark)) * (1 - ss(seg(t, T.finished, T.gone)));
    st.pts = [];
    if (halo > 0) st.pts.push([LX[2] + hx, hy, 50, 1.3 * halo, [1, .85, .5]]);
    if (f > 0 && f < 1) st.pts.push([LX[0], -280 + 700 * f, 60 + 120 * f, 3.2 * Math.sin(Math.PI * f), white]);
    if (rend > 0) st.pts.push([LX[0], 130, 200, 1.4 * rend, white]);
    return GX.joint(E, this, st, t);
  },
};
// sound: noon air; the air thins as the light fails; silence from "It is finished" until the rend; then a great crack,
// four shard falls top to bottom, a low bell
window.CLIP.sfx = [
  [0.3, 'air', { d: 4.6, v: .45 }], [window.CLIP.T.fail, 'air', { d: 4.4, v: .3 }],
  [window.CLIP.T.rend, 'crack', { v: 1, snap: .9 }],
  ...[0, 1, 2, 3].map((k) => [window.CLIP.T.rend + k * .4 + .05, 'glass', { m: [88, 84, 81, 76][k], v: .45 }]),
  [window.CLIP.T.rend + 1.8, 'bell', { m: 38, v: .8 }], [21.6, 'air', { d: 2.6, v: .35 }],
];
(window.CLIPS ||= {})[window.CLIP.id] = window.CLIP;   // chapter joints: the previous chapter's tail reads this one
