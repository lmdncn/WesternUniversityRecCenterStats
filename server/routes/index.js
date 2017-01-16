var express = require('express');
var router = express.Router();



// Get Home Page
router.get('/', function (req, res, next) {

    res.render('index.html');

});

router.get('/WR', function (req, res, next) {

    res.render('index.html');

});

router.get('/CM', function (req, res, next) {

    res.render('index.html');

});
router.get('/BB', function (req, res, next) {

    res.render('index.html');

});
router.get('/VB', function (req, res, next) {

    res.render('index.html');

});

module.exports = router;