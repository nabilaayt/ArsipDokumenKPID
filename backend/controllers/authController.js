const db = require('../config/db');
const response = require('../response');
const jwt = require('jsonwebtoken');

// Mengambil secret key dari .env
const SECRET_KEY = process.env.JWT_SECRET;

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return response(400, null, "Email dan password wajib diisi", res);
    }

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    
    db.query(sql, [email, password], (err, result) => {
        if (err) return response(500, null, "Internal Server Error", res);
        
        if (result.length > 0) {
            const user = result[0];
            
            const token = jwt.sign(
                { id: user.id, role: user.role }, 
                SECRET_KEY, // Menggunakan key dari .env
                { expiresIn: '1d' }
            );

            const payload = {
                token: token,
                role: user.role,
                nama: user.nama_admin 
            };

            return response(200, payload, "Login Berhasil", res);
        } else {
            return response(401, null, "Email atau Password Salah", res);
        }
    });
};

exports.logout = (req, res) => {
    return response(200, null, "Logout berhasil", res);
};