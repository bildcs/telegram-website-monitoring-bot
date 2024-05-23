const db = require('../database');
const { v4: uuidv4 } = require('uuid');


const createDomain = (domain, userId, callback) => {
    db.run('INSERT INTO domains (domain, user_id,uuid) VALUES (?, ?,?)', [domain, userId,uuidv4()], function(err) {
       callback(err, this.lastID);
    });
}

const findUserDomain = (userId, callback) => {
    db.all('SELECT * FROM domains WHERE user_id = ? AND status = 1', [userId], function(err, rows) {
       callback(err,rows);
    });
}

const findUuidForDomain = (userId,uuid, callback) => {
    db.all('SELECT * FROM domains WHERE user_id = ? AND uuid = ? AND status = ?', [userId,uuid,true], function(err, rows) {
       callback(err,rows);
    });
}

const checkDomain = (domain, callback) => {
    db.all('SELECT * FROM domains WHERE domain = ? AND status = 1', [domain], function(err, rows) {
       callback(err,rows);
    });
}

const deleteDomain = (userId,uuid, callback) => {
    db.run('UPDATE domains SET status = 0 WHERE user_id = ? AND uuid = ?', [userId,uuid], function(err) {
        callback(err,true);
    });
}


module.exports = {
    createDomain, 
    findUserDomain, 
    checkDomain,
    findUuidForDomain,
    deleteDomain
}
