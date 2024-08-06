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

            //Verificar que photos sea un array
            if(Array.isArray(files)) {
                for (const file in files['photos']) {
                    let foto = files['photos'][file];
                    
                    let filePath = path.join('photos', foto.path.split('\\').pop());
                    if(foto.path.split('\\').length <= 1) {
                        filePath = path.join('photos', foto.path.split('/').pop());
                    }
       
                }
            }else{
                let foto = files['photos'];
                let filePath = path.join('photos', foto.path.split('\\').pop());
                if(foto.path.split('\\').length <= 1) {
                    filePath = path.join('photos', foto.path.split('/').pop());
                }
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
            console.log(error);
        }
    }

    static async getByUserId(req, res) {
        try {
            const items = await models.Job.getByUserId(req.params.id);

            const photos = [];
            for (const item of items) {
                const photo = await models.Job.getPhotos(item.id);
                photos.push(photo);
            }

            const descriptions = [];
            for (const item of items) {
                const description = await models.Request.getDescription(item.request_id);
                descriptions.push(description);
            }

            const RequestPhotos = []
            for (const item of items) {
                const photo = await models.Request.getPhotos(item.request_id);
                RequestPhotos.push(photo);
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
                const appointment = await models.Appointment.getByQuoteId(item.quote_id);
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

            const moneys = [];
            for(const item of items) {
                const money = await models.Quota.getMoney(item.quote_id);
                moneys.push(money);
            }

            const results = [];
            items.forEach((item, index) => {
                results.push({...item, photos: photos[index], ...moneys[index], request: {worker: {...names[index], ...lastnames[index],...locations[index], ...prophile_photos[index]}, photos: RequestPhotos[index], ...descriptions[index]}});
            });

            res.send(results);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByWorkerId(req, res) {
        try {
            const items = await models.Job.getByWorkerId(req.params.id);

            const photos = [];
            for (const item of items) {
                const photo = await models.Job.getPhotos(item.id);
                photos.push(photo);
            }

            const RequestPhotos = []
            for (const item of items) {
                const photo = await models.Request.getPhotos(item.request_id);
                RequestPhotos.push(photo);
            }

            const descriptions = [];
            for (const item of items) {
                const description = await models.Request.getDescription(item.request_id);
                descriptions.push(description);
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

            const moneys = [];
            for(const item of items) {
                const money = await models.Quota.getMoney(item.quote_id);
                moneys.push(money);
            }

            const results = [];
            items.forEach((item, index) => {
                results.push({...item, photos: photos[index], ...moneys[index], request: {user: {...names[index], ...lastnames[index],...locations[index], ...prophile_photos[index], ...addresses[index]}, photos: RequestPhotos[index], ...descriptions[index]}});
            });
            res.send(results);
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
