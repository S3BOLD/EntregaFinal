const Category = require("../model/category");

class CategoryController {

    async create(name, description) {

        if (!name) {

            throw new Error("Nome da categoria é obrigatório.");

        }

        return Category.create({

            name,

            description

        });

    }

    async getAll() {

        return Category.findAll({

            order: [["name", "ASC"]]

        });

    }

    async getById(id) {

        return Category.findByPk(id);

    }

    async update(id, data) {

        const category = await Category.findByPk(id);

        if (!category) {

            throw new Error("Categoria não encontrada .");

        }

        await category.update(data);

        return category;

    }

    async delete(id) {

        const category = await Category.findByPk(id);

        if (!category) {

            throw new Error("Categoria não encontrada .");

        }

        await category.destroy();

        return true;

    }

}

module.exports = new CategoryController();