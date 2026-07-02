import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Input } from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';
import '../Login/Auth.css';

function validar(dados) {
  const erros = {};
  if (!dados.name.trim()) erros.name = 'Informe seu nome.';
  if (!/^\S+@\S+\.\S+$/.test(dados.email)) erros.email = 'Informe um e-mail válido.';
  if (dados.password.length < 6) erros.password = 'A senha deve ter pelo menos 6 caracteres.';
  if (dados.password !== dados.confirmar) erros.confirmar = 'As senhas não coincidem.';
  return erros;
}

export function Register() {
  const { cadastrar } = useAuth();
  const { sucesso } = useToast();
  const navigate = useNavigate();

  const [dados, setDados] = useState({ name: '', email: '', password: '', confirmar: '' });
  const [erros, setErros] = useState({});
  const [erroApi, setErroApi] = useState('');
  const [carregando, setCarregando] = useState(false);

  function atualizarCampo(campo, valor) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
    setErros((atual) => ({ ...atual, [campo]: undefined }));
  }

  async function aoSubmeter(evento) {
    evento.preventDefault();
    const errosValidacao = validar(dados);
    setErros(errosValidacao);
    if (Object.keys(errosValidacao).length) return;

    setErroApi('');
    setCarregando(true);
    try {
      await cadastrar(dados.name.trim(), dados.email.trim(), dados.password);
      sucesso('Conta criada com sucesso! Faça login para continuar.');
      navigate('/login', { replace: true });
    } catch (erroCadastro) {
      setErroApi(erroCadastro.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-page__brand">
        <span className="auth-page__brand-icon" aria-hidden="true">
          📒
        </span>
        <h1>Abra seu livro-razão pessoal.</h1>
        <p>Crie sua conta e comece a organizar categorias, despesas e metas em poucos minutos.</p>
      </div>

      <div className="auth-page__form-side">
        <div className="auth-card">
          <div>
            <h2>Criar conta</h2>
            <p className="auth-card__sub">Leva menos de um minuto.</p>
          </div>

          {erroApi ? <p className="auth-card__erro" role="alert">{erroApi}</p> : null}

          <form className="auth-card__form" onSubmit={aoSubmeter} noValidate>
            <Input
              label="Nome"
              autoComplete="name"
              placeholder="Seu nome completo"
              value={dados.name}
              error={erros.name}
              onChange={(e) => atualizarCampo('name', e.target.value)}
            />
            <Input
              label="E-mail"
              type="email"
              autoComplete="email"
              placeholder="voce@exemplo.com"
              value={dados.email}
              error={erros.email}
              onChange={(e) => atualizarCampo('email', e.target.value)}
            />
            <Input
              label="Senha"
              type="password"
              autoComplete="new-password"
              placeholder="Mínimo de 6 caracteres"
              value={dados.password}
              error={erros.password}
              onChange={(e) => atualizarCampo('password', e.target.value)}
            />
            <Input
              label="Confirmar senha"
              type="password"
              autoComplete="new-password"
              value={dados.confirmar}
              error={erros.confirmar}
              onChange={(e) => atualizarCampo('confirmar', e.target.value)}
            />
            <Button type="submit" full loading={carregando}>
              Criar conta
            </Button>
          </form>

          <p className="auth-card__rodape">
            Já tem conta? <Link to="/login">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
