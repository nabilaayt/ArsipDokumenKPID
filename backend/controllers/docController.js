const db = require('../config/db');
const response = require('../response');

const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const CloudConvert = require('cloudconvert');
const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_API_KEY);

const path = require('path');
const fs = require('fs');
const https = require('https');

const BASE_URL = 'https://api.arsipkpidsumsel.com';

// CRUD DOKUMEN

// Ambil Semua Dokumen (Dengan Search & Filter)
exports.getDokumen = (req, res) => {
    const { prioritas, bulan, tahun, search, limit } = req.query;

    let sql = `
        SELECT id, nomor_dokumen, asal_dokumen, perihal, prioritas, file_url,
        DATE_FORMAT(tanggal_dokumen, '%d-%m-%Y') AS tanggal_dokumen, 
        DATE_FORMAT(tanggal_diterima, '%d-%m-%Y') AS tanggal_diterima 
        FROM dokumen WHERE 1=1
    `;
    let params = [];

    if (prioritas && prioritas !== 'all') {
        sql += " AND prioritas = ?";
        params.push(prioritas);
    }

    if (bulan && bulan !== 'all') {
        sql += " AND MONTH(tanggal_dokumen) = ?";
        params.push(bulan);
    }

    if (tahun && tahun !== 'all') {
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

    if (limit) {
        sql += " LIMIT ?";
        params.push(Number(limit));
    }

    db.query(sql, params, (err, result) => {
        if (err) return response(500, err.message, "Database Error", res);
        response(200, result, "Berhasil mengambil dokumen", res);
    });
};

// Ambil Dokumen By Id
exports.getDokumenById = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT id, nomor_dokumen, asal_dokumen, perihal, prioritas, file_url,
        DATE_FORMAT(tanggal_dokumen, '%Y-%m-%d') AS tanggal_dokumen,
        DATE_FORMAT(tanggal_diterima, '%Y-%m-%d') AS tanggal_diterima
        FROM dokumen
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {
        if(err) return response(500, err.message, "Database error", res);

        if(result.length === 0) {
            return response(404, null, "Dokumen tidak ditemukan", res);
        }

        response(200, result[0], "Berhasil mengambil detail dokumen", res);
    });
};

// Statistik Dashboard
exports.getStats = (req, res) => {
    const sql = `
        SELECT 
            COUNT(*) AS total,
            SUM(CASE WHEN prioritas = 'Tinggi' THEN 1 ELSE 0 END) AS tinggi,
            SUM(CASE WHEN prioritas = 'Normal' THEN 1 ELSE 0 END) AS normal
        FROM dokumen
    `;

    db.query(sql, (err, result) => {
        if (err) return response(500, err.message, "Gagal memuat statistik", res);
        response(200, result[0], "Statistik Dashboard", res);
    });
};

// Tambah Dokumen (TANPA KLASIFIKASI)
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

// Update Dokumen (TANPA KLASIFIKASI)
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

// Hapus Dokumen
exports.deleteDokumen = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM dokumen WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return response(500, err.message, "Gagal menghapus", res);
        response(200, result, "Dokumen berhasil dihapus", res);
    });
};


// KONVERSI FILE

// --- FUNGSI WORD KE PDF ---
exports.wordToPdf = async (req, res) => {
    try {
        if (!req.file) return response(400, null, "File tidak ditemukan", res);

        const inputPath = req.file.path;
        const outputName = `hasil-${Date.now()}.pdf`;
        const outputPath = path.resolve(__dirname, `../uploads/${outputName}`);

        // Membuat tugas konversi di CloudConvert
        const job = await cloudConvert.jobs.create({
            "tasks": {
                "import-1": { "operation": "import/upload" },
                "task-1": { "operation": "convert", "input": ["import-1"], "output_format": "pdf" },
                "export-1": { "operation": "export/url", "input": ["task-1"] }
            }
        });

        // Upload file dari server Hostinger ke CloudConvert
        const uploadTask = job.tasks.filter(t => t.name === 'import-1')[0];
        await cloudConvert.tasks.upload(uploadTask, fs.createReadStream(inputPath), req.file.filename);

        // Menunggu proses selesai dan mengambil link hasil
        const finishedJob = await cloudConvert.jobs.wait(job.id);
        const exportTask = finishedJob.tasks.filter(t => t.operation === 'export/url' && t.status === 'finished')[0];
        const cloudUrl = exportTask.result.files[0].url;

        // Download file dari CloudConvert ke folder uploads backend
        const file = fs.createWriteStream(outputPath);
        https.get(cloudUrl, (resStream) => {
            resStream.pipe(file);
            file.on('finish', () => {
                file.close();
                // Hapus file asli setelah konversi selesai
                if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
                
                // Kirim URL download ke frontend menggunakan domain API
                response(200, { url_download: `${BASE_URL}/uploads/${outputName}` }, "Konversi Berhasil", res);

                // Hapus otomatis file hasil setelah 1 jam agar hosting tidak penuh
                setTimeout(() => { 
                    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath); 
                }, 3600000);
            });
        });
    } catch (err) {
        response(500, err.message, "Gagal Konversi Cloud", res);
    }
};

// --- FUNGSI PDF KE WORD ---
exports.pdfToWord = async (req, res) => {
    try {
        if (!req.file) return response(400, null, "File tidak ditemukan", res);

        const inputPath = req.file.path;
        const outputName = `hasil-${Date.now()}.docx`;
        const outputPath = path.resolve(__dirname, `../uploads/${outputName}`);

        const job = await cloudConvert.jobs.create({
            "tasks": {
                "import-1": { "operation": "import/upload" },
                "task-1": { "operation": "convert", "input": ["import-1"], "output_format": "docx" },
                "export-1": { "operation": "export/url", "input": ["task-1"] }
            }
        });

        const uploadTask = job.tasks.filter(t => t.name === 'import-1')[0];
        await cloudConvert.tasks.upload(uploadTask, fs.createReadStream(inputPath), req.file.filename);

        const finishedJob = await cloudConvert.jobs.wait(job.id);
        const exportTask = finishedJob.tasks.filter(t => t.operation === 'export/url' && t.status === 'finished')[0];
        const cloudUrl = exportTask.result.files[0].url;

        const file = fs.createWriteStream(outputPath);
        https.get(cloudUrl, (resStream) => {
            resStream.pipe(file);
            file.on('finish', () => {
                file.close();
                if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
                response(200, { url_download: `${BASE_URL}/uploads/${outputName}` }, "Konversi Berhasil", res);

                setTimeout(() => { 
                    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath); 
                }, 3600000);
            });
        });
    } catch (err) {
        response(500, err.message, "Gagal Konversi Cloud", res);
    }
};