import './StatCard.css';

export function StatCard({ label, value, tab, tone = 'ledger' }) {
  return (
    <div className="ledger-card stat-card">
      {tab ? <span className="ledger-card__tab">{tab}</span> : null}
      <p className="stat-card__label">{label}</p>
      <p className={`stat-card__value num stat-card__value--${tone}`}>{value}</p>
    </div>
  );
}
