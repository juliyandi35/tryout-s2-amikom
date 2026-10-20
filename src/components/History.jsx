import { useState } from 'react'
import { PACKAGES, TOPICS } from '../data/index.js'
import { fmtTime } from '../storage.js'
import { Band, Dots } from './Ui.jsx'

function Trend({ items }) {
  // items: attempt terlama -> terbaru
  if (items.length < 2) return <p className="hint">Kerjakan minimal 2 sesi untuk melihat grafik tren.</p>
  const W = 640, H = 160, P = 28
  const x = (i) => P + (i * (W - 2 * P)) / (items.length - 1)
  const y = (s) => H - P - (s / 100) * (H - 2 * P)
  const pts = items.map((a, i) => `${x(i)},${y(a.score)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="trend" role="img" aria-label="Grafik skor per sesi">
      {[0, 50, 100].map((g) => (
        <g key={g}><line x1={P} x2={W - P} y1={y(g)} y2={y(g)} className="grid" /><text x={2} y={y(g) + 4}>{g}</text></g>
      ))}
      <polyline points={pts} className="line" />
      {items.map((a, i) => <circle key={a.id} cx={x(i)} cy={y(a.score)} r="4.5" className="dot"><title>{`${a.score}, ${a.pkgName}`}</title></circle>)}
    </svg>
  )
}

export default function History({ history, errorCount, onNav, onOpen, onClear }) {
  const [sure, setSure] = useState(false)
  const chrono = [...history].reverse()

  const stat = {}
  history.forEach((a) => Object.entries(a.byTopic).forEach(([t, [c, n]]) => {
    stat[t] = stat[t] || [0, 0]; stat[t][0] += c; stat[t][1] += n
  }))
  const topics = Object.entries(stat).map(([t, [c, n]]) => ({ t, p: Math.round((c / n) * 100), n })).sort((a, b) => a.p - b.p)
  const totalSec = history.reduce((s, a) => s + a.usedSec, 0)
  const avg = history.length ? Math.round(history.reduce((s, a) => s + a.score, 0) / history.length) : 0
  const tried = new Set(history.filter((a) => PACKAGES.some((p) => p.id === a.pkgId)).map((a) => a.pkgId)).size

  return (
    <div className="desk">
      <div className="sheet">
        <Band page="history" onNav={onNav} errorCount={errorCount} />
        <main className="page narrow">
          <header className="page-head"><h1>Riwayat dan progres</h1></header>

          {!history.length ? <p className="box hint">Belum ada sesi. Kerjakan satu paket dulu.</p> : (
            <>
              <dl className="form-rows" aria-label="Ringkasan">
                <div><dt>Sesi selesai</dt><dd>{history.length}</dd></div>
                <div><dt>Rata-rata skor</dt><dd>{avg}</dd></div>
                <div><dt>Total waktu belajar</dt><dd>{fmtTime(totalSec)}</dd></div>
                <div><dt>Paket dicoba</dt><dd>{tried} dari {PACKAGES.length}</dd></div>
              </dl>

              <section className="section"><h2 className="label">Tren skor</h2><Trend items={chrono.slice(-20)} /></section>

              <section className="section">
                <h2 className="label">Akurasi per topik, kumulatif</h2>
                <ul className="topic-rows">
                  {topics.map(({ t, p, n }) => (
                    <li key={t}>
                      <span>{TOPICS[t]}</span>
                      <Dots value={p} />
                      <span className="val num">{p}%, {n} soal</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="section">
                <h2 className="label">Semua sesi</h2>
                <ul className="hist">
                  {history.map((a) => (
                    <li key={a.id}>
                      <button onClick={() => onOpen(a)}>
                        <span><b>{a.pkgName}</b>, {a.mode === 'exam' ? 'ujian' : 'latihan'}</span>
                        <span className="muted">{new Date(a.date).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                        <span className="num">{a.correct}/{a.total}, skor {a.score}, {fmtTime(a.usedSec)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                {sure
                  ? <div className="row"><span>Hapus semua riwayat dan catatan buku kesalahan?</span><button className="btn danger sm" onClick={() => { onClear(); setSure(false) }}>Ya, hapus</button><button className="btn ghost sm" onClick={() => setSure(false)}>Batal</button></div>
                  : <button className="btn ghost sm" onClick={() => setSure(true)}>Hapus riwayat</button>}
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
