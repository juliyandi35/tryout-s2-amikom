// Cek cepat mode latihan lemah: topik terlemah dipilih, soal salah didahulukan, tanpa data hasilnya null.
import assert from 'node:assert/strict'
import { PACKAGES } from '../src/data/index.js'
import { buildWeakPackage } from '../src/weak.js'

assert.equal(buildWeakPackage([]), null, 'tanpa riwayat harus null')

const pkg = PACKAGES.find((p) => p.id === 't05') // Penalaran Analitis
const [q1, q2, q3, q4] = pkg.questions
const wrongOf = (q) => (q.answer + 1) % 4
const answers = { [q1.id]: wrongOf(q1), [q2.id]: wrongOf(q2), [q3.id]: wrongOf(q3), [q4.id]: q4.answer }
const attempt = { order: [q1.id, q2.id, q3.id, q4.id], answers, byTopic: { pan: [1, 4] } }

const weak = buildWeakPackage([attempt])
assert.ok(weak, 'topik 25% harus lemah')
assert.equal(weak.weakTopics[0].key, 'pan')
assert.ok(weak.questions.every((q) => q.topic === 'pan'), 'hanya soal topik lemah')
assert.deepEqual(new Set(weak.questions.slice(0, 3).map((q) => q.id)), new Set([q1.id, q2.id, q3.id]), 'soal salah didahulukan')
assert.equal(weak.redo, 3)
assert.ok(weak.questions.length <= 30)

const strong = { order: [q1.id], answers: { [q1.id]: q1.answer }, byTopic: { pan: [9, 10] } }
assert.equal(buildWeakPackage([strong]), null, 'akurasi 90% bukan lemah')
console.log('OK')
