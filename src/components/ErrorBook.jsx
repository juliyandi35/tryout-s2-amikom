import { useMemo, useState } from 'react'
import { TOPICS } from '../data/index.js'
import { CAUSES, collectErrors } from '../errors.js'
import { loadNotes, saveNote } from '../storage.js'
import { Band, Bubble } from './Ui.jsx'

const L = ['A', 'B', 'C', 'D']

export default function ErrorBook({ history, onNav, onStart }) {
  const [notes, setNotes] = useState(loadNotes)
  const [topic, setTopic] = useState('all')
  const [cause, setCause] = useState('all')
  const [open, setOpen] = useState({})

  const errors = useMemo(() => collectErrors(history, notes), [history, notes])
  const topicCount = useMemo(() => {
    const c = {}
    errors.forEach((e) => { c[e.q.topic] = (c[e.q.topic] || 0) + 1 })
    return c
  }, [errors])
  const causeOf = (id) => notes[id]?.cause
  const shown = errors.filter((e) => (topic === 'all' || e.q.topic === topic)
    && (cause === 'all' || (cause === 'none' ? !causeOf(e.q.id) : causeOf(e.q.id) === cause)))

  const setCauseFor = (id, value) => setNotes(saveNote(id, { cause: causeOf(id) === value ? undefined : value }))
  const master = (id) => setNotes(saveNote(id, { masteredAt: new Date().toISOString() }))

  return (
    <div className="desk">
      <div className="sheet">
        <Band page="errors" onNav={onNav} errorCount={errors.length} />
        <main className="page narrow">
          <header className="page-head">
            <h1>Buku kesalahan, {errors.length} soal</h1>
            {errors.length > 0 && <button className="btn" onClick={() => onStart('errors', 'practice')}>Latih kesalahan ({Math.min(errors.length, 30)} soal)</button>}
          </header>

          {errors.length === 0 ? (
            <p className="box hint">Belum ada soal yang salah. Kerjakan beberapa paket dulu. Soal yang salah atau kosong masuk ke sini, dan keluar sendiri setelah kamu menjawabnya benar.</p>
          ) : (
            <>
              <div className="chips" role="group" aria-label="Saring topik">
                <button className={`chip ${topic === 'all' ? 'on' : ''}`} aria-pressed={topic === 'all'} onClick={() => setTopic('all')}>Semua topik ({errors.length})</button>
                {Object.entries(topicCount).sort((a, b) => b[1] - a[1]).map(([k, n]) => (
                  <button key={k} className={`chip ${topic === k ? 'on' : ''}`} aria-pressed={topic === k} onClick={() => setTopic(k)}>{TOPICS[k]} ({n})</button>
                ))}
              </div>
              <div className="chips" role="group" aria-label="Saring penyebab">
                <button className={`chip ${cause === 'all' ? 'on' : ''}`} aria-pressed={cause === 'all'} onClick={() => setCause('all')}>Semua penyebab</button>
                {CAUSES.map((c) => <button key={c} className={`chip ${cause === c ? 'on' : ''}`} aria-pressed={cause === c} onClick={() => setCause(c)}>{c}</button>)}
                <button className={`chip ${cause === 'none' ? 'on' : ''}`} aria-pressed={cause === 'none'} onClick={() => setCause('none')}>Belum dicatat</button>
              </div>

              <div>
                {shown.map((e) => {
                  const { q } = e
                  const isOpen = open[q.id]
                  return (
                    <article key={q.id} className="rv">
                      <div className="q-head">
                        <span className="tag">{TOPICS[q.topic]}</span>
                        <span className="num">Salah {e.times}x</span>
                      </div>
                      <p className="q-text">{q.q}</p>

                      <div className="chips" role="group" aria-label="Penyebab kesalahan" style={{ marginBottom: 0 }}>
                        {CAUSES.map((c) => (
                          <button key={c} className={`chip ${causeOf(q.id) === c ? 'on' : ''}`} aria-pressed={causeOf(q.id) === c} onClick={() => setCauseFor(q.id, c)}>{c}</button>
                        ))}
                      </div>

                      {isOpen && (
                        <>
                          <div className="opts">
                            {q.options.map((o, k) => {
                              const right = k === q.answer
                              const mine = k === e.picked
                              return (
                                <div key={k} className={`opt static ${right ? 'right' : mine ? 'wrong' : ''}`}>
                                  <Bubble on={right || mine} tone={right ? 'ok' : mine ? 'bad' : ''}>{L[k]}</Bubble>
                                  <span className="text">{o}</span>
                                  {mine && <em>jawabanmu</em>}
                                </div>
                              )
                            })}
                          </div>
                          <div className="explain"><b>Pembahasan:</b> {q.explain}</div>
                        </>
                      )}

                      <div className="row">
                        <button className="btn ghost sm" aria-expanded={!!isOpen} onClick={() => setOpen((o) => ({ ...o, [q.id]: !o[q.id] }))}>
                          {isOpen ? 'Sembunyikan jawaban' : 'Lihat jawaban dan pembahasan'}
                        </button>
                        <button className="btn ghost sm" onClick={() => master(q.id)}>Tandai sudah paham</button>
                      </div>
                    </article>
                  )
                })}
                {!shown.length && <p className="hint">Tidak ada soal pada filter ini.</p>}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
