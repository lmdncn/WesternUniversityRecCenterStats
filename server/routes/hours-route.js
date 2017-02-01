var express = require('express');
var router = express.Router();
var Hours = require('../models/hours');


//Get hours from db
router.get('/', function (req, res, next) {
    Hours.find().sort('-created_at').limit(1).exec(
        function (err, hours) {
            if (err) {
                res.send(err);
            }
            console.log(hours);
            res.json(hours);
        });
});


module.exports = router;


