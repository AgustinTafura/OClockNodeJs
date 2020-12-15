const express = require('express');
const router = express.Router();
const passport = require('passport');
const { forgotPassword, resetPassword } = require('../lib/auth');

const {isLoggedIn,  isNotLoggedIn } = require('../lib/auth');

router.get('/register', isNotLoggedIn, (req, res, next) => {

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  res.render('auth/register', {months})
  req.session.errors = null;
  req.session.dataForm = null;
})

router.post('/register', isNotLoggedIn, (req, res, next) => {
    var redirectTo = req.session.redirectTo || '/home';

  passport.authenticate('local.singup', {
      successRedirect: redirectTo,
      failureRedirect: '/register',
      successFlash: true,
      failureFlash: true
    })(req, res, next),

  delete req.session.redirectTo
});

router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('auth/login',  { message: req.flash('info') });
  req.session.errors = null;
  req.session.dataForm = null;
})

router.post('/login', (req, res, next) => {
  var redirectTo = req.session.redirectTo || '/home';

  passport.authenticate('local.singin', {
    successRedirect: redirectTo,
    failureRedirect: '/login',
    successFlash: true,
    failureFlash: true,
  })(req, res, next),

  delete req.session.redirectTo
})

router.post('/logout', function(req, res){
  req.logout();
  req.flash('successful', 'Te has deslogueado');
  res.redirect('/login');
});


router.get('/home', isLoggedIn, function(req, res, next){

  res.render('user/home');
});

router.get('/password', isNotLoggedIn, (req, res) => {
  res.render('auth/passwords/email');
  req.session.errors = null;
  req.session.dataForm = null;
});

router.post('/password',isNotLoggedIn, forgotPassword);


router.get('/passwordReset/:resetLink', isNotLoggedIn, (req, res) => {
  res.render('auth/passwords/reset', { resetLink: req.params.resetLink });
  req.session.errors = null;
  req.session.dataForm = null;
});

router.post('/passwordReset', isNotLoggedIn, resetPassword);

// router.get('/test', (req, res, next) => {
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//   res.render('bookings', {months})
// })



module.exports = router;
