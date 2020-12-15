const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const express_handlebars_sections = require('express-handlebars-sections');
const session = require('express-session');
const flash = require('connect-flash-plus');
const MemoryStore = require('memorystore')(session);
const {sequelize}  = require('../models/index');
const cookieParser = require("cookie-parser");
const csrf = require('csurf');
const passport = require('passport');

// Inicialization
const app = express();
require('dotenv').config();
require('./lib/passport');
// var csrfProtection = csrf({ cookie: true })



//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));  //establezco donde esta mi caprta de vistas por defecto
app.engine('.hbs', exphbs({   // configura el motor de plantillas
  defaultlayout: 'main', //establece cual es mi archivo principal de plantilla
  layoutsDir: path.join(app.get('views'), 'layouts'), //establece la direccion de mis layouots
  partialsDir: path.join(app.get('views'), 'partials'), //establece la direccion de mis partials
  extname: '.hbs', // establece la extension de los archivos
  helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs'); // para utilizar el motor configurado anteriormente


//Middlewares
app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))


app.use(cookieParser('secret'));
// app.use(csrf({ cookie: true }));
app.use(flash()); //para poder utilizar los msj flash (ubicar despues de session())
app.use(morgan('dev'));
app.use(express.urlencoded({entended: true})); //permite recibir informacion enviada por el usuario(formnulario) => false permite solo info basica(json)true: permite ademas fotos
app.use(express.json());
app.use(passport.initialize()) // para iniciar passport en la app
app.use(passport.session()) //para configurar donde passport guarda la session, lo requiero en Inicialization (arriba)
app.use(favicon(path.join(__dirname,'public','favicon.ico')));



//Golobal variables -
app.use((req, res, next) => {
  app.locals.successful = req.flash('successful');
  app.locals.error = req.flash('error');
  app.locals.user = req.user;
  app.locals.apiGoogle = process.env.API_KEY_GOOGLE;
  app.locals.errors = (req.session.errors);
  app.locals.dataForm = (req.session.dataForm);
  app.locals.recentlyStored = (req.session.stored);
  res.locals = app.locals;
  res.locals.login = req.isAuthenticated();
  res.locals.weekDays = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  next();
})

//Routes
app.use(require('./routes/authentication'));
app.use(require('./routes/index'));
app.use(require('./routes/data'));
app.use('/user', require('./routes/user'));
app.use('/provider', require('./routes/provider'));
app.use('/establishment', require('./routes/establishment'));
app.use('/address', require('./routes/address'));
app.use('/booking', require('./routes/booking'));
app.get('/jquery-steps/demo/css/jquery.steps.css', function(req, res) {
    res.sendFile(path.join(__dirname, '../node_modules/jquery-steps/demo/css/jquery.steps.css'));
    // require('')
});

//Public
app.use(express.static(path.join(__dirname, 'public')))
app.use("/jquery-steps", express.static(path.join(__dirname, '../node_modules/jquery-steps/')));

process.env.TZ = 'Europe/Amsterdam';


//starting the server
app.listen(app.get('port'), (req, res) => {
  console.log('Server running on port', app.get('port'));
})
