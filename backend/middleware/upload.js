const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        // file.originalname adalah nama asli file dari user, misalnya "surat.pdf"
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Filter file agar hanya menerima PDF dan DOCX (Sesuai gambar Tambah Dokumen)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (extname) {
        return cb(null, true);
    } else {
        cb('Error: Hanya file Dokumen (PDF/DOCX) yang diizinkan!');
    }
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // Batas 20MB sesuai UI
    fileFilter: fileFilter
});

// PASTIKAN: Tidak ada kurung kurawal di module.exports
module.exports = upload;