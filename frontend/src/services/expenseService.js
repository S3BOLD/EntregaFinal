import api from './api';

// Remove chaves vazias/undefined para não mandar filtros em branco pra API
function limparFiltros(filtros = {}) {
  const params = {};
  Object.entries(filtros).forEach(([chave, valor]) => {
    if (valor !== '' && valor !== null && valor !== undefined) {
      params[chave] = valor;
    }
  });
  return params;
}

export async function getExpenses(filtros) {
  const { data } = await api.get('/expenses', { params: limparFiltros(filtros) });
  return data;
}

export async function getExpenseById(id) {
  const { data } = await api.get(`/expenses/${id}`);
  return data;
}

export async function createExpense(payload) {
  const { data } = await api.post('/expenses', payload);
  return data;
}

export async function updateExpense(id, payload) {
  const { data } = await api.put(`/expenses/${id}`, payload);
  return data;
}

export async function deleteExpense(id) {
  await api.delete(`/expenses/${id}`);
}

export { limparFiltros };
