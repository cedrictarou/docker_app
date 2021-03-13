// ユーザーログインやサインアップ、ログアウトの管理
const User = require('../models').User;
const bcrypt = require('bcryptjs');

module.exports = {
  goToLoginPage: (req, res) => {
    res.render('account/login.ejs', {
      title: 'login',
    });
  },
  goToSignupPage: (req, res) => {
    res.render('account/register.ejs', { title: 'register' });
  },
  doCheckUser: async (req, res, next) => {
    // ユーザーが既に登録されているかをチェックする
    const currentUser = {
      username: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    };
    // const errors_msg = [];
    // ユーザーが既に登録されているチェクする
    try {
      const user = await User.findOne({
        where: { email: currentUser.email },
      });
      if (user) {
        // // 既に登録されいる
        req.flash('error', '既に登録されているメールアドレスです。');
        res.render('account/register.ejs', {
          title: 'register',
          currentUser,
        });
      } else {
        // 未登録の処理なのでDBに新規ユーザーを追加する処理へ移動する
        next();
      }
    } catch (error) {
      console.log(error);
    }
  },
  doSignup: async (req, res, next) => {
    // 未登録の処理なのでDBに新規ユーザーを追加する
    const currentUser = {
      username: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const hashedPassword = await bcrypt.hash(currentUser.password, 10);
      // Create a new user
      const user = await User.create({
        username: currentUser.username,
        email: currentUser.email,
        password: hashedPassword,
      });
      // authenticate(login)の処理に移動する
      next();
    } catch (error) {
      console.log(error);
      res.redirect('/users/register');
    }
  },
  doLogout: (req, res, next) => {
    req.session.destroy((error) => {
      res.redirect('/users/login');
    });
  },
};
