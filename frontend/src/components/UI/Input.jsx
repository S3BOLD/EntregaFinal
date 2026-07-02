import { useId } from 'react';
import './Field.css';

export function Input({ label, error, hint, className = '', ...rest }) {
  const id = useId();
  return (
    <div className={`field ${className}`}>
      {label ? (
        <label htmlFor={id} className="field__label">
          {label}
        </label>
      ) : null}
      <input
        id={id}
        className={`field__control ${error ? 'field__control--error' : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {hint && !error ? <span className="field__hint">{hint}</span> : null}
      {error ? (
        <span id={`${id}-error`} className="field__error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
