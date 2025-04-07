var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var flightsRouter = require('./routes/flights');
var carRentalRouter = require('./routes/carRentals');
var privateCarsRouter = require('./routes/privateCars');
var accomodationRouter = require('./routes/hotels');
var activitiesRouter = require('./routes/activities');
var mapBoxRouter = require('./routes/mapbox');
var chatRouter = require('./routes/chat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', apiRouter);
app.use('/api/searchFlights', flightsRouter);
app.use('/api/searchCarRentals', carRentalRouter);
app.use('/api/searchPrivateCars', privateCarsRouter);
app.use('/api/searchHotels', accomodationRouter);
app.use('/api/searchActivities', activitiesRouter);
app.use('/api/mapbox', mapBoxRouter);
app.use('/api/chat', chatRouter);

// Web routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Check if the request is for an API endpoint
  if (req.path.startsWith('/api')) {
    return res.status(err.status || 500).json({
      error: {
        message: err.message,
        status: err.status || 500,
        ...(req.app.get('env') === 'development' && { stack: err.stack })
      }
    });
  }

  // For web routes, render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error',
    message: err.message,
    error: err
  });
});

module.exports = app;
