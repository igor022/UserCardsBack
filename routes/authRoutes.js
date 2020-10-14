const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

router.get('/signup', authController.signupGet);

router.post('/signup', authController.signupPost);


router.get('/login', authController.loginGet);

router.post('/login', authController.loginPost);


router.get('/cookies', (req, res) => {
  res.setHeader('Set-Cookie', 'newUser=true');
  res.send('you got the cookies!');
});

module.exports = router;