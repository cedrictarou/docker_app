// ポスト機能のコントローラー
const Post = require('../models').Post;
const User = require('../models').User;
const Like = require('../models').Like;
const { sequelize } = require('../models/index');

module.exports = {
  // Listページに飛ぶ
  showListView: async (req, res) => {
    // currentUserを取得する
    const currentUser = res.locals.user;
    // トランザクションで行う
    const transaction = await sequelize.transaction();
    try {
      const posts = await Post.findAll({
        attributes: ['id', 'title', 'content'],
        include: [
          {
            model: User,
          },
        ],
        order: [['updatedAt', 'DESC']],
        transaction,
      });
      // likeからlikeの数を取得する;
      const countLikes = await Post.findAll({
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
        transaction,
      });
      // likeを誰が何に押しているかを取得する
      const likeUsers = await Like.findAll({
        attributes: ['userId', 'postId'],
        raw: true,
        transaction,
      });
      await transaction.commit();

      // postsにlikeCountsを合体させる
      posts.forEach((post) => {
        post.isLiked = false;
        countLikes.forEach((countLike) => {
          // likeCountの処理
          if (post.id === countLike.id) {
            post.likeCounts = countLike.cnt_likes;
          }
        });
        // ログインしているユーザーがlikeボタンを押していたらlikeを黒色にする処理
        likeUsers.forEach((likeUser) => {
          if (
            currentUser.id === likeUser.userId &&
            post.id === likeUser.postId
          ) {
            post.isLiked = true;
          }
        });
      });
      res.render('post/list.ejs', { posts });
    } catch (error) {
      console.log(error);
      await transaction.rollback();
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
