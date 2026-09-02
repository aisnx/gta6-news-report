import type { Dictionary, VerifyStatus } from '@/lib/i18n';

export function VerifyTable({ dict }: { dict: Dictionary }) {
  const label: Record<VerifyStatus, string> = {
    yes: dict.verify.statusYes,
    no: dict.verify.statusNo,
    maybe: dict.verify.statusMaybe,
  };

  return (
    <table className="verify">
      <thead>
        <tr>
          <th>{dict.verify.tableClaim}</th>
          <th>{dict.verify.tableStatus}</th>
        </tr>
      </thead>
      <tbody>
        {dict.verifyRows.map((r) => (
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
