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

    static findByServiceId(id, lat, lon) {
        return db.query('SELECT * FROM Worker WHERE service_id = ? AND haversine(?, ?, latitude, longitude) < 10', [id, lat, lon]);
    }

    static findByEmail(email) {
        return db.query('SELECT * FROM Worker WHERE email = ?', [email])
            .then(results => results[0]);
    }

    static addMoney(id, amount) {
        console.log(amount);
        return db.query('UPDATE Worker SET money = money + ? WHERE id = ?', [amount, id])
            .then(result => ({ id, money: amount }));
    }
    static changeStars(id, stars) {
        return db.query('UPDATE Worker SET average_stars = ((average_stars + ?)/(total_opinions + 1)), total_opinions = total_opinions + 1 WHERE id = ?', [stars, id])
            .then(result => ({ id, stars }));
    }
}

module.exports = Worker;
