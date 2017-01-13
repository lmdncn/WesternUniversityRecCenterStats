//USE THIS TO TEST SAMPLE TWEETS FROM TIMELINE

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: '38M3f7C7pGdVky2l1K0RXRTVC',
  consumer_secret: 'N7OQnghFETxs1XTMULWVTdtGAeSteCBgLbiT8rwCz7y3MJ6koJ',
  access_token_key: '418406145-Gx2TE6rkqrT2FTcUg1wo4AhmLTBONmB1ZY7qe63Y',
  access_token_secret: 'Pj4QVh6u2BFtTg5Ty0jwQNTlK6qNYKwnirE3WXLSaLJcl'
});
var tweets;

var params = {screen_name: 'WesternWeightRm'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for(var i = 0; i < tweets.length; i++){
  	//test each case here
    console.log(tweets[i].text);
    console.log(tweets[i].created_at);
    console.log(' ');	
  	}
  }
});