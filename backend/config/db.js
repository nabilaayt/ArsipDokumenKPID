const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kpid', // PASTIKAN TERTULIS 'kpid_arsip' (dengan huruf P di akhir)
    connectionLimit: 10
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