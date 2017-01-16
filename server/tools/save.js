//This file handles all things storage into db

//Database Set Up ---------------------------------------------------------------------------------
var mongoose = require('mongoose');
mongoose.connect('mongodb://main:mainpass@ds163758.mlab.com:63758/reccenterstats'); //connect to the db
var Stat = require('../models/stat');

// SAVE Fucntion -------------------------------------------------------
module.exports = {

	//TODO: should probably find a way to streamline the saving to the database so only 1 function is needed. It'll be good just in case they don't post all of the dropin sports (ie only BBALL and VBALL)  

	// PARSE Function --------------------------------------------------------
	pullWRCM: function (tweetText, d) {
		var fullText = tweetText;

		//Divide to 2 strings
		var WRi = fullText.indexOf("WR");
		var CMi = fullText.indexOf("CM");

		console.log("WR Index:", WRi, " CM Index:", CMi);

		//TODO: account for CM first and then WR
		if (WRi > 2) //Probably in format ## WR ##CM
		{
			var WRtext = fullText.slice(0, WRi);
			var CMtext = fullText.slice(WRi, CMi);
		} else {

			if (WRi < CMi) {
				var WRtext = fullText.slice(WRi, CMi);
				var CMtext = fullText.slice(CMi, CMi + 6);
			}
		}

		//Parse String to numbers
		var WRnum = takeNum(WRtext);
		var CMnum = takeNum(CMtext);


		console.log("WR:", WRnum, " CM:", CMnum);

		saveStat("WR", WRnum, d);
		saveStat("CM", CMnum, d);
	},

	// PARSE Function DROPINS --------------------------------------------------------
	pullRC: function (tweetText, d) {
		var fullText = tweetText;

		//Divide to 4 strings
		var BBALLi = fullText.indexOf("BBALL");
		if (BBALLi == -1) {
			BBALLi = fullText.indexOf("BASKETBALL");
		}
		var VBALLi = fullText.indexOf("VBALL");
		if (VBALLi == -1) {
			VBALLi = fullText.indexOf("VOLLEYBALL");
		}
		var BDMTi = fullText.indexOf("BDMT");
		if (BDMTi == -1) {
			BDMTi = fullText.indexOf("BADMINTON");
			//sometimes called BADM
		}
		var FUTSi = fullText.indexOf("FUTS");
		if (FUTSi == -1) {
			FUTSi = fullText.indexOf("FUTSAL");
		}

		console.log("BBALL Index:", BBALLi, " VBALL Index:", VBALLi, " BDMT Index:", BDMTi, " FUTS Index:", FUTSi);

		var BBALLtext;
		var VBALLtext;
		var BDMTtext;
		var FUTStext;

		//***********************************
		//TODO: account for diff order
		if (BBALLi >= 2) //Probably in format ## WR ##CM
		{
			BBALLtext = fullText.slice(0, BBALLi);
			VBALLtext = fullText.slice(BBALLi, VBALLi);
			BDMTtext = fullText.slice(VBALLi, BDMTi);
			FUTStext = fullText.slice(BDMTi, FUTSi);
		} else {

			//if (WRi < CMi) {
			BBALLtext = fullText.slice(BBALLi, VBALLi);
			VBALLtext = fullText.slice(VBALLi, BDMTi);
			BDMTtext = fullText.slice(BDMTi, FUTSi);
			FUTStext = fullText.slice(FUTSi, fullText.length);
			//}
		}
		//***********************************

		//Parse String to numbers
		var BBALLnum = takeNum(BBALLtext);
		var VBALLnum = takeNum(VBALLtext);
		var BDMTnum = takeNum(BDMTtext);
		var FUTSnum = takeNum(FUTStext);


		console.log("BBALL:", BBALLnum, " VBALL:", VBALLnum, " BDMT:", BDMTnum, " FUTS:", FUTSnum);

		saveStat("BBALL", BBALLnum, d);
		saveStat("VBALL", VBALLnum, d);
		saveStat("BDMT", BDMTnum, d);
		saveStat("FUTS", FUTSnum, d);
	}
};


function saveStat(str, num, d) {

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
		} else {
			console.log("Stat succ saved");
		}

	});

}

function takeNum(str) {
	var num = str.replace(/[^0-9]/g, '');
	return num;
}