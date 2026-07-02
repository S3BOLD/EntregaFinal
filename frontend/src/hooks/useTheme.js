import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme precisa estar dentro de um <ThemeProvider>');
  return ctx;
}
