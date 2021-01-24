const express = require('express');
const router = express.Router();
const auth = require('../lib/verifyToken');

// 一覧ページ
router.get('/list', auth.verifyToken, (req, res) => {
  res.render('post/list.ejs');
});

// 記事作成ページ
router.get('/create', (req, res) => {
  res.render('post/create.ejs', { title: 'Create a Post' });
});

module.exports = router;
