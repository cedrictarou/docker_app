// like機能のコントローラー
const Post = require('../models').Post;
const User = require('../models').User;
const Like = require('../models').Like;

const Sequelize = require('sequelize');
const config = require('../config/config.json');
// Sequelize インスタンス
const sequelize = new Sequelize({
  dialect: config[process.env.NODE_ENV].dialect,
});

module.exports = {
  createLike: async (req, res) => {
    // const postId = req.body.postId;
    // console.log(postId);
    // res.json(postId);
  },
  countLikeNum: async (req, res) => {
    // テストデータを追加する
    // const newLike = await Like.create({
    //   user_id: 5,
    //   post_id: 1,
    // });
    // console.log(newLike);
    // res.send('success');
    const posts = await Post.findAll({
      // where: { id: 1 },
      // postの項目を操作
      attributes: [
        'id',
        'title',
        [sequelize.fn('COUNT', sequelize.col('Likes.id')), 'cnt_likes'],
      ],
      include: [
        {
          model: User,
          as: 'Likes',
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
    console.log(posts);
    res.json(posts);
  },
};
