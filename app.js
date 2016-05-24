var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var expressSession = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var app = express();

var routes = require('./routes/index');
var Account = require('./Models/account');
var Auktion = require('./Models/auktion');

// db
mongoose.connect('mongodb://localhost/User');

// configure app
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// use middleware
app.use(expressSession({
  secret: process.env.SESSION_SECREET || 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use('/', routes);

//passport config
passport.use(new LocalStrategy({
      usernameField: 'email',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      process.nextTick(function() {
      Account.findOne({ email : email }, function(err, user) {
        if (err){return done(err);}
        if (!user){return done(null, false, req.flash('error', 'Falsche Email Adresse'));}

       user.comparePassword(password, function(err, isMatch) {
         if(err){return done(err);}

         if(isMatch){return done(null, user);}

         else{return done(null, false, req.flash('error', 'Falsches Passwort'));}
      });
      })})}));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  Account.findById(id, function(err, user) {
    if (!err) {
      done(null, user);
    } else {
      done(err, null);
    }
  });
});




























// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('404',{ user: req.user});
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('http://127.0.0.1:' + port + '/');
});
