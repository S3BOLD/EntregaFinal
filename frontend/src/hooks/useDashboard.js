import { useCallback, useEffect, useState } from 'react';
import * as dashboardService from '../services/dashboardService';
import * as expenseService from '../services/expenseService';

export function useDashboard(filters = {}) {
  const [total, setTotal] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [porCategoria, setPorCategoria] = useState([]);
  const [ultimasDespesas, setUltimasDespesas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [totalResp, quantidadeResp, categoriaResp, despesasResp] = await Promise.all([
        dashboardService.getTotalExpenses(filters),
        dashboardService.getExpensesCount(filters),
        dashboardService.getExpensesByCategory(filters),
        expenseService.getExpenses(filters),
      ]);

      setTotal(totalResp);
      setQuantidade(quantidadeResp);
      setPorCategoria(categoriaResp);

      const recentes = [...despesasResp]
        .sort((a, b) => new Date(b.date) - new Date(a.date) || b.id - a.id)
        .slice(0, 5);
      setUltimasDespesas(recentes);
    } catch (erro) {
      setError(erro.message);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { total, quantidade, porCategoria, ultimasDespesas, loading, error, recarregar: carregar };
}
