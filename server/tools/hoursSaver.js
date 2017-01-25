//This file handles all things storage into db

var Hours = require('../models/hours');

var hourscraper = require('./hourscraper');

module.exports = {

    saveHours: function () {

        var clbk = function (data) {
            var hoursData = JSON.parse(data[1].hours);
            console.log("***************DATA**************\n");

            console.log('Hours -> saving to db');

            var hours = new Hours({

                title: data[0].title.hoursTitle,
                subtitle: data[0].title.range,

                monO: {
                    hour: hoursData[0][0].openH,
                    f: hoursData[0][0].openf,
                },
                monC: {
                   hour: hoursData[0][0].closeH,
                    f: hoursData[0][0].closeF,
                },
                tueO: {
                    hour: hoursData[1][0].openH,
                    f: hoursData[1][0].openf,
                },
                tuesC: {
                    hour: hoursData[1][0].closeH,
                    f: hoursData[1][0].closeF,
                },
                wedO: {
                   hour: hoursData[2][0].openH,
                    f: hoursData[2][0].openf,
                },
                wedC: {
                   hour: hoursData[2][0].closeH,
                    f: hoursData[2][0].closeF,
                },
                thuO: {
                   hour: hoursData[3][0].openH,
                    f: hoursData[3][0].openf,
                },
                thuC: {
                        hour: hoursData[3][0].closeH,
                    f: hoursData[3][0].closeF,
                },
                friO: {
                    hour: hoursData[4][0].openH,
                    f: hoursData[4][0].openf,
                },
                friC: {
                     hour: hoursData[4][0].closeH,
                    f: hoursData[4][0].closeF,
                },
                satO: {
                     hour: hoursData[5][0].openH,
                    f: hoursData[5][0].openf,
                },
                satC: {
                     hour: hoursData[5][0].closeH,
                    f: hoursData[5][0].closeF,
                },
                sunO: {
                    hour: hoursData[6][0].closeH,
                    f: hoursData[6][0].closeF,
                },
                sunC: {
                     hour: hoursData[6][0].closeH,
                    f: hoursData[6][0].closeF,
                }
            });

            console.log('made hours -> ' + JSON.stringify(hours));

            hours.save(function (err) {
            	if (err) {

            		console.log(err);
            	} else {
            		console.log("Hours succ saved");
            	}
            });
        }
        hourscraper.getHoursData(clbk);

    }


}