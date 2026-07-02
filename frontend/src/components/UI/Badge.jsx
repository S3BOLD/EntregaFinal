import './Badge.css';

const CONFIG = {
  PAGA: { label: 'Paga', tone: 'ledger' },
  PENDENTE: { label: 'Pendente', tone: 'coral' },
};

export function Badge({ status }) {
  const cfg = CONFIG[status] || { label: status, tone: 'muted' };
  return <span className={`badge badge--${cfg.tone}`}>{cfg.label}</span>;
}
