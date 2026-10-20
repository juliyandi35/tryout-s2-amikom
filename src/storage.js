import { PACKAGES } from './data/index.js'
import { pushAttempts, pushNote, wipeRemote } from './sync.js'

const KEY = 'amikom_tryout_history_v1'

// Riwayat tryout lama (paket yang sudah dihapus) disembunyikan agar pembahasannya tidak error.
export function loadHistory() {
  try {
    return (JSON.parse(localStorage.getItem(KEY)) || []).filter((a) => a.pkgId === 'weak' || a.pkgId === 'errors' || PACKAGES.some((p) => p.id === a.pkgId))
  } catch { return [] }
}

export function saveAttempt(a) {
  const h = loadHistory()
  h.unshift(a)
  try { localStorage.setItem(KEY, JSON.stringify(h.slice(0, 200))) } catch { /* storage penuh/diblokir */ }
  pushAttempts([a])
}

export function clearHistory() {
  try { localStorage.removeItem(KEY); localStorage.removeItem(NOTES_KEY) } catch { /* abaikan */ }
  wipeRemote()
}

// Cache lokal milik satu akun. Saat akun berganti, cache lama dibuang agar data tidak tercampur.
const UID_KEY = 'amikom_cache_uid'
export function cachedUser() {
  try { return localStorage.getItem(UID_KEY) } catch { return null }
}
export function cacheReplace(history, notes, uid) {
  try {
    localStorage.setItem(KEY, JSON.stringify(history.slice(0, 200)))
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
    if (uid) localStorage.setItem(UID_KEY, uid)
  } catch { /* storage penuh/diblokir */ }
}
export function clearLocal() {
  try { localStorage.removeItem(KEY); localStorage.removeItem(NOTES_KEY); localStorage.removeItem(UID_KEY) } catch { /* abaikan */ }
}

// Catatan buku kesalahan: { idSoal: { cause, masteredAt } }
const NOTES_KEY = 'amikom_error_notes_v1'

export function loadNotes() {
  try { return JSON.parse(localStorage.getItem(NOTES_KEY)) || {} } catch { return {} }
}

// Gabungkan perubahan ke catatan satu soal (nilai undefined menghapus kolom), simpan, dan kembalikan seluruh catatan.
export function saveNote(id, patch) {
  const notes = loadNotes()
  const merged = { ...notes[id], ...patch }
  Object.keys(merged).forEach((k) => merged[k] === undefined && delete merged[k])
  merged.updatedAt = new Date().toISOString()
  notes[id] = merged
  try { localStorage.setItem(NOTES_KEY, JSON.stringify(notes)) } catch { /* storage penuh/diblokir */ }
  pushNote(id, merged)
  return notes
}

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export const fmtTime = (s) => {
  s = Math.max(0, Math.round(s))
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60
  const mm = String(m).padStart(2, '0'), ss = String(sec).padStart(2, '0')
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}
