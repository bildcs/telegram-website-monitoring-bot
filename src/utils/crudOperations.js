const db = require('../database');


const createDomain = (domain, userId, callback) => {
    db.run('INSERT INTO domains (domain, user_id) VALUES (?, ?)', [domain, userId], function(err) {
       callback(err, this.lastID);
    });
}

const findUserDomain = (userId, callback) => {
    db.all('SELECT * FROM domains WHERE user_id = ?', [userId], function(err, rows) {
       callback(err,rows);
    });
}

const checkDomain = (domain, callback) => {
    db.all('SELECT * FROM domains WHERE domain = ?', [domain], function(err, rows) {
       callback(err,rows);
    });
}


module.exports = {createDomain, findUserDomain, checkDomain}
