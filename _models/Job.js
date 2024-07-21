// _models/Job.js
const db = require('../_database');

class Job {
    static findAll() {
        return db.query('SELECT * FROM Job');
    }

    static findById(id) {
        return db.query('SELECT * FROM Job WHERE id = ?', [id])
            .then(results => results[0]);
    }

    static create(data) {
        return db.query('INSERT INTO Job SET ?', data)
            .then(result => ({ id: result.insertId, ...data }));
    }

    static getByRequestId(id) {
        return db.query(`SELECT * FROM Job 
                        INNER JOIN Appointment ON Appointment.id = Job.appointment_id
                        INNER JOIN Quote ON Quote.id = Appointment.quote_id
                        WHERE Quote.request_id = ?`, [id]);
    }

    static getByAppointmentId(id) {
        return db.query('SELECT * FROM Job WHERE appointment_id = ?', [id]);
    }

    static getByQuoteId(id) {
        return db.query(`SELECT Job.* FROM Job
                        INNER JOIN Appointment ON Appointment.id = Job.appointment_id
                        WHERE Appointment.quote_id = ?`, [id]);
    }

    static getByWorkerId(id) {
        return db.query(`SELECT Job.* FROM Job
                        INNER JOIN Appointment ON Appointment.id = Job.appointment_id
                        INNER JOIN Quote ON Quote.id = Appointment.quote_id
                        INNER JOIN Request ON Request.id = Appointment.request_id
                        WHERE Request.worker_id = ?`, [id]);
    }

    static getByUserId(id) {
        return db.query(`SELECT Job.* FROM Job
                        INNER JOIN Appointment ON Appointment.id = Job.appointment_id
                        INNER JOIN Quote ON Quote.id = Appointment.quote_id
                        INNER JOIN Request ON Request.id = Appointment.request_id
                        WHERE Request.user_id = ?`, [id]);
    }

    static complete(id) {
        return db.query('UPDATE Job SET completed = true WHERE id = ?', [id])
            .then(result => ({ id, status: 'completed' }));
    }

    static addPhotos(id, photos) {
        const promises = photos.map(file => db.query('INSERT INTO JobPhoto SET ?', { job_id: id, file }));
        return Promise.all(promises);
    }

    static getPhotos(id) {
        return db.query('SELECT * FROM JobPhoto WHERE job_id = ?', [id]);
    }
}

module.exports = Job;
