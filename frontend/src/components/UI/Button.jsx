import './Button.css';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  loading = false,
  disabled = false,
  onClick,
  full = false,
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} btn--${size} ${full ? 'btn--full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <span className="btn__spinner" aria-hidden="true" /> : null}
      <span className={loading ? 'btn__label--loading' : ''}>{children}</span>
    </button>
  );
}
