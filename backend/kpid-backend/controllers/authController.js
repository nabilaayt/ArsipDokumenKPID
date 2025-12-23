const db = require('../config/db');
const response = require('../response');
const jwt = require('jsonwebtoken');

// Gunakan SECRET_KEY yang kuat dan konsisten dengan middleware
const SECRET_KEY = 'kpid_sumsel_secret';

// LOGIN FUNCTION
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Validasi input kosong
    if (!email || !password) {
        return response(400, null, "Email dan password wajib diisi", res);
    }

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    
    db.query(sql, [email, password], (err, result) => {
        if (err) return response(500, err.message, "Internal Server Error", res);
        
        if (result.length > 0) {
            const user = result[0];
            
            // Generate Token (Berlaku 1 hari)
            const token = jwt.sign(
                { id: user.id, role: user.role }, 
                SECRET_KEY, 
                { expiresIn: '1d' }
            );

            // Data yang dikirim ke frontend
            const payload = {
                token,
                role: user.role, // 'admin' atau 'user'
                nama: user.nama_admin
            };

            response(200, payload, "Login Berhasil", res);
        } else {
            // Jika user tidak ditemukan
            response(401, null, "Email atau Password Salah", res);
        }
    });
};

// LOGOUT FUNCTION
exports.logout = (req, res) => {
    // Pada sistem JWT, logout dilakukan dengan menghapus token di sisi client (Frontend).
    // Endpoint ini berfungsi untuk memberikan respon formal ke aplikasi.
    response(200, null, "Logout berhasil. Silakan hapus token dari local storage.", res);
};