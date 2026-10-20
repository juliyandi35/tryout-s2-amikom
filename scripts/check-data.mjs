// Validasi bank soal: jumlah, 4 opsi, indeks jawaban, topik dikenal, dan keseimbangan panjang opsi.
import { PACKAGES, TOPICS } from '../src/data/index.js'

const MIN_Q = { tka: 25, sim: 25 }
const MAX_RATIO = 2.5 // opsi terpanjang maks 2,5x opsi terpendek...
const SLACK = 12 // ...kecuali selisihnya <= 12 karakter
const MAX_LONGEST_RATE = 0.35 // jawaban benar sebagai satu-satunya opsi terpanjang: acak = 25%

let bad = 0
for (const p of PACKAGES) {
  if (p.questions.length < MIN_Q[p.group]) { console.log(p.id, 'hanya', p.questions.length, 'soal'); bad++ }
  let longest = 0, lopsided = 0
  for (const q of p.questions) {
    const ok = TOPICS[q.topic] && q.options.length === 4 && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4 && q.q && q.explain
    if (!ok) { console.log('rusak:', q.id); bad++; continue }
    const len = q.options.map((o) => o.length)
    const max = Math.max(...len), min = Math.min(...len)
    if (len[q.answer] === max && len.filter((l) => l === max).length === 1) longest++
    if (max / min > MAX_RATIO && max - min > SLACK) {
      lopsided++
      console.log('timpang:', q.id, len.join('/')); bad++
    }
  }
  const dist = [0, 0, 0, 0]; p.questions.forEach((q) => dist[q.answer]++)
  const rate = longest / p.questions.length
  const flag = rate > MAX_LONGEST_RATE
  if (flag) bad++
  console.log(p.id, p.questions.length, 'soal; A-D:', dist.join('/'),
    `; benar=terpanjang ${Math.round(rate * 100)}%${flag ? ' (TERLALU TINGGI)' : ''}; timpang ${lopsided}`)
}
console.log(bad ? `${bad} masalah` : 'OK')
process.exit(bad ? 1 : 0)
