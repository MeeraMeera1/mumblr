const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { environment } = require('./config');
const { ValidationError } = require('sequelize');

const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

//Security Middleware 
if(!isProduction){
    //enable cors only in development if enviornment is not in production
    app.use(cors());
}

//helmet helps set a variety of headers to better secure your app 
app.use(helmet ({
    contentSecurityPolicy: false
}));

//set the _csrf token and create req.csrfToken method
//csurf middleware will add a _csrf cookie that is HTTP-only to 
//used to validate the csrf cookie to confirm that the request comes from your site
app.use(csurf({
    cookie:{
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true,
    },
}));

app.use(routes);

//catch any requests that don't match any of the routes defined 
app.use((_req,_res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

//process sequelize errors
app.use((err, _req, _res, next) => {
    //check if error is a Sequelize error
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = "Validation error";
    }
    next(err);
});

//Error formatter 
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || "Server Error",
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app;


