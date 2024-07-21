// UserController.js
const models = require('../_models');

class UserController {
    static async getUsers(req, res) {
        try {
            const users = await models.User.findAll();
            res.send(users);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await models.User.findById(req.params.id);
            res.send(user);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async createUser(req, res) {
        try {
            const user = await models.User.create(req.body);
            res.send(user);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = UserController;
