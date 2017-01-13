//This file handles all things storage into db

//Database Set Up ---------------------------------------------------------------------------------
var mongoose = require('mongoose');
mongoose.connect('mongodb://main:mainpass@ds163758.mlab.com:63758/reccenterstats'); //connect to the db
var Stat = require('./models/stat');

// SAVE Fucntion -------------------------------------------------------
module.exports = {
    

// PARSE Function --------------------------------------------------------
pullWRCM: function (tweetText, d){
		var fullText=tweetText;
		
		//Divide to 2 strings
		var WRi = fullText.indexOf("WR");
		var CMi = fullText.indexOf("CM");
		
		console.log("WR Index:",WRi, " CM Index:",CMi);
		
		if(WRi > 2) //Probably in format ## WR ##CM
		{
			var WRtext = fullText.slice(0,WRi);
			var CMtext = fullText.slice(WRi,CMi);
		}else{
		
		if(WRi<CMi){
			var WRtext = fullText.slice(WRi,CMi);
			var CMtext = fullText.slice(CMi,CMi+6);
		}
		}
		
		//Parse String to numbers
		var WRnum = takeNum(WRtext);
		var CMnum = takeNum(CMtext);
		
		
		console.log("WR:",WRnum, " CM:",CMnum);
		
		saveStat("WR", WRnum,d);
		saveStat("CM", CMnum,d);
}
};

function saveStat(str, num, d){
		 
		//Save to db
		console.log('saving to db');

    var stat = new Stat({ 
        loc: str,
        count: num,
        date: d
    });


    console.log('made stat' + JSON.stringify(stat));

    stat.save(function (err) {
        if (err) {

            console.log(err);
        }
	else{
		console.log("Stat succ saved");
	}
        
    });
	
}
		
function takeNum(str) { 
    var num = str.replace(/[^0-9]/g, ''); 
    return num; 
}