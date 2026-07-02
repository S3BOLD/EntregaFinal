import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import './Layout.css';

export function Layout({ titulo, subtitulo, acoes, children }) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar aberta={menuAberto} onFechar={() => setMenuAberto(false)} />
      <div className="app-shell__main">
        <Header
          titulo={titulo}
          subtitulo={subtitulo}
          acoes={acoes}
          onAbrirMenu={() => setMenuAberto(true)}
        />
        <main className="app-shell__content">{children}</main>
      </div>
    </div>
  );
}
