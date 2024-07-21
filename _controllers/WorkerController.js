// _controllers/WorkerController.js
const models = require('../_models');

class WorkerController {
    static async getAll(req, res) {
        try {
            const items = await models.Worker.findAll();
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const item = await models.Worker.findById(req.params.id);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            //Save the prophile_photo into /photos folder
            const file = req.files.prophile_photo;
            const filePath = path.join('photos', file.path.split('\\').pop());

            //save into req.body the filename as prophile_photo
            req.body.profile_photo = filePath;

            const item = await models.Worker.create(req.body);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByServiceId(req, res) {
        try {
            const item = await models.Worker.findByServiceId(req.params.id);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = WorkerController;
