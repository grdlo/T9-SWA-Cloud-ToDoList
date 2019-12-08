// internal modules
const path = require('path');

// external modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const MONGODB_URI = 'mongodb+srv://admin:admin@atlastrial-erjzc.mongodb.net/test?retryWrites=true&w=majority';

const app = express();


//app.use(morgan('dev', { skip: function (req, res) { return res.statusCode < 400 } }));
app.use(morgan('dev'));

// Body formater
app.use(bodyParser.json());

// Header creator
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, access-token');
    return next();
});

// Routes files
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const taskRoute = require('./routes/taskRoute');

// API routes
app.use('/tasks', taskRoute);
app.use('/users', userRoute);
app.use('/auth', authRoute);

// Error route
app.use((error, req, res, next) => {
    if (error) {
        if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === "developpement" )
            console.log(error);
        res.status(error.statusCode || 500).json({
            error: error.message || "An internal error occured",
            code: error.statusCode
        });
    }
});

// Serveur starting instruction
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true })
    .then(result => {
        console.log("Web service ready to use");
        app.listen(8080);
    })
    .catch(error => {
        console.log(error);
    });