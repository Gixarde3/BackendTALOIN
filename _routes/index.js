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
router.post('/login/user', controllers.UserController.login);


router.post('/create/service', controllers.ServiceController.create);
router.get('/services', controllers.ServiceController.getAll);

router.post('/create/worker', controllers.WorkerController.create);
router.get('/worker/:id', controllers.WorkerController.getById);
router.get('/workers', controllers.WorkerController.getAll);
router.post('/workers/service/:id', controllers.WorkerController.getByServiceId);
router.post('/login/worker', controllers.WorkerController.login);


router.post('/create/request', controllers.RequestController.create);
router.get('/requests', controllers.RequestController.getAll);
router.get('/request/:id', controllers.RequestController.getById);
router.get('/requests/user/:id', controllers.RequestController.getByUserId);
router.get('/requests/worker/:id', controllers.RequestController.getByWorkerId);

router.post('/create/quotation', controllers.QuotaController.create);
router.get('/quotations', controllers.QuotaController.getAll);
router.get('/quotation/:id', controllers.QuotaController.getById);
router.get('/quotations/request/:id', controllers.QuotaController.getByRequestId);
router.get('/quotations/worker/:id', controllers.QuotaController.getByWorkerId);
router.post('/quotation/accept/:id', controllers.QuotaController.accept);
router.post('/quotation/reject/:id', controllers.QuotaController.reject);
router.post('/quotation/negotiate/:id', controllers.QuotaController.negotiate);
router.get('/quotations/worker/:id', controllers.QuotaController.getByWorkerId);
router.get('/quotations/user/:id', controllers.QuotaController.getByUserId);
router.post('/quotation/acceptNegotiation/:id', controllers.QuotaController.acceptNegotiation);

router.post('/create/appointment', controllers.AppointmentController.create);
router.get('/appointments', controllers.AppointmentController.getAll);
router.get('/appointment/:id', controllers.AppointmentController.getById);
router.get('/appointments/request/:id', controllers.AppointmentController.getByRequestId);
router.get('/appointments/quotation/:id', controllers.AppointmentController.getByQuoteId);
router.get('/appointments/worker/:id', controllers.AppointmentController.getByWorkerId);
router.get('/appointments/user/:id', controllers.AppointmentController.getByUserId);

router.post('/create/job', controllers.JobController.create);
router.get('/jobs', controllers.JobController.getAll);
router.get('/job/:id', controllers.JobController.getById);
router.get('/jobs/worker/:id', controllers.JobController.getByWorkerId);
router.get('/jobs/user/:id', controllers.JobController.getByUserId);
router.post('/jobs/complete/:id', controllers.JobController.complete);
router.get('/jobs/request/:id', controllers.JobController.getByRequestId);
router.get('/jobs/appointment/:id', controllers.JobController.getByAppointmentId);
router.get('/jobs/quotation/:id', controllers.JobController.getByQuotationId);


router.post('/create/review', controllers.ReviewController.create);
router.get('/reviews', controllers.ReviewController.getAll);
router.get('/review/:id', controllers.ReviewController.getById);
router.get('/reviews/job/:id', controllers.ReviewController.getByJobId);
router.get('/reviews/appointment/:id', controllers.ReviewController.getByAppointmentId);
router.get('/reviews/quote/:id', controllers.ReviewController.getByQuoteId);
router.get('/reviews/request/:id', controllers.ReviewController.getByRequestId);
router.get('/reviews/user/:id', controllers.ReviewController.getByUserId);
router.get('/reviews/worker/:id', controllers.ReviewController.getByWorkerId);

module.exports = router;