const User = require('../models').User;
const bcrypt = require('bcryptjs');

const passport = require('passport');
const LocalStratgy = require('passport-local').Strategy;

passport.serializeUser((email, done) => {
  done(null, email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await User.findOne({ where: { email } });
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
      try {
        const user = await User.findOne({ where: { email: email } });
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
        const currentUser = {
          id: req.user.id,
          username: req.user.username,
          email: req.user.email,
        };
        res.locals.user = currentUser;
        res.locals.isLoggedIn = true;
      } else {
        const guestUser = {
          username: 'ゲストユーザー',
        };
        res.locals.user = guestUser;
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
