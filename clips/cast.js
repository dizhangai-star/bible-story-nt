// Cast sheet (dev clip, not in the film): every character as cut glass on a glazier's light table, in the pose
// each chapter needs. Preview: node preview.mjs cast 0.5 --cols 1 --w 1600
window.CLIP = {
  id: 'cast',
  duration: 1,
  uses: ['_glass'],
  timing: { fadeIn: [-1, -.9], fade: [99, 100] },
  glyphs: '光之窗新約角色設定耶穌馬利亞約瑟施洗翰瞎子彼得門徒聖嬰十字架復活抹大拉的',
  glyphsEn: 'CASTSHEETJESUSMARYJOSEPHJOHNTHEBLINDMANPETERADISCIPLECHILDCROSSRISENMAGDALENE',
  render(t, E) {
    const { Lc, L, comp, Pass, COL, circle, drawFigure, drawKnight, FPOSE, POSE, CAST, archPanel, drawPanel } = E, GX = window.GX;
    const { G, S, R, O } = Lc;
    for (const c of [G, S, R, O]) { c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, 1920, 1080); }
    S.fillStyle = '#2e2b28'; S.fillRect(0, 0, 1920, 1080);
    const P = new Pass(G, S), I = new DOMMatrix();
    const label = (x, y, t1, t2) => {
      O.textAlign = 'center'; O.fillStyle = '#e9dcc0'; O.font = '600 22px Cinzel, "Noto Serif TC"'; O.fillText(t1, x, y);
      if (t2) { O.fillStyle = 'rgba(233,220,192,.72)'; O.font = 'italic 18px "IM Fell English"'; O.fillText(t2, x, y + 24); }
    };
    const inPanel = (x, y, w, h, seed, fn) => {
      const pn = archPanel(x, y, w, h, seed); P.setTransform(I); drawPanel(P, pn);
      P.g.save(); P.s.save(); P.g.clip(pn.inner); P.s.clip(pn.inner); fn(); P.setTransform(I); P.g.restore(); P.s.restore();
    };
    const fig = (x, y, w, h, pose, cast, sc, dx = 0, flip = false) => {
      const p = FPOSE[pose];
      drawFigure(P, I.translate(x + w / 2 + dx, y + h - 22 - 182 * sc + (p.rootDy || 0) * sc).scale(flip ? -sc : sc, sc), p, cast);
    };
    O.textAlign = 'left'; O.fillStyle = '#efe2c4'; O.font = '700 34px Cinzel, "Noto Serif TC"'; O.fillText('光之窗 · 新約 — 角色設定 CAST SHEET v1', 44, 52);
    O.font = 'italic 21px "IM Fell English"'; O.fillStyle = 'rgba(239,226,196,.75)';
    O.fillText('The same glass rig as the Old Testament window. Christ is drawn with the cross halo; the saints with a plain one. The Father is never drawn — only light.', 44, 82);
    // row 1: the people, each in the pose their chapter needs
    const row = [
      ['bless', 'jesus', 'JESUS · 耶穌', 'I–VII · white robe, ruby mantle, cross halo', .82, false],
      ['handsPray', 'mary', 'MARY · 馬利亞', 'I · blue veil and mantle', .86, true],
      ['holdStaff', 'joseph', 'JOSEPH · 約瑟', 'I · old, with a staff', .86, true],
      ['holdStaff', 'john', 'JOHN · 施洗約翰', 'II · camel hair, reed cross', .88, false],
      ['blindStand', 'blind', 'THE BLIND MAN · 瞎子', 'III · eyes shut, grey', .86, false],
      ['breakBread', 'peter', 'PETER · 彼得', 'IV · gold mantle, white beard', .86, true],
      ['stand', 'disciple', 'A DISCIPLE · 門徒', 'IV · the row at the table', .86, false],
    ];
    row.forEach(([pose, who, t1, t2, sc, flip], i) => {
      const x = 30 + i * 268, y = 104, w = 248, h = 440;
      inPanel(x, y, w, h, 11 + i, () => fig(x, y, w, h, pose, CAST[who], sc, flip ? 10 : -8, flip));
      label(x + w / 2, y + h + 30, t1, t2);
    });
    // row 2: the child in the manger, the cross, the risen Christ and Mary Magdalene
    { const x = 30, y = 636, w = 330, h = 330;
      inPanel(x, y, w, h, 31, () => { GX.manger(E, P, x + w / 2, y + h - 30, 1.5, 820); E.drawChild(P, I.translate(x + w / 2, y + h - 30 - 104).scale(1.5), 830); P.setTransform(I); GX.bigStar(E, P, x + w / 2 + 70, y + 70, 34, 850); });
      label(x + w / 2, y + h + 30, 'THE CHILD · 聖嬰', 'I · swaddled, cross halo; the star'); }
    { const x = 380, y = 636, w = 330, h = 330;
      inPanel(x, y, w, h, 32, () => { E.drawCrucified(P, I.translate(x + w / 2, y + h - 20).scale(.9), 870); });
      label(x + w / 2, y + h + 30, 'THE CROSS · 十字架', 'V · frontal, quiet, far'); }
    { const x = 730, y = 636, w = 420, h = 330;
      inPanel(x, y, w, h, 33, () => { fig(x, y, 260, h, 'blessStaff', CAST.jesusRisen, .66, 10);
        fig(x + 170, y, 250, h, 'kneelLook', CAST.magdalene, .66, 0, true); });
      label(x + w / 2, y + h + 30, 'RISEN · 復活  &  MAGDALENE · 抹大拉', 'VI · gold mantle, the cross-staff · red mantle, kneeling'); }
    // faces, large: expressions live in brows and mouth (swap the face piece, never morph)
    const faces = [['jesus', 'gentle', 'Jesus'], ['mary', 'gentle', 'Mary'], ['blind', 'blind', 'the blind man'], ['blind', 'wonder', '… who sees']];
    faces.forEach(([who, face, n], i) => {
      const cx = 1250 + i * 176, cy = 780, r = 74;
      P.setTransform(I); P.piece(circle(cx, cy, r + 10), COL.ruby, { id: 900 + i, lead: 6, mat: false });
      P.piece(circle(cx, cy, r), COL.cobalt, { id: 910 + i, lead: 6, matW: 14 });
      P.g.save(); P.s.save(); P.g.clip(circle(cx, cy, r)); P.s.clip(circle(cx, cy, r));
      const sc = 1.55; drawFigure(P, I.translate(cx - 16 * sc, cy + 150 * sc).scale(sc), { ...FPOSE.stand, face, neck: 0 }, { ...CAST[who], item: null, mantle: null });
      P.setTransform(I); P.g.restore(); P.s.restore();
      O.textAlign = 'center'; O.fillStyle = 'rgba(233,220,192,.8)'; O.font = 'italic 19px "IM Fell English"'; O.fillText(`${n} · ${face}`, cx, cy + r + 28);
    });
    comp.render(L, { cam: [960, 540, 1], lb: 1, amb: .45, ambCol: [.9, .86, .8], haze: .04, bloom: .22, thr: .7, expo: 1.0, vign: .25, texK: 1 });
  },
};
