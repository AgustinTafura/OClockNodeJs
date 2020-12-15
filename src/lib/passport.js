const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
// const sequelize = require('../database'); // coneccion a DB para poder guardar y consultar
const helpers = require('../lib/helpers'); //para utilizar el helper de encriptar pass
const {User}  = require('../../models/index');
const {sequelize}  = require('../../models/index');

//user login
passport.use('local.singin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, async (req, email, password, done ) => {


  const user = await User.findOne({ where: { email: email }, include: [{all: true}]});

  if(user) {
    const validPassword = await helpers.matchPassword(password, user.password);
    if(validPassword){
      done(null, user,  /*req.flash('successful','LOGUEADO CORRECTAMENTE!')*/);
    } else {
      req.session.errors = {password: 'invalid password'};
      req.session.dataForm = {email: email};
      done(null, false, /*req.flash('error','contraseña incorrecta.')*/);
    }
  } else {
    req.session.errors = {email: 'the email does not exist'};
    done(null, false,  /*req.flash('error','the email does not exist.')*/);
  }

}))



















//user register
passport.use('local.singup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, async (req, email, password, done ) => {
  const { name, surname, mobile_phone, day, month, year, password_confirmation} = req.body;

  var monthOk = (month<10)?'0'+month: month;
  var dayOk = (day<10)?'0'+day: day;
  //hash password
  password = await helpers.encryptPassword(password);
  // const user = await User.findOne({ where: { email: email } });
  // (user)? req.session.errors = {email: 'the email does exist'}:req.session.errors = {};

  await User.sync({ alter: true }).then(function () {

    return User.create({

      email: email,
      password: password,
      name: name,
      surname: surname,
      mobile_phone: mobile_phone,
      birthdate: year + '-' + monthOk + "-" + dayOk,
      created_at: new Date(),
      updated_at: new Date(),
      resetLink: ''

    }).then(function(newUser){
      // if (value != password_confirmation) {
      //   throw new Error('Passwords does not match!');
      // }
      return done(null, newUser);
    }).catch(function(err){
      req.session.dataForm = {email,name,surname,mobile_phone,year,month,day}
      req.session.errors = {};
      const errors = err.errors;

      for(var key in errors){
        for (item in req.body) {
          if(item === errors[key].path){
              req.session.errors[item] = errors[key].message;
          }
        }

      }
      done(null, false,  /*req.flash('error','the email does not exist.')*/);
    });


  })
}))


passport.serializeUser( (req, user, done)=>{
  return done(null, user.id);
})


passport.deserializeUser( async (id, done)=>{

  const row = [await User.findOne({ where: { id }, include: [{all: true}]})]
  // const rows = await sequelize.query(
  //   'SELECT * FROM users WHERE id = :id',
  //   {
  //     replacements: { id: id },
  //     type: QueryTypes.SELECT,
  //   })
  //
  return done(null, row[0].dataValues);
})
