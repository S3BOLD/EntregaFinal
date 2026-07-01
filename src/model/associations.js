const { User } = require('./user');
const { Category } = require('./category');
const { Expense } = require('./expenses');

// Um usuário tem várias despesas / uma despesa pertence a um usuário
User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

// Uma categoria tem várias despesas / uma despesa pertence a uma categoria
Category.hasMany(Expense, { foreignKey: 'categoryId' });
Expense.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

module.exports = { User, Category, Expense };
