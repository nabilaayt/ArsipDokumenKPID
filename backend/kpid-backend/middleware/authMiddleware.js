const jwt = require('jsonwebtoken');
const response = require('../response');
const SECRET_KEY = 'kpid_sumsel_secret';

exports.verifyAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return response(401, null, "Akses ditolak, token tidak ditemukan", res);

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return response(403, null, "Sesi berakhir atau token tidak valid", res);
        
        // Cek Role: Hanya 'admin' yang boleh lanjut
        if (decoded.role !== 'admin') {
            return response(403, null, "Akses Terbatas: Role 'user' tidak diizinkan melakukan ini", res);
        }
        
        req.user = decoded;
        next(); // Lanjut ke controller
    });
};