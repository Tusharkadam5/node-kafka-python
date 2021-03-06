var createError = require('http-errors');
 var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");


//const server = require('http').createServer(express);
//const ioServer = require('socket.io')(server);

 //const produce = require("./controllers/produce.controller")
 //const consume = require("./controllers/consume.controller")(ioServer);

 var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.routes');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

 var app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require("./routes/users.routes")(app);
const db = require("./models");
db.sequelize.sync();

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

// server.listen(8000);
module.exports = app;
