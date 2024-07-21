// _models/Worker.js
const db = require('../_database');

class Worker {
    static findAll() {
        return db.query('SELECT * FROM Worker');
    }

    static findById(id) {
        return db.query('SELECT * FROM Worker WHERE id = ?', [id])
            .then(results => results[0]);
    }

    static create(data) {
        return db.query('INSERT INTO Worker SET ?', data)
            .then(result => ({ id: result.insertId, ...data }));
    }

    static findByServiceId(id) {
        return db.query('SELECT * FROM Worker WHERE service_id = ?', [id])
            .then(results => results[0]);
    }
}

module.exports = Worker;
