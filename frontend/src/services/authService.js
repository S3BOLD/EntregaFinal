import api from './api';

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  return data; // { token, user: { id, name, email } }
}

export async function register(name, email, password) {
  const { data } = await api.post('/users', { name, email, password });
  return data; // { id, name, email }
}

export async function updateProfile(id, payload) {
  const { data } = await api.put(`/users/${id}`, payload);
  return data;
}
