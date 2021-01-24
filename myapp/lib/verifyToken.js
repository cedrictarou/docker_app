const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey';

module.exports = {
  createToken: (req, res, next) => {
    const user = { name: req.session.username };
    const token = jwt.sign(user, SECRET_KEY);
    req.session.accessToken = token;
    next();
  },
  verifyToken: (req, res, next) => {
    // トークンの取得
    const accessToken = req.session.accessToken;
    // トークンの検証
    jwt.verify(accessToken, SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err);
        res.redirect('/users/login');
      } else {
        req.user = user;
        next();
      }
    });
  },
  test: (req, res, next) => {
    console.log(res);
  },
};
