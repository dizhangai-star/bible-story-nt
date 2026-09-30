// bible-story: robed glass figures on the demo knight's skeleton. Same fk(), part shapes, grisaille face and
// piece logic as knight.js; the costume swaps colours and a few pieces (hair / headcloth / beard / long robe /
// staff / sling / fruit). Facing right; mirror with a negative x scale. Pelvis at origin, feet at y≈+182.
import { COL, INK, smooth, circle, ellipse, brush, line } from './glass.js';
import { SH, EXPR, fk, faceGrisaille, folds, hatch, fingers, POSE, drawKnight } from './knight.js';
import { dove } from './window.js';

const D = Math.PI / 180;
export const FPOSE = {
  stand: { ...POSE.stand, wF: 0 },
  walk: { ...POSE.walkA, wF: 0 },
  walkB: { ...POSE.walkB, wF: 0 },
  reach: { ...POSE.stand, sF: -128 * D, eF: -22 * D, neck: -12 * D, face: 'wonder' },
  offer: { ...POSE.stand, sF: -72 * D, eF: -38 * D, neck: 4 * D, face: 'gentle' },
  lookUp: { ...POSE.stand, lean: -4 * D, neck: -26 * D, sF: -30 * D, eF: -74 * D, wF: 10 * D, face: 'wonder' },
  raiseStaff: { ...POSE.raise, wF: 0, neck: -16 * D },
  sling: { ...POSE.guard, sF: -196 * D, eF: -26 * D, wF: 0, sB: -70 * D, eB: -20 * D, face: 'fierce' },
  pray: { ...POSE.kneel, sF: -64 * D, eF: -70 * D, sB: -56 * D, eB: -76 * D, neck: -8 * D, face: 'gentle', sword: undefined },
  weep: { ...POSE.stand, lean: 8 * D, neck: 22 * D, sF: -120 * D, eF: -110 * D, face: 'gentle' },
  // bible-nt (New Testament)
  bless: { ...POSE.stand, sF: -46 * D, eF: -98 * D, neck: -2 * D, face: 'gentle' },          // hand raised before the chest
  holdStaff: { ...POSE.stand, wF: 78 * D, face: 'resolute' },                                // the staff upright in the near hand
  blessStaff: { ...POSE.stand, sF: -40 * D, eF: -70 * D, wF: 110 * D, face: 'gentle' },
  handsPray: { ...POSE.stand, lean: 3 * D, neck: 10 * D, sF: -24 * D, eF: -112 * D, sB: -20 * D, eB: -114 * D, face: 'gentle' },
  bow: { ...POSE.stand, lean: 12 * D, neck: 20 * D, sF: -30 * D, eF: -70 * D, sB: -26 * D, eB: -72 * D, face: 'gentle' },
  breakBread: { ...POSE.stand, neck: 8 * D, sF: -62 * D, eF: -30 * D, sB: -58 * D, eB: -36 * D, face: 'gentle' },
  touchEyes: { ...POSE.stand, lean: -2 * D, neck: -4 * D, sF: -100 * D, eF: -26 * D, face: 'gentle' },
  blindStand: { ...POSE.stand, lean: 4 * D, neck: 8 * D, sF: -40 * D, eF: -40 * D, face: 'blind' },
  kneelWash: { ...POSE.kneel, lean: 26 * D, neck: 26 * D, sF: -20 * D, eF: -14 * D, sB: -14 * D, eB: -20 * D, face: 'blind', sword: undefined },
  kneelSee: { ...POSE.kneel, lean: -6 * D, neck: -22 * D, sF: -130 * D, eF: -30 * D, sB: -100 * D, eB: -40 * D, face: 'wonder', sword: undefined },
  kneelLook: { ...POSE.kneel, lean: 4 * D, neck: -6 * D, sF: -70 * D, eF: -40 * D, face: 'wonder', sword: undefined },
};
// eyes closed / unseeing (the blind man): lids almost shut
EXPR.blind = { bi: -1.2, bo: .6, bh: 0, lid: .06, px: 0, py: 2.2, mouth: 'soft' };

