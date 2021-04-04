//バリデーション
const { check, validationResult } = require('express-validator');

module.exports = {
  validatedItems: [
    check('password')
      .isLength({ min: 6 })
      .withMessage('7文字以上のパスワードを設定してください。'),
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('パスワードが一致しません。');
      }
      return true;
    }),
  ],
  doShowErrorMsg: (req, res, next) => {
    // バリデーション
    const errors = validationResult(req);
    const currentUser = {
      username: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    };
    if (!errors.isEmpty()) {
      // エラーが有る場合
      //エラーメッセージズを表示できる形に整形する
      const errors_msg = errors.array().map((obj) => obj.msg);
      res.render('account/register.ejs', {
        title: 'register',
        currentUser,
        errors_msg,
      });
      return;
    } else {
      next();
    }
  },
  validatePostContent: [
    check('postedTitle')
      .not()
      .isEmpty()
      .withMessage('タイトルを入力してください。'),
    check('postedText')
      .isLength({ min: 1, max: 140 })
      .withMessage('140文字以内にしてください。'),
  ],
  doShowPostErrorMsg: (req, res, next) => {
    // バリデーション
    const errors = validationResult(req);
    const postInfo = {
      // postUser: res.locals.user,
      postedTitle: req.body.postedTitle,
      postedText: req.body.postedText,
    };
    if (!errors.isEmpty()) {
      // エラーが有る場合
      //エラーメッセージズを表示できる形に整形する
      const errors_msg = errors.array().map((obj) => obj.msg);
      console.log(errors_msg);
      res.render('post/create.ejs', {
        title: 'create',
        postInfo,
        errors_msg,
      });
      return;
    } else {
      next();
    }
  },
};
