const {sequelize} = require('./db');
const {DataTypes} = require('sequelize');

const category = sequelize.define('categorys', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    expenseId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: 'users',
            key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

class categoryModel {
    constructor() {}

    async getAllCategorys() {
        return await category.findAll();
    }

    async getCategoryById(id) {
        return await category.findByPk(id);
    }

    async getCategoryByExpenseId(expenseId) {
        return await category.findAll({where: { expenseId } });
    }

    async createCategory(expenseId, description) {
        return await category.create({ expenseId, description });
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
CategoryModel.category = category;

module.exports = CategoryModel;