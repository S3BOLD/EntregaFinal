import { useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { Button } from '../../components/UI/Button';
import { Loader } from '../../components/UI/Loader';
import { EmptyState } from '../../components/UI/EmptyState';
import { ConfirmDialog } from '../../components/UI/ConfirmDialog';
import { ExpenseForm } from '../../components/ExpenseForm/ExpenseForm';
import { ExpenseTable } from '../../components/ExpenseTable/ExpenseTable';
import { FilterBar } from '../../components/FilterBar/FilterBar';
import { useExpenses } from '../../hooks/useExpenses';
import { useCategories } from '../../hooks/useCategories';
import { useToast } from '../../hooks/useToast';

export function Expenses() {
  const {
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
  } = useExpenses();
  const { categories } = useCategories();
  const { sucesso, erro: notificarErro } = useToast();

  const [formAberto, setFormAberto] = useState(false);
  const [despesaEditando, setDespesaEditando] = useState(null);
  const [despesaExcluindo, setDespesaExcluindo] = useState(null);
  const [excluindo, setExcluindo] = useState(false);

  function abrirNova() {
    setDespesaEditando(null);
    setFormAberto(true);
  }

  function abrirEdicao(despesa) {
    setDespesaEditando(despesa);
    setFormAberto(true);
  }

  async function salvar(payload) {
    if (despesaEditando) {
      await atualizar(despesaEditando.id, payload);
      sucesso('Despesa atualizada.');
    } else {
      await criar(payload);
      sucesso('Despesa cadastrada.');
    }
    setFormAberto(false);
  }

  async function confirmarExclusao() {
    setExcluindo(true);
    try {
      await remover(despesaExcluindo.id);
      sucesso('Despesa removida.');
      setDespesaExcluindo(null);
    } catch (erroExclusao) {
      notificarErro(erroExclusao.message);
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <Layout
      titulo="Despesas"
      subtitulo="Cadastre, filtre e acompanhe seus lançamentos"
      acoes={<Button onClick={abrirNova}>+ Nova despesa</Button>}
    >
      <FilterBar categories={categories} filters={filters} onChange={atualizarFiltros} onReset={limparFiltros} />

      {loading ? (
        <Loader label="Carregando despesas…" />
      ) : error ? (
        <EmptyState
          icon="⚠️"
          title="Não foi possível carregar as despesas"
          description={error}
          action={
            <Button variant="ghost" onClick={() => carregar()}>
              Tentar novamente
            </Button>
          }
        />
      ) : categories.length === 0 ? (
        <EmptyState
          icon="🗂️"
          title="Cadastre uma categoria antes"
          description="Você precisa de ao menos uma categoria para registrar despesas."
        />
      ) : (
        <ExpenseTable expenses={expenses} onEditar={abrirEdicao} onExcluir={setDespesaExcluindo} />
      )}

      {formAberto ? (
        <ExpenseForm
          despesa={despesaEditando}
          categories={categories}
          onSalvar={salvar}
          onFechar={() => setFormAberto(false)}
        />
      ) : null}

      {despesaExcluindo ? (
        <ConfirmDialog
          message={`Tem certeza que deseja excluir a despesa "${despesaExcluindo.description}"?`}
          onCancel={() => setDespesaExcluindo(null)}
          onConfirm={confirmarExclusao}
          loading={excluindo}
        />
      ) : null}
    </Layout>
  );
}
