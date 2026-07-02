import { Link } from 'react-router-dom';
import { Button } from '../../components/UI/Button';
import './NotFound.css';

export function NotFound() {
  return (
    <div className="not-found">
      <p className="not-found__codigo num">404</p>
      <h1>Página não encontrada</h1>
      <p className="not-found__texto">O lançamento que você procura não existe neste livro-razão.</p>
      <Link to="/">
        <Button>Voltar ao painel</Button>
      </Link>
    </div>
  );
}
