// like機能のコントローラー
const Like = require('../models').Like;

module.exports = {
  createLike: async (req, res) => {
    if (res.locals.isLoggedIn) {
      // ログインしている場合
      await Like.create({
        user_id: res.locals.user.id,
        post_id: req.body.postId,
      });
      res.json('logged in');
    } else {
      // ログインしていない場合
      res.json('no user');
    }
  },
  destroyLike: async (req, res) => {
    if (res.locals.isLoggedIn) {
      // ログインしている場合
      await Like.destroy({
        where: {
          user_id: res.locals.user.id,
          post_id: req.body.postId,
        },
      });
      res.json('logged in');
    } else {
      // ログインしていない場合
      res.json('no user');
    }
  },
};
