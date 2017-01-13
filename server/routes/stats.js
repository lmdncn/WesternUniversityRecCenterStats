// This extension route will handle most of the API request to the data in DB

// A "Stat" is a peice of data parsed from a Tweet that repesents 
// loc (location of people), count (number of people), date (date tweeted)
// Tweets may contain multiple "stat"s

var express = require('express');
var router = express.Router();
var Stat = require('../models/stat');
var moment = require('moment');
moment().format();



//TODO: No Idea is this works
router.post('/lastweek', function (req, res, next) { 

    console.log('req to /ThisWeek with loc:', req.body.loc);

    //This uses moment.js
    var today = moment().startOf('day')
    var lastWeek = moment(today).subtract(7, 'days')
    var twolastWeek = moment(lastWeek).subtract(7, 'days')

    Stat.find({
        loc: req.body.loc,
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


//Returns loc = ____  data from this week
router.post('/thisweek', function (req, res, next) {

    console.log('req to /ThisWeek with loc:', req.body.loc);

    //This uses moment.js
    var today = moment().startOf('day')
    var lastWeek = moment(today).subtract(7, 'days')


    Stat.find({
        loc: req.body.loc,
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






module.exports = router;