import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Input } from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';
import './Auth.css';

export function Login() {
  const { entrar } = useAuth();
  const { sucesso } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const sessaoExpirada = new URLSearchParams(location.search).get('sessao') === 'expirada';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState(sessaoExpirada ? 'Sua sessão expirou. Faça login novamente.' : '');
  const [carregando, setCarregando] = useState(false);

  async function aoSubmeter(evento) {
    evento.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      const usuario = await entrar(email, password);
      sucesso(`Bem-vindo(a) de volta, ${usuario.name.split(' ')[0]}!`);
      navigate('/', { replace: true });
    } catch (erroLogin) {
      setErro(erroLogin.message);
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
        <h1>Cada centavo, devidamente lançado.</h1>
        <p>Razão é o painel de controle das suas despesas: categorize, filtre e acompanhe para onde o dinheiro vai.</p>

        <div className="auth-page__ledger-lines" aria-hidden="true">
          <div className="leader-row">
            <span className="leader-row__label">Aluguel</span>
            <span className="leader-row__fill" />
            <span className="leader-row__value">R$ 1.450,00</span>
          </div>
          <div className="leader-row">
            <span className="leader-row__label">Mercado</span>
            <span className="leader-row__fill" />
            <span className="leader-row__value">R$ 612,30</span>
          </div>
          <div className="leader-row">
            <span className="leader-row__label">Transporte</span>
            <span className="leader-row__fill" />
            <span className="leader-row__value">R$ 240,00</span>
          </div>
        </div>
      </div>

      <div className="auth-page__form-side">
        <div className="auth-card">
          <div>
            <h2>Entrar</h2>
            <p className="auth-card__sub">Acesse sua conta para ver seu painel de despesas.</p>
          </div>

          {erro ? <p className="auth-card__erro" role="alert">{erro}</p> : null}

          <form className="auth-card__form" onSubmit={aoSubmeter} noValidate>
            <Input
              label="E-mail"
              type="email"
              autoComplete="email"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Senha"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" full loading={carregando}>
              Entrar
            </Button>
          </form>

          <p className="auth-card__rodape">
            Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
