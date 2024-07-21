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
}

module.exports = User;
