const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

// likeを押されたときにデータを更新して返す処理を書く
router.post('/create', likeController.createLike);
router.post('/destroy', likeController.destroyLike);

module.exports = router;