const HAIRLONG = smooth([[-4, -124], [-24, -118], [-36, -76], [-42, -16], [-30, 4], [-20, -30], [-12, -86]]);
const BAND = smooth([[-22, -48], [2, -60], [30, -54], [31, -48], [3, -54], [-21, -42]]);
const beardPath = (L) => smooth([[4, -21], [12, -13], [22, -11], [31, -14], [35, -9], [32, 4 + L * .3], [25, L], [14, L * .86], [4, L * .5], [-3, -4]]);
const LOCK = smooth([[8, -120], [22, -114], [28, -86], [22, -52], [14, -40], [10, -60], [12, -92]]);   // Eve: hair falling in front
const BAG = smooth([[-40, 4], [-18, 2], [-16, 26], [-28, 34], [-42, 26]]);                        // David: shepherd's bag
// Moses: two beams of light from the head (Ex 34:29, "the skin of his face shone"; medieval glass draws them as rays)
const RAY = (x0, y0, x1, y1, w) => smooth([[x0 - w, y0, 1], [x1, y1, 1], [x0 + w, y0, 1]]);
// age: forehead lines, crow's feet, a line from nose to mouth
const aged = (g) => { for (const y of [-49, -45]) brush(g, [[12, y], [20, y - 1.5], [28, y]], 1, { w0: .3, w1: .3, color: 'rgba(44,26,12,.5)' });
  brush(g, [[10, -37], [7, -35]], .9, { color: 'rgba(44,26,12,.5)' }); brush(g, [[10, -33], [7, -30]], .9, { color: 'rgba(44,26,12,.5)' });
  brush(g, [[29, -27], [26, -22], [24, -18]], 1, { w0: .3, w1: .2, color: 'rgba(44,26,12,.45)' }); g.fillStyle = 'rgba(80,44,22,.2)'; g.fill(ellipse(17, -31, 6, 2.4)); };
// Eve: thin high arched brows (scrape the heavy brow back to the glass colour, repaint), a touch of colour on the lips
const feminine = (g, e) => { const bh = e.bh;
  brush(g, [[11.5, -40.5 + bh + e.bo], [17.5, -42.8 + bh], [23.4, -41.4 + bh + e.bi]], 5.2, { w0: .9, w1: .9, color: 'rgba(188,138,108,.92)' });
  brush(g, [[12, -42 + bh], [17.5, -45.5 + bh], [23.5, -43.5 + bh]], 1.5, { w0: .4, w1: .3 });
  g.fillStyle = 'rgba(150,48,50,.3)'; g.fill(ellipse(27.4, -18.4, 3.6, 1.5)); };
const STAFF = smooth([[-3.6, -118, 1], [3.6, -118, 1], [3.6, 150, 1], [-3.6, 150, 1]]);
const CROOK = smooth([[-3.6, -112], [-4, -134], [8, -150], [22, -140], [22, -126, 1], [16, -126, 1], [15, -137], [7, -142], [3, -132], [3.6, -112, 1]]);

