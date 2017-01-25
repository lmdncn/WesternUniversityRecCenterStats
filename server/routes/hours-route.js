var express = require('express');
var router = express.Router();
var Hours = require('../models/hours');


//Get hours from db
router.get('/', function (req, res, next) {
    Hours.findOne().exec(
        function (err, hours) {
            if (err) {
                res.send(err);
            }
            res.json(hours);
        });
});

module.exports = router;


