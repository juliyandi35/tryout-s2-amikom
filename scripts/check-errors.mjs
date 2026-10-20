// Cek cepat buku kesalahan: salah terakhir masuk, sudah benar keluar, tanda paham menyembunyikan sampai salah lagi.
import assert from 'node:assert/strict'
import { PACKAGES } from '../src/data/index.js'
import { collectErrors, buildErrorPackage } from '../src/errors.js'

const [q1, q2] = PACKAGES.find((p) => p.id === 't05').questions
const wrong = (q) => (q.answer + 1) % 4
const at = (date, answers) => ({ date, order: Object.keys(answers), answers })

assert.deepEqual(collectErrors([]), [], 'tanpa riwayat kosong')
assert.equal(buildErrorPackage([]), null)

const h1 = at('2026-10-01T10:00:00Z', { [q1.id]: wrong(q1), [q2.id]: q2.answer })
let errs = collectErrors([h1])
assert.deepEqual(errs.map((e) => e.q.id), [q1.id], 'hanya yang salah')
assert.equal(errs[0].picked, wrong(q1))

const h2 = at('2026-10-02T10:00:00Z', { [q1.id]: q1.answer }) // diperbaiki kemudian
assert.deepEqual(collectErrors([h2, h1]), [], 'benar di sesi terbaru = keluar')

const h3 = at('2026-10-03T10:00:00Z', {}) // q1 kosong dianggap salah
h3.order = [q1.id]
assert.equal(collectErrors([h3, h2, h1])[0].times, 2, 'salah dua kali (sesi 1 dan 3)')

const notes = { [q1.id]: { masteredAt: '2026-10-04T00:00:00Z' } }
assert.deepEqual(collectErrors([h3, h2, h1], notes), [], 'ditandai paham setelah salah terakhir')
const h4 = at('2026-10-05T10:00:00Z', { [q1.id]: wrong(q1) })
assert.equal(collectErrors([h4, h3, h2, h1], notes).length, 1, 'salah lagi setelah paham = muncul lagi')

assert.equal(buildErrorPackage([h1]).questions.length, 1)
console.log('OK')
