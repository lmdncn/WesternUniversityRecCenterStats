// This extension route will handle most of the API request to the data in DB

// A "Stat" is a peice of data parsed from a Tweet that repesents 
// loc (location of people), count (number of people), date (date tweeted)
// Tweets may contain multiple "stat"s

var express = require('express');
var router = express.Router();
var Stat = require('../models/stat');
var moment = require('moment');
moment().format();


//Get current count data -> querying loc=var
router.get('/count', function (req, res, next) {

    Stat.find({
        loc: req.query.loc,
        date: {        }
    }.sort('-date').limit(1),  
    function (err, stat) {

        if (err) {
            res.send(err);
        }

        // console.log(JSON.stringify(tabs));

        res.json(stat);

    });

});


//Get lastweek data -> querying loc=var
router.get('/lastweek', function (req, res, next) {

    //This uses moment.js
    var today = moment().startOf('day')
    var lastWeek = moment(today).subtract(7, 'days')
    var twolastWeek = moment(lastWeek).subtract(7, 'days')

    Stat.find({
        loc: req.query.loc,
        date: { //Find from last week till today
            $gte: twolastWeek.toDate(),
            $lt: lastWeek.toDate()
        }
    }, function (err, stats) {

        if (err) {
            res.send(err);
        }

        // console.log(JSON.stringify(tabs));

        res.json(stats);

    });

});


//Get thisweek data -> querying loc=var
router.get('/thisweek', function (req, res, next) {

    //This uses moment.js
    var today = moment().startOf('day')
    var lastWeek = moment(today).subtract(7, 'days')


    Stat.find({
        loc: req.query.loc,
        date: { //Find from last week till today
            $gte: lastWeek.toDate(),
            $lt: today.toDate()
        }
    }, function (err, stats) {

        if (err) {
            res.send(err);
        }

        // console.log(JSON.stringify(tabs));

        res.json(stats);

    });

});

//Get today data -> querying loc=var
router.get('/today', function (req, res, next) {

    //This uses moment.js
    var today = moment().startOf('day')
    var tomorrow = moment(today).add(1, 'days')


    Stat.find({
        loc: req.query.loc ,
        date: { //Find from last week till today
            $gte: today.toDate(),
            $lt: tomorrow.toDate()
        }
    }, function (err, stats) {

        if (err) {
            res.send(err);
        }

        // console.log(JSON.stringify(tabs));

        res.json(stats);

    });

});






module.exports = router;