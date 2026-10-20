import t01 from './t01.js'
import t02 from './t02.js'
import t03 from './t03.js'
import t04 from './t04.js'
import t05 from './t05.js'
import t06 from './t06.js'
import t07 from './t07.js'
import t08 from './t08.js'
import t09 from './t09.js'
import t10 from './t10.js'
import t11 from './t11.js'
import t12 from './t12.js'
import t13 from './t13.js'
import t14 from './t14.js'
import t15 from './t15.js'
import t16 from './t16.js'
import t17 from './t17.js'
import t18 from './t18.js'
import t19 from './t19.js'
import t20 from './t20.js'
import t21 from './t21.js'
import t22 from './t22.js'
import t23 from './t23.js'
import t24 from './t24.js'
import t25 from './t25.js'
import t26 from './t26.js'

// TKA (Tes Kemampuan Akademik): kemampuan umum, bukan materi kurikulum
export const TOPICS = {
  sin: 'Sinonim & Antonim',
  ana: 'Analogi Verbal',
  bac: 'Pemahaman Bacaan',
  sil: 'Silogisme & Logika',
  pan: 'Penalaran Analitis',
  der: 'Deret Angka & Huruf',
  ari: 'Aritmetika & Soal Cerita',
  kua: 'Penalaran Kuantitatif',
  dat: 'Interpretasi Data',
  fig: 'Penalaran Figural & Spasial',
  mel: 'Melengkapi Kalimat & Kata Tak Sepadan',
  kri: 'Penalaran Kritis',
  bin: 'Bahasa Indonesia',
}

// Posisi opsi diacak deterministik per soal (seed dari id) agar sebaran A-D merata dan konsisten saat pembahasan.
function mixOptions(id, options, answer, target) {
  let s = 2166136261
  for (const ch of id) s = Math.imul(s ^ ch.charCodeAt(0), 16777619) >>> 0
  const rnd = () => { // mulberry32
    s = (s + 0x6d2b79f5) >>> 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const rest = options.map((_, i) => i).filter((i) => i !== answer)
  for (let i = rest.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [rest[i], rest[j]] = [rest[j], rest[i]]
  }
  rest.splice(target, 0, answer) // jawaban benar di posisi target (merata A-D)
  return { options: rest.map((i) => options[i]), answer: target }
}

const build = (id, label, name, duration, group, raw) => {
  const seed = Number(id.slice(1))
  return {
    id, label, name, duration, group,
    questions: raw.map(([topic, q, options, answer, explain], j) => {
      const qid = `${id}-${j + 1}`
      return { id: qid, topic, q, ...mixOptions(qid, options, answer, (j + seed - 1) % 4), explain }
    }),
  }
}

// Modul TKA: [nama topik, bank soal set A, bank soal set B, menit]
const TKA_TOPICS = [
  ['Sinonim & Antonim', t01, t14, 25],
  ['Analogi Verbal', t02, t15, 25],
  ['Pemahaman Bacaan', t03, t16, 40],
  ['Silogisme & Logika Deduktif', t04, t17, 35],
  ['Penalaran Analitis', t05, t18, 45],
  ['Deret Angka & Huruf', t06, t19, 30],
  ['Aritmetika & Soal Cerita', t07, t20, 45],
  ['Penalaran Kuantitatif', t08, t21, 45],
  ['Interpretasi Data', t09, t22, 40],
  ['Penalaran Figural & Spasial', t10, t23, 35],
  ['Melengkapi Kalimat & Kata Tak Sepadan', t11, t24, 25],
  ['Penalaran Kritis', t12, t25, 40],
  ['Bahasa Indonesia', t13, t26, 25],
]

// id tetap (t01–t13 = set A, t14–t26 = set B) agar riwayat lama tidak bergeser; urutan tampil per topik.
const pad = (n) => String(n).padStart(2, '0')
const tka = TKA_TOPICS.flatMap(([name, rawA, rawB, min], i) => [
  [`t${pad(i + 1)}`, `${name} · Set A`, rawA, min],
  [`t${pad(i + 14)}`, `${name} · Set B`, rawB, min],
]).map(([id, name, raw, min], pos) => build(id, `Modul ${pad(pos + 1)}`, name, min, 'tka', raw))

// Simulasi TKA: 2 soal dari tiap modul (26 modul = 52 soal), tidak ada soal yang sama antarsimulasi.
const SIM_COUNT = 10
const sims = Array.from({ length: SIM_COUNT }, (_, k) => ({
  id: `s${pad(k + 1)}`, label: `Simulasi ${k + 1}`, name: `Simulasi TKA ${k + 1}`,
  duration: 60, group: 'sim',
  questions: tka.flatMap((m) => [k, Math.floor(m.questions.length / 2) + k].map((j) => m.questions[j])),
}))

export const GROUPS = {
  tka: 'Modul latihan TKA',
  sim: 'Simulasi TKA (campuran semua modul)',
}

export const PACKAGES = [...tka, ...sims]

const index = {}
PACKAGES.forEach((p) => p.questions.forEach((q) => (index[q.id] = q)))
export const getQuestion = (id) => index[id]
