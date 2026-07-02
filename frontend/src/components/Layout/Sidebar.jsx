import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Layout.css';

const ITENS = [
  { to: '/', label: 'Painel', icon: '📊', fim: true },
  { to: '/despesas', label: 'Despesas', icon: '💸' },
  { to: '/categorias', label: 'Categorias', icon: '🗂️' },
];

export function Sidebar({ aberta, onFechar }) {
  const { user, sair } = useAuth();

  return (
    <>
      <aside className={`sidebar ${aberta ? 'sidebar--aberta' : ''}`}>
        <div className="sidebar__marca">
          <span className="sidebar__marca-icone" aria-hidden="true">
            📒
          </span>
          <div>
            <p className="sidebar__marca-nome">Razão</p>
            <p className="sidebar__marca-sub">controle de despesas</p>
          </div>
        </div>

        <nav className="sidebar__nav" aria-label="Navegação principal">
          {ITENS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.fim}
              className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--ativo' : ''}`}
              onClick={onFechar}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__rodape">
          <div className="sidebar__usuario">
            <span className="sidebar__avatar" aria-hidden="true">
              {user?.name?.[0]?.toUpperCase() || '?'}
            </span>
            <div>
              <p className="sidebar__usuario-nome">{user?.name || 'Usuário'}</p>
              <p className="sidebar__usuario-email">{user?.email}</p>
            </div>
          </div>
          <button type="button" className="sidebar__sair" onClick={sair}>
            Sair
          </button>
        </div>
      </aside>
      {aberta ? <div className="sidebar__overlay" onClick={onFechar} /> : null}
    </>
  );
}
