var TwitterPackage = require('twitter');

// importing my secret.json file
// var secret = require("./secret");

//This is what it searches tweet stream for
searchReq = "#blessed"

var secret = {
  consumer_key: '38M3f7C7pGdVky2l1K0RXRTVC',
  consumer_secret: 'N7OQnghFETxs1XTMULWVTdtGAeSteCBgLbiT8rwCz7y3MJ6koJ',
  access_token_key: '418406145-Gx2TE6rkqrT2FTcUg1wo4AhmLTBONmB1ZY7qe63Y',
  access_token_secret: 'Pj4QVh6u2BFtTg5Ty0jwQNTlK6qNYKwnirE3WXLSaLJcl'
}

//make a new Twitter object
var Twitter = new TwitterPackage(secret);

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: searchReq}, function(stream) {

  // ... when we get tweet data...
  stream.on('data', function(tweet) {


	
    // print out the text of the tweet that came in
	console.log(tweet.text);

    //build our reply object
    //var statusObj = {status: "Hi @" + tweet.user.screen_name + ", How are you?"}

	/*
    //call the post function to tweet something
    Twitter.post('statuses/update', statusObj,  function(error, tweetReply, response){

      //if we get an error print it out
      if(error){
        console.log(error);
      }

      //print the text of the tweet we sent out
      console.log(tweetReply.text);
    });
	*/
  });
  
  
     
});

 console.log("Listening to tweets, filter by:", searchReq );