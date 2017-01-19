//This file handles all things storage into db

var Stat = require('../models/stat');

// SAVE Fucntion -------------------------------------------------------
module.exports = {

	//TODO: should probably find a way to streamline the saving to the database so only 1 function is needed. It'll be good just in case they don't post all of the dropin sports (ie only BBALL and VBALL)  

	// PARSE Function --------------------------------------------------------
	pullWRCM: function (tweetText, d) {
		if (tweetText.includes("WR") && tweetText.includes("CM")) {
			var fullText = tweetText;

			//Find Indexes
			var WRi = fullText.indexOf("WR");
			var CMi = fullText.indexOf("CM");

			console.log("WR Index:", WRi, " CM Index:", CMi);

			if (WRi < CMi) // (## WR ## CM), (WR ## CM ##), (WR ## ## CM), (## WR CM ##), 
			{
				if (WRi > 2 && WRi <7) // (## WR ## CM), (## WR CM ##)
				{
					var WRtext = fullText.slice(0, WRi); //Covering the ## WR

					var i = WRi + 2; //lets find next number
					while (i < fullText.length && !isNum(fullText[i])) {
						console.log("Not Num: ", fullText[i]);
						i++;
					}
					if (i > CMi) {
						var CMtext = fullText.slice(i, i + 6);
					}
					if (i < CMi) {
						var CMtext = fullText.slice(i, CMi);
					}
				} else { // (WR ## ## CM), (WR ## CM ##)

					var WRtext = fullText.slice(WRi, CMi);
					if (takeNum(WRtext) > 300) //must be (WR ## ## CM)
					{
						WRtext = fullText.slice(WRi, WRi + 6);
						var CMtext = fullText.slice(WRi + 6, CMi);
					} else //(WR ## CM ##)
					{
						CMtext = fullText.slice(CMi, CMi + 6);
					}
				}

			} else {

				if (CMi > 2) // (## WR ## CM), (## WR CM ##)
				{
					var CMtext = fullText.slice(0, CMi); //Covering the ## WR

					var i = CMi + 2; //lets find next number
					while (i < fullText.length && !isNum(fullText[i])) {
						console.log("Not Num: ", fullText[i]);
						i++;
					}
					if (i > WRi) {
						var WRtext = fullText.slice(i, i + 6);
					}
					if (i < WRi) {
						var WRtext = fullText.slice(i, WRi);
					}
				} else { // (WR ## ## CM), (WR ## CM ##)

					var CMtext = fullText.slice(CMi, WRi);
					if (takeNum(CMtext) > 300) //must be (WR ## ## CM)
					{
						CMtext = fullText.slice(CMi, CMi + 6);
						var WRtext = fullText.slice(CMi + 6, WRi);
					} else //(WR ## CM ##)
					{
						WRtext = fullText.slice(WRi, WRi + 6);
					}
				}
			}

			//Parse String to numbers
			var WRnum = takeNum(WRtext);
			var CMnum = takeNum(CMtext);


			console.log("WR:", WRnum, " CM:", CMnum);
		}

		saveStat("WR", WRnum, d);
		saveStat("CM", CMnum, d);
	},

	// PARSE Function DROPINS --------------------------------------------------------
	pullRC: function (tweetText, d) {
		var fullText = tweetText.toUpperCase();

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


	// No Data Catch
	if (BBALLi == -1 && VBALLi == -1 && BDMTi == -1 && FUTSi == -1) {

		console.log("Tweet: ", tweetText);
		console.log("******* NO DATA TWEET ************************************");
		console.log("-------------------------------------------------");
		return;
	}

	//Variables for sections of tweet that have data
	var BDMTtext;
	var FUTStext;
	var FUTStext;
	var BDMTtext;


	var o = 0; // So Can Break Out
	while (o == 0) {
		o = 1;

		// --- Only 1 ---
		//Only BBALL
		if (BBALLi != -1 && VBALLi == -1 && BDMTi == -1 && FUTSi == -1) {
			BBALLtext = fullText.slice(0, BBALLi + 14); //BBall Only
			break;
		}
		//Only VBALL
		if (BBALLi == -1 && VBALLi != -1 && BDMTi == -1 && FUTSi == -1) {
			VBALLtext = fullText.slice(0, VBALLi + 14); //BBall Only
			break;
		}
		//Only BDMT
		if (BBALLi == -1 && VBALLi == -1 && BDMTi != -1 && FUTSi == -1) {
			BDMTtext = fullText.slice(0, BDMTi + 14); //BBall Only
			break;
		}
		//Only FUTS
		if (BBALLi == -1 && VBALLi == -1 && BDMTi == -1 && FUTSi != -1) {
			FUTStext = fullText.slice(0, FUTSi + 14); //BBall Only
			break;
		}
		
		var curI;

		//Oder ## BBall etc...
		if (isNum(fullText[0]) || isNum(fullText[1])) {
			if (BBALLi < VBALLi && BBALLi < BDMTi && BBALLi < FUTSi) {
				var BBALLtext = fullText.slice(0, BBALLi); //BBall First

				if (VBALLi < BDMTi && VBALLi < FUTSi) {
					var VBALLtext = fullText.slice(BBALLi, VBALLi); //VBall Second

					if (BDMTi < FUTSi) {
						var BDMTtext = fullText.slice(VBALLi, BDMTi); //BDMT Third
						var FUTStext = fullText.slice(BDMTi, FUTSi); //FUTS Fourth
					} else {
						var FUTStext = fullText.slice(VBALLi, FUTSi); //FUTS Third
						var BDMTtext = fullText.slice(FUTSi, BDMTi); //BDMT Fourth
					}


				} else {
					if (BDMTi < FUTSi) {
						var BDMTtext = fullText.slice(BBALLi, BDMTi); //BDMT Second
					} else {
						var BDMTtext = fullText.slice(BBALLi, FUTSi); //FUTS Second
					}
				}



			} else {

				if (VBALLi < BDMTi && VBALLi < FUTSi) //VBall First
				{
					var VBALLtext = fullText.slice(0, VBALLi);

					if (BBALLi < BDMTi && BBALLi < FUTSi) {
						var BBALLtext = fullText.slice(VBALLi, BBALLi); //BBALL Second

						if (BDMTi < FUTSi) {
							var BDMTtext = fullText.slice(BBALLi, BDMTi); //BDMT Third
							var FUTStext = fullText.slice(BDMTi, FUTSi); //FUTS Fourth
						} else {
							var FUTStext = fullText.slice(BBALLi, FUTSi); //FUTS Third
							var BDMTtext = fullText.slice(FUTSi, BDMTi); //BDMT Fourth
						}

					} else {

						if (BDMTi < FUTSi) //BDMT First
						{
							var BDMTtext = fullText.slice(0, BDMTi);
							curI = BDMTi;
						} else { //FUTS First
							var FUTStext = fullText.slice(0, FUTSi);
							curI = FUTSi;
						}






					}
				}
			}
		} else {

			//console.log("********* Words ## ***************");

			//If BBALL ##

			if (BBALLi < VBALLi && BBALLi < BDMTi && BBALLi < FUTSi) {
				//BBall First

				if (VBALLi < BDMTi && VBALLi < FUTSi) {
					var BBALLtext = fullText.slice(BBALLi, VBALLi); //VBall Second


					if (BDMTi < FUTSi) {
						var VBALLtext = fullText.slice(VBALLi, BDMTi);
						var BDMTtext = fullText.slice(BDMTi, FUTSi); //BDMT Third
						var FUTStext = fullText.slice(FUTSi, fullText.length); //FUTS Fourth
					} else {
						var VBALLtext = fullText.slice(VBALLi, FUTSi);
						var FUTStext = fullText.slice(FUTSi, BDMTi); //FUTS Third
						var BDMTtext = fullText.slice(BDMTi, fullText.length); //BDMT Fourth
					}


				} else {
					if (BDMTi < FUTSi) {
						var BBALLtext = fullText.slice(BBALLi, BDMTi);
						var BDMTtext = fullText.slice(BDMTi, BDMTi + 14); //BDMT Second
					} else {
						var BBALLtext = fullText.slice(BBALLi, FUTSi);
						var BDMTtext = fullText.slice(FUTSi, FUTSi + 14); //FUTS Second
					}
				}



			} else {

				if (VBALLi < BDMTi && VBALLi < FUTSi) {
					//VBall First

					if (BBALLi < BDMTi && BBALLi < FUTSi) {
						var VBALLtext = fullText.slice(VBALLi, BBALLi);
						//BBALL Second

						if (BDMTi < FUTSi) {
							var BBALLtext = fullText.slice(BBALLi, BDMTi);
							var BDMTtext = fullText.slice(BDMTi, FUTSi); //BDMT Third
							var FUTStext = fullText.slice(FUTSi, fullText.length); //FUTS Fourth
						} else {
							var BBALLtext = fullText.slice(BBALLi, FUTSi);
							var FUTStext = fullText.slice(FUTSi, BDMTi); //FUTS Third
							var BDMTtext = fullText.slice(BDMTi, fullText.length); //BDMT Fourth
						}

					} else {

						//TODO:

						if (BDMTi < FUTSi) //BDMT First
						{
							var BDMTtext = fullText.slice(0, BDMTi);


							if (BBALLi < BDMTi && BBALLi < FUTSi) {
								//BBALL Second

								if (VBALLi < FUTSi) {
									var BBALLtext = fullText.slice(BBALLi, VBALLi);
									var BDMTtext = fullText.slice(VBALLi, FUTSi); //VBALL Third
									var FUTStext = fullText.slice(FUTSi, fullText.length); //FUTS Fourth
								} else {
									var BBALLtext = fullText.slice(BBALLi, FUTSi);
									var FUTStext = fullText.slice(FUTSi, VBALLi); //FUTS Third
									var BDMTtext = fullText.slice(VBALLi, fullText.length); //VBALL Fourth
								}












							} else { //FUTS First
								var FUTStext = fullText.slice(0, FUTSi);
								curI = FUTSi;
							}


						}
					}
				}
			}



		}
	}

	//Parse String to numbers
	if (BBALLtext != null) {
		var BBALLnum = takeNum(BBALLtext);
		//Save
	} else {
		console.log("Null Text BBALL");
	}
	if (VBALLtext != null) {
		var VBALLnum = takeNum(VBALLtext);
		//Save
	} else {
		console.log("Null Text VBALL");
	}
	if (BDMTtext != null) {
		var BDMTnum = takeNum(BDMTtext);
		//Save
	} else {
		console.log("Null Text BDMT");
	}
	if (FUTStext != null) {
		var FUTSnum = takeNum(FUTStext);
		//Save
	} else {
		console.log("Null Text FUTS");
	}



	// ------------------------------------------------------------------- IMS Checks ---------------------------------------
	// Here we assume that if no numbers.. then is was N/A or IMA
	// IMS is count -2

	if (BBALLnum < 0 || BBALLnum == null || BBALLnum == "") {
		console.log("BBALL IMS");
		BBALLnum = -2;
	}
	if (VBALLnum < 0 || VBALLnum == null || VBALLnum == "") {
		console.log("VBALL IMS");
		VBALLnum = -2;
	}
	if (BDMTnum < 0 || BDMTnum == null || BDMTnum == "") {
		console.log("BMDT IMS");
		BDMTnum = -2;
	}
	if (FUTSnum < 0 || FUTSnum == null || FUTSnum == "") {
		console.log("FUTS IMS");
		FUTSnum = -2;
	}
	//***********************************



	console.log(" ");
	console.log("Tweet: ", tweetText);
	console.log("BBALL:", BBALLnum, " VBALL:", VBALLnum, " BDMT:", BDMTnum, " FUTS:", FUTSnum);


	// If No Data, No Save
	if ((BBALLi != -1 || BBALLnum == -2) && BBALLnum < BBmax) {
		//Save
		saveStat("BBALL", BBALLnum, d);
	} else {
		console.log("No Save BBALL");		
	}
	if ((VBALLi != -1 || VBALLnum == -2) && VBALLnum < VBmax) {
		//Save
		saveStat("VBALL", VBALLnum, d);
	} else {
		console.log("No Save VBALL");
	}
	if ((BDMTi != -1 || BDMTnum == -2) && BDMTnum < BDMTmax) {
		//Save
		saveStat("BDMT", BDMTnum, d);
	} else {
		console.log("No Save BDMT");
	}
	if ((FUTSi != -1 || FUTSnum == -2) && FUTSnum < FUTSmax) {
		//Save
		saveStat("FUTS", FUTSnum, d);
	} else {
		console.log("No Save FUTS");
	}


	console.log("-------------------------------------------------");
	console.log("-------------------------------------------------");

	},
	
	loadFromLast: function(query,callbk){
		
	console.log("Finding Last Tweet");
	
    Stat.findOne({
            loc: query,
        }).sort([
        ['date', -1]
    ]).exec(
        function (err, stat) {

            if (err) {
				return null;
            }
			console.log("FindOne finds last date to be: ", stat.date);
			
            callbk(stat.date);
	
        });
		
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

function isNum(str) {
	if (str.match(/[^0-9]/g)) {

		//console.log(str,"is NOT num")
		return false;
	}
	//console.log(str,"is num")
	return true;
}

function nextIndex(cur, opt1 = 9999, opt2 = 9999, opt3 = 9999) {

	if (opt1 < cur) {
		opt1 = 9999;
	}
	if (opt2 < cur) {
		opt2 = 9999;
	}
	if (opt3 < cur) {
		if (opt1 == 9999 && opt2 == 9999) {
			return null; //No Next Index
		}
		opt3 = 9999;
	}

	if (opt1 < opt2) {
		if (opt1 < opt3) {
			return opt1;
		} else {
			return opt3;
		}
	} else {
		if (opt2 < opt3) {
			return opt2;
		} else {
			return opt3;
		}
	}

	return null; //ERR
};