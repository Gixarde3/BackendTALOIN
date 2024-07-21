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
            const item = await models.Appointment.create(req.body);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = AppointmentController;
