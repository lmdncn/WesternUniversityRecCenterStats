var express = require('express');
var router = express.Router();
var updater = require('../tools/tweetUpdater');
var moment = require('moment');
var lastUpdate = Date.now();






var timeout = function(){
	
setInterval(function() {
	console.log("Schedual Update")
	updater.updateData();
	
}, 4* 24 * 60 * 60 * 1000);	//Every 4 days
};

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


updater(force = false)
{
	var td = Date.now();
	if( moment(lastUpdate).add(2,"minutes") < moment(td) || force)
	{
	lastUpdate = td;
	updater.updateData();
	console.log("** Server Data Updated! **");
	}

}

module.exports = router;