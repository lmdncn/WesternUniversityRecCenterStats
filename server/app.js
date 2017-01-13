/*
//Database Set Up
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CampusRec'); //connect to the db
var Stat = require('../models/stat');
*/

//Twitter Stream
var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: '38M3f7C7pGdVky2l1K0RXRTVC',
  consumer_secret: 'N7OQnghFETxs1XTMULWVTdtGAeSteCBgLbiT8rwCz7y3MJ6koJ',
  access_token_key: '418406145-Gx2TE6rkqrT2FTcUg1wo4AhmLTBONmB1ZY7qe63Y',
  access_token_secret: 'Pj4QVh6u2BFtTg5Ty0jwQNTlK6qNYKwnirE3WXLSaLJcl'
});


var userID;

client.get('users/show', { screen_name: 'WesternWeightRm' },  function (error, data, response) {
  if(!error){
    console.log(data);
    userID = data.id_str;
    console.log(userID);
    console.log("TWEETS:");

    //TODO figure out how to add two parameters (ie follow : userID, track : "CR WM") to reduce wasted bandwidth
    //Twitter API only supoorts OR operation on stream params and AND is needed
    var idParams = {follow : userID};
    client.stream('statuses/filter', idParams,  function(stream) {
      stream.on('data', function(tweet) {
        if(tweet.text.includes("WR") && tweet.text.includes("CM")){
          
		  //Log tweet for testing
          console.log(tweet.text); 
		var fullText=tweet.text;
		
		//Divide to 2 strings
		var WRi = fullText.indexOf("WR");
		var CMi = fullText.indexOf("CM");
		if(WRi<CMi){
			var WRtext = fullText.slice(WRi,CMi);
			var CMtext = fullText.slice(CMi,CMi+5);
		}
		
		//Parse String to numbers
		var WRnum = takeNum(WRtext);
		var CMnum = takeNum(CMtext);
		
		
		console.log("WR: ",WRnum, " CM: ",CMnum);
		/*
		//Save to db
		console.log('saving to db');

    var stat = new Stat({ 
        loc: req.body.loc,
        count: req.body.count,
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
	*/
		  
        }
      });
      stream.on('error', function(error) {
        console.log(error);
      });
    });
  }
});

function takeNum(str) { 
    var num = str.replace(/[^0-9]/g, ''); 
    return num; 
}