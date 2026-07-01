const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Tabela de categorias
const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'categories',
    timestamps: false
});

class CategoryModel {

    async create(name, description) {
        return await Category.create({ name, description });
    }

    async getAll() {
        return await Category.findAll();
    }

    async getById(id) {
        return await Category.findByPk(id);
    }

    async update(id, data) {
        const category = await this.getById(id);
        if (!category) {
            return null;
        }

        await category.update(data);
        return category;
    }

    async delete(id) {
        const category = await this.getById(id);
        if (!category) {
            return false;
        }

        await category.destroy();
        return true;
    }
}

const categoryModel = new CategoryModel();
categoryModel.Category = Category;

module.exports = categoryModel;
