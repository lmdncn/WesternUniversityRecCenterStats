//Tests:
/*
WR 108 CM 63
Come join us for Cardio Kickbox at 1:05 until 1:55

WR 113 CM 76

132 WR & 72 CM
*/


pullWRCM("WR 113 CM 76");
pullWRCM("132 WR & 72 CM");
pullWRCM("WR 108 CM 633 Come join us for Cardio Kickbox at 1:05 until 1:55");



function pullWRCM(tweetText){
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
		

function takeNum(str) { 
    var num = str.replace(/[^0-9]/g, ''); 
    return num; 
}