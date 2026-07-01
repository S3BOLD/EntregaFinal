const swaggerJsdoc = require('swagger-jsdoc');

// Configuração do Swagger (documentação interativa da API)
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Controle de Despesas',
            version: '1.0.0',
            description:
                'API RESTful para controle de despesas pessoais.\n\n' +
                '**Como usar:** clique em **Authorize** (botão no topo), ' +
                'cole o token no campo `Value` no formato `Bearer <token>` e confirme.\n\n' +
                'Todas as rotas, exceto `POST /users` e `POST /auth/login`, exigem autenticação.'
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Servidor local' }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id:    { type: 'integer', example: 1 },
                        name:  { type: 'string',  example: 'Maria Teste' },
                        email: { type: 'string',  example: 'maria@example.com' }
                    }
                },
                Category: {
                    type: 'object',
                    properties: {
                        id:          { type: 'integer', example: 1 },
                        name:        { type: 'string',  example: 'Alimentação' },
                        description: { type: 'string',  example: 'Gastos com comida e mercado' }
                    }
                },
                Expense: {
                    type: 'object',
                    properties: {
                        id:          { type: 'integer',           example: 1 },
                        description: { type: 'string',            example: 'Supermercado' },
                        amount:      { type: 'number', format: 'double', example: 250.90 },
                        date:        { type: 'string', format: 'date',   example: '2026-06-15' },
                        status:      { type: 'string', enum: ['PENDENTE', 'PAGA'], example: 'PENDENTE' },
                        categoryId:  { type: 'integer',           example: 1 },
                        userId:      { type: 'integer',           example: 1 },
                        category:    { $ref: '#/components/schemas/Category' }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: { type: 'string', example: 'Mensagem de erro' }
                    }
                }
            }
        },
        // Aplica bearerAuth como padrão em todas as rotas (cada rota que for pública
        // sobrescreve com security: [] no próprio JSDoc)
        security: [{ bearerAuth: [] }]
    },
    // Lê as anotações @swagger dos arquivos de rota
    apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);
