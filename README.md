# Expense Control API

API REST desenvolvida em Node.js utilizando Express, Sequelize e MySQL para gerenciamento de despesas pessoais.

---

## Tecnologias

- Node.js
- Express
- Sequelize
- MySQL
- JWT
- bcrypt
- dotenv
- Swagger

---

## Instalação

Clone o projeto

```bash
git clone https://github.com/SEU_USUARIO/expense-control-api.git
```

Entre na pasta

```bash
cd expense-control-api
```

Instale as dependências

```bash
npm install
```

---

## Arquivo .env

Crie um arquivo chamado

```
.env
```

com o conteúdo

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=expenses

JWT_SECRET=123456789
```

---

## Criar banco

No MySQL

```sql
CREATE DATABASE expenses;
```

---

## Executar migrations

```bash
npx sequelize-cli db:migrate
```

---

## Executar seeders

```bash
npx sequelize-cli db:seed:all
```

---

## Rodar projeto

```bash
npm start
```

Servidor

```
http://localhost:3000
```

Swagger

```
http://localhost:3000/api-docs
```

---

# Login

```
POST /auth/login
```

Body

```json
{
    "email":"admin@email.com",
    "password":"123456"
}
```

---

# Usuários

| Método | Endpoint |
|---------|----------|
| POST | /users |
| GET | /users |
| GET | /users/:id |
| PUT | /users/:id |
| DELETE | /users/:id |

---

# Categorias

| Método | Endpoint |
|---------|----------|
| GET | /categories |
| GET | /categories/:id |
| POST | /categories |
| PUT | /categories/:id |
| DELETE | /categories/:id |

---

# Despesas

| Método | Endpoint |
|---------|----------|
| GET | /expenses |
| GET | /expenses/:id |
| POST | /expenses |
| PUT | /expenses/:id |
| DELETE | /expenses/:id |

---

## Filtros

```
GET /expenses?status=PAID
```

```
GET /expenses?categoryId=1
```

```
GET /expenses?startDate=2026-01-01&endDate=2026-12-31
```

```
GET /expenses?minValue=100&maxValue=1000
```

---

# Dashboard

```
GET /dashboard/total-expenses
```

```
GET /dashboard/expenses-count
```

```
GET /dashboard/expenses-by-category
```

---

## Autenticação

Todas as rotas (exceto cadastro e login) utilizam Bearer Token.

Exemplo:

```
Authorization: Bearer SEU_TOKEN
```

---

## Estrutura

```
src/
│
├── config/
├── controller/
├── middlewares/
├── model/
├── routes/
├── view/
│
├── app.js
└── server.js
```

---

## Desenvolvido para a disciplina de Backend.