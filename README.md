# API de Controle de Despesas


## Tecnologias

| Tecnologia | Função |
|---|---|
| Node.js + Express | Servidor HTTP e roteamento |
| Sequelize | ORM — mapeia tabelas do MySQL para objetos JavaScript |
| MySQL | Banco de dados relacional |
| JWT (jsonwebtoken) | Autenticação stateless via token |
| bcrypt | Hash seguro da senha do usuário |
| dotenv | Variáveis de ambiente (.env) |
| swagger-jsdoc + swagger-ui-express | Documentação interativa da API |

---

## Como rodar

### 1. Instalar as dependências
```bash
npm install
```

### 2. Configurar o ambiente
```bash
cp .env.example .env
```
Abra o `.env` e ajuste com os dados do seu MySQL:
```env
PORT=3000

DB_NAME=gestao
DB_USER=root
DB_PASS=
DB_HOST=localhost

JWT_SECRET=segredo123
```

### 3. Criar o banco e rodar as migrations + seeders
```bash
npm run db:create
npm run db:migrate
npm run db:seed
```

### 4. Iniciar o servidor
```bash
npm start
# ou com reload automático:
npm run dev
```

A API sobe em `http://localhost:3000`.

---

## Documentação interativa (Swagger)

Com o servidor rodando, acesse:

```
http://localhost:3000/docs
```

Na interface do Swagger você pode:
- Ver todas as rotas com seus parâmetros e respostas esperadas;
- Testar as requisições diretamente pelo navegador;
- Autenticar clicando em **Authorize** e colando o token no formato `Bearer <token>`.

---

## Usuário de teste (inserido pelo seeder)

```
email:    demo@example.com
password: 123456
```

---

## Autenticação

Após o login, envie o token JWT no header de todas as rotas protegidas:

```
Authorization: Bearer <token>
```

Rotas **públicas** (não exigem token):
- `POST /users`
- `POST /auth/login`

Todas as demais rotas exigem o token.

---

## Rotas

### Auth
| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/login` | Login — retorna o token JWT |

### Users
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/users` | ✗ | Cadastro de usuário |
| GET | `/users` | ✓ | Lista todos os usuários |
| GET | `/users/:id` | ✓ | Busca usuário pelo id |
| PUT | `/users/:id` | ✓ | Atualiza usuário |
| DELETE | `/users/:id` | ✓ | Remove usuário |

### Categories
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/categories` | ✓ | Lista todas as categorias |
| GET | `/categories/:id` | ✓ | Busca categoria pelo id |
| POST | `/categories` | ✓ | Cria categoria |
| PUT | `/categories/:id` | ✓ | Atualiza categoria |
| DELETE | `/categories/:id` | ✓ | Remove categoria |

### Expenses
| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/expenses` | ✓ | Lista despesas (aceita filtros) |
| GET | `/expenses/:id` | ✓ | Busca despesa pelo id |
| POST | `/expenses` | ✓ | Cria despesa |
| PUT | `/expenses/:id` | ✓ | Atualiza despesa |
| DELETE | `/expenses/:id` | ✓ | Remove despesa |

Corpo para `POST`/`PUT /expenses`:
```json
{
  "description": "Supermercado",
  "amount": 250.90,
  "date": "2026-06-15",
  "status": "PENDENTE",
  "categoryId": 1
}
```

#### Filtros disponíveis em `GET /expenses`

Todos os parâmetros são opcionais e podem ser combinados:

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `category` | integer | id da categoria |
| `status` | string | `PENDENTE` ou `PAGA` |
| `startDate` | date | início do período (`AAAA-MM-DD`) |
| `endDate` | date | fim do período (`AAAA-MM-DD`) |
| `minAmount` | number | valor mínimo |
| `maxAmount` | number | valor máximo |

Exemplo:
```
GET /expenses?status=PAGA&category=1&startDate=2026-06-01&endDate=2026-06-30
```

### Dashboard
| Método | Rota | Auth | Resposta |
|---|---|---|---|
| GET | `/dashboard/total-expenses` | ✓ | `{ "total": 3500.50 }` |
| GET | `/dashboard/expenses-count` | ✓ | `{ "count": 45 }` |
| GET | `/dashboard/expenses-by-category` | ✓ | `[{ "category": "Alimentação", "total": 1200 }]` |

Os endpoints de dashboard aceitam os mesmos filtros de `GET /expenses`.

---

## Entidades

**User** — id, name, email, password (hash bcrypt), createdAt, updatedAt  
**Category** — id, name, description  
**Expense** — id, description, amount, date, status (`PENDENTE`/`PAGA`), categoryId, userId

**Relacionamentos:**
- Um usuário possui várias despesas (1:N)
- Uma categoria possui várias despesas (1:N)
- Uma despesa pertence a um usuário e a uma categoria (N:1)

---

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o servidor |
| `npm run dev` | Inicia com nodemon (reload automático) |
| `npm run db:create` | Cria o banco de dados |
| `npm run db:migrate` | Roda as migrations (cria as tabelas) |
| `npm run db:seed` | Insere os dados de exemplo |

---

## Segurança

- Senhas criptografadas com `bcrypt` antes de salvar no banco;
- Autenticação via JWT — o token é validado em todas as rotas protegidas;
- Variáveis sensíveis (senha do banco, segredo do JWT) ficam no `.env`, nunca no código;
- Tratamento global de erros com `middlewares/errorHandler.js`;
- Cada usuário só acessa as próprias despesas (o `userId` é sempre extraído do token, não do corpo da requisição).

---

## Collection do Postman

Disponível em `postman_collection.json` na raiz do projeto.  
Importe no Postman, rode **Login** e cole o token recebido na variável `token` da coleção — as demais requisições já usam `{{token}}` automaticamente.
