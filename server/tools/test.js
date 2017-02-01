console.log("Starting up!");

// Set Reasonable maxs here
var BBmax = 100;
var WRmax = 300;
var VBmax = 100;
var BDMTmax = 50;
var FUTSmax = 50;

//Tests:
/*
WR 108 CM 63
Come join us for Cardio Kickbox at 1:05 until 1:55

WR 113 CM 76

132 WR & 72 CM
*/


//pullWRCM("WR:113 CM76");
//pullWRCM("132 WR & 72 CM");
//pullWRCM("WR: 108 CM 634 Come join us for Cardio Kickbox at 1:05 until 1:55");
//pullWRCM("WR 113 & 76 CM");
//pullWRCM("CM 133 & 46 WR");
// pullWRCM("Weightroom 56 Cardio 30!");
// pullWRCM("Weightroom 36 Cardio mez 20");
// pullWRCM("Weightroom 20 and Cardio MEZ 15!");

//pullRC("Bball 28 Vball: 0 Badminton 6 Futsal: 10");
//pullRC("Bball:31 Vball:0 Futsal:0 Badminton: 7");
//pullRC("6 Bball 0 Vball 2 Badminton 0 futsal");
//pullRC("BBALL: 27 All other gyms are IMS and as of 8PM all gyms are IMS for the duration of the night!");
//pullRC("Bball: IMS Vball:0 Badminton:9 Futsal: IMS *INTRAMURALS ARE HAPPENING*");
//pullRC("Remember to lock up all your belongings including shoes, boots and jackets in the changerooms!");
//pullRC("Bball: 21 Vball: 2 Badminton:8 Futsal:7");

pullRC("Basketball: N/A (IMS) Volleyball: N/A (IMS) Badminton: 0 Futsal: N/A (IMS)");
pullRC("Basketball: 14 Volleyball: 0 Badminton: IMS Futsal: IMS");
pullRC("Basketball: 45 Volleyball: 2 Badminton: N/A Futsal: N/A");
pullRC("Basketball: red gym is closed until 3:00pm! Volleyball: 12 Badminton: 10 Futsal: N/A");
pullRC("Basketball: 2 Volleyball: 15 Badminton: 11 Futsal: 4 Red gym is closed until 3:00pm!");
pullRC("All drop-in gyms are IMS for the rest of the night!");
pullRC("BBall: 20 VBall: 1 Badminton: 2");




