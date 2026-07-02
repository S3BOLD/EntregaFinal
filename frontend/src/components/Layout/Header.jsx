import { useTheme } from '../../hooks/useTheme';
import './Layout.css';

export function Header({ titulo, subtitulo, onAbrirMenu, acoes }) {
  const { theme, alternarTema } = useTheme();

  return (
    <header className="topbar">
      <button
        type="button"
        className="topbar__menu"
        onClick={onAbrirMenu}
        aria-label="Abrir menu de navegação"
      >
        ☰
      </button>

      <div className="topbar__titulos">
        <h1 className="topbar__titulo">{titulo}</h1>
        {subtitulo ? <p className="topbar__subtitulo">{subtitulo}</p> : null}
      </div>

      <div className="topbar__acoes">
        {acoes}
        <button
          type="button"
          className="topbar__tema"
          onClick={alternarTema}
          aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
