var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiloaispRouter = require('./routes/apiloaisp');
var apitaikhoannvRouter = require('./routes/apitaikhoannv');
//var apitaikhoankhRouter = require('./routes/apitaikhoankh');
var apisanphamRouter = require('./routes/apisanpham');
var apinhanvienRouter = require('./routes/apinhanvien');
var apinhacungcapRouter = require('./routes/apinhacungcap');
var apikhohangRouter = require('./routes/apikhohang');
var apikhachhangRouter = require('./routes/apikhachhang');
var apihoadonnhapRouter = require('./routes/apihoadonnhap');
var apidonhangRouter = require('./routes/apidonhang');
//var apidangnhapRouter = require('./routes/apidangnhap');
//var apichitiethdnRouter = require('./routes/apichitiethdn');
//var apichitietdhRouter = require('./routes/apichitietdh');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apiloaisp', apiloaispRouter);
app.use('/apitaikhoannv', apitaikhoannvRouter);
//app.use('/apitaikhoankh', apitaikhoankhRouter);
app.use('/apisanpham', apisanphamRouter);
app.use('/apinhanvien', apinhanvienRouter);
app.use('/apinhacc', apinhacungcapRouter);
app.use('/apikhohang', apikhohangRouter);
app.use('/apikhachhang', apikhachhangRouter);
app.use('/apihoadonnhap', apihoadonnhapRouter);
app.use('/apidonhang', apidonhangRouter);
//app.use('/apichitiethdn', apichitiethdnRouter);
//app.use('/apichitietdh', apichitietdhRouter);
//app.use('/login',apidangnhapRouter);
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
