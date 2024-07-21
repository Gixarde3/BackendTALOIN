const UserController = require('./UserController');
const WorkerController = require('./WorkerController');
const ServiceController = require('./ServiceController');
module.exports = {
    UserController,
    WorkerController,
    ServiceController
    // Export other controllers here if needed
};
const RequestController = require('./RequestController.js');
module.exports.RequestController = RequestController;
const QuotaController = require('./QuotaController.js');
module.exports.QuotaController = QuotaController;
const AppointmentController = require('./AppointmentController.js');
module.exports.AppointmentController = AppointmentController;
const JobController = require('./JobController.js');
module.exports.JobController = JobController;
const ReviewController = require('./ReviewController.js');
module.exports.ReviewController = ReviewController;