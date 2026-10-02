// The film's music, written in code per clip (Suno dropped 2026-09-30; the OT chapters' scores are in ../bible-story).
// Each clip is scored in its own buffer, in clip seconds, cut by the clip's fade and laid at its start in the film (tails never ring into the next chapter; the
// hall reverb in music.mjs still carries across the cut). The glass foley (clip sfx: chimes, bells, cracks) is part of
// the music, so a score leaves those notes to it and plays around them.
// Instruments: pipe organ, alto recorder, harp. Home key D Dorian, 80 BPM = 0.75 s/beat.
// MIDI: G1 31, D2 38, G2 43, A2 45, D3 50, G3 55, A3 57, D4 62, G4 67, A4 69, B4 71, D5 74.
import { panG, hz, voices } from '../../_kit/audio/dsp.mjs';

const SCORES = {
  // Opening card: an open D in the dark under the title (the glass note at 0.9 is its spark), gone before 01's spark.
  '00-title'({ organ, harp }) {
    organ(.6, 5.0, [38, 45], .016, { atk: 2.0, amp: (u) => 1 - .5 * u }); harp(1.6, 62, .06); harp(2.35, 69, .05); harp(3.1, 74, .05);
  },
  // End card: after the dawn's D major, a low D and a G that does not resolve (the question stays open).
  '08-end'({ organ, recorder }) {
    organ(.4, 5.6, [38, 50, 57], .016, { atk: 1.2 }); organ(2.4, 3.6, [43, 55, 59], .012, { atk: 1.5 }); recorder(2.6, 2.4, 71, .035);
  },
  // bible-nt: the seven chapters. The leitmotif is the OT film's Genesis line (D E F G A B → D, the six days and the
  // light); here it is sung by the recorder at the turns (03 he sees, 06 "Mary", 07 the city) and answered in D major.
  // Joints: a chapter with a joint has no fade, so its last bars ring 1.2 s into the next (score()); they land in the
  // next chapter's key.

  // Night, a lullaby: the star's glass notes (G major, A6 … D7) are the melody; the score holds a low open D and a
  // sparse harp as it travels; the child kindles (bell D3, 12.0) → warm D major, the recorder rocks a cradle figure.
  // J1 (17.6): the white-out swells to a bright D; under the glare the harmony opens to the dawn's low A–D.
  '01-nativity'({ organ, harp, line, arp }, A) {
    const T = A.T;
    organ(.6, T.kindle - .8, [38, 45], .018, { atk: 2.5, amp: (u) => .6 + .4 * u });                // the night: open D
    for (let k = 0; k < 6; k++) harp(T.go + .6 + k * 1.5, [55, 59, 62, 59, 55, 57][k], .05, -.35, 4);   // the journey, in G
    organ(T.go + 4, 4, [43, 50], .012, { atk: 1.5 });                                                 // G under the crossing
    organ(T.kindle, A.J.t0 - T.kindle + .4, [38, 50, 54, 57], .026, { atk: .5, amp: (u) => 1 - .25 * u });       // D major: the child's light
    arp(T.kindle, [50, 54, 57, 62, 66], .375, .1);
    line([[12.9, .72, 66], [13.65, .72, 64], [14.4, 1.1, 62], [15.6, .72, 69], [16.35, .72, 66], [17.1, 1.0, 64]], .045);
    organ(A.J.t0, 2.2, [50, 57, 62, 66, 69, 74], .022, { atk: 1.0, amp: (u) => .4 + .6 * Math.sin(Math.PI * u) });   // the glare
    organ(A.J.t0 + 2.0, 1.6, [38, 45, 50], .016, { atk: .8 });                                       // the cold dawn
  },

  // Dawn at the Jordan: a harp ostinato (the water) on D; "the heavens were opened": the band's glass climbs D5…D6
  // (5.4–8.0) over an organ swell to D major; the dove comes down with the recorder (A5 → D5) while the harmony
  // settles G → D; at the landing (bell D3 + glass D7, 14.2) "my beloved Son": a G → A → D cadence. J2 (18.8): the
  // window goes dark but the ray — one held A; the noon comes up on an open D.
  '02-baptism'({ organ, harp, line, arp }, A) {
    const T = A.T, OST = [38, 45, 50, 45];
    organ(.4, T.open - .2, [38, 45], .016, { atk: 2.0 });
    for (let k = 0; k < 13; k++) harp(.8 + k * .375, OST[k % 4], .05 + .003 * k, -.45, 2.5);         // the river
    organ(T.open, 3.0, [38, 50, 54, 57], .022, { atk: 1.4 });                                        // the heavens open
    organ(T.dove, 2.4, [43, 50, 55, 59], .018, { atk: .8 }); organ(T.dove + 2.4, 2.4, [38, 50, 54, 57], .018, { atk: .8 });
    line([[T.dove + .2, 1.1, 81], [T.dove + 1.4, .72, 79], [T.dove + 2.15, .72, 78], [T.dove + 2.9, 1.1, 76], [T.dove + 4.1, .72, 74], [T.dove + 4.85, 1.0, 74]], .04);
    organ(T.bow, 1.5, [43, 55, 59, 62], .024, { atk: .3 });                                          // G — "my beloved Son"
    organ(T.bow + 1.5, 1.5, [45, 52, 57, 61], .024);                                                 // A
    organ(T.bow + 3.0, 1.0 + A.J.t0 - T.bow - 3.0, [38, 50, 57, 62, 66], .026, { amp: (u) => 1 - .4 * u });   // D
    arp(T.bow + 3.0, [50, 57, 62, 66, 69], .375, .09);
    line([[T.bow + .2, 1.3, 71], [T.bow + 1.5, 1.4, 69], [T.bow + 3.0, 1.6, 66]], .045);
    line([[A.J.t0 + .4, 2.2, 69]], .03);                                                               // only the ray
    organ(A.J.t0 + 2.2, 2.0, [38, 45, 50], .018, { atk: .8 });                                       // noon
  },

  // Noon, but one pane is dark: D minor, thin and low, an unanswered recorder (A G F … E). The light gathers in his
  // hand (glass D6 F#6 A6 B6, 6–8.8): D major comes in note by note. Siloam: harp water (10–13). He sees: the glass
  // climbs D5…D6 (14.55–17) and the recorder sings the Genesis line, now in D major, onto D5 with the bell (17.0).
  // J3 (18.8): the noon passes; the dusk comes in on Bb.
  '03-light'({ organ, recorder, harp, line, arp }, A) {
    const T = A.T;
    organ(.4, T.touch + .4, [38, 45, 53], .016, { atk: 1.8 });                                      // D minor, low
    line([[1.6, 1.1, 69], [2.75, .72, 67], [3.5, 1.4, 65], [5.0, .9, 64]], .035);                   // no answer
    organ(T.glow, 1.0, [38, 50], .018); organ(7.0, .9, [38, 50, 54], .02); organ(7.9, .9, [38, 50, 54, 57], .022);
    organ(8.8, T.go - 8.8 + .6, [38, 50, 54, 57, 59], .022, { amp: (u) => 1 - .4 * u });           // the light in his hand
    for (let k = 0; k < 8; k++) harp(T.go + .4 + k * .375, [50, 57, 62, 57][k % 4], .06, -.45, 2.5);   // the pool
    organ(T.go + .2, 2.8, [43, 50, 55], .014, { atk: 1.0 });
    organ(T.see, 2.8, [38, 50, 54, 57], .02, { atk: .6 });                                           // he sees
    line([[T.see + .35, .35, 62], [T.see + .7, .35, 64], [T.see + 1.05, .35, 66], [T.see + 1.4, .35, 67], [T.see + 1.75, .35, 69], [T.see + 2.1, .35, 71], [T.see + 2.45, .35, 73]], .045);
    organ(T.seen, A.J.t0 - T.seen + .4, [38, 50, 57, 62, 66, 69], .034, { atk: .2, amp: (u) => 1 - .35 * u });
    recorder(T.seen, 1.9, 74, .085); arp(T.seen, [50, 57, 62, 66, 69, 74], .375, .12);
    organ(A.J.t0 + 1.6, 3.0, [34, 46, 53], .016, { atk: 1.0 });                                      // dusk: Bb
  },

  // Dusk, a slow chorale (Bb · F · Gm · A). The bread breaks (crack 7.6): the music stops for it, then goes on, lower.
  // The cup kindles (bell A2 + glass A5 B5 D6 E6, 12.4–15.1): A → D major, "the new testament". J4 (18.8): the warm
  // band dies; the hard noon of the hill comes in on a bare low D with a dissonant E flat above it.
  '04-supper'({ organ, recorder, harp, line }, A) {
    const T = A.T;
    organ(.4, 2.2, [34, 46, 53, 58], .02, { atk: 1.4 }); organ(2.6, 2.2, [41, 53, 57, 60], .02);   // Bb · F
    organ(4.8, 2.4, [43, 50, 55, 58], .02, { rel: .5 });                                             // Gm — and the stop
    line([[1.0, 1.5, 65], [2.6, 1.4, 69], [4.1, .72, 67], [4.85, 1.9, 67]], .04);
    organ(T.broken - .4, 3.0, [38, 45, 53], .016, { atk: 1.0 });                                   // after the break, low
    harp(T.broken, 50, .07); harp(T.broken + .75, 53, .06); harp(T.broken + 1.5, 57, .06);
    organ(T.cup, 2.6, [33, 45, 52, 57, 61], .02, { atk: .8 });                                       // A — the cup
    organ(T.kindled - .6, T.out - T.kindled + 1.8, [38, 50, 54, 57, 62], .026, { atk: .4, amp: (u) => 1 - .4 * u });   // D: the new covenant
    recorder(T.kindled - .4, 2.0, 66, .06); recorder(T.kindled + 1.6, 1.6, 62, .05);
    organ(A.J.t0 + 1.8, 2.4, [26, 38], .02, { atk: 1.0 }); organ(A.J.t0 + 2.4, 1.6, [51], .008, { atk: .8 });   // the hill
  },

  // The sixth hour: a low D minor lament; as the band fails (5.6–10) the bass walks down D C Bb A and the organ thins;
  // "it is finished" (11.6): the recorder falls to D and stops on "gave up the ghost" (13.0). Silence until the veil
  // (16.4, crack + glass falling). After the bell (D2, 18.2): a bare open fifth, no third. J5 (21): low and quiet.
  '05-cross'({ organ, recorder, line }, A) {
    const T = A.T;
    organ(.4, T.fail - .2, [38, 45, 50, 53], .02, { atk: 1.6 });                                     // Dm
    line([[1.2, 1.4, 69], [2.7, .72, 70], [3.45, 1.4, 69], [4.95, 1.4, 65]], .04);
    [[T.fail, 36], [T.fail + 1.5, 34], [T.fail + 3.0, 33]].forEach(([t, b], k) => organ(t, 1.5, [b, 50 - k], .02 - .003 * k));   // D–C–Bb–A, thinning
    organ(T.dark - .4, T.finished - T.dark + 1.4, [38, 45], .014, { amp: (u) => 1 - .7 * u, rel: 1.0 });
    line([[T.finished - .6, .9, 65], [T.finished + .3, .7, 64], [T.finished + 1.0, .9, 62]], .035, { rel: .6 });
    // T.gone → T.rend: silence (the foley's room tone only)
    organ(18.2, 2.6, [26, 38, 45], .018, { atk: .4, amp: (u) => 1 - .5 * u });                    // the bare fifth
    organ(A.J.t0 + .4, 3.6, [38, 45], .01, { atk: 1.5, amp: (u) => 1 - .5 * u });                    // into the garden
  },

  // Night in the garden: D minor, sparse (grief); silence before the stone (6.2–7.0); under the grind a low A pedal
  // grows; the light from inside (bell D3, 8.6) turns it to D major, soft; the dawn swells (11–14.6); the risen
  // Christ's pane (glass D5…D6, 13.5–15.8); "Mary" (bell A3, 16.2): the recorder sings the Genesis line in D major
  // to D5 and a G → D cadence. J6 (22): the dawn goes out, a high A holds in the dark, a quiet D at the rose's spark.
  '06-resurrection'({ organ, recorder, harp, line, arp }, A) {
    const T = A.T;
    organ(.4, 5.6, [38, 45, 53], .016, { atk: 2.0 });
    line([[1.4, 1.4, 62], [2.9, .72, 65], [3.65, 1.5, 64], [5.2, .9, 62]], .032);
    organ(T.roll, T.glow + .6 - T.roll, [33, 45], .018, { atk: 1.4, amp: (u) => .5 + .5 * u });   // the stone: A pedal
    organ(T.glow + .6, T.dawn - T.glow - .6, [38, 50, 54, 57], .018, { atk: .8 });                  // "he is not here"
    organ(T.dawn, T.day - T.dawn + 1.0, [38, 50, 57, 62, 66], .022, { atk: 1.6 });                  // the dawn
    arp(T.dawn + .4, [50, 57, 62, 66, 69], .75, .07); arp(T.dawn + 4.4, [50, 57, 62], .75, .06);
    organ(T.mary, 1.6, [38, 50, 54, 57, 62], .028, { atk: .2 });                                    // "Mary"
    line([[T.mary + .3, .35, 62], [T.mary + .65, .35, 64], [T.mary + 1.0, .35, 66], [T.mary + 1.35, .35, 67], [T.mary + 1.7, .35, 69], [T.mary + 2.05, .35, 71]], .05);
    recorder(T.mary + 2.4, 1.8, 74, .085);
    organ(T.mary + 1.6, 1.9, [43, 55, 59, 62], .026); organ(T.mary + 3.5, A.J.t0 - T.mary - 3.5 + .6, [38, 50, 57, 62, 66, 69], .028, { amp: (u) => 1 - .4 * u });
    arp(T.mary + 3.5, [50, 57, 62, 66, 69, 74], .375, .1);
    recorder(A.J.t0 + .4, 2.4, 69, .03, { amp: (u) => 1 - .6 * u });                                // in the dark
    organ(A.J.t0 + 2.4, 1.6, [38, 45], .014, { atk: .5 }); harp(A.J.t0 + 2.5, 62, .06);              // the spark
  },

  // No sun: the rose's petals light to a rising harp (one note per petal, D major); its stones are set to the glass
  // (D5 … A6) over a soft D; the pull back opens to G; each gate a bell and a chord (D · G/D · A/D · D); then the
  // Genesis line, the first film's six days, comes back whole on the recorder and resolves to D5 in full D major
  // as the window is seen whole, and fades with the picture.
  '07-jerusalem'({ organ, recorder, harp, line, arp }, A) {
    const T = A.T, P = [50, 54, 57, 62, 66, 69, 74, 78, 81, 86, 81, 78];
    organ(.2, T.stones - .2, [38, 45, 50], .016, { atk: 1.2 });
    P.forEach((m, i) => harp(T.petals + i * T.petalsD / 12, m, .06 + .003 * i, -.3, 3));           // the petals
    organ(T.stones, T.pull - T.stones + .8, [38, 50, 54, 57], .016, { atk: 1.0 });                  // the stones
    organ(T.pull + .4, T.city - T.pull - .4, [43, 50, 55, 59], .018, { atk: 1.0 });                 // the pull: G
    [[38, 50, 54, 57], [38, 50, 55, 59], [38, 52, 57, 61], [38, 50, 57, 62, 66]].forEach((c, k) =>
      organ(T.city + k * T.cityStep, k < 3 ? T.cityStep : 13.0 - T.city - 3 * T.cityStep, c, .022 + .002 * k));   // the gates
    line([[13.0, .72, 62], [13.75, .72, 64], [14.5, .72, 65], [15.25, .72, 67], [16.0, .72, 69], [16.75, .72, 71]], .05);
    organ(13.0, 1.5, [41, 53, 57, 60], .022); organ(14.5, 1.5, [43, 50, 55, 58], .022); organ(16.0, 1.5, [45, 52, 57, 61], .024);   // F · Gm · A
    organ(T.wide - .25, 22.5 - T.wide + .25, [38, 50, 57, 62, 66, 69], .036, { atk: .3, amp: (u) => 1 - .3 * u });   // D major, the window whole
    recorder(T.wide - .25, 3.2, 74, .09); arp(T.wide - .25, [50, 57, 62, 66, 69, 74], .375, .12);
    arp(19.4, [62, 66, 69, 74], .75, .06);
  },
};

