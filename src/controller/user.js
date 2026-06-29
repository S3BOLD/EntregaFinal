const bcrypt = require("bcrypt");

const User = require("../model/user");

class UserController {

    async create(name, email, password) {

        if (!name || !email || !password) {

            throw new Error("Todos os campos são obrigatórios.");

        }

        const exists = await User.findOne({

            where: { email }

        });

        if (exists) {

            throw new Error("Email já está em uso.");

        }

        const hash = await bcrypt.hash(password, 10);

        return User.create({

            name,

            email,

            password: hash

        });

    }

    async getAll() {

        return User.findAll({

            attributes: {

                exclude: ["password"]

            }

        });

    }

    async getById(id) {

        return User.findByPk(id, {

            attributes: {

                exclude: ["password"]

            }

        });

    }

    async update(id, data) {

        const user = await User.findByPk(id);

        if (!user) {

            throw new Error("Usuário não encontrado.");

        }

        if (data.password) {

            data.password = await bcrypt.hash(

                data.password,

                10

            );

        }

        await user.update(data);

        return this.getById(id);

    }

    async delete(id) {

        const user = await User.findByPk(id);

        if (!user) {

            throw new Error("Usuário não encontrado.");

        }

        await user.destroy();

        return true;

    }

}

module.exports = new UserController();