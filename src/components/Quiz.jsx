import { useEffect, useMemo, useRef, useState } from 'react'
import { CaretLeft, CaretRight, Flag, Eraser } from '@phosphor-icons/react'
import { getQuestion, TOPICS } from '../data/index.js'
import { fmtTime } from '../storage.js'
import { Band, Bubble } from './Ui.jsx'

const L = ['A', 'B', 'C', 'D']

export function buildAttempt(pkg, mode, order, answers, flagged, usedSec) {
  const byTopic = {}
  let correct = 0, blank = 0
  order.forEach((id) => {
    const q = getQuestion(id)
    byTopic[q.topic] = byTopic[q.topic] || [0, 0]
    byTopic[q.topic][1]++
    const a = answers[id]
    if (a === undefined) blank++
    else if (a === q.answer) { correct++; byTopic[q.topic][0]++ }
  })
  const total = order.length
  return {
    id: Date.now(), date: new Date().toISOString(), pkgId: pkg.id, pkgName: pkg.name, mode,
    total, correct, blank, wrong: total - correct - blank,
    accuracy: Math.round((correct / total) * 100), score: Math.round((correct / total) * 100),
    usedSec: Math.round(usedSec), limitSec: pkg.duration * 60,
    order, answers, flagged: Object.keys(flagged).filter((k) => flagged[k]), byTopic,
  }
}

