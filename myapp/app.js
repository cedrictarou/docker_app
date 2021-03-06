if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const accountControl = require('./lib/passport-config');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const flash = require('express-flash');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/post');

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// セッション管理
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10 * 1000 },
  })
);
// セッションの設定をしてからpassportの設定をしないと行けない！！
app.use(...accountControl.initialize());
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
