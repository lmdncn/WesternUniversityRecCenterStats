// This extension route will handle most of the API request to the data in DB

// A "Stat" is a peice of data parsed from a Tweet that repesents 
// loc (location of people) and count (number of people)
// Tweets may contain multiple "stat"s

var express = require('express');
var router = express.Router();
var Stat = require('../models/stat');



router.post('/tweet', function (req, res, next) {


    console.log('posting tweet');

	
	// TODO: Parse tweet for each stat contained
	
	// TODO: Save each stat with loop
	
    var stat = new Stat({ 
        loc: req.body.loc,
        count: req.body.count
		//date and time set by db to current when created
    });


    // console.log('made stat' + JSON.stringify(stat));

    stat.save(function (err) {
        if (err) {

            res.send(err);
        }

        res.json(201, stat);
    });

});






module.exports = router;