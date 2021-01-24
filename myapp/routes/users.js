const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../lib/validate');
const auth = require('../lib/verifyToken');

//register
router.get('/register', userController.goToSignupPage);

// DBへ登録する処理
router.post(
  '/register',
  validate.validatedItems,
  validate.doShowErrorMsg,
  userController.doCheckUser,
  auth.createToken,
  userController.doSignup
);

//loginページ
router.get('/login', userController.goToLoginPage);

// login処理
router.post('/login', auth.createToken, userController.doLogin);

// logout処理
router.get('/logout', userController.doLogout);
module.exports = router;
