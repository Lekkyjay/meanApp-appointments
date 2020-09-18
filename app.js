const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()

const config = require('./config');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();


//create a connection to mongodb. It returns a promise 'client'
//From (client) we can get a reference to the database itself
//From the db, we can get a reference to the collection
//Save a reference to the collection in a app.local setter variable
MongoClient.connect(process.env.MONGODB_URI || `mongodb://${config.dbHost}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(client => {
  const db = client.db(config.dbName);
  const collection = db.collection(config.dbCollection);
  app.locals[config.dbCollection] = collection;
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//cors is needed to prevent any error when we are sending network request
app.use(cors());

//A middleware that makes the collection easily available through all our routes
//we can use req.collection to do all our mongodb queries
app.use((req, res, next) => {
  const collection = req.app.locals[config.dbCollection];
  req.collection = collection;
  next();
})

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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
