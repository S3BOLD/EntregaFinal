import { createContext, useEffect, useMemo, useState } from 'react';

export const ThemeContext = createContext(null);

function temaInicial() {
  const salvo = localStorage.getItem('razao:theme');
  if (salvo === 'dark' || salvo === 'light') return salvo;
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(temaInicial);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('razao:theme', theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      alternarTema: () => setTheme((atual) => (atual === 'dark' ? 'light' : 'dark')),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
