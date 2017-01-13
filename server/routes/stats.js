// This extension route will handle most of the API request to the data in DB

// A "Stat" is a peice of data parsed from a Tweet that repesents 
// loc (location of people) and count (number of people)
// Tweets may contain multiple "stat"s

var express = require('express');
var router = express.Router();
var Stat = require('../models/stat');


router.get('/AvgWeek', function (req, res, next) {


    console.log('get req to /AvgWeek');

	
	// TODO: Return ave date from times for 1 week
	

});

router.get('/ThisWeek', function (req, res, next) {


    console.log('get req to /ThisWeek');

	
	// TODO: Return data from times from this week
	


});






module.exports = router;