const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../lib/validate');
const auth = require('../lib/verifyToken');
const { authenticate } = require('../lib/passport-config');

//register
router.get('/register', userController.goToSignupPage);

// DBへ登録する処理
router.post(
  '/register',
  validate.validatedItems,
  validate.doShowErrorMsg,
  auth.createToken,
  userController.doCheckUser,
  userController.doSignup,
  authenticate()
);

//loginページ
router.get('/login', userController.goToLoginPage);

// login処理
router.post('/login', auth.createToken, authenticate());

// logout処理
router.post('/logout', userController.doLogout);
module.exports = router;
