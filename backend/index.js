require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const docRoutes = require('./routes/docRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'https://arsipkpidsumsel.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// PENTING: Tambahkan limit 200mb pada body-parser
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

// Static frontend
// app.use(express.static(path.join(__dirname, '../public_html')));

// Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API
app.use('/api/auth', authRoutes);
app.use('/api', docRoutes);

// React Router fallback (HARUS DI SINI)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public_html/index.html'));
// });

// Middleware Global Error Handling (Opsional tapi berguna untuk menangkap error Multer)
app.use((err, req, res, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ message: "File terlalu besar! Maksimal 200 MB." });
    }
    res.status(500).json({ message: err.message });
});

// app.use((req, res) => {
//     res.status(404).json({ message: "Endpoint tidak ditemukan!" });
// });

app.listen(port, () => {
    console.log(`Server jalan di http://localhost:${port}`);
});