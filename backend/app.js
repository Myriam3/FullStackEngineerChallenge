const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/');

// Database
// TODO: variables.env
mongoose.connect('mongodb+srv://user:do7Zn4WrOqDULVkQ@cluster0.j502t.mongodb.net/performance_reviews?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('Connexion to MongoDB has failed'));

// App
const app = express();

// Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Bodyparser
app.use(bodyParser.json());

// Routes
app.use('/api/', router);

module.exports = app;