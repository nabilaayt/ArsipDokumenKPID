const db = require('../config/db');
const response = require('../response');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Tambahkan library bcrypt

const SECRET_KEY = process.env.JWT_SECRET;

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return response(400, null, "Email dan password wajib diisi", res);
    }

    // Langkah 1: Cari user berdasarkan email saja
    const sql = "SELECT * FROM users WHERE email = ?";
    
    db.query(sql, [email], async (err, result) => {
        if (err) return response(500, null, "Internal Server Error", res);
        
        if (result.length > 0) {
            const user = result[0];
            
            // Langkah 2: Bandingkan password input dengan password hash di database
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                const token = jwt.sign(
                    { id: user.id, role: user.role }, 
                    SECRET_KEY,
                    { expiresIn: '1d' }
                );

                const payload = {
                    token: token,
                    user: { 
                        id: user.id,
                        role: user.role,
                        nama: user.nama_admin,
                        email: user.email
                    }
                };

                return response(200, payload, "Login Berhasil", res);
            } else {
                // Password tidak cocok
                return response(401, null, "Email atau Password Salah", res);
            }
        } else {
            // Email tidak ditemukan
            return response(401, null, "Email atau Password Salah", res);
        }
    });
};

exports.logout = (req, res) => {
    return response(200, null, "Logout berhasil", res);
};