// c: { skin, torso, skirt, skirtLen, belt, mantle, sleeve, legs, feet, hair, head: 'hair'|'cloth', cloth, longHair,
//      beard (length, 0 = none), beardCol, item: 'staff'|'crook'|'sling'|'fruit', leaves, id }
export function drawFigure(P, base, p, c = {}) {
  const J = fk(p), e = EXPR[p.face || 'resolute'] || EXPR.resolute, ID = c.id || 200, LW = 6.2;
  const at = (j, sx = 1, sy = sx) => P.setTransform(base.translate(j[0], j[1]).rotate(j[2] * 180 / Math.PI).scale(sx, sy));
  const skin = c.skin || COL.flesh, sleeve = c.sleeve === 'skin' ? skin : (c.sleeve || c.torso || COL.ruby);
  const legs = c.legs === 'skin' ? skin : (c.legs || c.skirt || COL.brown), feet = c.feet === 'skin' ? skin : (c.feet || COL.brown);
  // a nimbus behind the head: 'cross' (Christ: gold disc, three ruby arms of the cross) or 'plain' (the saints)
  if (c.halo) {
    at(J.head, 1.16);
    P.piece(circle(2, -32, 46), c.haloCol || COL.gold2, { id: ID + 55, lead: LW * .7, matW: 8 });
    if (c.halo === 'cross') for (const a of [-Math.PI / 2, Math.PI, 0]) {
      const q = (r, da) => [2 + Math.cos(a + da) * r, -32 + Math.sin(a + da) * r, 1];
      P.piece(smooth([q(20, -.36), q(45, -.2), q(45, .2), q(20, .36)]), COL.ruby, { id: ID + 56 + Math.round(a * 3), lead: LW * .5, mat: false });
    }
  }
  const leafy = (g) => { for (let k = 0; k < 7; k++) brush(g, [[-20 + k * 7, -2 + (k % 2) * 8], [-16 + k * 7, 26 + (k % 3) * 10], [-19 + k * 7, 40]], 1.6, { color: 'rgba(20,40,14,.55)' }); };
  // behind: mantle (the knight's cloak), long hair
  if (c.mantle) {
    at(J.cloak);
    P.piece(SH.cloak, c.mantle, { id: ID + 1, lead: LW, wash: .45, shade: [-70, 0, -10, 0, .45], paint: g => { folds(g, [[[-30, -60], [-38, 30], [-46, 132]], [[-22, -40], [-28, 50], [-36, 136]], [[-44, -20], [-54, 70], [-62, 138]]], 2.6, true); hatch(g, -72, 60, -48, 146); } });
    P.piece(SH.cloakEdge, c.mantleEdge || COL.gold, { id: ID + 40, lead: LW * .7, mat: false });
  }
  if (c.longHair) { at(J.torso); P.piece(HAIRLONG, c.hair, { id: ID + 45, lead: LW * .8, matW: 8, paint: g => { for (let k = 0; k < 5; k++) brush(g, [[-10 - k * 4, -110], [-22 - k * 3, -60], [-24 - k * 2, -8]], 1.4, { color: 'rgba(60,34,10,.55)' }); } }); }
  // far arm
  at(J.upB); P.piece(SH.upper, sleeve, { id: ID + 2, lead: LW, wash: .3, paint: g => folds(g, [[[-4, 6], [-2, 30], [-5, 54]]], 1.8) });
  at(J.foB); P.piece(SH.fore, sleeve, { id: ID + 3, lead: LW, wash: .3 });
  at(J.haB, 1.15); P.piece(SH.fist, skin, { id: ID + 4, lead: LW * .8, matW: 5, paint: fingers });
  // legs
  for (const [s, k] of [['B', 0], ['F', 1]]) {
    at(J['th' + s]); P.piece(SH.thigh, legs, { id: ID + 5 + k * 3, lead: LW, shade: [-13, 0, 13, 0, .3] });
    at(J['sh' + s]); P.piece(SH.shin, legs, { id: ID + 6 + k * 3, lead: LW, shade: [-10, 0, 10, 0, .3] });
    at(J['ft' + s]); P.piece(SH.foot, feet, { id: ID + 7 + k * 3, lead: LW, paint: g => brush(g, [[-2, -2], [8, 4], [18, 8]], 1.3, { color: 'rgba(44,26,12,.5)' }) });
  }
  // skirt / robe (scaled down to the ankles for a long robe)
  const sy = c.skirtLen ?? 1, skirt = c.skirt || c.torso || COL.ruby;
  at(J.skirt, 1, sy);
  P.piece(SH.skirtB, skirt, { id: ID + 12, lead: LW, wash: .4, shade: [-50, 0, 5, 0, .4], paint: g => { if (c.leaves) return leafy(g); folds(g, [[[-6, 10], [-8, 60], [-10, 106]], [[-18, 12], [-24, 60], [-27, 104]], [[-28, 20], [-38, 70], [-44, 106]]], 2.5, true); } });
  P.piece(SH.skirtF, skirt, { id: ID + 13, lead: LW, wash: .35, shade: [5, 0, 45, 0, .2], paint: g => { if (c.leaves) return leafy(g); folds(g, [[[14, 10], [20, 60], [24, 100]], [[24, 20], [32, 64], [38, 98]]], 2.5, true); } });
  if (c.hem !== false) { P.piece(SH.hemB, c.hem || COL.gold, { id: ID + 41, lead: LW * .7, mat: false }); P.piece(SH.hemF, c.hem || COL.gold, { id: ID + 42, lead: LW * .7, mat: false }); }
  if (c.bag) { P.piece(BAG, c.bag, { id: ID + 48, lead: LW * .8, matW: 6, paint: g => brush(g, [[-38, 8], [-28, 12], [-18, 8]], 1.4, { color: 'rgba(44,26,12,.6)' }) }); }
  // torso
  at(J.torso);
  const torso = c.torso || COL.ruby;
  P.piece(SH.torso, torso, { id: ID + 14, lead: LW, wash: torso === skin ? .2 : .4, shade: [-30, 0, 20, 0, .4], paint: g => { if (torso === skin) { brush(g, [[-12, -80], [2, -74], [16, -80]], 1.6, { color: 'rgba(80,44,22,.45)' }); return; } if (c.leaves) return leafy(g); folds(g, [[[-14, -20], [-18, -60], [-12, -96]], [[6, -24], [10, -60], [8, -90]], [[-24, -26], [-2, -38], [22, -26]]], 2.3, true); hatch(g, -32, -90, -18, -20); } });
  if (c.belt) P.piece(SH.belt, c.belt, { id: ID + 15, lead: LW * .8, mat: false });
  if (c.bag) { const st = new Path2D(); st.moveTo(20, -104); st.lineTo(-24, -2); P.lead(st, 3.4); }
  if (c.collar !== false && torso !== skin) P.piece(SH.neck, c.collar || COL.gold, { id: ID + 43, lead: LW * .7, mat: false });
  // head: hair cap or headcloth (the knight's coif shape), face, beard
  at(J.head, 1.16);
  if (c.head === 'cloth') {
    P.piece(SH.coif, c.cloth || COL.white, { id: ID + 17, lead: LW / 1.16, shade: [-25, 0, 20, 0, .42], paint: g => folds(g, [[[-8, -60], [-18, -30], [-16, 2]], [[4, -62], [-6, -34], [-6, -4]]], 1.8, true) });
    if (c.band !== false) P.piece(BAND, c.band || COL.gold, { id: ID + 46, lead: LW * .6, mat: false });
  } else {
    P.piece(SH.coif, c.hair || COL.brown, { id: ID + 17, lead: LW / 1.16, shade: [-25, 0, 20, 0, .42], paint: g => { for (let k = 0; k < 6; k++) brush(g, [[-2 + k * 4, -64], [-14 + k * 3, -34], [-14 + k * 3, -2]], 1.5, { color: 'rgba(50,28,10,.5)' }); } });
  }
  P.piece(SH.face, skin, { id: ID + 18, vary: .04, lead: LW * .75, matW: 5, matA: .9, paint: g => { faceGrisaille(g, e); if (c.old) aged(g); if (c.fem) feminine(g, e); } });
  if (c.rays) { P.piece(RAY(2, -62, -12, -126, 7.5), COL.gold2, { id: ID + 49, lead: 3.4, mat: false }); P.piece(RAY(18, -60, 36, -122, 7.5), COL.gold2, { id: ID + 50, lead: 3.4, mat: false }); }
  if (c.beard) {
    P.piece(beardPath(c.beard), c.beardCol || c.hair || COL.white, { id: ID + 47, lead: LW * .6, matW: 5, paint: g => { for (let k = 0; k < 5; k++) brush(g, [[8 + k * 5, -10], [9 + k * 4.5, c.beard * .5], [8 + k * 4, c.beard * .85]], 1.2, { color: 'rgba(60,40,20,.5)' }); brush(g, [[21, -20.5], [27, -22.5], [34, -19.5]], 2.8, { w0: .3, w1: .3 }); } });
  }
  // item in the near hand (rides on the sword joint, so pose.wF tilts it)
  if (c.item === 'staff' || c.item === 'crook' || c.item === 'crossStaff') {
    at(J.sword);
    if (c.item === 'crossStaff') P.piece(smooth([[-18, -100, 1], [18, -100, 1], [18, -93, 1], [-18, -93, 1]]), c.staffCol || COL.brown, { id: ID + 21, lead: LW * .6, mat: false });
    P.piece(STAFF, c.staffCol || COL.brown, { id: ID + 22, lead: LW * .7, mat: false, paint: g => line(g, [[0, -110], [0, 146]], 1, 'rgba(44,26,12,.45)') });
    if (c.item === 'crook') P.piece(CROOK, c.staffCol || COL.brown, { id: ID + 23, lead: LW * .7, mat: false });
  }
  at(J.upF); P.piece(SH.upper, sleeve, { id: ID + 26, lead: LW, wash: .3, shade: [-12, 0, 12, 0, .3], paint: g => folds(g, [[[4, 6], [2, 30], [5, 54]]], 1.8) });
  at(J.foF); P.piece(SH.fore, sleeve, { id: ID + 27, lead: LW, wash: .3, shade: [-10, 0, 10, 0, .3] });
  at(J.haF, 1.15);
  if (c.item === 'sling') {   // two cords (lead lines) hanging to a pouch with the stone
    const cord = new Path2D(); cord.moveTo(2, 14); cord.quadraticCurveTo(-12, 44, -4, 70); cord.moveTo(6, 16); cord.quadraticCurveTo(14, 46, 6, 72); P.lead(cord, 2.4);
    P.piece(ellipse(1, 74, 9, 6), COL.brown, { id: ID + 24, lead: 3, mat: false }); P.piece(circle(1, 70, 4.5), COL.steel2, { id: ID + 25, lead: 2.4, mat: false });
  }
  P.piece(SH.fist, skin, { id: ID + 28, lead: LW * .8, matW: 5, paint: fingers }); P.piece(SH.thumb, skin, { id: ID + 44, lead: LW * .6, mat: false });
  if (c.item === 'dove') { P.setTransform(base.translate(J.haF[0], J.haF[1]).translate(-2, -30).scale(1.5)); dove(P, 0, 0, 1, ID + 60); }
  if (c.item === 'cup') { P.piece(smooth([[-4, -30], [20, -30], [16, -16], [10, -10, 1], [10, 0, 1], [16, 4, 1], [-2, 4, 1], [4, 0, 1], [4, -10, 1], [-2, -16]]), COL.gold2, { id: ID + 30, lead: 3.2, matW: 4 });
    P.piece(ellipse(8, -28, 11, 3), COL.ruby, { id: ID + 31, lead: 2.4, mat: false }); }
  if (c.item === 'bread') P.piece(ellipse(10, -6, 16, 9), COL.gold, { id: ID + 30, lead: 3.4, matW: 5, paint: g => { brush(g, [[2, -10], [6, -3]], 1.2, { color: 'rgba(90,50,10,.6)' }); brush(g, [[12, -12], [16, -4]], 1.2, { color: 'rgba(90,50,10,.6)' }); } });
  if (c.item === 'fruit') P.piece(circle(8, -8, 9), COL.ruby, { id: ID + 29, lead: 3.4, matW: 4, paint: g => brush(g, [[8, -17], [11, -21]], 1.4, { color: 'rgba(30,40,10,.8)' }) });
  if (c.longHair && c.lock !== false) { at(J.torso); P.piece(LOCK, c.hair, { id: ID + 51, lead: LW * .6, matW: 5, paint: g => { brush(g, [[14, -110], [18, -84], [12, -56]], 1.2, { color: 'rgba(60,34,10,.55)' }); } }); }
  return J;
}

