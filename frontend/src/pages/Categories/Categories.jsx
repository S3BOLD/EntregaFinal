import { useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { Button } from '../../components/UI/Button';
import { Loader } from '../../components/UI/Loader';
import { EmptyState } from '../../components/UI/EmptyState';
import { ConfirmDialog } from '../../components/UI/ConfirmDialog';
import { CategoryForm } from '../../components/CategoryForm/CategoryForm';
import { useCategories } from '../../hooks/useCategories';
import { useToast } from '../../hooks/useToast';
import './Categories.css';

export function Categories() {
  const { categories, loading, error, carregar, criar, atualizar, remover } = useCategories();
  const { sucesso, erro: notificarErro } = useToast();

  const [formAberto, setFormAberto] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [categoriaExcluindo, setCategoriaExcluindo] = useState(null);
  const [excluindo, setExcluindo] = useState(false);

  function abrirNova() {
    setCategoriaEditando(null);
    setFormAberto(true);
  }

  function abrirEdicao(categoria) {
    setCategoriaEditando(categoria);
    setFormAberto(true);
  }

  async function salvar(payload) {
    if (categoriaEditando) {
      await atualizar(categoriaEditando.id, payload);
      sucesso('Categoria atualizada.');
    } else {
      await criar(payload);
      sucesso('Categoria cadastrada.');
    }
    setFormAberto(false);
  }

  async function confirmarExclusao() {
    setExcluindo(true);
    try {
      await remover(categoriaExcluindo.id);
      sucesso('Categoria removida.');
      setCategoriaExcluindo(null);
    } catch (erroExclusao) {
      notificarErro(erroExclusao.message);
    } finally {
      setExcluindo(false);
    }
  }

  return (
    <Layout
      titulo="Categorias"
      subtitulo="Organize os grupos de gastos usados nas suas despesas"
      acoes={<Button onClick={abrirNova}>+ Nova categoria</Button>}
    >
      {loading ? (
        <Loader label="Carregando categorias…" />
      ) : error ? (
        <EmptyState
          icon="⚠️"
          title="Não foi possível carregar as categorias"
          description={error}
          action={
            <Button variant="ghost" onClick={carregar}>
              Tentar novamente
            </Button>
          }
        />
      ) : categories.length === 0 ? (
        <EmptyState
          icon="🗂️"
          title="Nenhuma categoria cadastrada"
          description="Crie categorias como Alimentação, Transporte ou Lazer para organizar suas despesas."
          action={<Button onClick={abrirNova}>+ Nova categoria</Button>}
        />
      ) : (
        <div className="category-grid">
          {categories.map((categoria) => (
            <div key={categoria.id} className="ledger-card category-card">
              <h3 className="category-card__nome">{categoria.name}</h3>
              <p className="category-card__desc">{categoria.description || 'Sem descrição.'}</p>
              <div className="category-card__acoes">
                <Button variant="ghost" size="sm" onClick={() => abrirEdicao(categoria)}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => setCategoriaExcluindo(categoria)}>
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {formAberto ? (
        <CategoryForm categoria={categoriaEditando} onSalvar={salvar} onFechar={() => setFormAberto(false)} />
      ) : null}

      {categoriaExcluindo ? (
        <ConfirmDialog
          message={`Tem certeza que deseja excluir a categoria "${categoriaExcluindo.name}"? Despesas vinculadas a ela podem ser afetadas.`}
          onCancel={() => setCategoriaExcluindo(null)}
          onConfirm={confirmarExclusao}
          loading={excluindo}
        />
      ) : null}
    </Layout>
  );
}
