import { useCallback, useEffect, useState } from 'react';
import * as expenseService from '../services/expenseService';

const FILTROS_VAZIOS = {
  category: '',
  status: '',
  startDate: '',
  endDate: '',
  minAmount: '',
  maxAmount: '',
};

export function useExpenses(filtrosIniciais = {}) {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ ...FILTROS_VAZIOS, ...filtrosIniciais });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregar = useCallback(async (filtrosParaUsar = filters) => {
    setLoading(true);
    setError(null);
    try {
      const dados = await expenseService.getExpenses(filtrosParaUsar);
      setExpenses(dados);
      return dados;
    } catch (erro) {
      setError(erro.message);
      throw erro;
    } finally {
      setLoading(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    carregar(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  const atualizarFiltros = useCallback((parciais) => {
    setFilters((atual) => ({ ...atual, ...parciais }));
  }, []);

  const limparFiltros = useCallback(() => setFilters(FILTROS_VAZIOS), []);

  const criar = useCallback(async (payload) => {
    const nova = await expenseService.createExpense(payload);
    setExpenses((atual) => [nova, ...atual]);
    return nova;
  }, []);

  const atualizar = useCallback(async (id, payload) => {
    const atualizada = await expenseService.updateExpense(id, payload);
    setExpenses((atual) => atual.map((e) => (e.id === atualizada.id ? atualizada : e)));
    return atualizada;
  }, []);

  const remover = useCallback(async (id) => {
    await expenseService.deleteExpense(id);
    setExpenses((atual) => atual.filter((e) => e.id !== id));
  }, []);

  return {
    expenses,
    filters,
    loading,
    error,
    carregar,
    atualizarFiltros,
    limparFiltros,
    criar,
    atualizar,
    remover,
  };
}
