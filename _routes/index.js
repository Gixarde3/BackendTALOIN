const express = require('express');
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

router.get('/users', controllers.UserController.getUsers);
router.get('/user/:id', controllers.UserController.getUserById);
router.post('/user', controllers.UserController.createUser);

module.exports = router;