function pullWRCM(tweetText) {
	
	var fullText = tweetText.toUpperCase();
	
	if (fullText.includes("WR") && fullText.includes("CM") || fullText.includes("CARDIO") && fullText.includes("WEIGHTROOM") ) {
		

		//Find Indexes
		var WRi = fullText.indexOf("WR");
		var CMi = fullText.indexOf("CM");
	if(CMi>=0 && WRi >=0){
		console.log("WR Index:", WRi, " CM Index:", CMi);

		if (WRi < CMi) // (## WR ## CM), (WR ## CM ##), (WR ## ## CM), (## WR CM ##), 
		{
			if (WRi > 2 && WRi < 7) // (## WR ## CM), (## WR CM ##)
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
	}else{
		console.log("Cardio Weightroom");
		var WRi = fullText.indexOf("WEIGHTROOM");
		var CMi = fullText.indexOf("CARDIO");
		
		console.log("WR Index:", WRi, " CM Index:", CMi);
		
		//find first number
		
		var firstNumi = 0;
		while (!isNum(fullText[firstNumi])){
			firstNumi++;			
		}
		console.log("Frist number is at: ",firstNumi);
		if(firstNumi<WRi && WRi < CMi){ //### Weightroom
			var WRtext = fullText.slice(firstNumi, WRi);
		}
		if(firstNumi > WRi && WRi < CMi){ //Weightroom ###
			var WRtext = fullText.slice(firstNumi, firstNumi+3);
		}
		if(firstNumi > CMi && WRi > CMi){ //Cardio ###
			var CMtext = fullText.slice(firstNumi, firstNumi+3);
		}
		if(firstNumi < CMi && WRi > CMi){ //Cardio ###
			var CMtext = fullText.slice(firstNumi, CMi);
		}
		//First Number Covered
		
		
		//First second number
		var secondNumi = firstNumi+3;
		while (!isNum(fullText[secondNumi])){
			secondNumi++;			
		}
		if(secondNumi<CMi && WRi < CMi){ //### Cardio
			var CMtext = fullText.slice(secondNumi, CMi);
		}
		if(secondNumi > CMi && WRi < CMi){ //Cardio ###
			var CMtext = fullText.slice(secondNumi, secondNumi+3);
		}
		if(secondNumi > WRi && WRi > CMi){ //Weightroom ###
			var WRtext = fullText.slice(secondNumi, secondNumi+3);
		}
		if(secondNumi < WRi && WRi > CMi){ //### Weightroom 
			var WRtext = fullText.slice(secondNumi, WRi);
		}		
		
	}
		//Parse String to numbers
		var WRnum = takeNum(WRtext);
		var CMnum = takeNum(CMtext);

		console.log(" ");
		console.log("WR:", WRnum, " CM:", CMnum);
		console.log("-------------------------------------------------");
	}
}

function pullRC(tweetText) {
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
		
		// Checkout for all gyms closed for IMS for rest of the night

		if((fullText.includes("IMS") || fullText.includes("INTRAMURALS")||fullText.includes("DROP"))&&fullText.includes("ALL")&&fullText.includes("GYMS")||fullText.includes("CLOSED")&&fullText.includes("NIGHT"))
		{
			// Save everything IMS
			console.log(" ALL GYMS IMS!");
	var BBALLnum = -2;var VBALLnum= -2; var BDMTnum = -2; var FUTSnum = -2;
		}else{
			console.log("******* NO DATA TWEET ************************************");
		console.log("-------------------------------------------------");
		return;
		}
		
	
	}else{

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
		
		
		if (BBALLi != -1 && VBALLi != -1 && BDMTi == -1 && FUTSi != -1) {
			var num1index = nextNumberIndex(0,fullText);
			var num2index = nextNumberIndex(num1index+3,fullText);
			var num3index = nextNumberIndex(num2index+3,fullText);

			// Order of words
			if(BBALLi<VBALLi && VBALLi<FUTSi){
				BBALLtext = fullText.slice(num1index, num1index+3);
				VBALLtext = fullText.slice(num2index,num2index+3);
				FUTStext = fullText.slice(num3index,num3index+3);
			}
			if(VBALLi<BBALLi && BBALLi<FUTSi){
				VBALLtext = fullText.slice(num1index, num1index+3);
				BBALLtext = fullText.slice(num2index,num2index+3);
				FUTStext = fullText.slice(num3index,num3index+3);
			}
			if(BBALLi<FUTSi && FUTSi<VBALLi){
				BBALLtext = fullText.slice(num1index, num1index+3);
				FUTStext = fullText.slice(num2index,num2index+3);
				VBALLtext = fullText.slice(num3index,num3index+3);
			}
			break;

		}

		if (BBALLi != -1 && VBALLi != -1 && BDMTi != -1 && FUTSi == -1) {
			console.log("Theres Three!");
			var num1index = nextNumberIndex(0,fullText);
			var num2index = nextNumberIndex(num1index+3,fullText);
			var num3index = nextNumberIndex(num2index+3,fullText);
			console.log("INDEXES OF NUMS: ", num1index,num2index,num3index);

			// Order of words
			if(BBALLi<VBALLi && VBALLi<BDMTi){
				BBALLtext = fullText.slice(num1index, num1index+3);
				VBALLtext = fullText.slice(num2index,num2index+3);
				BDMTtext = fullText.slice(num3index,num3index+3);
			}
			if(VBALLi<BBALLi && BBALLi<BDMTi){
				VBALLtext = fullText.slice(num1index, num1index+3);
				BBALLtext = fullText.slice(num2index,num2index+3);
				BDMTtext = fullText.slice(num3index,num3index+3);
			}
			if(BBALLi<BDMTi && BDMTi<VBALLi){
				BBALLtext = fullText.slice(num1index, num1index+3);
				BDMTtext = fullText.slice(num2index,num2index+3);
				VBALLtext = fullText.slice(num3index,num3index+3);
			}
			break;
		}

		if (BBALLi != -1 && VBALLi == -1 && BDMTi != -1 && FUTSi != -1) {
			console.log("Theres Three!");
			var num1index = nextNumberIndex(0,fullText);
			var num2index = nextNumberIndex(num1index+3,fullText);
			var num3index = nextNumberIndex(num2index+3,fullText);
			console.log("INDEXES OF NUMS: ", num1index,num2index,num3index);

			// Order of words
			if(BBALLi<BDMTi && BDMTi<FUTSi){
				BBALLtext = fullText.slice(num1index, num1index+3);
				BDMTtext = fullText.slice(num2index,num2index+3);
				FUTStext = fullText.slice(num3index,num3index+3);
			}
			if(BBALLi<FUTSi && FUTSi<BDMTi){
				BBALLtext = fullText.slice(num1index, num1index+3);
				FUTStext = fullText.slice(num2index,num2index+3);
				BDMTtext = fullText.slice(num3index,num3index+3);
			}
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

}
	console.log(" ");
	console.log("Tweet: ", tweetText);
	console.log("BBALL:", BBALLnum, " VBALL:", VBALLnum, " BDMT:", BDMTnum, " FUTS:", FUTSnum);


	// If No Data, No Save
	if ((BBALLi != -1 || BBALLnum == -2) && BBALLnum < BBmax) {
		//Save
	} else {
		console.log("No Save BBALL");
	}
	if ((VBALLi != -1 || VBALLnum == -2) && VBALLnum < VBmax) {
		//Save
	} else {
		console.log("No Save VBALL");
	}
	if ((BDMTi != -1 || BDMTnum == -2) && BDMTnum < BDMTmax) {
		//Save
	} else {
		console.log("No Save BDMT");
	}
	if ((FUTSi != -1 || FUTSnum == -2) && FUTSnum < FUTSmax) {
		//Save
	} else {
		console.log("No Save FUTS");
	}


	console.log("-------------------------------------------------");
	console.log("-------------------------------------------------");
}


function nextNumberIndex(index, str){
	var i = index;
	while(!isNum(str[i])){
		i++
		if(i>=str.length){
			i=-1;
			break;
		}
	}
	return i;
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

};