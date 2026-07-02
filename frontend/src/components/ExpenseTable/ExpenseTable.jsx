import { useMemo, useState } from 'react';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';
import { EmptyState } from '../UI/EmptyState';
import './ExpenseTable.css';

const formatoMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const formatoData = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' });

const COLUNAS = [
  { chave: 'description', label: 'Descrição' },
  { chave: 'category', label: 'Categoria' },
  { chave: 'date', label: 'Data' },
  { chave: 'amount', label: 'Valor' },
  { chave: 'status', label: 'Status' },
];

const ITENS_POR_PAGINA = 8;

export function ExpenseTable({ expenses, onEditar, onExcluir }) {
  const [ordenacao, setOrdenacao] = useState({ campo: 'date', direcao: 'desc' });
  const [pagina, setPagina] = useState(1);

  const ordenadas = useMemo(() => {
    const copia = [...expenses];
    copia.sort((a, b) => {
      let valorA = ordenacao.campo === 'category' ? a.category?.name : a[ordenacao.campo];
      let valorB = ordenacao.campo === 'category' ? b.category?.name : b[ordenacao.campo];

      if (ordenacao.campo === 'date') {
        valorA = new Date(valorA).getTime();
        valorB = new Date(valorB).getTime();
      }
      if (typeof valorA === 'string') valorA = valorA.toLowerCase();
      if (typeof valorB === 'string') valorB = valorB.toLowerCase();

      if (valorA < valorB) return ordenacao.direcao === 'asc' ? -1 : 1;
      if (valorA > valorB) return ordenacao.direcao === 'asc' ? 1 : -1;
      return 0;
    });
    return copia;
  }, [expenses, ordenacao]);

  const totalPaginas = Math.max(1, Math.ceil(ordenadas.length / ITENS_POR_PAGINA));
  const paginaAtual = Math.min(pagina, totalPaginas);
  const paginadas = ordenadas.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA
  );

  function alternarOrdenacao(campo) {
    setPagina(1);
    setOrdenacao((atual) =>
      atual.campo === campo
        ? { campo, direcao: atual.direcao === 'asc' ? 'desc' : 'asc' }
        : { campo, direcao: 'asc' }
    );
  }

  if (!expenses.length) {
    return (
      <EmptyState
        icon="💸"
        title="Nenhuma despesa encontrada"
        description="Cadastre uma despesa ou ajuste os filtros para ver resultados aqui."
      />
    );
  }

  return (
    <div className="expense-table-wrap">
      <table className="expense-table">
        <thead>
          <tr>
            {COLUNAS.map((col) => (
              <th key={col.chave}>
                <button type="button" className="expense-table__sort" onClick={() => alternarOrdenacao(col.chave)}>
                  {col.label}
                  {ordenacao.campo === col.chave ? (
                    <span aria-hidden="true">{ordenacao.direcao === 'asc' ? ' ▲' : ' ▼'}</span>
                  ) : null}
                </button>
              </th>
            ))}
            <th className="expense-table__acoes-head">
              <span className="visually-hidden">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {paginadas.map((despesa) => (
            <tr key={despesa.id}>
              <td>{despesa.description}</td>
              <td>{despesa.category?.name || '—'}</td>
              <td className="num">{formatoData.format(new Date(`${despesa.date}T00:00:00Z`))}</td>
              <td className="num expense-table__valor">{formatoMoeda.format(despesa.amount)}</td>
              <td>
                <Badge status={despesa.status} />
              </td>
              <td className="expense-table__acoes">
                <button type="button" className="expense-table__acao" onClick={() => onEditar(despesa)} aria-label={`Editar ${despesa.description}`}>
                  ✏️
                </button>
                <button
                  type="button"
                  className="expense-table__acao expense-table__acao--excluir"
                  onClick={() => onExcluir(despesa)}
                  aria-label={`Excluir ${despesa.description}`}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPaginas > 1 ? (
        <div className="expense-table__paginacao">
          <Button variant="ghost" size="sm" onClick={() => setPagina((p) => Math.max(1, p - 1))} disabled={paginaAtual === 1}>
            ← Anterior
          </Button>
          <span className="num expense-table__paginacao-info">
            Página {paginaAtual} de {totalPaginas}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
            disabled={paginaAtual === totalPaginas}
          >
            Próxima →
          </Button>
        </div>
      ) : null}
    </div>
  );
}
