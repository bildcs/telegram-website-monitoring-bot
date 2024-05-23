const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database("./data/database.db",sqlite3.OPEN_READWRITE,(err) => {
    if(err) throw err;
    return console.log('Connected to database.');
});


db.serialize(() => { 
    db.run(`CREATE TABLE IF NOT EXISTS domains (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        domain TEXT NOT NULL UNIQUE,
        user_id TEXT NOT NULL,
        status INTEGER DEFAULT 0,
        last_check_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Table domains created or already exists.');
        }
    });
});








module.exports = db;

