const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Category = sequelize.define("Category", {

    id: {

        type: DataTypes.INTEGER,

        primaryKey: true,

        autoIncrement: true

    },

    name: {

        type: DataTypes.STRING,

        allowNull: false

    },

    description: {

        type: DataTypes.STRING

    }

}, {

    tableName: "Categories"

});



class categoryModel {
    constructor() {}

    async getAllCategorys() {
        return await Category.findAll();
    }

    async getCategoryById(id) {
        return await Category.findByPk(id);
    }

    async getCategoryByExpenseId(expenseId) {
        return await Category.findAll({where: { expenseId } });
    }

    async createCategory(expenseId, description) {
        return await Category.create({ expenseId, description });
    }

    async updateCategory(id, description) {
        const Category = await this.getCategoryById(id);

        if (!Category) {
            return null;
        }

        Category.description = description;

        await Category.save();
        return Category;
    }

    async deleteCategory(id) {
        const Category = await this.getCategoryById(id);

        if (!Category) {
            return false;
        }

        await Category.destroy();
        return true;
    }

}

const CategoryModel = new categoryModel();
CategoryModel.category = Category;

module.exports = CategoryModel;