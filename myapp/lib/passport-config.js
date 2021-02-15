const connection = require('../config/mysql.config');
const bcrypt = require('bcryptjs');

const passport = require('passport');
const LocalStratgy = require('passport-local').Strategy;

passport.serializeUser((email, done) => {
  done(null, email);
});

passport.deserializeUser((email, done) => {
  connection.query(
    'SELECT * FROM users WHERE email=?',
    [email],
    (error, results) => {
      if (results.length > 0) {
        // ユーザーを正しく取得できた
        done(null, results[0]);
      } else {
        done(null, error);
      }
    }
  );
});

passport.use(
  'local-Strategy',
  new LocalStratgy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      connection.query(
        'SELECT * FROM users WHERE email=?',
        [email],
        async (error, results) => {
          if (results.length > 0) {
            const user = results[0];
            // hash化されたパスワードが一致するかチェックする
            if (await bcrypt.compare(password, user.password)) {
              // ユーザーを正しく取得できた場合
              req.session.username = user.name;
              return done(null, user.email);
            } else {
              // パスワードが一致しない場合
              return done(
                null,
                false,
                req.flash('message', 'ユーザー名またはパスワードが違います')
              );
            }
          } else {
            // 入力情報に誤りがある場合
            return done(
              null,
              false,
              req.flash('message', 'ユーザー名またはパスワードが違います')
            );
          }
        }
      );
    }
  )
);

const initialize = () => {
  return [
    passport.initialize(),
    passport.session(),
    function (req, res, next) {
      if (req.user) {
        res.locals.user = req.user.name;
        res.locals.isLoggedIn = true;
      } else {
        res.locals.user = 'ゲストユーザー';
        res.locals.isLoggedIn = false;
      }
      next();
    },
  ];
};
const authenticate = () => {
  // login用の処理
  return passport.authenticate('local-Strategy', {
    successRedirect: '/post/list',
    failureRedirect: '/users/login',
  });
};

module.exports = {
  initialize,
  authenticate,
};
