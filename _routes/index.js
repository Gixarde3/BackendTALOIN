const express = require('express');
const path = require('path');
const models = require('../_models');
const controllers = require('../_controllers');

const router = express.Router();

//Call UserController

// Define your routes here

// Example route
router.get('/', (req, res) => {
    res.send('Hello, world!');
});

router.get('/test', (req, res) => {
    res.send('This is a test route');
});


// Nueva ruta para obtener la imagen
router.get('/photos/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../photos', filename);
    res.sendFile(filepath, (err) => {
        if (err) {
            res.status(404).send({ error: 'Image not found' });
        }
    });
});

router.get('/users', controllers.UserController.getUsers);
router.get('/user/:id', controllers.UserController.getUserById);
router.post('/create/user', controllers.UserController.create);
router.post('/login', controllers.UserController.login);


router.post('/create/service', controllers.ServiceController.create);
router.get('/services', controllers.ServiceController.getAll);

router.post('/create/worker', controllers.WorkerController.create);
router.get('worker/:id', controllers.WorkerController.getById);
router.get('/workers', controllers.WorkerController.getAll);
router.get('/workers/service/:id', controllers.WorkerController.getByServiceId);
module.exports = router;