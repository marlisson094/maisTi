const DB = require('better-sqlite3')
const db = new DB('escambo.db');
const email = "marlisson@gmail.com"
console.log(db.prepare(`SELECT * FROM usuario WHERE email = ?`).get(email))

