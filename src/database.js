const sqlite3 = require('sqlite3').verbose();
let sql;


const db = new sqlite3.Database("./data/database.db",sqlite3.OPEN_READWRITE,(err) => {
    if(err) throw err;
    return console.log('Connected to database.');
});




const domainTableSql = `
CREATE TABLE IF NOT EXISTS domains (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    domain TEXT NOT NULL,
    user_id TEXT NOT NULL,
    last_check_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;
db.run(domainTableSql, (err) => {
    if (err) {
        console.error("Error creating domains table:", err.message);
    } else {
        console.log("Domains table created successfully.");
    }
});


module.exports = db;

