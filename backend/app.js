const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { environment } = require('./config');

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

module.exports = app;


