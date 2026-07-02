import { createContext, useCallback, useMemo, useState } from 'react';

export const ToastContext = createContext(null);

let proximoId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remover = useCallback((id) => {
    setToasts((atual) => atual.filter((t) => t.id !== id));
  }, []);

  const notificar = useCallback(
    (mensagem, tipo = 'info', duracao = 4200) => {
      const id = proximoId++;
      setToasts((atual) => [...atual, { id, mensagem, tipo }]);
      window.setTimeout(() => remover(id), duracao);
    },
    [remover]
  );

  const value = useMemo(
    () => ({
      notificar,
      sucesso: (msg) => notificar(msg, 'sucesso'),
      erro: (msg) => notificar(msg, 'erro'),
      info: (msg) => notificar(msg, 'info'),
    }),
    [notificar]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-viewport" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast--${t.tipo}`} onClick={() => remover(t.id)}>
            {t.mensagem}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
