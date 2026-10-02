// 08 · 片尾 End card — after the city fades, the dark hall: the words the carving LVX · MVNDI comes from (John 8:12),
// whole, then the answer to the first film's "to be continued": two windows, one light. The OT card left a question;
// this one closes it (a glass note, then the score's Amen cadence).
window.CLIP = {
  id: '08-end',
  uses: ['_glass'],
  duration: 10,
  timing: { fadeIn: [0, 0.5], fade: [9.2, 10] },
  glyphs: '我是世界的光跟從我的就不在黑暗裡走必要得著生命約翰福音兩扇窗一道之',
  glyphsEn: 'I AM THE LIGHT OF THE WORLD HE THAT FOLLOWETH ME SHALL NOT WALK IN DARKNESS BUT HAVE LIFE JOHN TWO WINDOWS ONE OF LVX MVNDI · : , .',
  caps: [],
  sfx: [[1.0, 'glass', { m: 86, v: .6 }], [1.0, 'air', { d: 3.0, v: .3 }]],

  state(t, E) {
    const { ss, seg } = E;
    const st = window.GX.light(E, 'night', { cam: [0, 300, .5], sunI: 0, skyI: .012, roseI: .04, amb: .018, time: t });
    const a = ss(seg(t, .8, 1.8)), a2 = ss(seg(t, 1.6, 2.6)), b = ss(seg(t, 5.0, 6.0)), c = ss(seg(t, 6.6, 7.4));
    st.overlay = (O) => {
      if (a <= 0) return;
      O.save(); O.setTransform(1, 0, 0, 1, 0, 0); O.textAlign = 'center'; O.textBaseline = 'middle';
      O.shadowColor = 'rgba(255,200,120,.32)'; O.shadowBlur = 26;
      O.globalAlpha = a; O.fillStyle = '#ecd9a8'; O.font = '600 76px "Noto Serif TC"'; O.fillText('我是世界的光。', 960, 330);
      O.font = '600 34px Cinzel'; O.fillStyle = '#d9c28e'; O.fillText('I   A M   T H E   L I G H T   O F   T H E   W O R L D', 960, 408);
      O.shadowBlur = 0; O.globalAlpha = a2 * .85; O.fillStyle = '#bfae8a';
      O.font = '500 32px "Noto Serif TC"'; O.fillText('跟從我的，就不在黑暗裡走，必要得著生命的光。', 960, 480);
      O.font = 'italic 30px "IM Fell English"'; O.fillText('he that followeth me shall not walk in darkness, but shall have the light of life.', 960, 526);
      O.globalAlpha = a2 * .6; O.font = '600 18px Cinzel'; O.fillText('約翰福音 8 : 12  ·  JOHN 8 : 12  ·  LVX · MVNDI', 960, 574);
      O.globalAlpha = b * .9; O.fillStyle = '#d9c28e'; O.shadowColor = 'rgba(255,200,120,.3)'; O.shadowBlur = 20;
      O.font = '600 44px "Noto Serif TC"'; O.fillText('兩扇窗 · 一道光', 960, 710);
      O.font = '600 24px Cinzel'; O.fillText('T W O   W I N D O W S  ·  O N E   L I G H T', 960, 762);
      O.shadowBlur = 0; O.globalAlpha = c * .55; O.fillStyle = '#bfae8a';
      O.font = '600 18px Cinzel'; O.fillText('光之窗 · WINDOWS OF LIGHT', 960, 920);
      O.restore();
    };
    return st;
  },
};
