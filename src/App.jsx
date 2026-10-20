import { useEffect, useMemo, useState } from 'react'
import { PACKAGES } from './data/index.js'
import { loadHistory, loadNotes, saveAttempt, clearHistory, shuffle, cachedUser, cacheReplace, clearLocal } from './storage.js'
import { supabase } from './supabase.js'
import { setSyncUser, setSyncErrorHandler, syncAll } from './sync.js'
import { buildWeakPackage } from './weak.js'
import { buildErrorPackage, collectErrors } from './errors.js'
import { AccountContext } from './components/Ui.jsx'
import Auth, { NewPassword } from './components/Auth.jsx'
import Home from './components/Home.jsx'
import Quiz from './components/Quiz.jsx'
import Result from './components/Result.jsx'
import Review from './components/Review.jsx'
import History from './components/History.jsx'
import ErrorBook from './components/ErrorBook.jsx'

export default function App() {
  const [view, setView] = useState({ name: 'home' })
  const [history, setHistory] = useState(loadHistory)
  // undefined = sedang memeriksa sesi; null = belum masuk (atau mode lokal tanpa Supabase)
  const [session, setSession] = useState(supabase ? undefined : null)
  const [recovering, setRecovering] = useState(false) // datang dari tautan reset kata sandi
  const [syncError, setSyncError] = useState(false)
  const errorCount = useMemo(() => collectErrors(history, loadNotes()).length, [history, view.name])

  useEffect(() => {
    setSyncErrorHandler(() => setSyncError(true))
    if (!supabase) return undefined
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === 'PASSWORD_RECOVERY') setRecovering(true)
      setSession(s)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  const uid = session?.user?.id
  useEffect(() => {
    if (!supabase || !uid) return undefined
    let live = true
    setSyncUser(uid)
    if (cachedUser() && cachedUser() !== uid) clearLocal() // akun lain: jangan campur data
    syncAll(loadHistory(), loadNotes())
      .then(({ history: merged, notes }) => {
        if (!live) return
        cacheReplace(merged, notes, uid)
        setHistory(loadHistory())
        setSyncError(false)
      })
      .catch(() => live && setSyncError(true))
    return () => { live = false }
  }, [uid])

  const account = useMemo(() => {
    if (!supabase || !session) return null
    const signOut = async () => {
      await supabase.auth.signOut()
      clearLocal()
      setSyncUser(null)
      setHistory([])
      setView({ name: 'home' })
    }
    return { email: session.user.email, signOut }
  }, [session])

  const start = (pkgId, mode) => {
    const pkg = pkgId === 'weak' ? buildWeakPackage(history)
      : pkgId === 'errors' ? buildErrorPackage(history, loadNotes())
        : PACKAGES.find((p) => p.id === pkgId)
    if (!pkg) return
    setView({ name: 'quiz', pkg, mode, order: shuffle(pkg.questions.map((q) => q.id)) })
  }

  const finish = (attempt) => {
    saveAttempt(attempt)
    setHistory(loadHistory())
    setView({ name: 'result', attempt })
  }

  const wipe = () => { clearHistory(); setHistory([]) }
  const nav = (name) => setView({ name })
  const common = { errorCount, onNav: nav }

  if (supabase && session === undefined) return <div className="desk"><p className="muted" style={{ padding: 24 }}>Memeriksa sesi...</p></div>
  if (supabase && !session) return <Auth />
  if (recovering) return <NewPassword recovery onDone={() => setRecovering(false)} />

  return (
    <AccountContext.Provider value={account}>
      <div className="app">
        {view.name === 'home' && <Home history={history} onStart={start} {...common} />}
        {view.name === 'errors' && <ErrorBook history={history} onStart={start} {...common} />}
        {view.name === 'quiz' && (
          <Quiz key={view.order.join()} pkg={view.pkg} mode={view.mode} order={view.order}
            onFinish={finish} onExit={() => nav('home')} />
        )}
        {view.name === 'result' && (
          <Result attempt={view.attempt} {...common}
            onReview={() => setView({ name: 'review', attempt: view.attempt, back: 'result' })}
            onRetry={() => start(view.attempt.pkgId, view.attempt.mode)} />
        )}
        {view.name === 'review' && (
          <Review attempt={view.attempt} {...common}
            onBack={() => setView(view.back === 'history' ? { name: 'history' } : { name: 'result', attempt: view.attempt })} />
        )}
        {view.name === 'password' && account && (
          <NewPassword email={account.email} bandProps={common} onDone={() => nav('home')} />
        )}
        {view.name === 'history' && (
          <History history={history} onClear={wipe} {...common}
            onOpen={(a) => setView({ name: 'review', attempt: a, back: 'history' })} />
        )}
        {syncError && (
          <div className="sync-note" role="status">
            <span>Belum tersinkron ke server. Data tetap tersimpan di perangkat ini.</span>
            <button className="btn ghost sm" onClick={() => setSyncError(false)}>Tutup</button>
          </div>
        )}
      </div>
    </AccountContext.Provider>
  )
}
