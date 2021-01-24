const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/post');

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// セッション管理
app.use(
  session({
    secret: 'myapp',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 1000 },
  })
);

// ログイン状態のチェック
app.use((req, res, next) => {
  // ログインされていなければ
  if (req.session.userId === undefined) {
    console.log('ログインしていません');
    res.locals.currentUser = 'ゲストユーザー';
    res.locals.isLoggedIn = false;
    next();
  } else {
    console.log('ログインしています');
    res.locals.currentUser = req.session.username;
    res.locals.isLoggedIn = true;
    next();
  }
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
