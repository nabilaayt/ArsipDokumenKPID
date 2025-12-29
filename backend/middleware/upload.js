const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    
    if (extname) {
        return cb(null, true);
    } else {
        cb(new Error('Hanya file Dokumen (PDF/DOCX) yang diizinkan!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    // Batas dinaikkan menjadi 200MB (200 * 1024 * 1024 bytes)
    limits: { fileSize: 200 * 1024 * 1024 }, 
    fileFilter: fileFilter
});

module.exports = upload;