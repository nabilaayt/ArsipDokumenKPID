const db = require('../config/db');
const response = require('../response');

// Ambil Semua Dokumen (Dengan Search & Filter)
exports.getDokumen = (req, res) => {
    const { prioritas, bulan, tahun, search } = req.query;
    
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

    db.query(sql, params, (err, fields) => {
        if (err) return response(500, err.message, "Database Error", res);

        response(200, fields, "Berhasil mengambil dokumen", res);
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
            (SELECT COUNT(*) FROM dokumen) AS total,
            (SELECT COUNT(*) FROM dokumen WHERE prioritas = 'Tinggi') AS urgent
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


// --- WORD TO PDF (Auto Delete 1 Jam) ---
exports.wordToPdf = async (req, res) => {
    try {
        if (!req.file) return response(400, null, "File tidak ada", res);

        const inputPath = path.resolve(req.file.path);
        const outputDir = path.resolve(__dirname, '../uploads/');
        const outputName = `hasil-${Date.now()}.pdf`;
        const outputPath = path.join(outputDir, outputName);
        const sofficePath = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe"`;

        const cmd = `${sofficePath} --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;

        exec(cmd, (error) => {
            if (error) return response(500, "Gagal konversi.", res);

            const tempFile = path.join(outputDir, path.basename(inputPath, path.extname(inputPath)) + ".pdf");

            if (fs.existsSync(tempFile)) {
                fs.renameSync(tempFile, outputPath);
                if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);

                // BALAS KE USER DULU
                response(200, { url_download: `http://localhost:3000/uploads/${outputName}` }, "BERHASIL", res);

                // JALANKAN PEMBERSIHAN OTOMATIS (1 JAM KEMUDIAN)
                setTimeout(() => {
                    if (fs.existsSync(outputPath)) {
                        fs.unlinkSync(outputPath);
                        console.log(`File sampah ${outputName} berhasil dihapus otomatis (1 jam berlalu).`);
                    }
                }, 3600000); // 3.600.000 ms = 1 jam

            } else {
                return response(500, "File tidak ditemukan.", res);
            }
        });
    } catch (err) {
        return response(500, "Kesalahan sistem.", res);
    }
};

// --- PDF TO WORD (Auto Delete 1 Jam) ---
exports.pdfToWord = async (req, res) => {
    try {
        if (!req.file) return response(400, null, "File tidak ada", res);

        const inputPath = path.resolve(req.file.path);
        const outputDir = path.resolve(__dirname, '../uploads/');
        const baseName = path.basename(inputPath, path.extname(inputPath));
        const tempFilePath = path.join(outputDir, `${baseName}.docx`);
        const finalName = `hasil-${Date.now()}.docx`;
        const finalPath = path.join(outputDir, finalName);
        const soffice = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe"`;

        const cmd = `${soffice} --headless --infilter="writer_pdf_import" --convert-to docx --outdir "${outputDir}" "${inputPath}"`;
        
        exec(cmd, (err) => {
            if (err) return response(500, null, "Gagal di sistem", res);

            setTimeout(() => {
                if (fs.existsSync(tempFilePath)) {
                    fs.renameSync(tempFilePath, finalPath);
                    if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);

                    // BALAS KE USER DULU
                    response(200, { url_download: `http://localhost:3000/uploads/${finalName}` }, "BERHASIL", res);

                    // JALANKAN PEMBERSIHAN OTOMATIS (1 JAM KEMUDIAN)
                    setTimeout(() => {
                        if (fs.existsSync(finalPath)) {
                            fs.unlinkSync(finalPath);
                            console.log(`File sampah ${finalName} berhasil dihapus otomatis (1 jam berlalu).`);
                        }
                    }, 3600000); // 1 jam

                } else {
                    return response(500, null, "File gagal dibuat.", res);
                }
            }, 3000);
        });
    } catch (e) {
        return response(500, e.message, "Error", res);
    }
};