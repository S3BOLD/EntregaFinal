const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Tabela de usuários
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users'
});

class UserModel {

    async create(name, email, password) {
        return await User.create({ name, email, password });
    }

    async getAll() {
        return await User.findAll();
    }

    async getById(id) {
        return await User.findByPk(id);
    }

    async getByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async update(id, data) {
        const user = await this.getById(id);
        if (!user) {
            return null;
        }

        await user.update(data);
        return user;
    }

    async delete(id) {
        const user = await this.getById(id);
        if (!user) {
            return false;
        }

        await user.destroy();
        return true;
    }
}

const userModel = new UserModel();
userModel.User = User;

module.exports = userModel;
