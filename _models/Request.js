// _models/Request.js
const db = require('../_database');

class Request {
    static findAll() {
        return db.query('SELECT * FROM Request');
    }

    static findById(id) {
        return db.query('SELECT * FROM Request WHERE id = ?', [id])
            .then(results => results[0]);
    }

    static create(data) {
        return db.query('INSERT INTO Request SET ?', data)
            .then(result => ({ id: result.insertId, ...data }));
    }

    static getByUserId(id) {
        return db.query('SELECT * FROM Request WHERE user_id = ?', [id]);
    }

    static getByWorkerId(id) {
        return db.query('SELECT * FROM Request WHERE worker_id = ?', [id]);
    }

    static addPhotos(id, photos) {
        const promises = photos.map(photo => db.query('INSERT INTO request_photo SET ?', { request_id: id, file: photo }));
        return Promise.all(promises);
    }

    static getPhotos(id) {
        return db.query('SELECT * FROM request_photo WHERE request_id = ?', [id]);
    }
}

module.exports = Request;
