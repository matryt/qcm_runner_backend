var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var helmet = require('helmet');
var jwt = require('jsonwebtoken');
var { expressjwt: expressJwt } = require('express-jwt');

var indexRouter = require('./routes/index');
var subjectsRouter = require('./routes/subjects');
const quizzesRouter = require('./routes/quizzes');
var authRouter = require('./routes/auth');

var app = express();

// Use helmet to set various HTTP headers for security
app.use(helmet());

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// JWT authentication middleware
const jwtCheck = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
});

// Apply JWT check to all routes except the public ones
app.use(jwtCheck.unless({ path: ['/auth/login'] }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/subjects', subjectsRouter);
app.use('/quizzes', quizzesRouter);
app.use('/auth', authRouter);

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

module.exports = app;
