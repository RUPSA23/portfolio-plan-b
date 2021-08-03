const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', authController.getportfolio);

router.get('/signup', authController.getSignup);

router.get('/login', authController.getLogin);

router.post('/signup', authController.postSignup);

module.exports = router;