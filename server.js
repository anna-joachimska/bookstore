const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const booksRoutes = require('./routes/books');
const bookstoreRoutes = require('./routes/bookstore');
const publishingHousesRoutes = require('./routes/publishingHouses');
const bodyParser = require('body-parser');

const app = express();
mongoose.connect(process.env.DB_CONNECTION, () => console.log('connected to db'));

// parse the body of incoming request and use the data
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// login package (endpoints in terminal with method, status and time)
// app.use(morgan('dev'));

// allowing requests from different servers to my server (CORS disabled)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

// middleware - routes which should handle requests
app.use('/books', booksRoutes);
app.use('/bookstore', bookstoreRoutes);
app.use('/publishingHouses', publishingHousesRoutes);

const port = process.env.PORT || 8888;

app.listen(port, () => console.log(`server is running on port ${port}`));