const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', authController.getportfolio);

router.get('/signup', authController.getSignup);

router.get('/login', authController.getLogin);

router.post('/login',
[
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .normalizeEmail(),
  body('psw', 'Password has to be valid.')
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim()
],
 authController.postLogin);

router.get('/logout', authController.getLogout);

router.get('/form', authController.getForm);

router.post('/form', authController.postForm);

router.get('/:userId', authController.getuserid);

router.post('/signup',
[ 
    check('email') 
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body( 
      'psw',
      'Please enter a password with only numbers and text and at least 5 characters.'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body('repeatPassword') 
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.psw) {
          throw new Error('Passwords have to match!');
        }
        return true;
      })
  ],

authController.postSignup);

module.exports = router;