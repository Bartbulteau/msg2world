var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
// var loginRouter = require('./routes/login');

var app = express();

// for dev only
var cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.cookieParser('M2W'));
// app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(function (req, res, next) {
//     var err = req.session.error,
//         msg = req.session.success;
//     delete req.session.error;
//     delete req.session.success;
//     res.locals.message = '';
//     if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
//     if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
//     next();
// });

// Front-end
app.use('/', indexRouter);
// API
app.use('/api', apiRouter);
// Login system
// app.use('/login', loginRouter);

// Handles 404 and redirect to the error404.html page
app.use(function(req, res, next) {
    res.status(404).sendFile(__dirname + '/public/error404.html');
});

module.exports = app;