// like機能のコントローラー
const Like = require('../models').Like;

module.exports = {
  createLike: async (req, res) => {
    if (res.locals.user.id !== undefined) {
      // ユーザーがログインしている場合
      // Likesテーブルにデータを追加する
      await Like.create({
        user_id: res.locals.user.id,
        post_id: req.body.postId,
      });
      res.json('success');
    } else {
      // ユーザーがログインしていない場合
      res.json('Please login');
    }
  },
};
