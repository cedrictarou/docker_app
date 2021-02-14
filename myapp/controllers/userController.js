// ユーザーログインやサインアップ、ログアウトの管理
const connection = require('../config/mysql.config');
const bcrypt = require('bcryptjs');

module.exports = {
  goToLoginPage: (req, res) => {
    res.render('account/login.ejs', {
      title: 'login',
      message: req.flash('message'),
    });
  },
  goToSignupPage: (req, res) => {
    res.render('account/register.ejs', { title: 'register' });
  },
  doCheckUser: (req, res, next) => {
    // ユーザーが既に登録されているかをチェックする
    const currentUser = {
      username: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    };
    const errors_msg = [];
    connection.query(
      'SELECT * FROM users WHERE email=?',
      [currentUser.email],
      (error, results) => {
        if (results.length > 0) {
          // 既に登録されています。
          errors_msg.push('既に登録されているメールアドレスです。');
          res.render('account/register.ejs', {
            title: 'register',
            currentUser,
            errors_msg,
          });
          return;
        } else {
          // 未登録の処理なのでDBに新規ユーザーを追加する処理へ移動する
          next();
        }
      }
    );
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
      console.log(hashedPassword);
      connection.query(
        'INSERT INTO users (name, email, password) VALUES(?,?,?)',
        [currentUser.username, currentUser.email, hashedPassword],
        (error, results) => {
          // authenticate(login)の処理に移動する
          next();
        }
      );
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
