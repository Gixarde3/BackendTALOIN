// _models/Appointment.js
const db = require('../_database');

class Appointment {
    static findAll() {
        return db.query('SELECT * FROM Appointment');
    }

    static findById(id) {
        return db.query('SELECT * FROM Appointment WHERE id = ?', [id])
            .then(results => results[0]);
    }

    static create(data) {
        return db.query('INSERT INTO Appointment SET ?', data)
            .then(result => ({ id: result.insertId, ...data }));
    }

    static getByRequestId(id) {
        return db.query(`SELECT * FROM Appointment 
                        INNER JOIN Quote ON Quote.id = Appointment.id 
                        WHERE Quote.request_id = ?`, [id]);
    }

    static getByQuoteId(id) {
        return db.query('SELECT * FROM Appointment WHERE quote_id = ?', [id]);
    }

    static getByWorkerId(id) {
        return db.query(`SELECT Appointment.*, Request.description, Request.worker_id, Request.user_id, Quote.request_id FROM Appointment 
                        INNER JOIN Quote ON Quote.id = Appointment.quote_id 
                        INNER JOIN Request ON Request.id = Quote.request_id
                        WHERE Request.worker_id = ?`, [id]);
    }

    static getByUserId(id) {
        return db.query(`SELECT Appointment.*, Request.description, Request.worker_id, Request.user_id, Quote.request_id  FROM Appointment 
                        INNER JOIN Quote ON Quote.id = Appointment.quote_id 
                        INNER JOIN Request ON Request.id = Quote.request_id
                        WHERE Request.user_id = ?`, [id]);
    }

    static getMoney(id) {
        return db.query(`SELECT * FROM Appointment 
                        INNER JOIN Quote ON Quote.id = Appointment.quote_id 
                        WHERE Appointment.id = ?`, [id]);
    }

    static getWorkerId(id) {
        return db.query(`SELECT * FROM Appointment 
                        INNER JOIN Quote ON Quote.id = Appointment.quote_id 
                        INNER JOIN Request ON Request.id = Quote.request_id
                        WHERE Appointment.id = ?`, [id]);
    }
}

module.exports = Appointment;
