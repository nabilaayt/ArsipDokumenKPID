const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Endpoint: POST http://localhost:3000/api/auth/login
router.post('/login', authController.login);

// Endpoint: POST http://localhost:3000/api/auth/logout
router.post('/logout', authController.logout);

module.exports = router;