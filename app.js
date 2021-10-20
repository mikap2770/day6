var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bookRouter = require('./routes/book');
var customerRouter = require('./routes/customer');
var borrowRouter = require('./routes/borrow');

var app = express();

const basicAuth = require('express-basic-auth');
app.use(basicAuth( { authorizer: myAuthorizer, authorizeAsync:true, } ))
//app.use(basicAuth({users: { 'admin': '1234' }}))
const dotenv = require('dotenv');
dotenv.config();

function myAuthorizer(username, password, cb) {
    if (username===process.env.auth_user && password === process.env.auth_pass){
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
app.use('/borrow', borrowRouter);

module.exports = app;
