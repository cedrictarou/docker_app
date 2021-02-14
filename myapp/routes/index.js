const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const auth = require('../lib/verifyToken');

/* GET home page. */
router.get('/', auth.verifyToken, (req, res) => {
  res.render('index', { title: 'Express', name: res.locals.user });
});

module.exports = router;
