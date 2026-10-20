import { PACKAGES, TOPICS, getQuestion } from './data/index.js'
import { shuffle } from './storage.js'

const MAX_Q = 30 // jumlah soal per sesi
const MIN_ANSWERED = 3 // topik baru dianggap terukur setelah minimal 3 soal dijawab
const WEAK_BELOW = 85 // akurasi (%) di bawah ini dianggap lemah
const WEAK_TOPICS = 3 // banyak topik terlemah yang dilatih

// history: riwayat terbaru lebih dulu. Mengembalikan paket latihan soal lemah, atau null bila belum ada data cukup.
export function buildWeakPackage(history) {
  const stat = {} // topik -> [benar, total]
  const lastOk = {} // id soal -> benar pada pengerjaan terakhir
  for (const a of history) {
    for (const [key, [c, t]] of Object.entries(a.byTopic || {})) {
      const s = (stat[key] ||= [0, 0])
      s[0] += c
      s[1] += t
    }
    for (const id of a.order || []) {
      if (id in lastOk) continue
      const q = getQuestion(id)
      if (q) lastOk[id] = a.answers[id] === q.answer // kosong dianggap salah
    }
  }

  const weakTopics = Object.entries(stat)
    .filter(([key, [, total]]) => total >= MIN_ANSWERED && TOPICS[key])
    .map(([key, [c, total]]) => ({ key, total, percent: Math.round((c / total) * 100) }))
    .filter((t) => t.percent < WEAK_BELOW)
    .sort((x, y) => x.percent - y.percent)
    .slice(0, WEAK_TOPICS)
  if (!weakTopics.length) return null

  const keys = new Set(weakTopics.map((t) => t.key))
  const pool = PACKAGES.filter((p) => p.group === 'tka').flatMap((p) => p.questions).filter((q) => keys.has(q.topic))
  // Prioritas: salah terakhir kali, lalu belum pernah dicoba, lalu yang sudah benar.
  const wrong = pool.filter((q) => lastOk[q.id] === false)
  const unseen = pool.filter((q) => !(q.id in lastOk))
  const right = pool.filter((q) => lastOk[q.id] === true)
  const questions = [...shuffle(wrong), ...shuffle(unseen), ...shuffle(right)].slice(0, MAX_Q)
  if (!questions.length) return null

  return {
    id: 'weak',
    label: 'Latihan Lemah',
    name: 'Latihan Soal Lemah',
    duration: Math.ceil(questions.length * 1.25),
    group: 'weak',
    weakTopics,
    redo: wrong.length,
    questions,
  }
}
