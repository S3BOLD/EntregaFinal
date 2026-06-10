const { toDefaultValue } = require('sequelize/lib/utils');
const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('users', {
    id: {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allownull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allownull: false
    },
    password: {
        type: DataTypes.STRING,
        allownull: false
    },
    createAt: {
        type: DataTypes.DATE,
        allownull: false,
        toDefaultValue: DataTypes.NOW
    }
})

class UserModel {
    
    constructor() {}

    async getAllUsers() {
        return await User.findAll(); 
    }

    async createUser(email, password, name) {
        return await User.create({ email, password, name}); 
    }

    async getUserByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async getUserById(id) {
        return await User.findByPk(id); // SELECT * FROM users WHERE id = ? com endereços
    }

    async updateUser(id, email, password, name) {
        const user = await this.getUserById(id);

        if (!user) {
            return null;
        }

        user.email = email;
        user.password = password;
        user.name = name;

        await user.save();
        return user;
    }

    async deleteUser(id) {
        const user = await this.getUserById(id);

        if (!user) {
            return null;
        }

        await user.destroy();
        return null;
    }

}

const userModel = new UserModel();
userModel.User = User;

module.exports = userModel;