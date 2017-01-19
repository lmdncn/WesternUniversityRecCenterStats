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

    Stat.findOne({
            loc: req.query.loc,
            date: { //Find from start of today
            $gte: moment().startOf("day").toDate()
        }
        }).sort([
        ['date', -1]
    ]).exec(
        function (err, stat) {

            if (err) {
                res.send(err);
            }

            // console.log(JSON.stringify(tabs));

            res.json(stat);

        });

});

//Get next 2 projected -> querying loc=var
router.get('/projected', function (req, res, next) {

    Stat.find({
            loc: req.query.loc,
            date: { //Find from start of today
            $gte: moment().subtract(7,"days").toDate()
        }
        }).sort([
        ['date', 1]
    ]).limit(2).exec(
        function (err, stats) {

            if (err) {
                res.send(err);
            }

            // console.log(JSON.stringify(tabs));

            res.json(stats);

        });

});

router.get('/ttlw', function (req, res, next) {

    //This uses moment.js
    var ttlw = moment().subtract(7,"days");

    Stat.find({
        loc: req.query.loc,
        date: { //Find from last week till today
            $gte: ttlw.startOf("day").toDate(),
            $lt: ttlw.endOf("day").toDate()
        }
    }).sort([
        ['date', 1]
    ]).exec(function (err, stats) {

        if (err) {
            res.send(err);
        }

        // console.log(JSON.stringify(tabs));

        res.json(stats);

    });

});


//Get lastweek data -> querying loc=var
//Last week is (range of 7 days) ending with today-4
router.get('/lastweek', function (req, res, next) {

    //This uses moment.js
    var today = moment().endOf('day');
    var lastWeek = moment(today).subtract(4, 'days');
    var twolastWeek = moment(lastWeek).subtract(7, 'days');

    Stat.find({
        loc: req.query.loc,
        date: { //Find from last week till today
            $gte: twolastWeek.toDate(),
            $lt: lastWeek.toDate()
        }
    }).sort([
        ['date', 1]
    ]).exec(function (err, stats) {

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
    var today = moment().endOf('day');
    var lastWeek = moment(today).subtract(4, 'days');


    Stat.find({
        loc: req.query.loc,
        date: { //Find from last week till today
            $gte: lastWeek.toDate(),
            $lt: today.toDate()
        }
    }).sort([
        ['date', 1]
    ]).exec(

        function (err, stats) {

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
    var today = moment().startOf('day');
    var tomorrow = moment().endOf('day');


    Stat.find({
        loc: req.query.loc,
        date: { //Find from last week till today
            $gte: today.toDate(),
            $lt: tomorrow.toDate()
        }
    }).sort([
        ['date', 1]
    ]).exec(function (err, stats) {

        if (err) {
            res.send(err);
        }

        // console.log(JSON.stringify(tabs));

        res.json(stats);

    });

});






module.exports = router;