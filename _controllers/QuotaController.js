// _controllers/QuotaController.js
const models = require('../_models');

class QuotaController {
    static async getAll(req, res) {
        try {
            const items = await models.Quota.findAll();
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const item = await models.Quota.findById(req.params.id);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async create(req, res) {
        try {
            const item = await models.Quota.create(req.body);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    
    static async getByRequestId(req, res) {
        try {
            const items = await models.Quota.getByRequestId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByWorkerId(req, res) {
        try {
            const items = await models.Quota.getByWorkerId(req.params.id);
            res.send(items);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async accept(req, res) {
        try {
            const item = await models.Quota.accept(req.params.id);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async reject(req, res) {
        try {
            const item = await models.Quota.reject(req.params.id);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async negotiate(req, res) {
        try {
            const new_price = req.body.new_price;
            const item = await models.Quota.negotiate(req.params.id, new_price);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

}

module.exports = QuotaController;
