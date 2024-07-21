
const User = require('./User');
const Worker = require('./Worker');
const Service = require('./Service');
module.exports = {
    User,
    Worker,
    Service
    // Export other models here if needed
};
const Request = require('./Request.js');
module.exports.Request = Request;
const Quota = require('./Quota.js');
module.exports.Quota = Quota;
const Appointment = require('./Appointment.js');
module.exports.Appointment = Appointment;
const Job = require('./Job.js');
module.exports.Job = Job;
const Review = require('./Review.js');
module.exports.Review = Review;