// _controllers/RequestController.js
const models = require('../_models');
const path = require('path');

class RequestController {
    static async getAll(req, res) {
        try {
            const items = await models.Request.findAll();
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const photos = await models.Request.getPhotos(req.params.id);
            const item = await models.Request.findById(req.params.id);
            res.send({item, photos});
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async create(req, res) {
        try {

            // Save all the photos into /photos folder
            const files = req.files;
            const photos = [];
            for (const file in files['photos']) {
                const filePath = path.join('photos', files['photos'][file].path.split('\\').pop());
                photos.push(filePath);
            }

            const item = await models.Request.create(req.body);
            const photosResult = await models.Request.addPhotos(item.id, photos);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByUserId(req, res) {
        try {
            const items = await models.Request.getByUserId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByWorkerId(req, res) {
        try {
            const items = await models.Request.getByWorkerId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = RequestController;
