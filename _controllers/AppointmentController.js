// _controllers/AppointmentController.js
const models = require('../_models');

class AppointmentController {
    static async getAll(req, res) {
        try {
            const items = await models.Appointment.findAll();
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const item = await models.Appointment.findById(req.params.id);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const quote = await models.Quota.isAccepted(req.body.quote_id);
            if (!quote) {
                return res.status(400).send({ error: 'Quote is not accepted' });
            }
            const item = await models.Appointment.create(req.body);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByRequestId(req, res) {
        try {
            const items = await models.Appointment.getByRequestId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByQuoteId(req, res) {
        try {
            const items = await models.Appointment.getByQuoteId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByWorkerId(req, res) {
        try {
            const items = await models.Appointment.getByWorkerId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByUserId(req, res) {
        try {
            const items = await models.Appointment.getByUserId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = AppointmentController;