export default function Quiz({ pkg, mode, order, onFinish, onExit }) {
  const exam = mode === 'exam'
  const [i, setI] = useState(0)
  const [answers, setAnswers] = useState({})
  const [flagged, setFlagged] = useState({})
  const [confirm, setConfirm] = useState(false)
  const startedAt = useRef(Date.now())
  const [now, setNow] = useState(Date.now())
  const done = useRef(false)

  const limit = pkg.duration * 60
  const used = (now - startedAt.current) / 1000
  const left = limit - used

  const finish = (usedSec) => {
    if (done.current) return
    done.current = true
    onFinish(buildAttempt(pkg, mode, order, answers, flagged, usedSec))
  }

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (exam && left <= 0) finish(limit)
  })

  const q = useMemo(() => getQuestion(order[i]), [order, i])
  const picked = answers[q.id]
  const revealed = !exam && picked !== undefined
  const answered = Object.keys(answers).length
  const flagCount = Object.values(flagged).filter(Boolean).length

  const choose = (k) => {
    if (!exam && picked !== undefined) return
    setAnswers((a) => ({ ...a, [q.id]: k }))
  }
  const leave = () => (answered ? setConfirm('exit') : onExit())

  return (
    <div className="desk">
      <div className="sheet">
        <Band page="quiz" onNav={leave}>
          <div className="meta">
            <span className="progress">{pkg.name} ({exam ? 'Ujian' : 'Latihan'}), {answered}/{order.length} terjawab</span>
            {exam
              ? <span className={`timer ${left < 300 ? 'low' : ''}`} role="timer">{fmtTime(left)}</span>
              : <span className="timer" role="timer">{fmtTime(used)}</span>}
            <button className="band-btn" onClick={leave}>Keluar</button>
            <button className="band-btn" style={{ borderColor: 'rgba(251,250,246,.7)' }} onClick={() => setConfirm('finish')}>Selesai</button>
          </div>
        </Band>

        <main className="page quiz-body">
          <section className="q-sheet" aria-labelledby="q-no">
            <div className="q-head">
              <h1 className="no" id="q-no">{i + 1}<span className="of">dari {order.length}</span></h1>
              <span className="tag">{TOPICS[q.topic]}</span>
            </div>
            <p className="q-text">{q.q}</p>

            <div className="opts" role="group" aria-label="Pilihan jawaban">
              {q.options.map((o, k) => {
                const chosen = picked === k
                let cls = 'opt'
                let tone
                if (revealed) {
                  cls += ' static'
                  if (k === q.answer) { cls += ' right'; tone = 'ok' } else if (chosen) { cls += ' wrong'; tone = 'bad' }
                }
                const body = (
                  <>
                    <Bubble on={chosen || (revealed && k === q.answer)} tone={tone}>{L[k]}</Bubble>
                    <span className="text">{o}</span>
                    {revealed && chosen && <em>jawabanmu</em>}
                  </>
                )
                return revealed
                  ? <div key={k} className={cls}>{body}</div>
                  : <button key={k} className={cls} aria-pressed={chosen} onClick={() => choose(k)}>{body}</button>
              })}
            </div>

            {revealed && (
              <div className="explain" role="status">
                <b>{picked === q.answer ? 'Benar.' : `Salah. Jawaban yang benar: ${L[q.answer]}.`}</b> {q.explain}
              </div>
            )}

            <div className="q-nav">
              <button className="btn ghost" disabled={i === 0} onClick={() => setI(i - 1)}><CaretLeft size={18} weight="bold" aria-hidden="true" />Sebelumnya</button>
              <button className={`btn ghost ${flagged[q.id] ? 'flag-on' : ''}`} aria-pressed={!!flagged[q.id]}
                onClick={() => setFlagged((f) => ({ ...f, [q.id]: !f[q.id] }))}>
                <Flag size={18} weight={flagged[q.id] ? 'fill' : 'bold'} aria-hidden="true" />{flagged[q.id] ? 'Ragu-ragu' : 'Tandai ragu'}
              </button>
              {exam && picked !== undefined && (
                <button className="btn ghost" onClick={() => setAnswers((a) => { const c = { ...a }; delete c[q.id]; return c })}>
                  <Eraser size={18} weight="bold" aria-hidden="true" />Hapus jawaban
                </button>
              )}
              <span className="spacer" />
              <button className="btn" disabled={i === order.length - 1} onClick={() => setI(i + 1)}>Berikutnya<CaretRight size={18} weight="bold" aria-hidden="true" /></button>
            </div>
          </section>

          <aside className="answer-key" aria-label="Lembar jawaban">
            <h2>Lembar jawaban</h2>
            <div className="key-rows">
              {order.map((id, k) => {
                const a = answers[id]
                const qq = getQuestion(id)
                return (
                  <button key={id} className={`key-row ${k === i ? 'cur' : ''}`} onClick={() => setI(k)}
                    aria-label={`Soal ${k + 1}, ${a === undefined ? 'belum dijawab' : `dijawab ${L[a]}`}${flagged[id] ? ', ditandai ragu' : ''}`} aria-current={k === i ? 'step' : undefined}>
                    <span className="n">{k + 1}</span>
                    <span className="dots">
                      {[0, 1, 2, 3].map((b) => {
                        const on = a === b
                        const tone = !exam && on ? (b === qq.answer ? 'ok' : 'bad') : ''
                        return <Bubble key={b} size="sm" on={on} tone={tone} />
                      })}
                    </span>
                    {flagged[id] ? <span className="flagmark" /> : <span />}
                  </button>
                )
              })}
            </div>
            <p className="key-legend">Bulatan hitam adalah jawabanmu. Belah ketupat tanda ragu.</p>
          </aside>
        </main>

        {confirm && (
          <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="dlg-h" onClick={() => setConfirm(false)}>
            <div className="box exit-box" onClick={(e) => e.stopPropagation()}>
              {confirm === 'finish' ? (
                <>
                  <h2 id="dlg-h">Akhiri sesi?</h2>
                  <p>{answered} terjawab, {order.length - answered} kosong, {flagCount} ditandai ragu.</p>
                  <div className="row">
                    <button className="btn ghost" onClick={() => setConfirm(false)}>Lanjut mengerjakan</button>
                    <button className="btn" onClick={() => finish(Math.min(used, limit))}>Ya, selesai</button>
                  </div>
                </>
              ) : (
                <>
                  <h2 id="dlg-h">Keluar tanpa menyimpan?</h2>
                  <p>Progres sesi ini akan hilang.</p>
                  <div className="row">
                    <button className="btn ghost" onClick={() => setConfirm(false)}>Batal</button>
                    <button className="btn danger" onClick={onExit}>Keluar</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
