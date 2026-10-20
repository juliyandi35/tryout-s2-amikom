import { getQuestion } from './data/index.js'

export const CAUSES = ['Tidak tahu konsepnya', 'Salah hitung', 'Salah baca soal', 'Terburu-buru', 'Menebak']
const MAX_Q = 30

// history: terbaru lebih dulu. notes: { idSoal: { cause, masteredAt } }.
// Soal masuk daftar bila hasil terakhirnya salah/kosong dan belum ditandai paham setelah salah terakhir.
export function collectErrors(history, notes = {}) {
  const seen = {}
  for (const a of history) {
    for (const id of a.order || []) {
      const q = getQuestion(id)
      if (!q) continue
      const picked = a.answers[id]
      const wrong = picked !== q.answer // kosong dianggap salah
      const e = (seen[id] ||= { q, ok: !wrong, times: 0, picked: undefined, lastWrong: null })
      if (wrong) {
        e.times++
        if (!e.lastWrong) { e.lastWrong = a.date; e.picked = picked }
      }
    }
  }
  return Object.values(seen)
    .filter((e) => !e.ok && !(notes[e.q.id]?.masteredAt >= e.lastWrong))
    .sort((x, y) => y.times - x.times || (y.lastWrong > x.lastWrong ? 1 : -1))
}

// Paket latihan dari buku kesalahan: yang paling sering salah didahulukan, maksimal 30 soal.
export function buildErrorPackage(history, notes) {
  const questions = collectErrors(history, notes).slice(0, MAX_Q).map((e) => e.q)
  if (!questions.length) return null
  return {
    id: 'errors',
    label: 'Buku Kesalahan',
    name: 'Latihan Buku Kesalahan',
    duration: Math.ceil(questions.length * 1.25),
    group: 'errors',
    questions,
  }
}
