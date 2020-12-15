// const User  = require('../models/user');
const jwt = require('jsonwebtoken');
const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_APIKEY, domain: process.env.DOMAIN});
const {sequelize}  = require('../../models/index');
const _ = require("lodash");
const helpers = require('../lib/helpers'); //para utilizar el helper de encriptar pass

module.exports = {

  isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    } else {
      req.session.redirectTo = req.originalUrl;
      return res.redirect('/login');
    }
  },

  isNotLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect('/home');
    }
  },

  async forgotPassword(req, res) {
    const { email } = req.body
    var user = await User.findOne({ where: { email: email } });

    if(!user) {
      req.session.errors = {email: 'the email does not exist'};
      res.redirect('back');
    }
    //formula envio formuario AQUI
    const token = jwt.sign({uid: user.id},  process.env.RESET_PASSWORD_KEY, {expiresIn: 60* 20}); //20 mins
    const data = {
      from: '<noreplay@oclock.com>',
      to: 'agustintafura@hotmail.com',
      subject: 'Reset Password',
      html: `
        <h2>Please click on given link to reset your password</h2>
        <a href='${process.env.CLIENT_URL}/passwordReset/${token}'>${process.env.CLIENT_URL}/passwordReset/${token}</a>
      `
    }

    try {
      user.resetLink =token;
      await user.save();
    } catch (e) {
      req.flash('error','Tuvimos un inconveniente al reestablecer tu contraseña. Por favor, inténtalo nuevamente :)');
      return res.redirect('back');
    }

    return mailgun.messages().send(data, (error, body)=>{
        if(error) {
          req.flash('error','Tuvimos un inconveniente al reestablecer tu contraseña. Por favor, inténtalo nuevamente :)');
          return res.redirect('back');
        }
        req.flash('successful', 'Te hemos enviado un link por mail a ',user.email,', para que puedas reestrablecer tu contraseña');
        res.redirect('back');
      })


  },

  async resetPassword(req, res) {
    const {resetLink, email, password } = req.body;

    if(resetLink) {

      jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, async (error, decodedData) => {
        if(error){
          req.flash('error','El Token es incorrecto o ha expirado. Por favor solicite un nuevo reseteo de contraseña. ');
          return res.redirect('back');
        }

        const user = await User.findOne({ where: { resetLink, email }});
        if(!user) {
          req.flash('error','Usuario no encontrado con ese link de reseteo . Por favor solicite un nuevo reseteo de contraseña. ');
          return res.redirect('back');
        }

        try {
          user.password = await helpers.encryptPassword(password);
          // user = _.extend(user, password);
          await user.save();
        } catch (e) {
          req.flash('error','Tuvimos un inconveniente al reestablecer tu contraseña. Por favor, inténtalo nuevamente :)');
          return res.redirect('back');
        }
        req.flash('successful', 'Has actualizado tu contraseña correctamente ;)');
        res.redirect('/login');
      })

    } else {
      req.flash('error','El Token es incorrecto o ha expirado. Por favor solicite un nuevo reseteo de contraseña. ');
      return res.redirect('password');
    }


  },




}
