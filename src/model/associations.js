const User = require("./user");
const Expense = require("./expenses");
const Category = require("./category");

User.hasMany(Expense, {

    foreignKey: "userId",

    as: "expenses"

});

Expenses.belongsTo(User, {

    foreignKey: "userId",

    as: "user"

});

Category.hasMany(Expense, {

    foreignKey: "categoryId",

    as: "expenses"

});

Expense.belongsTo(Category, {

    foreignKey: "categoryId",

    as: "category"

});

module.exports = {

    User,

    Expense,

    Category

};