// 02 · 受洗 Baptism — cold blue dawn over the Jordan (waves across all four lancets). The camera trucks right along
// the river and settles on John (III) and Jesus (II) waist-deep in the water; the heavens open: a white ray is cut into
// lancet II from the apex down, piece by piece, while the dawn band narrows onto it and brightens. Then the dove comes
// down the ray (Noah's dove, answered) and the camera pushes to Jesus; at "my beloved Son" the dove settles over his
// head in a flare and John bows. Beats (TREATMENT §4), one continuous camera: 02-1 the river · 02-2 the heavens open ·
// 02-3 the dove.
window.CLIP = {
  id: '02-baptism',
  uses: ['_glass', '03-light'],
  duration: 23,
  timing: { fadeIn: [-1, 0], fade: [23, 23] },   // no fades: the joints hand the picture over (J1 in, J2 out)
  caps: [
    [0.8, 5.0, 'Then cometh Jesus from Galilee to Jordan unto John, to be baptized of him.', '耶穌從加利利來到約旦河，見了約翰，要受他的洗。'],
    [5.6, 8.8, 'And, lo, the heavens were opened unto him.', '天忽然為他開了。'],
    [9.6, 13.6, 'He saw the Spirit of God descending like a dove.', '他就看見神的靈彷彿鴿子降下。'],
    [14.4, 18.6, 'This is my beloved Son, in whom I am well pleased.', '這是我的愛子，我所喜悅的。'],
    [19.6, 22.6, 'The Third Window · The Light of the World', '第三扇窗 · 世界的光'],   // the next chapter's name (J2)
  ],
  // J2 · the dawn → noon: everything but the ray goes dark as the camera pulls back, so for a moment only Jesus' lancet
  // shines; then that light goes out too (the glass changes in the dark) and the noon light spreads outward from
  // lancet II over the whole window: the light of the world
  J: { next: '03-light', t0: 18.8,
    A(E, a, b, u) {
      const { ss, seg, lerp, LX } = E, GX = window.GX, M = [LX[1] * .5, 330, .8];
      const pre = u < .5, o = pre ? { ...a } : { ...b }, d = ss(seg(u, 0, .3));
      if (pre) { o.skyI = a.skyI * (1 - .8 * d); o.roseI = a.roseI * (1 - .8 * d); o.amb = a.amb * (1 - .5 * d); o.bandW = lerp(a.bandW, 300, d); }
      else { const g = ss(seg(u, .54, 1)); o.sunU = lerp(LX[1], b.sunU, g); o.bandW = lerp(300, b.bandW, g); }
      o.cam = pre ? GX.camMix(a.cam, M, ss(seg(u, 0, .5))) : GX.camMix(M, b.cam, ss(seg(u, .5, 1)));
      return GX.blackout(o, pre ? ss(seg(u, .32, .46)) : 1 - ss(seg(u, .54, .66)));
    } },
  T: { open: 5.4, ray: 8.4, dove: 9.4, land: 14.2, bow: 14.8 },
  RAY: [20, -300, 290],   // the ray in lancet II: x offset, top y, bottom y (just above Jesus' halo)
  DOVE: 300,              // where the dove settles (world y, over his head)

  panes(E, t) {
    const { COL, step, seg, ss, lerp, LX, roundel, hills, tree, dove, smooth } = E, GX = window.GX, T = this.T, s = step(t);
    const glass = GX.glass(E, 'baptism'), [rx, r0, r1] = this.RAY;
    // the ray: cut from the apex down, 7 pieces lit one at a time
    const n = Math.floor(7 * seg(s, T.open, T.ray) + 1e-6), h = (r1 - r0) / 7;
    const ray = (P, cx) => { for (let k = 0; k < n; k++) {
      const y0 = r0 + k * h, y1 = y0 + h, w0 = lerp(7, 22, k / 7), w1 = lerp(7, 22, (k + 1) / 7), x = cx + rx;
      P.piece(smooth([[x - w0, y0, 1], [x + w0, y0, 1], [x + w1, y1, 1], [x - w1, y1, 1]]), k % 2 ? COL.gold : COL.gold2, { id: 8450 + k, lead: 2, mat: false });
    } };
    // the dove: down the ray, wings beating (4 per second), then held open as it settles
    const u = ss(seg(s, T.dove, T.land)), dy = lerp(-230, this.DOVE, u), flap = u < 1 ? Math.floor(s * 4) % 2 : 1;
    return [0, 1, 2, 3].map((k) => ({ glass, content: (P, cx, b) => {
      roundel(P, cx, -150, 78, k === 1 && n > 0 ? COL.white : COL.sky, 8400 + k * 30);
      if (k === 0 || k === 3) { hills(P, cx, 380, [{ y: 0, a: 16, ph: k, c: COL.olive }], 8500 + k); tree(P, cx + (k ? 60 : -60), 400, 1.1, 8510 + k * 3); }
      if (k === 1) { ray(P, cx); GX.fig(E, P, cx, b, 'jesus', 'handsPray', 10, .72); P.setTransform(b); if (s >= T.dove) { P.setTransform(b.translate(cx + rx, dy).scale(1.7)); dove(P, 0, 0, flap, 8530); P.setTransform(b); } }
      if (k === 2) { GX.fig(E, P, cx, b, 'john', ['bless', 'bow', ss(seg(s, T.bow, T.bow + 1.2))], -10, .72, true); P.setTransform(b); }
      GX.waves(E, P, cx, 470, k * 1.3 + t * .8, 8600 + k * 10);
    } }));
  },

  state(t, E) {
    const { key, seg, ss, lerp, LX } = E, T = this.T, GX = window.GX;
    // one camera: truck right along the river → settle on the two in the water (II–III) → push up to the ray and
    // follow the dove down onto Jesus
    const cam = key(t, [[0, [-430, 250, .8]], [4.6, [0, 330, 1.1]], [5.4, [0, 360, 1.3]], [T.ray, [-60, 330, 1.35]],
      [T.dove + .8, [LX[1] + 10, 60, 1.9]], [T.land, [LX[1] + 15, 370, 2.1]], [23, [LX[1] + 15, 380, 2.3]]]);
    // cold dawn over the whole window, then the band narrows onto lancet II and brightens as the heavens open
    const o = ss(seg(t, T.open, T.ray)), fl = seg(t, T.land - .1, T.land + 1.6);
    const st = GX.light(E, 'dawn', { cam, sunCol: [.72, .82, 1], sunU: lerp(0, LX[1], o), bandW: lerp(3200, 360, o),
      sunI: key(t, [[0, 1.6], [T.open, 1.7], [T.ray, 2.8], [T.land, 3.0]]), skyI: lerp(.1, .07, o), roseI: key(t, [[0, .5], [T.ray, .25]]) });
    st.lancets = this.panes(E, t); st.time = t;
    // light at the foot of the ray as it is cut; a white flare as the dove settles
    const [rx, , r1] = this.RAY, n = seg(t, T.open, T.ray);
    st.pts = [];
    if (n > 0 && n < 1) st.pts.push([LX[1] + rx, lerp(-300, r1, n), 50, 2.2, [1, .97, .9]]);
    if (t >= T.dove) st.pts.push([LX[1] + rx, lerp(-230, this.DOVE, ss(seg(t, T.dove, T.land))), 40 + 50 * ss(fl), 1.4 + 2.2 * Math.sin(Math.PI * Math.min(fl, 1) * .5) * (fl > 0 ? 1 : 0), [1, .97, .9]]);
    return GX.joint(E, this, st, t);
  },
};
// sound: river air; seven rising glass notes as the ray is cut; soft wing beats down the ray; a bell at the voice
window.CLIP.sfx = [
  [0.3, 'air', { d: 4.2, v: .7 }],
  ...[0, 1, 2, 3, 4, 5, 6].map((k) => [5.4 + k * 3 / 7, 'glass', { m: [74, 76, 78, 79, 81, 83, 86][k], v: .45 }]),
  ...[0, 1, 2, 3].map((k) => [9.6 + k * 1.1, 'air', { d: .5, v: .25 }]),
  [14.2, 'bell', { m: 50, v: .8 }], [14.3, 'glass', { m: 98, v: .5 }], [19.8, 'air', { d: 2.6, v: .4 }],
];
(window.CLIPS ||= {})[window.CLIP.id] = window.CLIP;   // chapter joints: the previous chapter's tail reads this one
