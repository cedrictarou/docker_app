const express = require('express');
const router = express.Router();
const auth = require('../lib/verifyToken');

/* GET home page. */
router.get('/', auth.verifyToken, (req, res) => {
  res.render('index', { title: 'Express' });
});

// fetchお試し
router.post('/new', (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: 'success' });
});
module.exports = router;
