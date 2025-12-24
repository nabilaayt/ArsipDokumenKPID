const db = require('../config/db');
const response = require('../response');

// --- 1. AMBIL SEMUA DOKUMEN (Dengan Search & Filter) ---
exports.getDokumen = (req, res) => {
    const { prioritas, bulan, tahun, search } = req.query;
    
    let sql = `
        SELECT id, nomor_dokumen, asal_dokumen, perihal, prioritas, file_url,
        DATE_FORMAT(tanggal_dokumen, '%d-%m-%Y') AS tanggal_dokumen, 
        DATE_FORMAT(tanggal_diterima, '%d-%m-%Y') AS tanggal_diterima 
        FROM dokumen WHERE 1=1
    `;
    let params = [];

    if (prioritas) {
        sql += " AND prioritas = ?";
        params.push(prioritas);
    }

    if (bulan && tahun) {
        sql += " AND MONTH(tanggal_dokumen) = ? AND YEAR(tanggal_dokumen) = ?";
        params.push(bulan, tahun);
    } else if (tahun) {
        sql += " AND YEAR(tanggal_dokumen) = ?";
        params.push(tahun);
    }

    if (search) {
        sql += ` AND (
            nomor_dokumen LIKE ? OR 
            perihal LIKE ? OR 
            asal_dokumen LIKE ? OR 
            prioritas LIKE ?
        )`;
        const searchTerm = `%${search}%`;
        params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    sql += " ORDER BY id DESC";

    db.query(sql, params, (err, fields) => {
        if (err) return response(500, err.message, "Database Error", res);
        
        if (fields.length > 0) {
            response(200, fields, "Berhasil mengambil dokumen", res);
        } else {
            response(404, [], "Data tidak ditemukan", res);
        }
    });
};

// 2. Statistik Dashboard
exports.getStats = (req, res) => {
    const sql = `
        SELECT 
            (SELECT COUNT(*) FROM dokumen) AS total,
            (SELECT COUNT(*) FROM dokumen WHERE prioritas = 'Tinggi') AS urgent
    `;
    db.query(sql, (err, result) => {
        if (err) return response(500, err.message, "Gagal memuat statistik", res);
        response(200, result[0], "Statistik Dashboard", res);
    });
};

// 3. Tambah Dokumen (TANPA KLASIFIKASI)
exports.addDokumen = (req, res) => {
    // Hapus klasifikasi dari sini
    const { nomor_dokumen, tanggal_dokumen, tanggal_diterima, asal_dokumen, perihal, prioritas } = req.body;
    const file_url = req.file ? req.file.filename : null;

    // Query diperpendek karena kolom klasifikasi sudah tidak ada
    const sql = "INSERT INTO dokumen (nomor_dokumen, tanggal_dokumen, tanggal_diterima, asal_dokumen, perihal, prioritas, file_url) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [nomor_dokumen, tanggal_dokumen, tanggal_diterima, asal_dokumen, perihal, prioritas, file_url];

    db.query(sql, values, (err, result) => {
        if (err) return response(500, err.message, "Gagal menambah data", res);
        response(201, result, "Dokumen berhasil ditambahkan", res);
    });
};

// 4. Update Dokumen (TANPA KLASIFIKASI)
exports.updateDokumen = (req, res) => {
    const { id } = req.params;
    const { nomor_dokumen, tanggal_dokumen, tanggal_diterima, asal_dokumen, perihal, prioritas } = req.body;
    
    let sql = "UPDATE dokumen SET nomor_dokumen=?, tanggal_dokumen=?, tanggal_diterima=?, asal_dokumen=?, perihal=?, prioritas=? WHERE id=?";
    let values = [nomor_dokumen, tanggal_dokumen, tanggal_diterima, asal_dokumen, perihal, prioritas, id];

    if (req.file) {
        sql = "UPDATE dokumen SET nomor_dokumen=?, tanggal_dokumen=?, tanggal_diterima=?, asal_dokumen=?, perihal=?, prioritas=?, file_url=? WHERE id=?";
        values = [nomor_dokumen, tanggal_dokumen, tanggal_diterima, asal_dokumen, perihal, prioritas, req.file.filename, id];
    }

    db.query(sql, values, (err, result) => {
        if (err) return response(500, err.message, "Gagal update", res);
        response(200, result, "Dokumen berhasil diperbarui", res);
    });
};

// 5. Hapus Dokumen
exports.deleteDokumen = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM dokumen WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return response(500, err.message, "Gagal menghapus", res);
        response(200, result, "Dokumen berhasil dihapus", res);
    });
};