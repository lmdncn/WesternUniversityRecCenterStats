//This server runs and live imports tweet into the db

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
var WRuserID; //WesternWeightRm
client.get('users/show', {
  screen_name: 'WesternWeightRm'
}, function (error, data, response) {
  if (!error) {
    console.log(data);
    WRuserID = data.id_str;
    console.log(WRuserID);
    console.log("TWEETS:");

    //TODO: figure out how to add two parameters (ie follow : userID, track : "CR WM") to reduce wasted bandwidth
    //Twitter API only supoorts OR operation on stream params and AND is needed
    var idParams = {
      follow: WRuserID
    };
    client.stream('statuses/filter', idParams, function (stream) {
      stream.on('data', function (tweet) {
        //TODO: account for "weight room" and "cardio machines"
        if (tweet.text.toUpperCase().includes("WR") && tweet.text.toUpperCase().includes("CM")) {

          //Log tweet for testing
          console.log(tweet.text);
          console.log(tweet.created_at);

          TweetDate = new Date(tweet.created_at);
          //Pulls nums and saves them
          savejs.pullWRCM(tweet.text.toUpperCase(), TweetDate);

        }
      });
      stream.on('error', function (error) {
        console.log(error);
      });
    });
  }
});

// Drop In Account Stream ---------------------------------------------------------------------
var RCuserID; //WesternRecCenter
client.get('users/show', {
  screen_name: 'Western_Rec'
}, function (error, data, response) {
  if (!error) {
    console.log(data);
    RCuserID = data.id_str;
    console.log(RCuserID);
    console.log("TWEETS:");

    //TODO: figure out how to add two parameters (ie follow : userID, track : "CR WM") to reduce wasted bandwidth
    //Twitter API only supoorts OR operation on stream params and AND is needed
    var idParams = {
      follow: RCuserID
    };
    client.stream('statuses/filter', idParams, function (stream) {
      stream.on('data', function (tweet) {
        if (tweet.text.toUpperCase().includes("BBALL") || tweet.text.toUpperCase().includes("VBALL") || tweet.text.toUpperCase().includes("BDMT") || tweet.text.toUpperCase().includes("FUTS") || tweet.text.toUpperCase().includes("BASKETBALL") || tweet.text.toUpperCase().includes("VOLLEYBALL") || tweet.text.toUpperCase().includes("BADMINTON") || tweet.text.toUpperCase().includes("FUTSAL")) {

          //Log tweet for testing
          console.log(tweet.text);
          console.log(tweet.created_at);

          TweetDate = new Date(tweet.created_at);
          //Pulls nums and saves them
          savejs.pullRC(tweet.text.toUpperCase(), TweetDate);

        }
      });
      stream.on('error', function (error) {
        console.log(error);
      });
    });
  }
});