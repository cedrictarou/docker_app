// ポスト機能のコントローラー
const Post = require('../models').Post;
const User = require('../models').User;

module.exports = {
  // Listページに飛ぶ
  showListView: async (req, res) => {
    const posts = await Post.findAll({
      include: [{ model: User }],
      // 最新の投稿が上に来るようにする
      order: [['updatedAt', 'DESC']],
    });
    res.render('post/list.ejs', { posts });
  },
  // 記事作成ページ
  showCreateView: (req, res) => {
    res.render('post/create.ejs', { title: 'Create a Post', errors_msg: '' });
  },
  // 個別記事の表示
  showPostView: async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findByPk(postId);
    res.render('post/edit.ejs', { title: 'edit', post, errors_msg: '' });
  },
  // 記事作成
  createPost: async (req, res, next) => {
    // postをDBに追加する。
    await Post.create({
      title: req.body.postedTitle,
      content: req.body.postedText,
      user_id: res.locals.user.id,
    });
    next();
  },
  // 個別記事の更新
  editPost: async (req, res, next) => {
    const postId = req.params.id;
    // postIdのtitleとcontentを更新する;
    try {
      await Post.update(
        {
          title: req.body.postedTitle,
          content: req.body.postedText,
        },
        { where: { id: postId } }
      );
      next();
    } catch (error) {
      console.log(error);
      res.redirect('/post/list');
    }
  },
  // 記事の削除
  deletePost: async (req, res, next) => {
    const postId = req.params.id;
    // データを削除する
    try {
      await Post.destroy({
        where: {
          id: postId,
        },
      });
      next();
    } catch (error) {
      console.log(error);
      res.redirect('/post/list');
    }
  },
};
