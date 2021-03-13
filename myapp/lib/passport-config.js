const User = require('../models').User;
const bcrypt = require('bcryptjs');

const passport = require('passport');
const LocalStratgy = require('passport-local').Strategy;

passport.serializeUser((email, done) => {
  done(null, email);
});

passport.deserializeUser(async (email, done) => {
  let user;
  try {
    user = await User.findOne({ where: { email: email } });
    // ユーザーを正しく取得できた
    done(null, user);
  } catch (error) {
    done(null, error);
  }
});

passport.use(
  'local-Strategy',
  new LocalStratgy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      let user;
      try {
        user = await User.findOne({ where: { email: email } });
        // hash化されたパスワードが一致するかチェックする
        if (await bcrypt.compare(password, user.password)) {
          // ユーザーを正しく取得できた場合
          req.session.username = user.username;
          return done(null, user.email);
        } else {
          // パスワードが一致しない場合
          return done(
            null,
            false,
            req.flash('error', 'ユーザー名またはパスワードが違います')
          );
        }
      } catch (error) {
        console(error);
        // 入力情報に誤りがある場合
        return done(
          null,
          false,
          req.flash('error', 'ユーザー名またはパスワードが違います')
        );
      }
    }
  )
);

const initialize = () => {
  return [
    passport.initialize(),
    passport.session(),
    function (req, res, next) {
      if (req.user) {
        res.locals.user = req.user.username;
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
