import api from './api';
import { limparFiltros } from './expenseService';

export async function getTotalExpenses(filtros) {
  const { data } = await api.get('/dashboard/total-expenses', { params: limparFiltros(filtros) });
  return data.total ?? 0;
}

export async function getExpensesCount(filtros) {
  const { data } = await api.get('/dashboard/expenses-count', { params: limparFiltros(filtros) });
  return data.quantidade ?? 0;
}

export async function getExpensesByCategory(filtros) {
  const { data } = await api.get('/dashboard/expenses-by-category', { params: limparFiltros(filtros) });
  return data; // [{ categoria, total }]
}
