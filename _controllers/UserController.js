// UserController.js
const models = require('../_models');
const path = require('path');
const bcrypt = require('bcrypt');


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

    static async create(req, res) {
        try {
            const password = req.body.password;
            //Save the prophile_photo into /photos folder
            const file = req.files.prophile_photo;
            const filePath = path.join('photos', file.path.split('\\').pop());

            //save into req.body the filename as prophile_photo
            req.body.profile_photo = filePath;
            req.body.password = bcrypt.hashSync(password, 10);
            const user = await models.User.create(req.body);
            res.send(user);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const user = await models.User.findByEmail(req.body.email);
            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(401).send({ error: 'Invalid password' });
            }
            res.send(user);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = UserController;
