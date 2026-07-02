import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { EmptyState } from '../UI/EmptyState';
import './CategoryChart.css';

const formatoMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

function TooltipPersonalizado({ active, payload }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="category-chart__tooltip">
      <strong>{item.categoria}</strong>
      <span>{formatoMoeda.format(item.total)}</span>
    </div>
  );
}

export function CategoryChart({ dados }) {
  if (!dados?.length) {
    return <EmptyState icon="🗂️" title="Sem dados por categoria" description="Cadastre despesas para ver a distribuição." />;
  }

  const ordenado = [...dados].sort((a, b) => b.total - a.total);

  return (
    <div className="category-chart">
      <ResponsiveContainer width="100%" height={Math.max(220, ordenado.length * 44)}>
        <BarChart data={ordenado} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
          <CartesianGrid horizontal={false} stroke="var(--line)" />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="categoria"
            width={110}
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
          />
          <Tooltip cursor={{ fill: 'var(--bg-elevated-2)' }} content={<TooltipPersonalizado />} />
          <Bar dataKey="total" fill="var(--ledger)" radius={[0, 6, 6, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
