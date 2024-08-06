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

    static getName(id) {
        return db.query('SELECT name FROM Worker WHERE id = ?', [id])
            .then(results => results[0]);
    }

    static getLastName(id) {
        return db.query('SELECT lastname FROM Worker WHERE id = ?', [id])
            .then(results => results[0]);
    }
    static findByServiceId(id, lat, lon) {
        return db.query('SELECT * FROM Worker WHERE service_id = ? AND haversine(?, ?, latitude, longitude) < 10 ORDER BY haversine(?, ?, latitude, longitude) DESC', [id, lat, lon, lat, lon]);
    }

    static findByEmail(email) {
        return db.query('SELECT * FROM Worker WHERE email = ?', [email])
            .then(results => results[0]);
    }

    static addMoney(id, amount) {
        
        return db.query('UPDATE Worker SET money = money + ? WHERE id = ?', [amount, id])
            .then(result => ({ id, money: amount }));
    }
    static changeStars(id, stars) {
        return db.query('UPDATE Worker SET average_stars = ((average_stars + ?)/(total_opinions + 1)), total_opinions = total_opinions + 1 WHERE id = ?', [stars, id])
            .then(result => ({ id, stars }));
    }

    static getLocation(id) {
        return db.query('SELECT latitude, longitude FROM Worker WHERE id = ?', [id])
            .then(results => results[0]);
    }

    static getProfilePhoto(id) {
        return db.query('SELECT profile_photo FROM Worker WHERE id = ?', [id])
            .then(results => results[0]);
    }
}

module.exports = Worker;
