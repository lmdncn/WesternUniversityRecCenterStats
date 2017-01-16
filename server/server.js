//This server handles client get requests, pulling data from db
//AKA main express server

//Server Port
var port = 8080;

// HTTP server using Express to handle incoming requests
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan'); // helps log all requests

var cookieParser = require('cookie-parser'); // for handling cookies
var bodyParser = require('body-parser'); // for parsing request URL

// set up logger and parsers
app.use(logger('dev'));

app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(cookieParser());


//View Engine
app.set('views', path.join(__dirname, '/../client/dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile)



// Static route for client-side code generated by Angular
app.use(express.static(path.join(__dirname, '/../client/dist')));


//Database Set Up
var mongoose = require('mongoose');
mongoose.connect('mongodb://main:mainpass@ds163758.mlab.com:63758/reccenterstats'); //connect to the db
var Stat = require('./models/stat');

// Route file imports
var index = require('./routes/index');
var stats = require('./routes/stats');
//Set routes
app.use('/', index);
app.use('/api/stats', stats);


// Function to handle client errors(404)
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// start the server
app.listen(process.env.PORT || port, function () {
    console.log('Server listening on port ' + port + " !");
});


module.exports = app;