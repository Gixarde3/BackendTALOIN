// _controllers/JobController.js
const models = require('../_models');
const path = require('path');

class JobController {
    static async getAll(req, res) {
        try {
            const items = await models.Job.findAll();
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const photos = await models.Job.getPhotos(req.params.id);
            const item = await models.Job.findById(req.params.id);
            res.send({item, photos});
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async create(req, res) {
        try {

            const appointment = await models.Appointment.findById(req.body.appointment_id);

            if(appointment.date > new Date()) {
                return res.status(400).send({ error: 'Appointment have not happened yet' });
            }
            // Save all the photos into /photos folder
            const files = req.files;
            const photos = [];
            for (const file in files['photos']) {
                const filePath = path.join('photos', files['photos'][file].path.split('\\').pop());
                photos.push(filePath);
            }

            if(photos.length === 0) {
                return res.status(400).send({ error: 'At least one photo is required' });
            }
            const item = await models.Job.create(req.body);
            const photosResult = await models.Job.addPhotos(item.id, photos);

            let workerId = await models.Appointment.getWorkerId(req.body.appointment_id);
            let money = await models.Appointment.getMoney(req.body.appointment_id);

            workerId = workerId[0].worker_id;
            money = money[0].initial_quote;

            const resultWorkers = await models.Worker.addMoney(workerId, money);
            res.send({item, resultWorkers});
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByUserId(req, res) {
        try {
            const items = await models.Job.getByUserId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByWorkerId(req, res) {
        try {
            const items = await models.Job.getByWorkerId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByRequestId(req, res) {
        try {
            const items = await models.Job.getByRequestId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByQuotationId(req, res) {
        try {
            const items = await models.Job.getByQuoteId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByAppointmentId(req, res) {
        try {
            const items = await models.Job.getByAppointmentId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    static async complete(req, res) {
        try {
            const item = await models.Job.complete(req.params.id);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = JobController;
