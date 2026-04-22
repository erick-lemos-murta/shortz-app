var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');

var indexRouter = require('./routes/index');
var userRoutes = require("./modules/user/userRoutes");  

var app = express();

var expressLayouts = require('express-ejs-layouts');

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('layout', path.join(__dirname, 'views/layouts/main' ));
app.use(expressLayouts);
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session ({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 *24}
}));
app.use(flash());
app.use((req,res,next)=>{
  res.locals.messages = req.flash();
  res.locals.user = req.session.user || null; //Garante que a variável user esteja disponível em todas as views, mesmo que seja nula
  next();
});
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/", userRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const sequelize = require('./config/database');
const User = require('./modules/user/userModel');
sequelize.sync({alter:true});//faz as alterações/criações de tabelas dentro do banco

sequelize.authenticate()
  .then(()=> console.log("Conexão Ok"))
  .catch(erro=> console.log("Erro na conexão: ", erro));


module.exports = app;
