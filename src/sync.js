import { supabase } from './supabase.js'

// localStorage tetap jadi cache cepat; modul ini menyalinnya ke Supabase dan menggabungkan saat login.
let uid = null
let onError = () => {}

export const setSyncUser = (id) => { uid = id }
export const setSyncErrorHandler = (fn) => { onError = fn }

const fail = (e) => { console.warn('sinkronisasi gagal', e); onError(e) }
const done = ({ error }) => { if (error) fail(error) }
const active = () => Boolean(supabase && uid)

const attemptRow = (a) => ({ user_id: uid, client_id: a.id, taken_at: a.date, pkg_id: a.pkgId, pkg_name: a.pkgName, mode: a.mode, score: a.score, data: a })
const noteRow = (id, n) => ({ user_id: uid, question_id: id, cause: n.cause ?? null, mastered_at: n.masteredAt ?? null, updated_at: n.updatedAt ?? new Date().toISOString() })

export function pushAttempts(list) {
  if (!active() || !list.length) return Promise.resolve()
  return supabase.from('attempts').upsert(list.map(attemptRow), { onConflict: 'user_id,client_id' }).then(done, fail)
}

export function pushNote(id, note) {
  if (!active()) return Promise.resolve()
  return supabase.from('error_notes').upsert(noteRow(id, note), { onConflict: 'user_id,question_id' }).then(done, fail)
}

export function wipeRemote() {
  if (!active()) return Promise.resolve()
  return Promise.all([
    supabase.from('attempts').delete().eq('user_id', uid),
    supabase.from('error_notes').delete().eq('user_id', uid),
  ]).then((rs) => rs.forEach(done), fail)
}

// Tarik data server, gabungkan dengan cache lokal, unggah yang hanya ada di lokal. Mengembalikan hasil gabungan.
export async function syncAll(history, notes) {
  const [a, n] = await Promise.all([
    supabase.from('attempts').select('data').order('taken_at', { ascending: false }).limit(200),
    supabase.from('error_notes').select('question_id, cause, mastered_at, updated_at'),
  ])
  if (a.error || n.error) throw a.error || n.error

  const remote = a.data.map((r) => r.data)
  const remoteNotes = Object.fromEntries(n.data.map((r) => [r.question_id, {
    cause: r.cause ?? undefined, masteredAt: r.mastered_at ?? undefined, updatedAt: r.updated_at,
  }]))

  const have = new Set(remote.map((x) => x.id))
  const upload = history.filter((x) => !have.has(x.id))
  const mergedHistory = [...remote, ...upload].sort((x, y) => y.id - x.id).slice(0, 200)

  const mergedNotes = { ...remoteNotes }
  const upNotes = []
  for (const [id, note] of Object.entries(notes)) {
    const r = remoteNotes[id]
    if (!r || (note.updatedAt || '') > (r.updatedAt || '')) { mergedNotes[id] = note; upNotes.push([id, note]) }
  }

  await Promise.all([pushAttempts(upload), ...upNotes.map(([id, note]) => pushNote(id, note))])
  return { history: mergedHistory, notes: mergedNotes }
}
