const db = require('../database');


const createDomain = (domain, userId, callback) => {
    db.run('INSERT INTO domains (domain, user_id) VALUES (?, ?)', [domain, userId], (err) => {
        if (err) {
            callback(err, null); 
        } else {
            callback(null, this.lastID);
        }
    });
}

const findUserDomain = (userId, callback) => {
    db.run('SELECT * TABLE domains WHERE user_id = ?', [userId], (err,rows) => {
        if (err) {
            callback(err, null); 
        } else {
            callback(null, rows);
        }
    });
}


