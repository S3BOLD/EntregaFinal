import { useState } from 'react';
import { Modal } from '../UI/Modal';
import { Input } from '../UI/Input';
import { Select } from '../UI/Select';
import { Button } from '../UI/Button';
import '../UI/Forms.css';

function estadoInicial(despesa) {
  return {
    description: despesa?.description || '',
    amount: despesa?.amount ?? '',
    date: despesa?.date || '',
    status: despesa?.status || 'PENDENTE',
    categoryId: despesa?.category?.id ? String(despesa.category.id) : despesa?.categoryId ? String(despesa.categoryId) : '',
  };
}

function validar(dados) {
  const erros = {};
  if (!dados.description.trim()) erros.description = 'Informe uma descrição.';
  if (dados.amount === '' || Number(dados.amount) <= 0) erros.amount = 'O valor deve ser maior que zero.';
  if (!dados.date) erros.date = 'Selecione uma data.';
  if (!dados.categoryId) erros.categoryId = 'Selecione uma categoria.';
  return erros;
}

export function ExpenseForm({ despesa, categories, onSalvar, onFechar }) {
  const [dados, setDados] = useState(estadoInicial(despesa));
  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);
  const [erroApi, setErroApi] = useState('');

  function atualizarCampo(campo, valor) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
    setErros((atual) => ({ ...atual, [campo]: undefined }));
  }

  async function aoSubmeter(evento) {
    evento.preventDefault();
    const errosValidacao = validar(dados);
    setErros(errosValidacao);
    if (Object.keys(errosValidacao).length) return;

    setSalvando(true);
    setErroApi('');
    try {
      await onSalvar({
        description: dados.description.trim(),
        amount: Number(dados.amount),
        date: dados.date,
        status: dados.status,
        categoryId: Number(dados.categoryId),
      });
    } catch (erro) {
      setErroApi(erro.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Modal
      title={despesa ? 'Editar despesa' : 'Nova despesa'}
      onClose={onFechar}
      footer={
        <>
          <Button variant="ghost" onClick={onFechar} disabled={salvando}>
            Cancelar
          </Button>
          <Button onClick={aoSubmeter} loading={salvando}>
            Salvar despesa
          </Button>
        </>
      }
    >
      <form className="stack-form" onSubmit={aoSubmeter} noValidate>
        <Input
          label="Descrição"
          placeholder="Ex.: Supermercado"
          value={dados.description}
          error={erros.description}
          onChange={(e) => atualizarCampo('description', e.target.value)}
        />

        <div className="stack-form__grid2">
          <Input
            label="Valor (R$)"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0,00"
            value={dados.amount}
            error={erros.amount}
            onChange={(e) => atualizarCampo('amount', e.target.value)}
          />
          <Input
            label="Data"
            type="date"
            value={dados.date}
            error={erros.date}
            onChange={(e) => atualizarCampo('date', e.target.value)}
          />
        </div>

        <div className="stack-form__grid2">
          <Select
            label="Categoria"
            value={dados.categoryId}
            error={erros.categoryId}
            onChange={(e) => atualizarCampo('categoryId', e.target.value)}
          >
            <option value="">Selecione…</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>

          <Select label="Status" value={dados.status} onChange={(e) => atualizarCampo('status', e.target.value)}>
            <option value="PENDENTE">Pendente</option>
            <option value="PAGA">Paga</option>
          </Select>
        </div>

        {erroApi ? <p className="field__error" role="alert">{erroApi}</p> : null}
      </form>
    </Modal>
  );
}
