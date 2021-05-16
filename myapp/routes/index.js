const express = require('express');
const router = express.Router();
const auth = require('../lib/verifyToken');
const Post = require('../models').Post;
const User = require('../models').User;
// const Like = require('../models').Like;

/* GET home page. */
router.get('/', auth.verifyToken, (req, res) => {
  res.render('index', { title: 'Express' });
});

// fetchお試し
router.post('/new', async (req, res) => {
  const user = await User.findByPk(1, {
    include: [{ model: Post, as: 'likes' }],
    // 最新の投稿が上に来るようにする
    order: [['updatedAt', 'DESC']],
  });
  console.log(user.get({ plain: true }));
  res.status(200);
});
module.exports = router;
