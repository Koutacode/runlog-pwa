import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listTrips, TripSummary } from '../../db/repositories';

function fmtLocal(ts?: string) {
  if (!ts) return '-';
  const d = new Date(ts);
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export default function HistoryScreen() {
  const [rows, setRows] = useState<TripSummary[]>([]);
  const [err, setErr] = useState<string | null>(null);
  async function load() {
    setErr(null);
    try {
      const r = await listTrips();
      setRows(r);
    } catch (e: any) {
      setErr(e?.message ?? '読み込みに失敗しました');
    }
  }
  useEffect(() => {
    load();
  }, []);
  return (
    <div style={{ padding: 16, maxWidth: 900, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: 20, fontWeight: 900 }}>履歴</div>
        <Link to="/" style={{ color: '#93c5fd' }}>ホーム</Link>
      </div>
      {err && <div style={{ background: '#7f1d1d', color: '#fff', padding: 12, borderRadius: 12 }}>{err}</div>}
      <div style={{ display: 'grid', gap: 8 }}>
        {rows.map(r => (
          <Link
            key={r.tripId}
            to={`/trip/${r.tripId}`}
            style={{ textDecoration: 'none', color: '#fff', background: '#111', padding: 12, borderRadius: 16 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
              <div>
                <div style={{ fontWeight: 900 }}>
                  {r.status === 'active' ? '運行中' : '運行終了'} / {fmtLocal(r.startTs)} → {fmtLocal(r.endTs)}
                </div>
                <div style={{ opacity: 0.85, fontSize: 12 }}>
                  ODO: {r.odoStart} → {r.odoEnd ?? '-'} / 総距離: {r.totalKm ?? '-'} km / 最終区間: {r.lastLegKm ?? '-'} km
                </div>
              </div>
              <div style={{ opacity: 0.8, fontSize: 12 }}>{r.tripId.slice(0, 8)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}