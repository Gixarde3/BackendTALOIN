// _models/Service.js
const db = require('../_database');

class Service {
    static findAll() {
        return db.query('SELECT * FROM Service');
    }

    static findById(id) {
        return db.query('SELECT * FROM Service WHERE id = ?', [id])
            .then(results => results[0]);
    }

    static findByName(name) {
        return db.query('SELECT * FROM Service WHERE name = ?', [name])
            .then(results => results[0]);
    }

    static create(data) {
        return db.query('INSERT INTO Service SET ?', data)
            .then(result => ({ id: result.insertId, ...data }));
    }
}

module.exports = Service;
