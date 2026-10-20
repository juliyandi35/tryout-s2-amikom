import { useState } from 'react'
import { supabase } from '../supabase.js'
import { Band } from './Ui.jsx'

const MESSAGES = {
  'Invalid login credentials': 'Email atau kata sandi salah.',
  'Email not confirmed': 'Email belum dikonfirmasi. Buka email konfirmasi dari Supabase, lalu masuk lagi.',
  'User already registered': 'Email ini sudah terdaftar. Pilih Masuk.',
}
const MESSAGES2 = {
  'New password should be different from the old password.': 'Kata sandi baru harus berbeda dari yang lama.',
  'Auth session missing!': 'Sesi berakhir. Minta tautan reset baru.',
}
const explain = (e) => MESSAGES[e.message] || MESSAGES2[e.message] || (e.status === 429 ? 'Terlalu banyak percobaan. Tunggu beberapa menit.' : `Gagal: ${e.message}`)

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)

  const signup = mode === 'signup'
  const forgot = mode === 'forgot'

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    if (forgot) {
      setBusy(true)
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin })
      setBusy(false)
      if (error) setMsg({ bad: true, text: explain(error) })
      else setMsg({ text: 'Jika email terdaftar, tautan reset sudah dikirim. Buka email, tekan tautannya, lalu atur kata sandi baru.' })
      return
    }
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
            <h1 className="title" id="auth-h">{forgot ? 'Lupa kata sandi' : signup ? 'Buat akun' : 'Masuk'}</h1>
            <p className="muted">{forgot ? 'Masukkan email akunmu. Kami kirim tautan untuk membuat kata sandi baru.' : 'Riwayat latihan dan buku kesalahanmu tersimpan di akunmu, jadi sama di ponsel dan laptop.'}</p>

            <label>
              <span>Email</span>
              <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            {!forgot && <label>
              <span>Kata sandi</span>
              <input type="password" required={!forgot} minLength={8} autoComplete={signup ? 'new-password' : 'current-password'}
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <small>Minimal 8 karakter.</small>
            </label>}

            {msg && <p className={`auth-msg ${msg.bad ? 'bad' : ''}`} role={msg.bad ? 'alert' : 'status'}>{msg.text}</p>}

            <div className="row">
              <button className="btn" disabled={busy}>{busy ? 'Memproses' : forgot ? 'Kirim tautan' : signup ? 'Daftar' : 'Masuk'}</button>
              <button type="button" className="btn ghost" onClick={() => { setMode(signup || forgot ? 'login' : 'signup'); setMsg(null) }}>
                {signup || forgot ? (forgot ? 'Kembali masuk' : 'Sudah punya akun') : 'Buat akun baru'}
              </button>
              {mode === 'login' && (
                <button type="button" className="btn ghost" onClick={() => { setMode('forgot'); setMsg(null) }}>Lupa kata sandi?</button>
              )}
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

// Atur kata sandi baru: setelah tautan reset (recovery) atau dari menu akun (ganti sandi).
export function NewPassword({ recovery, email, onDone, bandProps }) {
  const [current, setCurrent] = useState('')
  const [pw, setPw] = useState('')
  const [again, setAgain] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    if (pw.length < 8) { setMsg({ bad: true, text: 'Kata sandi minimal 8 karakter.' }); return }
    if (pw !== again) { setMsg({ bad: true, text: 'Konfirmasi kata sandi tidak sama.' }); return }
    setBusy(true)
    if (!recovery) {
      const { error } = await supabase.auth.signInWithPassword({ email, password: current })
      if (error) { setBusy(false); setMsg({ bad: true, text: 'Kata sandi saat ini salah.' }); return }
    }
    const { error } = await supabase.auth.updateUser({ password: pw })
    setBusy(false)
    if (error) { setMsg({ bad: true, text: explain(error) }); return }
    setCurrent(''); setPw(''); setAgain('')
    setMsg({ text: 'Kata sandi berhasil diubah.' })
    if (recovery) setTimeout(onDone, 1200)
  }

  return (
    <div className="desk">
      <div className="sheet">
        {recovery
          ? <Band page="auth" onNav={() => {}}><span className="band-note">Atur kata sandi baru</span></Band>
          : <Band page="password" {...bandProps} />}
        <main className="page">
          <form className="auth-form" onSubmit={submit} aria-labelledby="pw-h">
            <h1 className="title" id="pw-h">{recovery ? 'Kata sandi baru' : 'Ganti kata sandi'}</h1>
            {!recovery && (
              <label>
                <span>Kata sandi saat ini</span>
                <input type="password" required autoComplete="current-password" value={current} onChange={(e) => setCurrent(e.target.value)} />
              </label>
            )}
            <label>
              <span>Kata sandi baru</span>
              <input type="password" required minLength={8} autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} />
              <small>Minimal 8 karakter.</small>
            </label>
            <label>
              <span>Ulangi kata sandi baru</span>
              <input type="password" required minLength={8} autoComplete="new-password" value={again} onChange={(e) => setAgain(e.target.value)} />
            </label>

            {msg && <p className={`auth-msg ${msg.bad ? 'bad' : ''}`} role={msg.bad ? 'alert' : 'status'}>{msg.text}</p>}

            <div className="row">
              <button className="btn" disabled={busy}>{busy ? 'Memproses' : 'Simpan'}</button>
              {!recovery && <button type="button" className="btn ghost" onClick={onDone}>Kembali</button>}
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
