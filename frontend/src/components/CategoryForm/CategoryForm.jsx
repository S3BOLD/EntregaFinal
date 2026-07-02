import { useState } from 'react';
import { Modal } from '../UI/Modal';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import '../UI/Forms.css';

function validar(dados) {
  const erros = {};
  if (!dados.name.trim()) erros.name = 'Informe um nome para a categoria.';
  return erros;
}

export function CategoryForm({ categoria, onSalvar, onFechar }) {
  const [dados, setDados] = useState({
    name: categoria?.name || '',
    description: categoria?.description || '',
  });
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
      await onSalvar({ name: dados.name.trim(), description: dados.description.trim() });
    } catch (erro) {
      setErroApi(erro.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Modal
      title={categoria ? 'Editar categoria' : 'Nova categoria'}
      onClose={onFechar}
      footer={
        <>
          <Button variant="ghost" onClick={onFechar} disabled={salvando}>
            Cancelar
          </Button>
          <Button onClick={aoSubmeter} loading={salvando}>
            Salvar categoria
          </Button>
        </>
      }
    >
      <form className="stack-form" onSubmit={aoSubmeter} noValidate>
        <Input
          label="Nome"
          placeholder="Ex.: Alimentação"
          value={dados.name}
          error={erros.name}
          onChange={(e) => atualizarCampo('name', e.target.value)}
        />
        <Input
          label="Descrição (opcional)"
          placeholder="Ex.: Gastos com comida e mercado"
          value={dados.description}
          onChange={(e) => atualizarCampo('description', e.target.value)}
        />
        {erroApi ? <p className="field__error" role="alert">{erroApi}</p> : null}
      </form>
    </Modal>
  );
}
