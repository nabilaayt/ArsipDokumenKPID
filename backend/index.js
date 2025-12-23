const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const docRoutes = require('./routes/docRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Folder Statis
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routing
app.use('/api/auth', authRoutes);
app.use('/api', docRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: "API Arsip KPID Sumsel Ready" });
});

app.use((req, res) => {
    res.status(404).json({ message: "Endpoint tidak ditemukan!" });
});

app.listen(port, () => {
    console.log(`Server jalan di http://localhost:${port}`);
});