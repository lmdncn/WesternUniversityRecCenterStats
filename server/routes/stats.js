// This extension route will handle most of the API request to the data in DB

// A "Stat" is a peice of data parsed from a Tweet that repesents 
// loc (location of people), count (number of people), date (date tweeted)
// Tweets may contain multiple "stat"s

var express = require('express');
var router = express.Router();
var Stat = require('../models/stat');
var moment = require('moment');
moment().format();


router.get('/AvgWeek', function (req, res, next) { //req should contain the string that suggests which loc they want



    console.log('get req to /AvgWeek');


    // TODO: Return ave date from times for 1 week


});

router.post('/ThisWeek', function (req, res, next) {

    console.log("Called");
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

    // TODO: Return data from times from this week



});






module.exports = router;