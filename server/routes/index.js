var express = require('express');
var router = express.Router();
var tweetupdater = require('../tools/tweetUpdater');
var moment = require('moment');
var lastUpdate = Date.now();
var hoursaver = require('../tools/hoursSaver');



var timeout = function(){
	
setInterval(function() {
	console.log("Schedual Update")
	tweetupdater.updateData();
	
}, 4* 24 * 60 * 60 * 1000);	//Every 4 days
};

var updater = function(force = false)
{
	var td = Date.now();
	if( moment(lastUpdate).add(2,"minutes") < moment(td) || force)
	{
	lastUpdate = td;
	tweetupdater.updateData();
	console.log("** Server Data Updated! **");
	hoursaver.saveHours();
	}

}

timeout();
updater(true); //Force an update on server turn on

// Get Home Page
router.get('/', function (req, res, next) {

	updater();
    res.render('index.html');

});

router.get('/WeightRoom', function (req, res, next) {

	updater();
    res.render('index.html');
	
});

router.get('/CardioMachines', function (req, res, next) {
	
	updater();
    res.render('index.html');

});
router.get('/Basketball', function (req, res, next) {

	updater();
    res.render('index.html');

});
router.get('/Volleyball', function (req, res, next) {

	updater();
    res.render('index.html');

});
router.get('/Badminton', function (req, res, next) {

	updater();
    res.render('index.html');

});
router.get('/Futsal', function (req, res, next) {

	updater();
    res.render('index.html');

});


module.exports = router;