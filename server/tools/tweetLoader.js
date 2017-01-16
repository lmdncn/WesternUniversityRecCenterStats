// This loads a set a existing tweets to database

// To Import Save Functions
var savejs = require('./save');

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
var params = {
  screen_name: 'WesternWeightRm',
  count: "50"
};

var paramsDropIn = {
    screen_name: "Western_Rec",
    count: "9"
  }
  //TODO: Close this connection after it runs
client.get('statuses/user_timeline', params, function (error, tweets, response) {

  console.log("Loading ", tweets.length, " tweets in database");

  if (!error) {


    for (var i = 0; i < tweets.length; i++) { //For Each Tweet

      if (tweets[i].text.includes("WR") && tweets[i].text.includes("CM")) {
        //Log to users which tweets stored
        console.log("Saving tweet ", i, "/", tweets.length);
        console.log(" ");
        console.log("Tweet Text: ", tweets[i].text);
        console.log("Tweet Date: ", tweets[i].created_at);
        console.log(" ");

        //Store It
        savejs.pullWRCM(tweets[i].text, tweets[i].created_at);
        console.log(" ");
        console.log("---------------------------------------------------");
        console.log(" ");
      }
    }
  }
});

//TODO: Close this connection after it runs
client.get('statuses/user_timeline', paramsDropIn, function (error, tweets, response) {

  console.log("Loading ", tweets.length, " tweets in database");

  if (!error) {


    for (var i = 0; i < tweets.length; i++) { //For Each Tweet

      if (tweets[i].text.toUpperCase().includes("BBALL") || tweets[i].text.toUpperCase().includes("VBALL") || tweets[i].text.toUpperCase().includes("BDMT") || tweets[i].text.toUpperCase().includes("FUTS") || tweets[i].text.toUpperCase().includes("BASKETBALL") || tweets[i].text.toUpperCase().includes("VOLLEYBALL") || tweets[i].text.toUpperCase().includes("BADMINTON") || tweets[i].text.toUpperCase().includes("FUTSAL")) {
        //Log to users which tweets stored
        console.log("Saving tweet ", i, "/", tweets.length);
        console.log(" ");
        console.log("Tweet Text: ", tweets[i].text);
        console.log("Tweet Date: ", tweets[i].created_at);
        console.log(" ");

        //Store It
        savejs.pullRC(tweets[i].text.toUpperCase(), tweets[i].created_at);
        console.log(" ");
        console.log("---------------------------------------------------");
        console.log(" ");
      }
    }
  }
});