// Goliath: the demo knight, armed as 1 Sam 17:5–7 — helmet of brass, a spear "like a weaver's beam", no sword
const HELM = smooth([[-26, -38, 1], [-22, -62], [0, -92, 1], [24, -64], [32, -40, 1], [30, -34, 1], [-26, -32, 1]]);
const NASAL = smooth([[22, -40, 1], [27, -40, 1], [27, -20, 1], [22, -20, 1]]);
const SPEAR = smooth([[-5, -250, 1], [5, -250, 1], [5, 170, 1], [-5, 170, 1]]), TIP = smooth([[-9, -250, 1], [0, -300, 1], [9, -250, 1]]);
export function drawGoliath(P, base, p, id = 700) {
  const J = drawKnight(P, base, { ...p, face: 'fierce' }, { id, noSword: true });
  P.setTransform(base.translate(J.head[0], J.head[1]).rotate(J.head[2] * 180 / Math.PI).scale(1.16));
  P.piece(HELM, COL.gold, { id: id + 80, lead: 5, matW: 8, paint: g => { brush(g, [[-24, -40], [2, -44], [30, -38]], 2.2, { color: 'rgba(60,34,10,.6)' }); brush(g, [[-6, -80], [-12, -56]], 1.4, { color: 'rgba(255,240,200,.5)' }); } });
  P.setTransform(base.translate(J.haF[0], J.haF[1]).rotate((J.haF[2] + (p.wF || 0)) * 180 / Math.PI));
  P.piece(SPEAR, COL.brown, { id: id + 82, lead: 5, mat: false, paint: g => line(g, [[0, -240], [0, 160]], 1.2, 'rgba(44,26,12,.5)') });
  P.piece(TIP, COL.steel, { id: id + 83, lead: 4, mat: false });
  return J;
}

