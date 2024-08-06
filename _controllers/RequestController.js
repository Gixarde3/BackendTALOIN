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

            const worker = await models.Worker.findById(item.worker_id);
            const user = await models.User.findById(item.user_id);
            res.send({item, photos, worker, user});
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async create(req, res) {
        try {

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
                if(files['photos'] !== undefined) {
                    let foto = files['photos'];
                    let filePath = path.join('photos', foto.path.split('\\').pop());
                    if(foto.path.split('\\').length <= 1) {
                        filePath = path.join('photos', foto.path.split('/').pop());
                    }
                    photos.push(filePath);
                }
            }
            const item = await models.Request.create(req.body);
            const photosResult = await models.Request.addPhotos(item.id, photos);
            res.send(item);
        } catch (error) {
            
            res.status(500).send({ error: error.message });
            console.log(error);
        }
    }

    static async getByUserId(req, res) {
        try {
            const items = await models.Request.getByUserId(req.params.id);

            const workers = [];
            for (const item of items) {
                const worker = await models.Worker.findById(item.worker_id);
                workers.push(worker);
            }

            const photos = [];
            for (const item of items) {
                const photo = await models.Request.getPhotos(item.id);
                photos.push(photo);
            }

            const result = [] 
            items.forEach((item, index) => {
                result.push ({...item, worker: workers[index], photos: photos[index]});
            });

            res.send(result);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async getByWorkerId(req, res) {
        try {
            const items = await models.Request.getByWorkerId(req.params.id);
            
            const users = [];

            for (const item of items) {
                const user = await models.User.findById(item.user_id);
                users.push(user);
            }
            
            const photos = [];
            for (const item of items) {
                const photo = await models.Request.getPhotos(item.id);
                photos.push(photo);
            }

            const result = [] 
            items.forEach((item, index) => {
                result.push ({...item, user: users[index], photos: photos[index]});
            });

            res.send(result);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = RequestController;
