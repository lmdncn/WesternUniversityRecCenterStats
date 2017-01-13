//Tests:
/*
WR 108 CM 63
Come join us for Cardio Kickbox at 1:05 until 1:55

WR 113 CM 76

132 WR & 72 CM
*/


pullWRCM("WR:113 CM76");
pullWRCM("132 WR & 72 CM");
pullWRCM("WR: 108 CM 634 Come join us for Cardio Kickbox at 1:05 until 1:55");
pullRC("Bball 28 Vball: 0 Badminton 6 Futsal: 10");



function pullWRCM(tweetText){
	if(tweetText.includes("WR") && tweetText.includes("CM")){
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
	}
}
		
function pullRC (tweetText){
		var fullText=tweetText.toUpperCase();
		
		//Divide to 4 strings
		var BBALLi = fullText.indexOf("BBALL");
		if(BBALLi == -1){
			var BBALLi = fullText.indexOf("BASKETBALL");
		}
		var VBALLi = fullText.indexOf("VBALL");
		if(VBALLi == -1){
			var VBALLi = fullText.indexOf("VOLLEYBALL");
		}
		var BDMTi = fullText.indexOf("BDMT");
		if(BDMTi == -1){
			var BDMTi = fullText.indexOf("BADMINTON");
			//sometimes called BADM
		}
		var FUTSi = fullText.indexOf("FUTS");
		if(FUTSi == -1){
			var FUTSi = fullText.indexOf("FUTSAL");
		}
		
		console.log("BBALL Index:",BBALLi, " VBALL Index:",VBALLi, " BDMT Index:",BDMTi, " FUTS Index:",FUTSi);
		
		//***********************************
		//TODO URGENT: slice fullText here
		var BBALLtext = fullText;
		var VBALLtext = fullText;
		var BDMTtext = fullText;
		var FUTStext = fullText;
		//***********************************
		
		//Parse String to numbers
		var BBALLnum = takeNum(BBALLtext);
		var VBALLnum = takeNum(VBALLtext);
		var BDMTnum = takeNum(BDMTtext);
		var FUTSnum = takeNum(FUTStext);
		
		
		console.log("BBALL:",BBALLnum, " VBALL:",VBALLnum, " BDMT:",BDMTnum, " FUTS:",FUTSnum);
		
}

function takeNum(str) { 
    var num = str.replace(/[^0-9]/g, ''); 
    return num; 
}