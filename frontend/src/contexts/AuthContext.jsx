import { createContext, useCallback, useMemo, useState } from 'react';
import * as authService from '../services/authService';

export const AuthContext = createContext(null);

function lerUsuarioSalvo() {
  try {
    const bruto = localStorage.getItem('razao:user');
    return bruto ? JSON.parse(bruto) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('razao:token'));
  const [user, setUser] = useState(lerUsuarioSalvo);
  const [carregandoAuth, setCarregandoAuth] = useState(false);

  const persistirSessao = useCallback((novoToken, novoUsuario) => {
    localStorage.setItem('razao:token', novoToken);
    localStorage.setItem('razao:user', JSON.stringify(novoUsuario));
    setToken(novoToken);
    setUser(novoUsuario);
  }, []);

  const entrar = useCallback(
    async (email, password) => {
      setCarregandoAuth(true);
      try {
        const resultado = await authService.login(email, password);
        persistirSessao(resultado.token, resultado.user);
        return resultado.user;
      } finally {
        setCarregandoAuth(false);
      }
    },
    [persistirSessao]
  );

  const cadastrar = useCallback(async (name, email, password) => {
    setCarregandoAuth(true);
    try {
      return await authService.register(name, email, password);
    } finally {
      setCarregandoAuth(false);
    }
  }, []);

  const sair = useCallback(() => {
    localStorage.removeItem('razao:token');
    localStorage.removeItem('razao:user');
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      carregandoAuth,
      entrar,
      cadastrar,
      sair,
    }),
    [token, user, carregandoAuth, entrar, cadastrar, sair]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
