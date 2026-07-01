require('dotenv').config();
const express = require('express');

const sequelize = require('./config/database');
require('./model/associations'); // registra os relacionamentos entre os models

const routes = require('./routes');
const tratarErros = require('./middlewares/errorHandler');

const app = express();
const swaggerUi = require ('swagger-ui-express');
const swaggerSpec = require ('./config/swagger');
app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

app.use(express.json());

// Testa a conexão com o banco
sequelize.authenticate()
    .then(() => console.log('Conectado ao banco de dados!'))
    .catch(erro => console.error('Erro ao conectar no banco:', erro));

// Cria/atualiza as tabelas automaticamente em desenvolvimento
sequelize.sync({ alter: true })
    .then(() => console.log('Tabelas sincronizadas!'))
    .catch(erro => console.error('Erro ao sincronizar tabelas:', erro));

app.get('/', (req, res) => {
    res.json({ mensagem: 'API de Controle de Despesas no ar!' });
});

app.use('/', routes);

// Rota não encontrada
app.use((req, res) => {
    res.status(404).json({ erro: 'Rota não encontrada' });
});

// Tratamento global de erros (sempre por último)
app.use(tratarErros);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
