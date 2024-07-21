// _models/Quota.js
const db = require('../_database');

class Quota {
    static findAll() {
        return db.query('SELECT * FROM Quote');
    }

    static findById(id) {
        return db.query('SELECT * FROM Quote WHERE id = ?', [id])
            .then(results => results[0]);
    }

    static create(data) {
        return db.query('INSERT INTO Quote SET ?', data)
            .then(result => ({ id: result.insertId, ...data }));
    }

    static getByRequestId(id) {
        return db.query('SELECT * FROM Quote WHERE request_id = ?', [id]);
    }

    static getByWorkerId(id) {
        return db.query(`SELECT * FROM Quote
                        INNER JOIN Request ON Request.id = Quote.request_id
                        WHERE Request.worker_id = ?`, [id]);
    }

    static getByUserId(id) {
        return db.query(`SELECT * FROM Quote
                        INNER JOIN Request ON Request.id = Quote.request_id
                        WHERE Request.user_id = ?`, [id]);
    }

    static accept(id) {
        return db.query('UPDATE Quote SET accepted = true WHERE id = ?', [id])
            .then(result => ({ id, status: 'accepted' }));
    }

    static reject(id) {
        return db.query('UPDATE Quote SET accepted = false WHERE id = ?', [id])
            .then(result => ({ id, status: 'rejected' }));
    }

    static negotiate(id, price){
        return db.query('UPDATE Quote SET initial_quote = ? WHERE id = ? AND accepted = false', [price, id])
            .then(result => (result.affectedRows === 0 ? {error: "La cotización ya había sido aceptada, o no existe la cotización"} : { id, price }));
    }

    static isAccepted(id){
        return db.query('SELECT * FROM Quote WHERE id = ? AND accepted=true', [id])
            .then(results => results[0]);
    }
}

module.exports = Quota;
