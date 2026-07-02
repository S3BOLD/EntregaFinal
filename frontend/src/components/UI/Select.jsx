import { useId } from 'react';
import './Field.css';

export function Select({ label, error, children, className = '', ...rest }) {
  const id = useId();
  return (
    <div className={`field ${className}`}>
      {label ? (
        <label htmlFor={id} className="field__label">
          {label}
        </label>
      ) : null}
      <select
        id={id}
        className={`field__control field__control--select ${error ? 'field__control--error' : ''}`}
        aria-invalid={Boolean(error)}
        {...rest}
      >
        {children}
      </select>
      {error ? (
        <span className="field__error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
