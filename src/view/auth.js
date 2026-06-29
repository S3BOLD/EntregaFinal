class AuthView {

    login(user, token) {

        return {

            user: {

                id: user.id,

                name: user.name,

                email: user.email

            },

            token

        };

    }

}

module.exports = new AuthView();