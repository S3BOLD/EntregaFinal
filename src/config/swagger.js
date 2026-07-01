const swaggerJsdoc = require('swagger-jsdoc');

// Configuração do Swagger (documentação interativa da API)
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Controle de Despesas',
            version: '1.0.0',
            description: 'API RESTful para controle de despesas pessoais (Node.js + Express + Sequelize + MySQL)'
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
                Usuario: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nome: { type: 'string', example: 'Maria Teste' },
                        email: { type: 'string', example: 'maria@example.com' }
                    }
                },
                Categoria: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        nome: { type: 'string', example: 'Alimentação' },
                        descricao: { type: 'string', example: 'Gastos com comida e mercado' }
                    }
                },
                Despesa: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 1 },
                        descricao: { type: 'string', example: 'Supermercado' },
                        valor: { type: 'number', format: 'double', example: 250.90 },
                        data: { type: 'string', format: 'date', example: '2026-06-15' },
                        status: { type: 'string', enum: ['PENDENTE', 'PAGA'], example: 'PENDENTE' },
                        categoriaId: { type: 'integer', example: 1 },
                        usuarioId: { type: 'integer', example: 1 }
                    }
                },
                Erro: {
                    type: 'object',
                    properties: {
                        erro: { type: 'string', example: 'Erro ao criar despesa' }
                    }
                }
            }
        },
        security: [{ bearerAuth: [] }]
    },
    // Os comentários JSDoc que descrevem cada rota ficam dentro dos próprios arquivos de rota
    apis: ['./src/routes/*.js']
};

module.exports = swaggerJsdoc(options);
