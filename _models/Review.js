// _models/Review.js
const db = require('../_database');

class Review {
    static findAll() {
        return db.query('SELECT * FROM Review');
    }

    static findById(id) {
        return db.query('SELECT * FROM Review WHERE id = ?', [id])
            .then(results => results[0]);
    }

    static create(data) {
        return db.query('INSERT INTO Review SET ?', data)
            .then(result => ({ id: result.insertId, ...data }));
    }

    static addPhotos(id, photos) {
        const promises = photos.map(photo => db.query('INSERT INTO reviewphoto SET ?', { review_id: id, file: photo }));
        return Promise.all(promises);
    }

    static getPhotos(id) {
        return db.query('SELECT * FROM reviewphoto WHERE review_id = ?', [id]);
    }

    static getByJobId(id) {
        return db.query('SELECT * FROM Review WHERE job_id = ?', [id]);
    }

    static getByAppointmentId(id) {
        return db.query(`SELECT * FROM Review 
                        INNER JOIN Job ON Job.id = Review.job_id
                        WHERE Job.appointment_id = ?`, [id]);
    }

    static getByQuoteId(id) {
        return db.query(`SELECT * FROM Review 
                        INNER JOIN Job ON Job.id = Review.job_id
                        INNER JOIN Appointment ON Appointment.id = Job.appointment_id
                        WHERE Appointment.quote_id = ?`, [id]);
    }

    static getByRequestId(id) {
        return db.query(`SELECT * FROM Review 
                        INNER JOIN Job ON Job.id = Review.job_id
                        INNER JOIN Appointment ON Appointment.id = Job.appointment_id
                        INNER JOIN Quote ON Quote.id = Appointment.quote_id
                        WHERE Quote.request_id = ?`, [id]);
    }

    static getByUserId(id) {
        return db.query(`SELECT * FROM Review 
                        INNER JOIN Job ON Job.id = Review.job_id
                        INNER JOIN Appointment ON Appointment.id = Job.appointment_id
                        INNER JOIN Quote ON Quote.id = Appointment.quote_id
                        INNER JOIN Request ON Request.id = Quote.request_id
                        WHERE Request.user_id = ?`, [id]);
    }

    static getByWorkerId(id) {
        return db.query(`SELECT * FROM Review 
                        INNER JOIN Job ON Job.id = Review.job_id
                        INNER JOIN Appointment ON Appointment.id = Job.appointment_id
                        INNER JOIN Quote ON Quote.id = Appointment.quote_id
                        INNER JOIN Request ON Request.id = Quote.request_id
                        WHERE Request.worker_id = ?`, [id]);
    }
}

module.exports = Review;
