import { useMemo, useState } from 'react'
import { Play } from '@phosphor-icons/react'
import { PACKAGES, TOPICS, GROUPS } from '../data/index.js'
import { buildWeakPackage } from '../weak.js'
import { collectErrors } from '../errors.js'
import { loadNotes } from '../storage.js'
import { Band, Bubble, Dots } from './Ui.jsx'

const MIN_ANSWERED = 3
const fmtDate = (d) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

export default function Home({ history, onStart, onNav }) {
  const [mode, setMode] = useState('practice')
  const [picked, setPicked] = useState(null)

  const real = history.filter((a) => a.pkgId !== 'weak' && a.pkgId !== 'errors')
  const latest = history[0]
  const weakPkg = useMemo(() => buildWeakPackage(history), [history])
  const errorCount = useMemo(() => collectErrors(history, loadNotes()).length, [history])
  const continuePkg = PACKAGES.find((p) => p.id === latest?.pkgId) || PACKAGES.find((p) => p.id === real[0]?.pkgId) || PACKAGES[0]

  const topicRows = useMemo(() => {
    const stat = {}
    history.forEach((a) => Object.entries(a.byTopic || {}).forEach(([key, [c, t]]) => {
      const s = (stat[key] ||= [0, 0])
      s[0] += c
      s[1] += t
    }))
    return Object.entries(TOPICS).map(([key, name]) => {
      const [c, t] = stat[key] || [0, 0]
      return { key, name, percent: t ? Math.round((c / t) * 100) : null, measured: t >= MIN_ANSWERED }
    })
  }, [history])
  const measured = topicRows.filter((t) => t.measured).sort((x, y) => x.percent - y.percent)
  const unmeasured = topicRows.length - measured.length

  const choices = [
    {
      id: 'weak', title: 'Latihan soal lemah', disabled: !weakPkg,
      sub: weakPkg
        ? `${weakPkg.questions.length} soal dari ${weakPkg.weakTopics.map((t) => TOPICS[t.key]).join(', ')}.`
        : history.length ? 'Belum ada topik dengan akurasi di bawah 85%.' : 'Belum ada riwayat. Kerjakan satu paket dulu.',
    },
    {
      id: 'errors', title: 'Buku kesalahan', disabled: !errorCount,
      sub: errorCount ? `${errorCount} soal menunggu diulang, yang paling sering salah lebih dulu.` : 'Belum ada soal yang salah.',
    },
    {
      id: continuePkg.id, title: real.length ? `Ulangi ${continuePkg.name}` : `Mulai dari ${continuePkg.name}`, disabled: false,
      sub: `${continuePkg.questions.length} soal, ${continuePkg.duration} menit.`,
    },
  ]
  const selectedId = picked && choices.find((c) => c.id === picked && !c.disabled) ? picked : (choices.find((c) => !c.disabled) || choices[2]).id

  const tries = (id) => history.filter((a) => a.pkgId === id)
  const best = (id) => Math.max(...tries(id).map((a) => a.score))
  const avg = real.length ? Math.round(real.reduce((s, a) => s + a.score, 0) / real.length) : null

  const ModeSwitch = () => (
    <div className="mode" role="group" aria-label="Cara mengerjakan">
      <button aria-pressed={mode === 'practice'} onClick={() => setMode('practice')}>Latihan</button>
      <button aria-pressed={mode === 'exam'} onClick={() => setMode('exam')}>Ujian</button>
    </div>
  )

  return (
    <div className="desk">
      <div className="sheet">
        <Band page="home" onNav={onNav} errorCount={errorCount} />
        <main className="page" id="beranda">
          <dl className="form-head">
            <div><dt>Tanggal</dt><dd>{fmtDate(Date.now())}</dd></div>
            <div><dt>Sesi selesai</dt><dd>{real.length}</dd></div>
            <div><dt>Rata-rata skor</dt><dd>{avg ?? '-'}</dd></div>
          </dl>

          <div className="pick-grid">
            <section className="pick" aria-labelledby="pick-h">
              <h1 className="title" id="pick-h">Mau latihan apa sekarang?</h1>
              <ul className="choices" role="radiogroup" aria-labelledby="pick-h">
                {choices.map((c, i) => (
                  <li key={c.id}>
                    <button className="choice" role="radio" aria-checked={selectedId === c.id} disabled={c.disabled} onClick={() => setPicked(c.id)}>
                      <Bubble on={selectedId === c.id && !c.disabled}>{'ABC'[i]}</Bubble>
                      <span><b>{c.title}</b><small>{c.sub}</small></span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="start-row">
                <ModeSwitch />
                <button className="btn" onClick={() => onStart(selectedId, mode)}><Play size={18} weight="fill" aria-hidden="true" />Mulai</button>
                <p className="start-note">{mode === 'exam' ? 'Ujian: ada hitung mundur, pembahasan setelah selesai.' : 'Latihan: tanpa batas waktu, pembahasan langsung setelah menjawab.'}</p>
              </div>

              <section className="last-session" aria-labelledby="last-h">
                <h2 id="last-h">Sesi terakhir</h2>
                {latest ? (
                  <dl className="form-rows">
                    <div><dt>Paket</dt><dd className="text">{latest.pkgName}</dd></div>
                    <div><dt>Skor</dt><dd>{latest.score} dari 100</dd></div>
                    <div><dt>Selesai pukul</dt><dd>{new Date(latest.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</dd></div>
                  </dl>
                ) : (
                  <p className="muted">Belum ada sesi. Hasil sesi pertamamu muncul di sini.</p>
                )}
              </section>
            </section>

            <section className="strength" aria-labelledby="strength-h">
              <h2 className="label" id="strength-h">Kekuatan topik</h2>
              {measured.length > 0 && (
                <ul>
                  {measured.map((t) => (
                    <li key={t.key} className={t.percent < 85 ? 'weak' : ''}>
                      <span>{t.name}</span>
                      <Dots value={t.percent} />
                      <span className="pct num">{t.percent}%</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="muted empty-note">
                {unmeasured === topicRows.length
                  ? `Belum ada topik yang terukur. Topik terisi setelah kamu menjawab minimal ${MIN_ANSWERED} soal di topik itu.`
                  : unmeasured > 0 ? `${unmeasured} topik belum terukur.` : 'Semua topik sudah terukur.'}
              </p>
            </section>
          </div>

          <section className="library" id="paket" aria-labelledby="lib-h">
            <div className="library-head">
              <h2 className="label" id="lib-h" style={{ flex: 1 }}>Perpustakaan latihan</h2>
              <ModeSwitch />
            </div>
            {Object.entries(GROUPS).map(([group, title]) => (
              <div className="group" key={group}>
                <h3>{title}</h3>
                <ul className="rows">
                  {PACKAGES.filter((p) => p.group === group).map((p) => {
                    const t = tries(p.id)
                    return (
                      <li key={p.id}>
                        <span className="name">{p.name}</span>
                        <span className="meta">{p.questions.length} soal, {p.duration} menit</span>
                        <span className="done">
                          {t.length ? (<><Dots value={best(p.id)} /><span className="num">skor terbaik {best(p.id)}</span></>) : 'Belum dikerjakan'}
                        </span>
                        <button className="btn ghost sm" onClick={() => onStart(p.id, mode)} aria-label={`Mulai ${p.name}`}>Mulai</button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}
