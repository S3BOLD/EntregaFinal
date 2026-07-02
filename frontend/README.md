# Razão — Frontend de Controle de Despesas

## Tecnologias

- React 18 + Vite
- React Router DOM v6 (rotas públicas/privadas)
- Axios (cliente HTTP com interceptors de token e erro)
- Context API (Auth, Theme, Toast) — estado global sem Redux
- Recharts (gráfico de gastos por categoria)
- CSS puro com design tokens (`src/styles/tokens.css`) como "CSS Framework" próprio, sem dependências extras de build

## Estrutura

```text
src/
 ├── components/   # Layout, UI (Button, Input, Modal, Badge...), tabela/formulários de domínio
 ├── pages/        # Login, Register, Dashboard, Categories, Expenses, NotFound
 ├── routes/       # AppRoutes e proteção de rotas (PrivateRoute / PublicOnlyRoute)
 ├── services/     # api.js (axios) + services por recurso (auth, category, expense, dashboard)
 ├── contexts/     # AuthContext, ThemeContext, ToastContext
 ├── hooks/        # useAuth, useCategories, useExpenses, useDashboard, useDebounce, useTheme, useToast
 └── styles/       # tokens.css (design system) e global.css
```

## Como rodar

1. Suba o backend (pasta `EntregaFinal-main`): configure o `.env` dele, rode `npm install`, `npm run db:create && npm run db:migrate` (e `db:seed` se quiser dados de exemplo) e `npm run dev`. Por padrão ele sobe em `http://localhost:3000`.
2. Neste projeto de frontend:
   ```bash
   cp .env.example .env      # ajuste VITE_API_URL se a API não estiver em localhost:3000
   npm install
   npm run dev
   ```
3. Acesse `http://localhost:5173`, crie uma conta em **Cadastre-se** e faça login.

## Funcionalidades implementadas

- **Autenticação**: login, cadastro, persistência de sessão via `localStorage` (token JWT + dados do usuário) e logout.
- **Dashboard**: total de gastos, quantidade de despesas, gastos por categoria (gráfico) e últimas despesas cadastradas — consumindo `/dashboard/total-expenses`, `/dashboard/expenses-count` e `/dashboard/expenses-by-category`.
- **Categorias**: CRUD completo (listar, criar, editar, excluir) com confirmação antes de excluir.
- **Despesas**: CRUD completo com filtros por categoria, status, período (data inicial/final) e faixa de valor (mín/máx), refletindo exatamente os query params aceitos por `GET /expenses`.
- **Interface**: responsiva (sidebar colapsável em mobile), estados de carregamento (`Loader`), tratamento de erros com tela de retry e toasts, formulários validados no cliente antes de enviar à API.
- **Bônus**: dark mode (alternância no topo, persistida), paginação e ordenação client-side na tabela de despesas, gráfico de gastos por categoria (Recharts).


## Build de produção

```bash
npm run build
npm run preview
```
