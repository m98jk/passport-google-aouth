const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const iraqRouter = require('./routes/iraqRouter');
require('./passport');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(path.join(__dirname, 'public')));

//session

app.use(
  cookieSession({
    name: 'passport-session',
    keys: ['key1', 'key2'],
  })
);

app.use('/', indexRouter);
app.use('/failed', usersRouter);
app.use('/iraq', iraqRouter);
app.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/iraq');
  }
);
app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});
module.exports = app;
