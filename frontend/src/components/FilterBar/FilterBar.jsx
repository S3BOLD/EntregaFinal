import { useEffect, useState } from 'react';
import { Input } from '../UI/Input';
import { Select } from '../UI/Select';
import { Button } from '../UI/Button';
import { useDebounce } from '../../hooks/useDebounce';
import './FilterBar.css';

export function FilterBar({ categories, filters, onChange, onReset }) {
  const [rascunho, setRascunho] = useState(filters);
  const rascunhoDebounced = useDebounce(rascunho, 450);

  useEffect(() => setRascunho(filters), [filters]);

  useEffect(() => {
    if (JSON.stringify(rascunhoDebounced) !== JSON.stringify(filters)) {
      onChange(rascunhoDebounced);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rascunhoDebounced]);

  function atualizarCampo(campo, valor) {
    setRascunho((atual) => ({ ...atual, [campo]: valor }));
  }

  const temFiltroAtivo = Object.values(filters).some((v) => v !== '' && v !== null && v !== undefined);

  return (
    <div className="filter-bar">
      <Select
        label="Categoria"
        value={rascunho.category}
        onChange={(e) => atualizarCampo('category', e.target.value)}
      >
        <option value="">Todas</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Select>

      <Select label="Status" value={rascunho.status} onChange={(e) => atualizarCampo('status', e.target.value)}>
        <option value="">Todos</option>
        <option value="PENDENTE">Pendente</option>
        <option value="PAGA">Paga</option>
      </Select>

      <Input
        label="De"
        type="date"
        value={rascunho.startDate}
        onChange={(e) => atualizarCampo('startDate', e.target.value)}
      />
      <Input
        label="Até"
        type="date"
        value={rascunho.endDate}
        onChange={(e) => atualizarCampo('endDate', e.target.value)}
      />
      <Input
        label="Valor mín."
        type="number"
        min="0"
        step="0.01"
        placeholder="0,00"
        value={rascunho.minAmount}
        onChange={(e) => atualizarCampo('minAmount', e.target.value)}
      />
      <Input
        label="Valor máx."
        type="number"
        min="0"
        step="0.01"
        placeholder="0,00"
        value={rascunho.maxAmount}
        onChange={(e) => atualizarCampo('maxAmount', e.target.value)}
      />

      <Button variant="subtle" size="sm" onClick={onReset} disabled={!temFiltroAtivo} className="filter-bar__limpar">
        Limpar filtros
      </Button>
    </div>
  );
}