// the cast (costumes) — locked once the cast sheet is approved
export const CAST = {
  adam: { id: 300, torso: COL.flesh, skirt: COL.green, skirtLen: .56, leaves: true, hem: false, sleeve: 'skin', legs: 'skin', feet: 'skin', hair: COL.brown, beard: 6, beardCol: COL.brown },
  eve: { id: 360, fem: true, torso: COL.green2, skirt: COL.green2, skirtLen: .82, leaves: true, hem: false, collar: false, sleeve: 'skin', legs: 'skin', feet: 'skin', hair: COL.gold2, longHair: true, item: 'fruit' },
  noah: { id: 420, torso: COL.brown, skirt: COL.brown, skirtLen: 1.5, belt: COL.gold, mantle: COL.cobalt, sleeve: COL.brown, hair: COL.white, head: 'hair', beard: 38, beardCol: COL.white, item: 'dove', old: true },
  abraham: { id: 480, torso: COL.purple, skirt: COL.purple, skirtLen: 1.5, belt: COL.gold, mantle: COL.gold, mantleEdge: COL.ruby, sleeve: COL.purple, head: 'cloth', cloth: COL.white, band: COL.ruby, beard: 30, beardCol: COL.white, item: 'crook', old: true },
  moses: { id: 540, torso: COL.ruby, skirt: COL.ruby, skirtLen: 1.5, belt: COL.gold, mantle: COL.cobalt, sleeve: COL.ruby, hair: '#6a4a2a', head: 'hair', beard: 34, beardCol: COL.steel, item: 'staff', rays: true, old: true },
  david: { id: 600, torso: COL.sky, skirt: COL.sky, skirtLen: .62, belt: COL.brown, sleeve: 'skin', legs: 'skin', hair: '#b8541c', item: 'sling', bag: COL.brown },
  // bible-nt: the New Testament cast (halo: 'cross' = Christ, 'plain' = the saints)
  jesus: { id: 1000, torso: COL.white, skirt: COL.white, skirtLen: 1.5, hem: COL.gold, mantle: COL.ruby, mantleEdge: COL.gold, sleeve: COL.white, feet: 'skin', hair: '#6a4a2a', head: 'hair', longHair: true, lock: false, beard: 22, beardCol: '#6a4a2a', halo: 'cross' },
  jesusRisen: { id: 1000, torso: COL.white, skirt: COL.white, skirtLen: 1.5, hem: COL.gold, mantle: COL.gold, mantleEdge: COL.ruby, sleeve: COL.white, feet: 'skin', hair: '#6a4a2a', head: 'hair', longHair: true, lock: false, beard: 22, beardCol: '#6a4a2a', halo: 'cross', item: 'crossStaff', staffCol: COL.gold2 },
  mary: { id: 1060, fem: true, torso: COL.ruby2, skirt: COL.ruby2, skirtLen: 1.5, mantle: COL.cobalt, mantleEdge: COL.gold, sleeve: COL.ruby2, head: 'cloth', cloth: COL.cobalt, band: false, collar: false, halo: 'plain' },
  joseph: { id: 1120, torso: COL.olive, skirt: COL.olive, skirtLen: 1.5, belt: COL.brown, mantle: COL.gold, mantleEdge: COL.brown, sleeve: COL.olive, hair: COL.white, head: 'hair', beard: 28, beardCol: COL.white, old: true, item: 'staff', halo: 'plain' },
  john: { id: 1180, torso: COL.brown, skirt: COL.brown, skirtLen: .72, belt: '#4a2e14', hem: false, collar: false, sleeve: 'skin', legs: 'skin', feet: 'skin', hair: '#3a2614', head: 'hair', beard: 26, beardCol: '#3a2614', item: 'crossStaff', halo: 'plain' },
  blind: { id: 1240, torso: COL.steel2, skirt: COL.steel2, skirtLen: 1.3, belt: COL.brown, hem: false, sleeve: COL.steel2, feet: 'skin', hair: COL.steel, head: 'hair', beard: 20, beardCol: COL.steel, old: true },
  peter: { id: 1300, torso: COL.cobalt, skirt: COL.cobalt, skirtLen: 1.5, mantle: COL.gold, mantleEdge: COL.ruby, sleeve: COL.cobalt, feet: 'skin', hair: COL.white, head: 'hair', beard: 20, beardCol: COL.white, old: true, halo: 'plain' },
  magdalene: { id: 1360, fem: true, torso: COL.green, skirt: COL.green, skirtLen: 1.5, mantle: COL.ruby, mantleEdge: COL.gold, sleeve: COL.green, hair: COL.gold2, longHair: true, collar: false, halo: 'plain' },
  disciple: { id: 1420, torso: COL.ruby2, skirt: COL.ruby2, skirtLen: 1.5, mantle: COL.green2, mantleEdge: COL.gold, sleeve: COL.ruby2, feet: 'skin', hair: COL.brown, head: 'hair', beard: 16, beardCol: COL.brown, halo: 'plain' },
};

