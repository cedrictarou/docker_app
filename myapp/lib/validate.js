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
};
