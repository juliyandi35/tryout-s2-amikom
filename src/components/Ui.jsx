import { createContext, useContext } from 'react'
import { House, Notebook, ClockCounterClockwise, SignOut } from '@phosphor-icons/react'

const ICON = { size: 18, weight: 'bold', 'aria-hidden': true }

// Akun yang sedang masuk: { email, signOut }. Null bila aplikasi berjalan lokal tanpa login.
export const AccountContext = createContext(null)

// Pita cetak di atas lembar: nama aplikasi dan navigasi utama.
export function Band({ page, onNav, errorCount = 0, children }) {
  const account = useContext(AccountContext)
  const item = (key, label, icon, count) => (
    <button key={key} className="band-btn" aria-label={count > 0 ? `${label}, ${count}` : label} aria-current={page === key ? 'page' : undefined} onClick={() => onNav(key)}>
      {icon}<span className="lbl">{label}</span>{count > 0 && <span className="count">{count}</span>}
    </button>
  )
  return (
    <header className={`band ${page === 'quiz' ? 'quiz-band' : ''}`}>
      <a className="brand" href="#beranda" onClick={(e) => { e.preventDefault(); onNav('home') }}>
        Ruang Belajar <small>Latihan TKA AMIKOM</small>
      </a>
      {children || (
        <nav aria-label="Navigasi utama">
          {item('home', 'Beranda', <House {...ICON} />)}
          {item('errors', 'Buku kesalahan', <Notebook {...ICON} />, errorCount)}
          {item('history', 'Riwayat', <ClockCounterClockwise {...ICON} />)}
          {account && (
            <button className="band-btn" title={account.email} aria-label={`Keluar dari akun ${account.email}`} onClick={account.signOut}>
              <SignOut {...ICON} /><span className="lbl">Keluar akun</span>
            </button>
          )}
        </nav>
      )}
    </header>
  )
}

// Satu bulatan lembar jawaban. on = dihitamkan.
export function Bubble({ on = false, tone, size, children }) {
  return <span className={`bubble ${on ? 'on' : ''} ${tone || ''} ${size || ''}`} aria-hidden="true"><span>{children}</span></span>
}

// Sepuluh bulatan kecil terisi sebanding nilai 0-100.
export function Dots({ value }) {
  const filled = Math.round(Math.max(0, Math.min(100, value)) / 10)
  return (
    <span className="dots" aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => <Bubble key={i} size="sm" on={i < filled} />)}
    </span>
  )
}
