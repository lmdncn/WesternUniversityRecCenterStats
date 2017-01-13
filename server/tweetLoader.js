// This loads a set a existing tweets to database



//Database Set Up ---------------------------------------------------------------------------------
var mongoose = require('mongoose');
mongoose.connect('mongodb://main:mainpass@ds163758.mlab.com:63758/reccenterstats'); //connect to the db
var Stat = require('./models/stat')

//Twitter Set Up -------------------------------------------------------------------------------------
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: '38M3f7C7pGdVky2l1K0RXRTVC',
  consumer_secret: 'N7OQnghFETxs1XTMULWVTdtGAeSteCBgLbiT8rwCz7y3MJ6koJ',
  access_token_key: '418406145-Gx2TE6rkqrT2FTcUg1wo4AhmLTBONmB1ZY7qe63Y',
  access_token_secret: 'Pj4QVh6u2BFtTg5Ty0jwQNTlK6qNYKwnirE3WXLSaLJcl'
});
var tweets;

//Get Tweets ------------------------------------------------------------------------------------------
var params = {screen_name: 'WesternWeightRm'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {

  console.log("Loading ",tweets.length," tweets in database");	

  if (!error) {

  	for(var i = 0; i < tweets.length; i++){ //For Each Tweet
  	
    //Log to users which tweets stored
    console.log(tweets[i].text);
    console.log(tweets[i].created_at);
    console.log(" ");

    //Store It
    



    
  	}
  }
});