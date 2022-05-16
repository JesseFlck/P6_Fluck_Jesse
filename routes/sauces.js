// Import des modules

const express = require('express');
const router = express.Router();

// Imports des controllers et middlewares

const saucesControl = require('../controllers/sauces');
const likeSaucesControllers = require('../controllers/likeDislike');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Définition des routes sauces

router.get('/', auth, saucesControl.list);
router.get('/:id', auth, saucesControl.show);
router.post('/', auth, multer, saucesControl.create);
router.put('/:id', auth, multer, saucesControl.update);
router.delete('/:id', auth, saucesControl.remove);
router.post('/:id/like', auth, likeSaucesControllers.likeDislike);

module.exports = router;
