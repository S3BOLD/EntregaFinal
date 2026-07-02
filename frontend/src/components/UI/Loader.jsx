import './Loader.css';

export function Loader({ label = 'Carregando…', size = 'md' }) {
  return (
    <div className={`loader loader--${size}`} role="status">
      <span className="loader__ring" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
