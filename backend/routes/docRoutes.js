const express = require('express');
const router = express.Router();
const path = require('path');
const docController = require('../controllers/docController');
const upload = require('../middleware/upload');
const { verifyAdmin } = require('../middleware/authMiddleware');

// Akses User & Admin
router.get('/dokumen', docController.getDokumen);
router.get('/stats', docController.getStats);

// Route Download File
router.get('/download/:filename', (req, res) => {
    // Pastikan folder sesuai dengan struktur (backend/upload)
    const filePath = path.join(__dirname, '../upload', req.params.filename);
    
    res.download(filePath, (err) => {
        if (err) {
            if (!res.headersSent) {
                res.status(404).json({ message: "File tidak ditemukan di server" });
            }
        }
    });
});

// Akses Admin Only (Butuh Token & Role Admin)
router.post('/dokumen', verifyAdmin, upload.single('file'), docController.addDokumen);
router.put('/dokumen/:id', verifyAdmin, upload.single('file'), docController.updateDokumen);
router.delete('/dokumen/:id', verifyAdmin, docController.deleteDokumen);

// Convert
router.post('/konversi/word-to-pdf', upload.single('file'), docController.wordToPdf);
router.post('/konversi/pdf-to-word', upload.single('file'), docController.pdfToWord);

module.exports = router;