var lastrange = "";
var skip = false;

module.exports = {

    getHoursData: function (callbkfunct) {
        var request = require('request');
        var cheerio = require('cheerio');

        var sendBk = new Array();

        url = 'http://www.uwo.ca/campusrec/';

        request(url, function (error, response, html) {


            if (!error) {
                var $ = cheerio.load(html);

                var hoursjson = new Array();
                var hoursTitle, range;
                var jsonTitle = {
                    hoursTitle: "",
                    range: "",
                };

                $('#sidebar').filter(function () {

                    var data = $(this);

                    hoursTitle = data.children().first().text(); // Title
                    range = data.children().first().next().text(); //range

                    if(range == lastrange){
                        console.log("Already Loader Hours!", range);
                        skip = true;
                        return;
                    }else{
                        skip=false;
                        lastrange = range;
                    }

                    jsonTitle.hoursTitle = hoursTitle;
                    jsonTitle.range = range;



                    sendBk.push({
                        title: jsonTitle
                    });

                    var para = data.children().first().next().next().html(); //p tag with hours data

                    var hoursArray = para.split('<br>');

                    hoursArray.forEach(function (element) {

                        var temp = element.replace(/&#xA0;/g, "").replace(/&#x20;/g, "");

                        // console.log("LINE:", temp);

                        temp = temp.toUpperCase();

                        //Find The Day Of Week
                        var dayOfWeek = getDOW(temp);

                        var AMtime;
                        var PMtime;

                        var i = temp.indexOf("AM");
                        if (i >= 0) { //Exists
                            var iold = i;
                            i--;
                            while (isNum(temp[i])) {
                                i--;
                            }
                            var AMtime = temp.slice(i, iold);
                        }

                        var j = temp.indexOf("PM");
                        if (j >= 0) {
                            var jold = j;
                            j--;
                            while (isNum(temp[j])) {
                                j--;
                            }
                            var PMtime = temp.slice(j, jold);
                        }

                        if (PMtime == null) { //Must Close in AM
                            var i = temp.indexOf("AM", iold + 1);
                            if (i >= 0) { //Exists
                                var iold = i;
                                i--;
                                while (isNum(temp[i])) {
                                    i--;
                                }
                                var AMtime2 = temp.slice(i, iold);
                            }

                            var numOpen = takeNum(AMtime);
                            var numClose = takeNum(AMtime2);
                            // console.log("OPEN:", numOpen, "AM - Close:", numClose, "AM");

                            dayOfWeek.forEach(function (element) {
                                var hourJson = {
                                    dayOfWeek:element,
                                    openH: numOpen,
                                    openF: "AM",
                                    closeH: numClose,
                                    closeF: "AM"
                                }
                                hoursjson.push([hourJson]);
                            }, this);



                        } else {
                            var numOpen = takeNum(AMtime);
                            var numClose = takeNum(PMtime);
                            // console.log("OPEN:", numOpen, "AM - Close:", numClose, "PM");

                            dayOfWeek.forEach(function (element) {
                                var hourJson = {
                                    dayOfWeek:element,
                                    openH: numOpen,
                                    openF: "AM",
                                    closeH: numClose,
                                    closeF: "PM"
                                }
                                hoursjson.push([hourJson]);
                            }, this);

                        }

                    }, this);





                })
                if(skip){
                    console.log("Skipping Save Hours");
                    return;
                }

                sendBk.push({
                    hours: JSON.stringify(hoursjson)
                });
                callbkfunct(sendBk);
            }

            // console.log(sendBk);
        })


    }
}



var getDOW = function (str) {


    if (str.includes("MON")) {

        //Could be mon-Thursday
        if (str.includes("THURS")) {
            return ["Monday", "Tuesday", "Wednesday", "Thursday"];
        }

        return ["Monday"];
    }
    if (str.includes("TUE")) {
        return ["Tuesday"];
    }
    if (str.includes("WED")) {
        return ["Wednesday"];
    }
    if (str.includes("THURS")) {
        if(str.includes("MON")){
            return null;
        }
        return ["Thursday"];
    }
    if (str.includes("FRI")) {
        return ["Friday"];
    }
    if (str.includes("SAT")) {
        return ["Saturday"];
    }
    if (str.includes("SUN")) {
        return ["Sunday"];
    }
}


var takeNum = function (str) {

    var num = str.replace(/[^0-9]/g, '');
    return num;
};

var isNum = function (str) {
    if (str == null) {
        return 0
    }
    if (str.match(/[^0-9]/g)) {

        //console.log(str,"is NOT num")
        return false;
    }
    //console.log(str,"is num")
    return true;
};