const RING = 1.2;
export function score({ SR, rnd, bus, F }) {
  const [BL, BR] = bus, done = [];
  for (const c of F.clips) {
    // a clip without a fade (a joint, Sprint 6) lets its music ring RING s into the next chapter, dying away
    const [f0, f1] = c.A.timing.fade, ring = f1 > f0 ? 0 : RING;
    const n = Math.ceil((c.duration + ring) * SR), L = new Float32Array(n), R = new Float32Array(n), V = voices({ sr: SR, n, rnd, music: [L, R] });
    // Sustained additive voice: parts [[ratio, amp]], ADSR-ish (atk, rel after d), vibrato (cents, fading in after
    // .25 s), chorus (two copies ± cents), breath (low-passed noise), amp(u) = level over the note (u 0..1).
    function tone(t, d, m, o = {}) {
      const f0 = hz(m), parts = o.parts ?? [[1, 1]], v = o.v ?? .1, atk = o.atk ?? .05, rl = o.rel ?? .3;
      const s0 = Math.floor(t * SR), len = Math.min(Math.ceil((d + rl) * SR), n - s0); if (len <= 0 || s0 < 0) return;
      const [gl, gr] = panG(o.pan ?? 0), det = o.chorus ? [-o.chorus, o.chorus] : [0];
      const osc = parts.flatMap(([r, a]) => (f0 * r < SR / 2.2 ? det.map((ct) => ({ f: f0 * r * 2 ** (ct / 1200), a, ph: rnd() * 6.283 })) : []));
      const vibD = o.vib ?? 0, vibW = 2 * Math.PI * (o.vibHz ?? 5) / SR, g = v / det.length;
      let br = 0;
      for (let i = 0; i < len; i++) {
        const ts = i / SR;
        const env = Math.min(1, ts / atk) * (ts < d ? 1 : Math.max(0, 1 - (ts - d) / rl)) * (o.amp ? o.amp(Math.min(1, ts / d)) : 1);
        const fm = vibD ? 2 ** (vibD * Math.min(1, Math.max(0, (ts - .25) / .4)) * Math.sin(vibW * i) / 1200) : 1;
        let y = 0;
        for (const p of osc) { p.ph += 2 * Math.PI * p.f * fm / SR; y += p.a * Math.sin(p.ph); }
        if (o.breath) { br += .08 * (rnd() * 2 - 1 - br); y += o.breath * br * det.length; }
        y *= env * g; L[s0 + i] += y * gl; R[s0 + i] += y * gr;
      }
    }
    const recorder = (t, d, m, v = .09, o = {}) => tone(t, d, m,
      { parts: [[1, 1], [2, .07], [3, .2], [4, .03], [5, .05]], v, atk: .06, rel: .18, vib: 14, vibHz: 5.2, breath: .08, pan: .2, ...o });
    const harp = (t, m, v = .2, pan = -.35, ring = 3.5) => V.pluck({ t, m, v, pan, ring });
    const I = {
      organ: (t, d, ms, v = .03, o = {}) => [].concat(ms).forEach((m, k, all) => {
        const pan = all.length > 1 ? -.5 + k / (all.length - 1) : 0;
        tone(t, d, m, { parts: [[1, 1], [2, .5], [3, .22], [4, .16], [6, .06], [8, .04]], v, atk: .12, rel: .8, chorus: 2.5, pan, ...o });
        V.noise(t, .07, v * .35, pan, [L, R], { bp: Math.min(8000, hz(m) * 5), q: 1.2, dec: .025 });   // pipe chiff
      }),
      recorder, harp,
      line: (notes, v, o) => notes.forEach(([t, d, m]) => recorder(t, d, m, v, o)),                  // [[t, d, midi], …]
      arp: (t, ms, step, v, pan, ring) => ms.forEach((m, k) => harp(t + k * step, m, v, pan, ring)),
    };
    if (SCORES[c.id]) { SCORES[c.id](I, c.A); done.push(c.id); }
    else I.organ(.5, c.duration - 1.5, [38, 45], .02, { atk: 1.5, rel: 1 });                    // not scored yet: a quiet bed
    // the clip's fade cuts its music; lay it at the clip's start
    const s0 = Math.floor(c.start * SR);
    for (let i = 0; i < n && s0 + i < BL.length; i++) {
      const g = ring ? Math.min(1, Math.max(0, 1 - (i / SR - f1) / ring)) : Math.min(1, Math.max(0, (f1 - i / SR) / (f1 - f0)));
      BL[s0 + i] += L[i] * g; BR[s0 + i] += R[i] * g;
    }
  }
  return done;
}
