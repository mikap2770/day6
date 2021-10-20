var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bookRouter = require('./routes/book');
var customerRouter = require('./routes/customer');

var app = express();

const basicAuth = require('express-basic-auth');
app.use(basicAuth( { authorizer: myAuthorizer, authorizeAsync:true, } ))
//app.use(basicAuth({users: { 'admin': '1234' }}))

function myAuthorizer(username, password, cb) {
    if (username==='admin' && password === 'testi'){
        return cb(null, true)
    }
    else
        return cb(null, false)
}

const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/book', bookRouter);
app.use('/customer', customerRouter);

module.exports = app;
