import { Link } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { StatCard } from '../../components/StatCard/StatCard';
import { CategoryChart } from '../../components/CategoryChart/CategoryChart';
import { Badge } from '../../components/UI/Badge';
import { Loader } from '../../components/UI/Loader';
import { EmptyState } from '../../components/UI/EmptyState';
import { Button } from '../../components/UI/Button';
import { useDashboard } from '../../hooks/useDashboard';
import './Dashboard.css';

const formatoMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const formatoData = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' });

export function Dashboard() {
  const { total, quantidade, porCategoria, ultimasDespesas, loading, error, recarregar } = useDashboard();

  return (
    <Layout titulo="Painel" subtitulo="Visão geral das suas despesas">
      {loading ? (
        <Loader label="Carregando o painel…" />
      ) : error ? (
        <EmptyState
          icon="⚠️"
          title="Não foi possível carregar o painel"
          description={error}
          action={
            <Button variant="ghost" onClick={recarregar}>
              Tentar novamente
            </Button>
          }
        />
      ) : (
        <>
          <div className="dashboard__stats">
            <StatCard label="Total de gastos" value={formatoMoeda.format(total)} tab="Total" tone="ledger" />
            <StatCard label="Quantidade de despesas" value={quantidade} tab="Registros" tone="gold" />
            <StatCard
              label="Categorias com gasto"
              value={porCategoria.length}
              tab="Categorias"
              tone="coral"
            />
          </div>

          <div className="dashboard__grid">
            <section className="ledger-card">
              <span className="ledger-card__tab">Por categoria</span>
              <h2 className="dashboard__section-title">Gastos por categoria</h2>
              <CategoryChart dados={porCategoria} />
            </section>

            <section className="ledger-card">
              <span className="ledger-card__tab">Recentes</span>
              <div className="dashboard__section-header">
                <h2 className="dashboard__section-title">Últimas despesas</h2>
                <Link to="/despesas" className="dashboard__ver-todas">
                  Ver todas →
                </Link>
              </div>

              {ultimasDespesas.length === 0 ? (
                <EmptyState
                  icon="🧾"
                  title="Nenhuma despesa cadastrada"
                  description="Registre sua primeira despesa para começar."
                  action={
                    <Link to="/despesas">
                      <Button>Cadastrar despesa</Button>
                    </Link>
                  }
                />
              ) : (
                <ul className="dashboard__lista">
                  {ultimasDespesas.map((despesa) => (
                    <li key={despesa.id} className="dashboard__item">
                      <div className="dashboard__item-info">
                        <p className="dashboard__item-desc">{despesa.description}</p>
                        <p className="dashboard__item-meta">
                          {despesa.category?.name || 'Sem categoria'} ·{' '}
                          {formatoData.format(new Date(`${despesa.date}T00:00:00Z`))}
                        </p>
                      </div>
                      <div className="dashboard__item-direita">
                        <span className="num dashboard__item-valor">{formatoMoeda.format(despesa.amount)}</span>
                        <Badge status={despesa.status} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </>
      )}
    </Layout>
  );
}
