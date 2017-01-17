var express = require('express');
var router = express.Router();
var updater = require('../tools/tweetUpdater');
var moment = require('moment');
var lastUpdate = Date.now();

// Get Home Page
router.get('/', function (req, res, next) {

	var td = Date.now();
	if( moment(lastUpdate).add(2,"minutes") < moment(td))
	{
	lastUpdate = td;
	updater.updateData();
	}
    res.render('index.html');

});

router.get('/WeightRoom', function (req, res, next) {

	var td = Date.now();
	if( moment(lastUpdate).add(2,"minutes") < moment(td))
	{
	lastUpdate = td;
	updater.updateData();
	}
    res.render('index.html');
	
});

router.get('/CardioMachines', function (req, res, next) {
	
	updater.updateData();
    res.render('index.html');

});
router.get('/Basketball', function (req, res, next) {

	var td = Date.now();
	if( moment(lastUpdate).add(2,"minutes") < moment(td))
	{
	lastUpdate = td;
	updater.updateData();
	}
    res.render('index.html');

});
router.get('/Volleyball', function (req, res, next) {

	var td = Date.now();
	if( moment(lastUpdate).add(2,"minutes") < moment(td))
	{
	lastUpdate = td;
	updater.updateData();
	}
    res.render('index.html');

});
router.get('/Badminton', function (req, res, next) {

	var td = Date.now();
	if( moment(lastUpdate).add(2,"minutes") < moment(td))
	{
	lastUpdate = td;
	updater.updateData();
	}
    res.render('index.html');

});
router.get('/Futsal', function (req, res, next) {

	var td = Date.now();
	if( moment(lastUpdate).add(2,"minutes") < moment(td))
	{
	lastUpdate = td;
	updater.updateData();
	}
    res.render('index.html');

});

module.exports = router;