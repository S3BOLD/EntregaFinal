import { useCallback, useEffect, useState } from 'react';
import * as categoryService from '../services/categoryService';

export function useCategories({ auto = true } = {}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(auto);
  const [error, setError] = useState(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const dados = await categoryService.getCategories();
      setCategories(dados);
      return dados;
    } catch (erro) {
      setError(erro.message);
      throw erro;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (auto) carregar();
  }, [auto, carregar]);

  const criar = useCallback(
    async (payload) => {
      const nova = await categoryService.createCategory(payload);
      setCategories((atual) => [...atual, nova]);
      return nova;
    },
    []
  );

  const atualizar = useCallback(async (id, payload) => {
    const atualizada = await categoryService.updateCategory(id, payload);
    setCategories((atual) => atual.map((c) => (c.id === atualizada.id ? atualizada : c)));
    return atualizada;
  }, []);

  const remover = useCallback(async (id) => {
    await categoryService.deleteCategory(id);
    setCategories((atual) => atual.filter((c) => c.id !== id));
  }, []);

  return { categories, loading, error, carregar, criar, atualizar, remover };
}
