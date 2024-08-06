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
            console.log(error);
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

        
            const jobs = [];
            for (const item of items) {
                const job = await models.Job.getByAppointmentId(item.id);
                jobs.push(job);
            }


            const reviews = [];

            for (const item of items) {
                const review = await models.Review.getByAppointmentId(item.id);
                reviews.push(review);
            }
            const addresses = [];

            for (const item of items) {
                const address = await models.User.getAddress(item.user_id);
                addresses.push(address);
            }

            const locations = [];
            for(const item of items) {
                const location = await models.Worker.getLocation(item.worker_id);
                locations.push(location);
            }

            const prophile_photos = [];
            for(const item of items) {
                const prophile_photo = await models.User.getProfilePhoto(item.user_id);
                prophile_photos.push(prophile_photo);
            }

            const results = [];
            items.forEach((item, index) => {
                results.push({...item, photos: photos[index], worker: {...names[index], ...lastnames[index], ...addresses[index], ...locations[index], ...prophile_photos[index]}, job: jobs[index].length > 0 ? jobs[index][0] : null, review: reviews[index].length > 0 ? reviews[index][0] : null});
            });
            res.send(results);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByUserId(req, res) {
        try {
            const items = await models.Appointment.getByUserId(req.params.id);

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
                const location = await models.User.getLocation(item.user_id);
                locations.push(location);
            }

            const prophile_photos = [];
            for(const item of items) {
                const prophile_photo = await models.Worker.getProfilePhoto(item.worker_id);
                prophile_photos.push(prophile_photo);
            }

            const jobs = [];
            for (const item of items) {
                const job = await models.Job.getByAppointmentId(item.id);
                jobs.push(job);
            }


            const reviews = [];

            for (const item of items) {
                const review = await models.Review.getByAppointmentId(item.id);
                reviews.push(review);
            }
            const addresses = [];
            

            const results = [];
            items.forEach((item, index) => {
                results.push({...item, photos: photos[index], worker: {...names[index], ...lastnames[index], ...locations[index], ...prophile_photos[index]}, job: jobs[index].length > 0 ? jobs[index][0] : null, review: reviews[index].length > 0 ? reviews[index][0] : null});
            });
            res.send(results);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = AppointmentController;
