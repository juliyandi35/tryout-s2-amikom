import { useState } from 'react'
import { supabase } from '../supabase.js'
import { Band } from './Ui.jsx'

const MESSAGES = {
  'Invalid login credentials': 'Email atau kata sandi salah.',
  'Email not confirmed': 'Email belum dikonfirmasi. Buka email konfirmasi dari Supabase, lalu masuk lagi.',
  'User already registered': 'Email ini sudah terdaftar. Pilih Masuk.',
}
const explain = (e) => MESSAGES[e.message] || (e.status === 429 ? 'Terlalu banyak percobaan. Tunggu beberapa menit.' : `Gagal: ${e.message}`)

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)

  const signup = mode === 'signup'

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    if (password.length < 8) { setMsg({ bad: true, text: 'Kata sandi minimal 8 karakter.' }); return }
    setBusy(true)
    const { data, error } = signup
      ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } })
      : await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (error) { setMsg({ bad: true, text: explain(error) }); return }
    if (signup && !data.session) setMsg({ text: 'Akun dibuat. Buka email konfirmasi, tekan tautannya, lalu kembali ke sini dan pilih Masuk.' })
  }

  return (
    <div className="desk">
      <div className="sheet">
        <Band page="auth" onNav={() => {}}><span className="band-note">Masuk untuk menyimpan riwayat</span></Band>
        <main className="page">
          <form className="auth-form" onSubmit={submit} aria-labelledby="auth-h">
            <h1 className="title" id="auth-h">{signup ? 'Buat akun' : 'Masuk'}</h1>
            <p className="muted">Riwayat latihan dan buku kesalahanmu tersimpan di akunmu, jadi sama di ponsel dan laptop.</p>

            <label>
              <span>Email</span>
              <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              <span>Kata sandi</span>
              <input type="password" required minLength={8} autoComplete={signup ? 'new-password' : 'current-password'}
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <small>Minimal 8 karakter.</small>
            </label>

            {msg && <p className={`auth-msg ${msg.bad ? 'bad' : ''}`} role={msg.bad ? 'alert' : 'status'}>{msg.text}</p>}

            <div className="row">
              <button className="btn" disabled={busy}>{busy ? 'Memproses' : signup ? 'Daftar' : 'Masuk'}</button>
              <button type="button" className="btn ghost" onClick={() => { setMode(signup ? 'login' : 'signup'); setMsg(null) }}>
                {signup ? 'Sudah punya akun' : 'Buat akun baru'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
