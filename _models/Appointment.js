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
}

module.exports = Appointment;