// ---------- bible-nt: the child and the cross (frontal pieces, not the profile rig) ----------
// the swaddled child lying in the manger, head to the right; origin = the middle of the body; o.halo = cross halo
export function drawChild(P, base, id = 1500, o = {}) {
  P.setTransform(base);
  if (o.halo !== false) {
    P.piece(circle(40, -8, 23), COL.gold2, { id: id + 1, lead: 3.4, matW: 5 });
    for (const a of [-Math.PI / 2, 0, Math.PI / 2]) { const q = (r, da) => [40 + Math.cos(a + da) * r, -8 + Math.sin(a + da) * r, 1];
      P.piece(smooth([q(12, -.4), q(22, -.22), q(22, .22), q(12, .4)]), COL.ruby, { id: id + 2 + Math.round(a * 3 + 5), lead: 2.4, mat: false }); }
  }
  P.piece(smooth([[-44, 4], [-36, -12], [-4, -16], [26, -12], [34, 0], [26, 13], [-4, 16], [-36, 14]]), COL.white, { id: id + 10, lead: 4, wash: .3, shade: [0, -14, 0, 16, .35],
    paint: g => { for (const x of [-28, -14, 0, 14]) brush(g, [[x - 4, -14], [x + 6, 0], [x - 2, 14]], 1.4, { color: 'rgba(60,40,20,.5)' }); } });
  P.piece(circle(40, -4, 13), COL.flesh, { id: id + 11, lead: 3.4, matW: 4, paint: g => {
    brush(g, [[38, -7], [42, -5.6], [46, -7]], 1, { w0: .3, w1: .3 }); brush(g, [[40, 2], [43, 2.6], [46, 2]], .9, { w0: .3, w1: .3, color: 'rgba(120,50,40,.6)' }); } });
  P.piece(smooth([[28, -8], [34, -18], [46, -18], [52, -8], [44, -12], [34, -12]]), COL.brown, { id: id + 12, lead: 2.6, mat: false });
}
// Christ on the cross, frontal and quiet (head bowed, eyes closed); origin = the foot of the upright. o.halo, o.thief
export function drawCrucified(P, base, id = 1600, o = {}) {
  const sk = o.skin || COL.flesh, g0 = 'rgba(44,26,12,.55)';
  P.setTransform(base);
  // the cross (brown), the title board
  P.piece(smooth([[-11, 0, 1], [-11, -330, 1], [11, -330, 1], [11, 0, 1]]), COL.brown, { id: id + 1, lead: 5, wash: .3, paint: g => line(g, [[0, -320], [0, -10]], 1.2, g0) });
  P.piece(smooth([[-150, -262, 1], [150, -262, 1], [150, -242, 1], [-150, -242, 1]]), COL.brown, { id: id + 2, lead: 5, wash: .3 });
  if (!o.thief) P.piece(smooth([[-26, -312, 1], [26, -312, 1], [26, -290, 1], [-26, -290, 1]]), COL.white, { id: id + 3, lead: 3.4, mat: false,
    paint: g => { for (let k = 0; k < 4; k++) line(g, [[-18 + k * 11, -301], [-12 + k * 11, -301]], 1.6, 'rgba(60,34,10,.7)'); } });
  // the halo behind the head
  const hx = 5, hy = -226;
  if (o.halo !== false && !o.thief) {
    P.piece(circle(hx, hy, 34), COL.gold2, { id: id + 4, lead: 4, matW: 6 });
    for (const a of [-Math.PI / 2, Math.PI, 0]) { const q = (r, da) => [hx + Math.cos(a + da) * r, hy + Math.sin(a + da) * r, 1];
      P.piece(smooth([q(18, -.36), q(33, -.2), q(33, .2), q(18, .36)]), COL.ruby, { id: id + 5 + Math.round(a * 3 + 5), lead: 3, mat: false }); }
  }
  // arms along the beam
  for (const s of [-1, 1]) P.piece(smooth([[s * 20, -214, 1], [s * 138, -256, 1], [s * 140, -244, 1], [s * 22, -196, 1]]), sk, { id: id + 20 + (s > 0), lead: 4, wash: .25,
    paint: g => brush(g, [[s * 40, -212], [s * 80, -226], [s * 120, -242]], 1, { color: g0 }) });
  // body, loincloth, legs
  P.piece(smooth([[-22, -214], [22, -214], [18, -140], [14, -104, 1], [-14, -104, 1], [-18, -140]]), sk, { id: id + 22, lead: 4.4, wash: .3, shade: [-22, 0, 22, 0, .3],
    paint: g => { for (let k = 0; k < 3; k++) brush(g, [[-14, -186 + k * 12], [-4, -182 + k * 12]], 1, { color: g0 }); for (let k = 0; k < 3; k++) brush(g, [[14, -186 + k * 12], [4, -182 + k * 12]], 1, { color: g0 }); brush(g, [[0, -130], [0, -116]], 1, { color: g0 }); } });
  P.piece(smooth([[-20, -112], [20, -112], [24, -80], [6, -70], [-6, -76], [-24, -82]]), o.thief ? COL.brown : COL.white, { id: id + 23, lead: 4, wash: .3,
    paint: g => { folds(g, [[[-10, -106], [-12, -84]], [[4, -106], [8, -78]]], 1.4, true); } });
  P.piece(smooth([[-14, -80], [2, -80], [0, -30], [4, -12, 1], [-6, -12, 1], [-10, -30]]), sk, { id: id + 24, lead: 4, wash: .25 });
  P.piece(smooth([[2, -80], [14, -80], [10, -30], [8, -14, 1], [0, -14, 1], [0, -30]]), sk, { id: id + 25, lead: 4, wash: .25 });
  // head bowed to the right; hair and beard
  P.piece(smooth([[hx - 20, hy - 12], [hx - 6, hy - 24], [hx + 14, hy - 20], [hx + 22, hy - 4], [hx + 20, hy + 18], [hx + 6, hy + 30], [hx - 16, hy + 20]]), o.thief ? COL.brown : '#6a4a2a', { id: id + 30, lead: 3.6, mat: false });
  P.piece(smooth([[hx - 12, hy - 14], [hx + 6, hy - 18], [hx + 16, hy - 6], [hx + 14, hy + 10], [hx + 2, hy + 16], [hx - 10, hy + 8]]), sk, { id: id + 31, lead: 3.4, matW: 4, paint: g => {
    brush(g, [[hx - 7, hy - 5], [hx - 2, hy - 3], [hx + 2, hy - 5]], 1.1, { w0: .3, w1: .3 }); brush(g, [[hx + 6, hy - 5], [hx + 10, hy - 3], [hx + 13, hy - 5]], 1.1, { w0: .3, w1: .3 });
    brush(g, [[hx + 3, hy - 3], [hx + 5, hy + 4]], .9, { color: g0 }); } });
  P.piece(smooth([[hx - 8, hy + 8], [hx + 12, hy + 6], [hx + 10, hy + 20], [hx + 2, hy + 26], [hx - 6, hy + 18]]), o.thief ? COL.brown : '#6a4a2a', { id: id + 32, lead: 3, mat: false });
}
