import { useEffect, useState } from 'react';

export function useDebounce(valor, atrasoMs = 400) {
  const [valorAtrasado, setValorAtrasado] = useState(valor);

  useEffect(() => {
    const timer = window.setTimeout(() => setValorAtrasado(valor), atrasoMs);
    return () => window.clearTimeout(timer);
  }, [valor, atrasoMs]);

  return valorAtrasado;
}
