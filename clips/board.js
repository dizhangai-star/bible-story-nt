// Storyboard (dev clip, not in the film): shot i is drawn at t = i + 0.5 with the real engine — its key frame,
// with the camera move marked on top. tools/storyboard.mjs lays the shots out on one page (docs/storyboard.png).
const D = Math.PI / 180;
const SHOTS = [
  // [id, 景别/角度, 运镜, 光, 画面/情绪, move]
  ['01-1', '大全景 · 滿窗星', '固定', '暗廳 · 星 = 針孔', '光照在黑暗裡 · 靜', 'static'],
  ['01-2', '跟一顆星 · I → II', '緩慢橫移 →', '星沿鉛條移動，停住', '尋找 · 期待', 'panR'],
  ['01-3', '中景 · 馬槽', '緩推', '聖嬰自己發光，照亮馬利亞', '為你們生了救主 · 溫柔', 'push'],
  ['02-1', '全景 · 約旦河', '橫移 →', '冷藍晨光', '河 · 等候', 'panR'],
  ['02-2', '中景 · 約翰與耶穌', '固定', '細光帶從天劈開', '天開了 · 敬畏', 'static'],
  ['02-3', '耶穌近景', '緩推', '鴿子降入光中（挪亞之鴿的回應）', '我的愛子 · 平安', 'push'],
  ['03-1', '大全景 · 正午', '固定', '四窗全亮，唯瞎子那格暗', '對比 · 缺乏', 'static'],
  ['03-2', '中景 · 摸他的眼', '緩推', '光聚在耶穌手上', '我是世上的光 · 憐憫', 'push'],
  ['03-3', '中景 · 西羅亞池', '下搖 → 上搖', '他洗了，那格玻璃一片片亮起', '就看見了 · 喜樂', 'tiltU'],
  ['04-1', '全景 · 長桌', '固定', '琥珀色黃昏光帶下沉', '團契 · 預感', 'static'],
  ['04-2', '特寫 · 擘餅', '緩推', '餅沿鉛條整齊分開', '這是我的身體 · 沉重', 'push'],
  ['04-3', '特寫 · 杯', '停住', '杯點燃成紅寶石色，光帶離開', '新約的杯 · 立約', 'static'],
  ['05-1', '大全景 · 三個十字架', '緩推', '正午光帶，隨後漸滅', '山崗 · 恐懼', 'push'],
  ['05-2', '中景 · 十字架（遠、莊重）', '固定', '全窗黑暗，靜音', '成了 · 靜止', 'static'],
  ['05-3', '全景 · 幔子', '不動，碎裂即事件', '幔子從上到下碎開，光從縫中透出', '幔子裂為兩半 · 震驚', 'static'],
  ['06-1', '全景 · 墳墓', '固定', '夜，只有暗光帶', '哀傷 · 等候', 'static'],
  ['06-2', '中景 · 石頭', '不動', '石頭沿鉛條滾開，光從墓裡出來', '祂不在這裡 · 驚奇', 'static'],
  ['06-3', '中景 · 園中', '緩推', '黎明；05 的裂縫透出金光', '馬利亞！· 相認 · 喜樂', 'push'],
  ['07-1', '玫瑰窗大特寫', '緩慢拉遠', '寶石環成為十二根基', '我將一切都更新了', 'pull'],
  ['07-2', '聖城 · 四窗', '拉遠', '珍珠門；每格自己發光，沒有光帶', '不用日月 · 榮耀', 'pull'],
  ['07-3', '最大全景 · 窗 + 地面', '停住，淡出', '地上有色彩卻沒有光柱', '不再有黑夜 · 安息', 'static'],
];
const CHAPTERS = [['01', '降生 Nativity'], ['02', '受洗 Baptism'], ['03', '世界的光 Light'], ['04', '晚餐 Supper'], ['05', '十字架 The Cross'], ['06', '復活 Resurrection'], ['07', '聖城 New Jerusalem']];

