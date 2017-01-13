// To Import Save Functions
var savejs = require('./tools/save');

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
var WRuserID;//WesternWeightRm
client.get('users/show', { screen_name: 'lmdncn' },  function (error, data, response) {
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
			savejs.pullWRCM(tweet.text,TweetDate);
		  
        }
      });
      stream.on('error', function(error) {
        console.log(error);
      });
    });
  }
});

//TODO: DropIn Account Stream

