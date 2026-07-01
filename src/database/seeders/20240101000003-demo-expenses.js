'use strict';

// Obs: assume que o usuário demo tem id 1 e as categorias foram
// inseridas na ordem do seeder anterior (1=Alimentação, 2=Transporte,
// 3=Moradia, 4=Saúde, 5=Lazer)
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('expenses', [
      { description: 'Supermercado', amount: 350.50, date: '2026-06-05', status: 'PAGA', categoryId: 1, userId: 1 },
      { description: 'Combustível', amount: 200.00, date: '2026-06-10', status: 'PAGA', categoryId: 2, userId: 1 },
      { description: 'Conta de energia', amount: 180.75, date: '2026-06-15', status: 'PENDENTE', categoryId: 3, userId: 1 },
      { description: 'Consulta médica', amount: 250.00, date: '2026-06-20', status: 'PENDENTE', categoryId: 4, userId: 1 }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('expenses', null, {});
  }
};
