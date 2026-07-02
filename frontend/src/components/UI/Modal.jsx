import { useEffect, useRef } from 'react';
import './Modal.css';

export function Modal({ title, children, onClose, footer, size = 'md' }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    function aoTeclar(evento) {
      if (evento.key === 'Escape') onClose?.();
    }
    document.addEventListener('keydown', aoTeclar);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', aoTeclar);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  function aoClicarOverlay(evento) {
    if (evento.target === overlayRef.current) onClose?.();
  }

  return (
    <div className="modal-overlay" ref={overlayRef} onMouseDown={aoClicarOverlay}>
      <div className={`modal modal--${size}`} role="dialog" aria-modal="true" aria-label={title}>
        <header className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </header>
        <div className="modal__body">{children}</div>
        {footer ? <footer className="modal__footer">{footer}</footer> : null}
      </div>
    </div>
  );
}
