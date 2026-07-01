'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Alimentação', description: 'Gastos com comida e mercado' },
      { name: 'Transporte', description: 'Combustível, ônibus, aplicativos' },
      { name: 'Moradia', description: 'Aluguel e contas da casa' },
      { name: 'Saúde', description: 'Consultas e remédios' },
      { name: 'Lazer', description: 'Cinema, passeios, etc' }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
