const express = require ('express');
const router = express.Router();

const userControl = require ('../controllers/user');
const password = require ('../middleware/password');

router.post('/signup', password, userControl.signup);
router.post('/login', userControl.login);

module.exports = router;
