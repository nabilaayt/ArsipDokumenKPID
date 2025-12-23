const express = require('express');
const router = express.Router();
const path = require('path');
const docController = require('../controllers/docController');
const upload = require('../middleware/upload');
const { verifyAdmin } = require('../middleware/authMiddleware');

// Akses User & Admin
router.get('/dokumen', docController.getDokumen);
router.get('/stats', docController.getStats);
router.get('/download/:filename', (req, res) => {
    const filePath = path.resolve(__dirname, '../uploads', req.params.filename);
    res.download(filePath, (err) => {
        if (err && !res.headersSent) res.status(404).json({ message: "File tidak ditemukan" });
    });
});

// Akses Admin Only
router.post('/dokumen', verifyAdmin, upload.single('file'), docController.addDokumen);
router.put('/dokumen/:id', verifyAdmin, upload.single('file'), docController.updateDokumen);
router.delete('/dokumen/:id', verifyAdmin, docController.deleteDokumen);

module.exports = router;