const express = require('express');
const authController = require('../controllers/authController');

const Router = express.Router();

/**
 * POST /auth/
 */
Router.post('/login', authController.login);

module.exports = Router;