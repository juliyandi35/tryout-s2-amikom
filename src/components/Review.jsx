import { useState } from 'react'
import { getQuestion, TOPICS } from '../data/index.js'
import { Band, Bubble } from './Ui.jsx'

const L = ['A', 'B', 'C', 'D']

export default function Review({ attempt: a, errorCount, onBack, onNav }) {
  const [filter, setFilter] = useState('all')

  const rows = a.order.map((id, k) => ({ q: getQuestion(id), no: k + 1, got: a.answers[id], flag: a.flagged.includes(id) }))
  const status = (r) => (r.got === undefined ? 'blank' : r.got === r.q.answer ? 'ok' : 'bad')
  const shown = rows.filter((r) => filter === 'all' || status(r) === filter || (filter === 'flag' && r.flag))
  const count = (f) => rows.filter((r) => (f === 'flag' ? r.flag : status(r) === f)).length

  return (
    <div className="desk">
      <div className="sheet">
        <Band page="review" onNav={onNav} errorCount={errorCount} />
        <main className="page narrow">
          <header className="page-head">
            <h1>Pembahasan, {a.pkgName}</h1>
            <button className="btn ghost sm" onClick={onBack}>Kembali</button>
          </header>

          <div className="chips" role="group" aria-label="Saring soal">
            {[['all', `Semua (${rows.length})`], ['bad', `Salah (${count('bad')})`], ['blank', `Kosong (${count('blank')})`],
              ['ok', `Benar (${count('ok')})`], ['flag', `Ragu (${count('flag')})`]].map(([k, l]) => (
              <button key={k} className={`chip ${filter === k ? 'on' : ''}`} aria-pressed={filter === k} onClick={() => setFilter(k)}>{l}</button>
            ))}
          </div>

          <div>
            {shown.map((r) => {
              const st = status(r)
              return (
                <article key={r.q.id} className="rv">
                  <div className="q-head">
                    <span className="num">No. {r.no}{r.flag ? ' (ragu)' : ''}</span>
                    <span className="tag">{TOPICS[r.q.topic]}</span>
                    <span className={`badge ${st}`}>{st === 'ok' ? 'Benar' : st === 'bad' ? 'Salah' : 'Kosong'}</span>
                  </div>
                  <p className="q-text">{r.q.q}</p>
                  <div className="opts">
                    {r.q.options.map((o, k) => {
                      const right = k === r.q.answer
                      const mine = k === r.got
                      let cls = 'opt static'
                      if (right) cls += ' right'
                      else if (mine) cls += ' wrong'
                      return (
                        <div key={k} className={cls}>
                          <Bubble on={right || mine} tone={right ? 'ok' : mine ? 'bad' : ''}>{L[k]}</Bubble>
                          <span className="text">{o}</span>
                          {mine && <em>jawabanmu</em>}
                        </div>
                      )
                    })}
                  </div>
                  <div className="explain"><b>Pembahasan:</b> {r.q.explain}</div>
                </article>
              )
            })}
            {!shown.length && <p className="hint">Tidak ada soal pada filter ini.</p>}
          </div>
        </main>
      </div>
    </div>
  )
}
