import { TOPICS, getQuestion } from '../data/index.js'
import { fmtTime } from '../storage.js'
import { Band, Dots } from './Ui.jsx'

export function grade(score) {
  if (score >= 80) return 'Sangat baik'
  if (score >= 65) return 'Baik'
  if (score >= 50) return 'Cukup'
  return 'Perlu latihan lagi'
}

export default function Result({ attempt: a, errorCount, onReview, onRetry, onNav }) {
  const answered = a.total - a.blank
  const avg = answered ? a.usedSec / answered : 0
  const topics = Object.entries(a.byTopic)
    .map(([t, [c, n]]) => ({ t, c, n, p: Math.round((c / n) * 100) }))
    .sort((x, y) => x.p - y.p)
  const mark = (id) => (a.answers[id] === undefined ? 'blank' : a.answers[id] === getQuestion(id).answer ? 'ok' : 'bad')

  return (
    <div className="desk">
      <div className="sheet">
        <Band page="result" onNav={onNav} errorCount={errorCount} />
        <main className="page">
          <header className="section">
            <h1 className="title" id="res-h">Lembar hasil</h1>
            <p className="verdict-line">{grade(a.score)}. {a.pkgName}{a.mode === 'exam' ? ', ujian' : ''}.</p>
          </header>

          <section className="section" aria-labelledby="res-h">
            <div className="result-key">
              {a.order.map((id, k) => (
                <div key={id} className={mark(id)}>
                  <span className="m" />
                  <span>{k + 1}</span>
                </div>
              ))}
            </div>
            <p className="hint">Hitam: benar. Jingga: salah. Kosong: tidak dijawab.</p>
          </section>

          <dl className="form-rows" aria-label="Ringkasan sesi">
            <div className="score"><dt>Skor</dt><dd>{a.score} <small>dari 100</small></dd></div>
            <div><dt>Benar</dt><dd>{a.correct}</dd></div>
            <div><dt>Salah</dt><dd>{a.wrong}</dd></div>
            <div><dt>Kosong</dt><dd>{a.blank}</dd></div>
            <div><dt>Ditandai ragu</dt><dd>{a.flagged.length}</dd></div>
            <div><dt>Waktu terpakai</dt><dd>{fmtTime(a.usedSec)}{a.mode === 'exam' ? ` dari ${fmtTime(a.limitSec)}` : ''}</dd></div>
            <div><dt>Rata-rata per soal</dt><dd>{avg ? Math.round(avg) : 0} dtk</dd></div>
          </dl>

          <section className="section" aria-labelledby="topic-h">
            <h2 className="label" id="topic-h">Akurasi per topik</h2>
            <ul className="topic-rows">
              {topics.map(({ t, c, n, p }) => (
                <li key={t}>
                  <span>{TOPICS[t]}</span>
                  <Dots value={p} />
                  <span className="val num">{c}/{n}, {p}%</span>
                </li>
              ))}
            </ul>
            {topics[0] && topics[0].p < 70 && (
              <p className="hint">Fokus berikutnya: <b>{TOPICS[topics[0].t]}</b> ({topics[0].p}%).</p>
            )}
          </section>

          <div className="row">
            <button className="btn" onClick={onReview}>Lihat pembahasan</button>
            <button className="btn ghost" onClick={onRetry}>Ulangi, soal diacak</button>
            <button className="btn ghost" onClick={() => onNav('home')}>Beranda</button>
          </div>
        </main>
      </div>
    </div>
  )
}
