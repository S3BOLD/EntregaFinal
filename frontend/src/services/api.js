import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Anexa o token JWT (quando existir) em toda requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('razao:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Extrai uma mensagem de erro legível e trata sessão expirada
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const mensagem =
      error.response?.data?.erro ||
      error.response?.data?.message ||
      (status ? `Erro ${status} ao comunicar com o servidor` : 'Não foi possível conectar à API');

    if (status === 401 && !error.config?.url?.includes('/auth/login')) {
      localStorage.removeItem('razao:token');
      localStorage.removeItem('razao:user');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.assign('/login?sessao=expirada');
      }
    }

    return Promise.reject(new Error(mensagem));
  }
);

export default api;
