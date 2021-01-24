// ユーザーログインやサインアップ、ログアウトの管理
const connection = require('../config/mysql.config');

module.exports = {
  goToLoginPage: (req, res) => {
    res.render('account/login.ejs', { title: 'login' });
  },
  goToSignupPage: (req, res) => {
    res.render('account/register.ejs', { title: 'register' });
  },
  doLogin: (req, res, next) => {
    const currentUser = {
      email: req.body.email,
      password: req.body.password,
    };
    // loginチェック
    connection.query(
      'SELECT * FROM users WHERE email=?',
      [currentUser.email],
      (error, results) => {
        if (results.length > 0) {
          if (req.body.password === results[0].password) {
            // ユーザーIDをセッション情報に保存
            req.session.userId = results[0].id;
            req.session.username = results[0].name;
            res.redirect('/post/list');
          } else {
            // パスワードが違うなら
            res.redirect('/users/login');
          }
        } else {
          res.redirect('/users/login');
        }
      }
    );
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
  doSignup: (req, res, next) => {
    // 未登録の処理なのでDBに新規ユーザーを追加する
    connection.query(
      'INSERT INTO users (name, email, password) VALUES(?,?,?)',
      [currentUser.username, currentUser.email, currentUser.password],
      (error, results) => {
        req.session.userId = results.insertId;
        req.session.username = currentUser.username;
        res.redirect('/post/list');
      }
    );
  },
  doLogout: (req, res, next) => {
    req.session.destroy((error) => {
      res.redirect('/users/login');
    });
  },
};
