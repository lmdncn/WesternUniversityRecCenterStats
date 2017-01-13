
//Database Set Up ---------------------------------------------------------------------------------
var mongoose = require('mongoose');
mongoose.connect('mongodb://main:mainpass@ds163758.mlab.com:63758/reccenterstats'); //connect to the db
var Stat = require('./models/stat');


// Twitter Stream ----------------------------------------------------------------------------------
var Twitter = require('twitter');
 
//Brandons twitter Info -> TODO: Eventually should change to Application's own account
var client = new Twitter({
  consumer_key: '38M3f7C7pGdVky2l1K0RXRTVC',
  consumer_secret: 'N7OQnghFETxs1XTMULWVTdtGAeSteCBgLbiT8rwCz7y3MJ6koJ',
  access_token_key: '418406145-Gx2TE6rkqrT2FTcUg1wo4AhmLTBONmB1ZY7qe63Y',
  access_token_secret: 'Pj4QVh6u2BFtTg5Ty0jwQNTlK6qNYKwnirE3WXLSaLJcl'
});

// WeightRoom Account Stream ---------------------------------------------------------------------
var WRuserID;
client.get('users/show', { screen_name: 'WesternWeightRm' },  function (error, data, response) {
  if(!error){
    console.log(data);
    WRuserID = data.id_str;
    console.log(WRuserID);
    console.log("TWEETS:");

    //TODO: figure out how to add two parameters (ie follow : userID, track : "CR WM") to reduce wasted bandwidth
    //Twitter API only supoorts OR operation on stream params and AND is needed
    var idParams = {follow : WRuserID};
    client.stream('statuses/filter', idParams,  function(stream) {
      stream.on('data', function(tweet) {
        if(tweet.text.includes("WR") && tweet.text.includes("CM")){
          
		  //Log tweet for testing
          console.log(tweet.text); 
          console.log(tweet.created_at);

       TweetDate = new Date(tweet.created_at);     
			//Pulls nums and saves them
			pullWRCM(tweet.text,TweetDate);
		  
        }
      });
      stream.on('error', function(error) {
        console.log(error);
      });
    });
  }
});

//TODO: DropIn Account Stream

// SAVE Fucntion -------------------------------------------------------
function saveStat(str, num, d){
		
		//Save to db
		console.log('saving to db');

// TODO: Figure out time formating and saving from Tweet format
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
		console.log("Stat saved");
	}
        
    });
	
}

// PARSE Function --------------------------------------------------------
function pullWRCM(tweetText, d){
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
		
function takeNum(str) { 
    var num = str.replace(/[^0-9]/g, ''); 
    return num; 
}