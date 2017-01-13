//Database Set Up
var mongoose = require('mongoose');
mongoose.connect('mongodb://main:mainpass@ds163758.mlab.com:63758/reccenterstats'); //connect to the db
var Stat = require('../models/stat');


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
		  
		  //TODO: save to db
		  
        }
      });
      stream.on('error', function(error) {
        console.log(error);
      });
    });
  }
});