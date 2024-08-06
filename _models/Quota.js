// _models/Quota.js
const db = require('../_database');

class Quota {
    static findAll() {
        return db.query('SELECT * FROM Quote');
    }

    static findById(id) {
        return db.query(`SELECT Quote.*,
                        CONCAT(Worker.name, ' ', Worker.lastname) AS worker,
                        CONCAT(User.name, ' ', User.lastname) AS user,
                        Request.description
                        FROM Quote 
                        INNER JOIN Request ON Request.id = Quote.request_id
                        INNER JOIN Worker ON Worker.id = Request.worker_id
                        INNER JOIN User ON User.id = Request.user_id
                        WHERE Quote.id = ?`, [id])
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
    return db.query(`SELECT Quote.*, Request.description, Request.user_id FROM Quote
                        INNER JOIN Request ON Request.id = Quote.request_id
                        WHERE Request.worker_id = ?`, [id]);
    }

    static getByUserId(id) {
        return db.query(`SELECT  Quote.*, Request.description, Request.worker_id FROM Quote
                        INNER JOIN Request ON Request.id = Quote.request_id
                        WHERE Request.user_id = ?`, [id]);
    }

    static accept(id) {
        return db.query('UPDATE Quote SET accepted = true WHERE id = ? AND negotiating=false', [id])
            .then(result => ({ id, status: 'accepted' }));
    }

    static reject(id) {
        return db.query('UPDATE Quote SET accepted = false WHERE id = ?', [id])
            .then(result => ({ id, status: 'rejected' }));
    }

    static negotiate(id, price){
        return db.query('UPDATE Quote SET initial_quote = ?, negotiating=true WHERE id = ? AND accepted = false', [price, id])
            .then(result => (result.affectedRows === 0 ? {error: "La cotización ya había sido aceptada, o no existe la cotización"} : { id, price }));
    }

    static acceptNegotiation(id){
        return db.query('UPDATE Quote SET negotiating=false WHERE id = ? AND accepted=false', [id])
            .then(result => (result.affectedRows === 0 ? {error: "La cotización ya había sido aceptada, o no existe la cotización"} : { id, status: 'accepted' }));
    }

    static isAccepted(id){
        return db.query('SELECT * FROM Quote WHERE id = ? AND accepted=true', [id])
            .then(results => results[0]);
    }

    static isNegotiating(id){
        return db.query('SELECT * FROM Quote WHERE id = ? AND negotiating=true IS NOT NULL', [id])
            .then(results => results[0]);
    }

    static getMoney(id) {
        return db.query(`SELECT initial_quote FROM Quote 
                        WHERE Quote.id = ?`, [id])
                        .then(results => results[0]);
    }
}

module.exports = Quota;
