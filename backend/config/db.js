const mysql = require('mysql2');
// require('dotenv').config({ path: '../.env' });

const db = mysql.createPool({
    // host: process.env.DB_HOST || 'localhost',
    // user: process.env.DB_USER || 'root',
    // password: process.env.DB_PASS || '',
    // database: process.env.DB_NAME || 'kpid_sumsel',
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Koneksi database gagal:', err.message);
    } else {
        console.log('Database terhubung!');
        connection.release();
    }
});

module.exports = db;