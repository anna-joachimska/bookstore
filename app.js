// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const morgan = require('morgan');
const booksRoutes = require('./routes/books');
const bookstoreRoutes = require('./routes/bookstore');
const publishingHousesRoutes = require('./routes/publishingHouses');
const bodyParser = require('body-parser');

const app = express();

// login package (endpoints in terminal with method, status and time)
app.use(morgan('dev'));

// parse the body of incoming request and use the data
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// allowing requests from different servers to my server (CORS disabled)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
})

// middleware - routes which should handle requests
app.use('/books', booksRoutes);
app.use('/bookstore', bookstoreRoutes);
app.use('/publishingHouses', publishingHousesRoutes);

// middleware - error handling - if called enpoint is not found
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

// middleware - error handling - all kinds of error (errors from anywhere in application)
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

//connect to db
mongoose.connect(process.env.DB_CONNECTION,()=> console.log('connected to db'));

// app.get('/', (req, res)=> {
//     res.send('hello world')
// })
module.exports = app;
