var express = require('express');
var router = express.Router();



// Get Home Page
router.get('/', function (req, res, next) {

    res.render('index.html');

});

router.get('/WeightRoom', function (req, res, next) {

    res.render('index.html');

});

router.get('/CardioMachines', function (req, res, next) {

    res.render('index.html');

});
router.get('/Basketball', function (req, res, next) {

    res.render('index.html');

});
router.get('/Volleyball', function (req, res, next) {

    res.render('index.html');

});
router.get('/Badminton', function (req, res, next) {

    res.render('index.html');

});
router.get('/Futsal', function (req, res, next) {

    res.render('index.html');

});

module.exports = router;