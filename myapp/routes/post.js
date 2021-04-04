const express = require('express');
const router = express.Router();
const auth = require('../lib/verifyToken');
const validate = require('../lib/validate');
const postController = require('../controllers/postController');

// 一覧ページ
router.get('/list', postController.showListView);
// 記事作成ページ
router.get('/create', auth.verifyToken, postController.showCreateView);
// 個別記事ページの表示
router.get('/edit/:id', auth.verifyToken, postController.showPostView);
// 記事作成
router.post(
  '/create',
  validate.validatePostContent,
  validate.doShowPostErrorMsg,
  auth.verifyToken,
  postController.createPost,
  postController.showListView
);
// 個別記事の更新
router.put(
  '/edit/:id',
  auth.verifyToken,
  postController.editPost,
  postController.showListView
);
// 記事の削除
router.delete(
  '/delete/:id',
  auth.verifyToken,
  postController.deletePost,
  postController.showListView
);

module.exports = router;
