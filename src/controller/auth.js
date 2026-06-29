const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

class AuthController {

    async login(email, password) {

        if (!email || !password) {
            throw new Error("Email and password are required.");
        }

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            throw new Error("Invalid email or password.");
        }

        const valid = await bcrypt.compare(
            password,
            user.password
        );

        if (!valid) {
            throw new Error("Invalid email or password.");
        }

        const token = jwt.sign(

            {
                id: user.id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        return {

            user,

            token

        };

    }

}

module.exports = new AuthController();