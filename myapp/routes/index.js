const express = require('express');
const router = express.Router();
const auth = require('../lib/verifyToken');

/* GET home page. */
router.get('/', auth.verifyToken, (req, res) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
