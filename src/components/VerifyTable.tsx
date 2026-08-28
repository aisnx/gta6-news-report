import { verifyRows, type VerifyStatus } from '@/lib/data';

const label: Record<VerifyStatus, string> = {
  yes: '官方确认',
  no: '谣言',
  maybe: '未确认',
};

export function VerifyTable() {
  return (
    <table className="verify">
      <thead>
        <tr>
          <th>说法</th>
          <th>状态</th>
        </tr>
      </thead>
      <tbody>
        {verifyRows.map((r) => (
          <tr key={r.claim}>
            <td>{r.claim}</td>
            <td>
              <span className={`badge ${r.status}`}>{label[r.status]}</span>
              {r.note ? (
                <span style={{ color: 'var(--muted)', marginLeft: 8 }}>{r.note}</span>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
