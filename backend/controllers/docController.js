const db = require('../config/db');
const response = require('../response');

// 1. Ambil Semua Dokumen
exports.getDokumen = (req, res) => {
    const sql = "SELECT * FROM dokumen ORDER BY id DESC";
    db.query(sql, (err, result) => {
        if (err) return response(500, err.message, "Internal Error", res);
        response(200, result, "Daftar semua dokumen berhasil dimuat", res);
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