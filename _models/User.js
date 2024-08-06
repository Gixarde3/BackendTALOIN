// _models/User.js
const db = require('../_database');

class User {
    static async findAll() {
        return db.query('SELECT * FROM User');
    }

    static async findById(id) {
        const user = await db.query('SELECT * FROM User WHERE id = ?', [id]);

        if (user.length === 0) {
            return {error: 'User not found'};
        }

        return user[0];
    }

    static async create(data) {
        const user = await db.query('INSERT INTO User SET ?', data);
        return {id: user.insertId, ...data};
    }

    static findByEmail(email) {
        return db.query('SELECT * FROM User WHERE email = ?', [email])
            .then(results => results[0]);
    }

    static getName(id) {
        return db.query('SELECT name FROM User WHERE id = ?', [id])
            .then(results => results[0]);
    }

    static getLastName(id) {
        return db.query('SELECT lastname FROM User WHERE id = ?', [id])
            .then(results => results[0]);
    }

    static getAddress(id) {
        return db.query('SELECT address FROM User WHERE id = ?', [id])
            .then(results => results[0]);
    }

    static getLocation(id) {
        return db.query('SELECT latitude, longitude FROM User WHERE id = ?', [id])
            .then(results => results[0]);
    }

    static getProfilePhoto(id) {
        return db.query('SELECT profile_photo FROM User WHERE id = ?', [id])
            .then(results => results[0]);
    }
}

module.exports = User;
