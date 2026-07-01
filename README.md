# API de Controle de Despesas

## Como rodar

1. Instalar as dependências:
```bash
npm install
```

2. Criar o arquivo `.env` a partir do exemplo e ajustar com os dados do seu MySQL:
```bash
cp .env.example .env
```

3. Criar o banco e rodar as migrations/seeders:
```bash
npm run db:create
npm run db:migrate
npm run db:seed
```
(também é possível rodar `src/database/schema.sql` direto no MySQL, se preferir)

4. Iniciar o servidor:
```bash
npm start
```

A API sobe em `http://localhost:3000`.

## Usuário de teste (vem do seeder)

```
email: demo@example.com
password: 123456
```

## Autenticação

Depois do login, envie o token recebido no header das rotas protegidas:
```
Authorization: Bearer <token>
```
Só `POST /users` e `POST /auth/login` são públicas, todo o resto exige login.

## Rotas

### Usuários
| Método | Rota        | Descrição            |
|--------|-------------|------------------------|
| POST   | /users      | Cadastro de usuário    |
| GET    | /users      | Lista usuários         |
| GET    | /users/:id  | Busca usuário por id   |
| PUT    | /users/:id  | Atualiza usuário       |
| DELETE | /users/:id  | Remove usuário         |

Corpo de cadastro/login:
```json
{
  "name": "Maria Teste",
  "email": "maria@example.com",
  "password": "123456"
}
```

### Login
| Método | Rota         | Descrição           |
|--------|--------------|----------------------|
| POST   | /auth/login  | Login (retorna JWT)  |

### Categorias
| Método | Rota             | Descrição           |
|--------|------------------|----------------------|
| GET    | /categories      | Lista categorias     |
| GET    | /categories/:id  | Busca por id         |
| POST   | /categories      | Cria categoria       |
| PUT    | /categories/:id  | Atualiza categoria   |
| DELETE | /categories/:id  | Remove categoria     |

Corpo (POST/PUT `/categories`):
```json
{
  "name": "Educação",
  "description": "Cursos e livros"
}
```

### Despesas
| Método | Rota            | Descrição          |
|--------|-----------------|----------------------|
| GET    | /expenses       | Lista despesas (aceita filtros) |
| GET    | /expenses/:id   | Busca por id        |
| POST   | /expenses       | Cria despesa        |
| PUT    | /expenses/:id   | Atualiza despesa    |
| DELETE | /expenses/:id   | Remove despesa      |

Corpo (POST/PUT `/expenses`):
```json
{
  "description": "Supermercado",
  "amount": 250.90,
  "date": "2026-06-15",
  "status": "PENDENTE",
  "categoryId": 1
}
```

### Filtros de despesas

`GET /expenses` aceita os seguintes parâmetros de query (todos opcionais e combináveis):

- `category` -> id da categoria
- `status` -> `PENDENTE` ou `PAGA`
- `startDate` e `endDate` -> período (formato `YYYY-MM-DD`)
- `minAmount` e `maxAmount` -> faixa de valor

Exemplo:
```
GET /expenses?status=PAGA&category=1
```

### Dashboard

Esses endpoints também aceitam os mesmos filtros acima.

```
GET /dashboard/total-expenses        -> { "total": 3500.50 }
GET /dashboard/expenses-count        -> { "quantidade": 45 }
GET /dashboard/expenses-by-category  -> [ { "categoria": "Alimentação", "total": 1200 } ]
```
> As chaves `total`, `quantidade` e `categoria` nas respostas do dashboard seguem exatamente o formato pedido no enunciado da disciplina, por isso continuam em português.

## Entidades

- **Usuário (User)**: id, name, email, password (criptografada com bcrypt), createdAt, updatedAt
- **Categoria (Category)**: id, name, description
- **Despesa (Expense)**: id, description, amount, date, status (`PENDENTE`/`PAGA`), categoryId, userId

## Relacionamentos

- Um usuário tem várias despesas
- Uma categoria tem várias despesas
- Uma despesa pertence a um usuário e a uma categoria

## Segurança

- Senha criptografada com `bcrypt` antes de salvar no banco
- Login com JWT (`middlewares/auth.js` valida o token nas rotas protegidas)
- Tratamento global de erros (`middlewares/errorHandler.js`), com mensagens em português
- Dados sensíveis (senha do banco, segredo do JWT) ficam no `.env`

## Collection do Postman

Está em `postman_collection.json`, na raiz do projeto. Basta importar no Postman, rodar o "Login" e colar o token recebido na variável `token` da coleção.
