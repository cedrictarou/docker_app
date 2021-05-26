// ポスト機能のコントローラー
const Post = require('../models').Post;
const User = require('../models').User;

const Sequelize = require('sequelize');
const config = require('../config/config.json');
// Sequelize インスタンス
const sequelize = new Sequelize({
  dialect: config[process.env.NODE_ENV].dialect,
});

module.exports = {
  // Listページに飛ぶ
  showListView: async (req, res) => {
    try {
      const posts = await Post.findAll({
        attributes: ['id', 'title', 'content'],
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
        order: [['updatedAt', 'DESC']],
      });

      // likeからlikeの数を取得する
      const likeCounts = await Post.findAll({
        attributes: [
          'id',
          [sequelize.fn('COUNT', sequelize.col('likes.id')), 'cnt_likes'],
        ],
        include: [
          {
            model: User,
            as: 'likes',
            require: true,
            attributes: [],
            through: {
              attributes: [],
            },
          },
        ],
        group: ['id'],
        raw: true,
      });
      // postsにlikeCountsを合体させる
      posts.forEach((post, postIndex) => {
        post.likeCounts = likeCounts[postIndex].cnt_likes;
      });
      res.render('post/list.ejs', { posts });
    } catch (error) {
      console.log(error);
    }
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
