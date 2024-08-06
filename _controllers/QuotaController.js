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

            const photos = [];
            for (const item of items) {
                const photo = await models.Request.getPhotos(item.request_id);
                photos.push(photo);
            }


            const names = [];
            for (const item of items) {
                const name = await models.User.getName(item.user_id);
                names.push(name);
            }

            const lastnames = [];
            for (const item of items) {
                const lastname = await models.User.getLastName(item.user_id);
                lastnames.push(lastname);
            }

            const addresses = [];

            for(const item of items) {
                const address = await models.User.getAddress(item.user_id);
                addresses.push(address);
            }

            const appointmens = [];
            for (const item of items) {
                const appointment = await models.Appointment.getByQuoteId(item.id);
                appointmens.push(appointment);
            }

            const locations = [];
            for(const item of items) {
                const location = await models.User.getLocation(item.user_id);
                locations.push(location);
            }

            const prophile_photos = [];

            for(const item of items) {
                const prohile_photo = await models.User.getProfilePhoto(item.user_id);
                prophile_photos.push(prohile_photo);
            }

            const results = [];
            items.forEach((item, index) => {
                results.push({...item, photos: photos[index], user: {...names[index], ...lastnames[index], ...addresses[index], ...locations[index], ...prophile_photos[index]}, appointment: appointmens[index].length > 0 ? appointmens[index][0] : null});
            });
            res.send(results);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByUserId(req, res) {
        try {
            const items = await models.Quota.getByUserId(req.params.id);
            
            const photos = [];
            for (const item of items) {
                const photo = await models.Request.getPhotos(item.request_id);
                photos.push(photo);
            }

            const names = [];

            for (const item of items) {
                const name = await models.Worker.getName(item.worker_id);
                names.push(name);
            }


            const lastnames = [];

            for (const item of items) {
                const lastname = await models.Worker.getLastName(item.worker_id);
                lastnames.push(lastname);
            }

        
            const appointmens = [];
            for (const item of items) {
                const appointment = await models.Appointment.getByQuoteId(item.id);
                appointmens.push(appointment);
            }

            const locations = [];
            for(const item of items) {
                const location = await models.Worker.getLocation(item.worker_id);
                locations.push(location);
            }

            const prophile_photos = [];
            for(const item of items) {
                const prohile_photo = await models.Worker.getProfilePhoto(item.worker_id);
                prophile_photos.push(prohile_photo);
            }

            const results = [];
            items.forEach((item, index) => {
                results.push({...item, photos: photos[index], worker: {...names[index], ...lastnames[index],...locations[index], ...prophile_photos[index]}, appointment: appointmens[index].length > 0 ? appointmens[index][0] : null});
            });
            res.send(results);
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

    static async acceptNegotiation(req, res) {
        try {
            const item = await models.Quota.acceptNegotiation(req.params.id);
            res.send(item);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = QuotaController;