window.CLIP = {
  id: 'board',
  duration: SHOTS.length,
  uses: ['_glass'],
  nosub: true,
  timing: { fadeIn: [-1, -.9], fade: [SHOTS.length, SHOTS.length + .01] },
  SHOTS, CHAPTERS,
  glyphs: SHOTS.map((s) => s.slice(1, 5).join('')).join('') + CHAPTERS.map((c) => c[1]).join('') + '光之窗分鏡圖鏡頭景別運光畫面情緒章' +
    '7章24鏡頭約每個只有一運鏡主要動作縮略圖由真實引擎渲染打角色玻璃均為成片效果標記虛線框向內箭頭推外拉長橫移搖十字固定雙甩',

  state(t, E) {
    const i = Math.min(SHOTS.length - 1, Math.floor(t)), [id, , , , , move] = SHOTS[i];
    const st = this.shot(id, E);
    st.overlay = (O) => this.mark(O, move);
    return st;
  },

  light(E, k, o) { return window.GX.light(E, k, o); },
  fig(E, P, cx, base, who, pose, x, s, flip) { window.GX.fig(E, P, cx, base, who, pose, x, s, flip); P.setTransform(base); },   // back to world units
  bg(E, P, cx, col, id) { window.GX.bg(E, P, cx, col, id); },
  garden(E, P, cx, id) { window.GX.garden(E, P, cx, id); },

  // ---------- pane painters ----------
  stars(E, P, cx, id, n = 18) {
    const r = E.mulberry(id);
    for (let k = 0; k < n; k++) window.GX.star(E, P, cx - 120 + r() * 240, -260 + r() * 640, 4 + r() * 7, id + 1 + k, E.COL.white);
  },
  dim(E, P, cx, k = .75) { P.g.save(); P.g.fillStyle = `rgba(6,6,14,${k})`; P.g.fill(E.lancetPath(cx)); P.g.restore(); },   // unlit glass (heavy matting)

  // ---------- windows per chapter ----------
  panes(E, ch, o = {}) {
    const { COL, roundel, hills, tree, dove, LX } = E, GX = window.GX, self = this;
    const glass = GX.glass(E, ch);
    const pane = (fn) => ({ glass, content: (P, cx, base) => { fn(P, cx, base); P.setTransform(base); } });
    if (ch === 'nativity') return [0, 1, 2, 3].map((k) => pane((P, cx, b) => {
      self.stars(E, P, cx, 8000 + k * 40, 20);
      hills(P, cx, 560, [{ y: 0, a: 10, ph: k, c: COL.purple2 }], 8200 + k);
      if (k === (o.starAt ?? 1)) GX.bigStar(E, P, cx + (k === 1 ? 40 : 0), k === 1 ? 60 : -120, 34, 8300);
      if (k === 1) { GX.stable(E, P, cx, 8310); self.fig(E, P, cx, b, 'mary', 'pray', -80, .62);
        GX.manger(E, P, cx + 60, 604, .9, 8330); E.drawChild(P, b.translate(cx + 60, 604 - 94), 8340); P.setTransform(b); }
      if (k === 2) { self.fig(E, P, cx, b, 'joseph', 'holdStaff', -30, .72, true); }
    }));
    if (ch === 'baptism') return [0, 1, 2, 3].map((k) => pane((P, cx, b) => {
      roundel(P, cx, -150, 78, k === 1 ? COL.white : COL.sky, 8400 + k * 30);
      if (k === 0 || k === 3) { hills(P, cx, 380, [{ y: 0, a: 16, ph: k, c: COL.olive }], 8500 + k); tree(P, cx + (k ? 60 : -60), 400, 1.1, 8510 + k * 3); }
      if (k === 1) { self.fig(E, P, cx, b, 'jesus', 'handsPray', 10, .72); dove(P, cx + 20, o.doveY ?? -40, 1, 8530); }
      if (k === 2) self.fig(E, P, cx, b, 'john', 'bless', -10, .72, true);
      GX.waves(E, P, cx, 470, k * 1.3, 8600 + k * 10);
    }));
    if (ch === 'light') return [0, 1, 2, 3].map((k) => pane((P, cx, b) => {
      roundel(P, cx, -150, 78, COL.sky, 8700 + k * 30);
      if (k !== 3) hills(P, cx, 540, [{ y: 0, a: 10, ph: k, c: COL.gold }, { y: 40, a: 8, ph: 3, c: COL.brown }], 8800 + k);
      if (k === 0) tree(P, cx, 540, 1.3, 8810);
      if (k === 1) self.fig(E, P, cx, b, 'jesus', 'touchEyes', 10, .78);
      if (k === 2) { self.fig(E, P, cx, b, 'blind', o.seeing ? 'kneelSee' : 'blindStand', -10, .78, true); if (!o.seeing) self.dim(E, P, cx, .78); }
      if (k === 3) { GX.waves(E, P, cx, 500, 1, 8900); self.fig(E, P, cx, b, 'blind', o.seeing ? 'kneelSee' : 'kneelWash', -30, .7); }
    }));
    if (ch === 'supper') return [0, 1, 2, 3].map((k) => pane((P, cx, b) => {
      roundel(P, cx, -150, 78, k % 3 ? COL.ruby : COL.purple, 9000 + k * 30);
      if (k === 0 || k === 3) { hills(P, cx, 520, [{ y: 0, a: 10, ph: k, c: COL.brown }], 9100 + k); GX.star(E, P, cx, 150, 14, 9110 + k); }
      if (k === 1) { self.fig(E, P, cx, b, 'disciple', 'handsPray', -90, .7); self.fig(E, P, cx, b, 'jesus', 'breakBread', 30, .78); }
      if (k === 2) { self.fig(E, P, cx, b, 'peter', 'bow', -30, .76, true); self.fig(E, P, cx, b, { ...E.CAST.disciple, torso: COL.green2, skirt: COL.green2, sleeve: COL.green2, mantle: COL.ruby, id: 1450 }, 'stand', 80, .7, true); }
      if (k === 1 || k === 2) { GX.table(E, P, LX[1] - 150, LX[2] + 150, 480, 9200);
        if (k === 1) GX.loaf(E, P, cx + 80, 480, 1.1, 9220, o.broken || 0);
        if (k === 2) GX.cup(E, P, cx - 60, 480, 1, 9230); }
    }));
    if (ch === 'cross') return [0, 1, 2, 3].map((k) => pane((P, cx, b) => {
      if (k === 0) { GX.veil(E, P, cx, 9300); if (o.torn) GX.drawCracks(E, P, GX.cracks(E, cx, cx, -150, 77, 12), 1, false); return; }
      roundel(P, cx, -150, 78, COL.purple, 9400 + k * 30);
      hills(P, cx, 540, [{ y: 0, a: 16, ph: k + 1, c: COL.brown }], 9500 + k);
      E.drawCrucified(P, b.translate(cx, 560).scale(k === 2 ? .95 : .75), 9600 + k * 40, k === 2 ? {} : { thief: true });
    }));
    if (ch === 'tomb') return [0, 1, 2, 3].map((k) => pane((P, cx, b) => {
      roundel(P, cx, -150, 78, o.dawn ? COL.sky : COL.deepblue, 9700 + k * 30);
      if (k !== 1) { GX.garden(E, P, cx, 9800 + k); tree(P, cx + (k - 1.5) * 40, 530, 1.2, 9810 + k * 3); }
      if (k === 1) GX.tomb(E, P, cx, 9850, o.roll || 0, o.roll > .3 ? 1 : 0);
      if (k === 2) self.fig(E, P, cx, b, 'magdalene', 'kneelLook', 0, .74);
      if (k === 3) self.fig(E, P, cx, b, 'jesusRisen', 'blessStaff', -10, .76, true);
      if (o.scars && k === 0) GX.drawCracks(E, P, GX.cracks(E, cx, cx, -150, 77, 12), 1, true);
    }));
    if (ch === 'jerusalem') return [0, 1, 2, 3].map((k) => pane((P, cx) => {
      roundel(P, cx, -150, 78, COL.gold, 9900 + k * 30);
      GX.bigStar(E, P, cx, -150, 40, 9920 + k * 30, COL.white);
      GX.city(E, P, cx, 10000 + k * 40, 330 + (k % 2) * 40);
    }));
    return [];
  },

  // ---------- shots ----------
  shot(id, E) {
    const { LX, ROSE } = E, L = (k, o) => this.light(E, k, o), W = [0, 300, .5];
    const flash = (x, y) => [[x, y, 110, 3.2, [1, .96, .85]]], warm = [1, .8, .5], white = [1, .97, .9];
    const within = [0, 1, 2, 3].map((i) => [LX[i], 250, 190, 2.4, white]);
    switch (id) {
      case '01-1': return L('night', { cam: W, sunI: 1.0, skyI: .1, lancets: this.panes(E, 'nativity', { starAt: 0 }), pts: [[LX[0], -120, 50, 2.2, white]] });
      case '01-2': return L('night', { cam: [-340, 200, .9], sunI: 1.0, skyI: .1, lancets: this.panes(E, 'nativity', { starAt: 0 }), pts: [[LX[0], -120, 60, 2.4, white]] });
      case '01-3': return L('night', { cam: [LX[1] + 20, 430, 1.8], sunI: .9, skyI: .1, lancets: this.panes(E, 'nativity'), pts: [[LX[1] + 60, 520, 110, 3, warm], [LX[1] + 40, 60, 40, 1.4, white]] });
      case '02-1': return L('dawn', { cam: [-300, 250, .8], lancets: this.panes(E, 'baptism', { doveY: -200 }) });
      case '02-2': return L('dawn', { cam: [0, 380, 1.5], sunU: 0, bandW: 520, sunI: 2.8, lancets: this.panes(E, 'baptism', { doveY: -200 }) });
      case '02-3': return L('dawn', { cam: [LX[1], 260, 2.1], sunU: LX[1], bandW: 200, sunI: 2.8, lancets: this.panes(E, 'baptism', { doveY: 80 }), pts: [[LX[1] + 20, 80, 50, 2, white]] });
      case '03-1': return L('noon', { cam: W, lancets: this.panes(E, 'light') });
      case '03-2': return L('noon', { cam: [0, 380, 1.6], lancets: this.panes(E, 'light'), pts: [[LX[1] + 80, 330, 40, 2, white]] });
      case '03-3': return L('noon', { cam: [(LX[2] + LX[3]) / 2, 400, 1.35], lancets: this.panes(E, 'light', { seeing: true }), pts: [[LX[2], 380, 120, 1.8, white]] });
      case '04-1': return L('dusk', { cam: [0, 400, 1.2], lancets: this.panes(E, 'supper') });
      case '04-2': return L('dusk', { cam: [LX[1] + 70, 450, 3], lancets: this.panes(E, 'supper', { broken: .6 }) });
      case '04-3': return L('dusk', { cam: [LX[2] - 60, 430, 3], sunI: .8, lancets: this.panes(E, 'supper', { broken: 1 }), pts: [[LX[2] - 60, 412, 50, 2.6, [1, .35, .3]]] });
      case '05-1': return L('noon', { cam: [120, 280, .6], lancets: this.panes(E, 'cross') });
      case '05-2': return L('noon', { cam: [LX[2], 380, 1.5], sunI: .4, skyI: .06, amb: .05, roseI: .05, lancets: this.panes(E, 'cross') });
      case '05-3': return L('noon', { cam: [LX[0], 200, 1.3], sunU: LX[0], bandW: 330, sunI: 1.4, skyI: .05, amb: .035, lancets: this.panes(E, 'cross', { torn: true }), pts: flash(LX[0], -150) });
      case '06-1': return L('night', { cam: W, sunI: 1.0, skyI: .1, lancets: this.panes(E, 'tomb') });
      case '06-2': return L('night', { cam: [LX[1], 470, 1.8], sunI: 1.0, skyI: .1, lancets: this.panes(E, 'tomb', { roll: .85 }), pts: [[LX[1] - 30, 470, 70, 1.5, [1, .85, .55]]] });
      case '06-3': return L('dawn', { cam: [(LX[2] + LX[3]) / 2, 400, 1.3], lancets: this.panes(E, 'tomb', { roll: 1, dawn: true, scars: true }) });
      case '07-1': return L('noon', { cam: [0, ROSE.y, 2.6], sunI: 0, roseI: 2.2, amb: .04, lancets: this.panes(E, 'jerusalem') });
      case '07-2': return L('noon', { cam: [0, 280, .8], sunI: 0, roseI: 1.8, skyI: .3, lancets: this.panes(E, 'jerusalem'), pts: within });
      case '07-3': return L('noon', { cam: W, sunI: 0, roseI: 1.8, skyI: .3, lancets: this.panes(E, 'jerusalem'), pts: within, inscription: window.GX.TITLE, gild: .3 });
    }
    return L('night', { cam: W });
  },

  // ---------- camera move marks (screen space, 1920×1080) ----------
  mark(O, move) {
    O.save(); O.lineCap = 'round'; O.lineJoin = 'round';
    const ink = (w) => { O.strokeStyle = 'rgba(0,0,0,.6)'; O.lineWidth = w + 6; O.stroke(); O.strokeStyle = '#ffd98a'; O.lineWidth = w; O.stroke(); };
    const arrow = (x0, y0, x1, y1, w = 7) => { const a = Math.atan2(y1 - y0, x1 - x0), h = 34; O.beginPath(); O.moveTo(x0, y0); O.lineTo(x1, y1);
      O.moveTo(x1 - h * Math.cos(a - .5), y1 - h * Math.sin(a - .5)); O.lineTo(x1, y1); O.lineTo(x1 - h * Math.cos(a + .5), y1 - h * Math.sin(a + .5)); ink(w); };
    const box = (s) => { O.setLineDash([22, 14]); O.beginPath(); O.rect(960 - 960 * s, 540 - 540 * s, 1920 * s, 1080 * s); ink(4); O.setLineDash([]); };
    if (move === 'push') { box(.55); for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) arrow(960 + sx * 900, 540 + sy * 500, 960 + sx * 560, 540 + sy * 318); }
    if (move === 'pull') { box(.55); for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) arrow(960 + sx * 560, 540 + sy * 318, 960 + sx * 880, 540 + sy * 490); }
    if (move === 'panR') arrow(620, 540, 1300, 540, 9);
    if (move === 'tiltD') arrow(960, 300, 960, 800, 9);
    if (move === 'tiltU') arrow(960, 800, 960, 300, 9);
    if (move === 'whip') { arrow(1450, 540, 470, 540, 9); for (const dy of [-60, 60]) { O.beginPath(); O.moveTo(1400, 540 + dy); O.lineTo(900, 540 + dy); ink(3); } }
    if (move === 'static') { O.beginPath(); O.rect(60, 60, 150, 110); ink(4); O.beginPath(); O.moveTo(90, 115); O.lineTo(180, 115); O.moveTo(135, 80); O.lineTo(135, 150); ink(3); }
    O.restore();
  },
};
