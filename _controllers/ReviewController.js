// _controllers/ReviewController.js
const models = require('../_models');
const path = require('path');
class ReviewController {
    static async getAll(req, res) {
        try {
            const items = await models.Review.findAll();
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const photos = await models.Review.getPhotos(req.params.id);
            const item = await models.Review.findById(req.params.id);
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

            const item = await models.Review.create(req.body);
            const photosResult = await models.Review.addPhotos(item.id, photos);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByUserId(req, res) {
        try {
            const items = await models.Review.getByUserId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByWorkerId(req, res) {
        try {
            const items = await models.Review.getByWorkerId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }


    static async getByRequestId(req, res) {
        try {
            const items = await models.Review.getByRequestId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByQuoteId(req, res) {
        try {
            const items = await models.Review.getByQuoteId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByAppointmentId(req, res) {
        try {
            const items = await models.Review.getByAppointmentId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByJobId(req, res) {
        try {
            const items = await models.Review.getByJobId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = ReviewController;
