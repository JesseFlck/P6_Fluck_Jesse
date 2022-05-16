// Import d'express

const express = require('express');
const router = express.Router();

// Récupération du controlleur user et des conditions du mot de passe

const userControl = require('../controllers/user');
const password = require('../middleware/password');

// Définition des routes utilisateur

router.post('/signup', password, userControl.signup);
router.post('/login', userControl.login);

module.exports = router;
