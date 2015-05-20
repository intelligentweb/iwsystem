var express = require('express');

//module.exports = router;


function tt(key){
var Twit = require('twit')
var T = new Twit({
    consumer_key:         'AUWczB88gYTtAPX49FrRBAp8G'
  , consumer_secret:      'smC1FdIpWDclsGhZQiaCecXoNlHcOut0CnYaLTlCVBXt8eoCZw'
  , access_token:         '3145436519-1WrmNdLDOAsqvgRl6t811ESOGHyKdb9JnxpNh1F'
  , access_token_secret:  'PUJoydFfkulfn3TNqjT3HAxhwFUHga5kxe8yh4aS53zfk'
})

//
//  tweet 'hello world!'
//
var date = new Array(10);
for (var indexa=0;indexa<arr.length;indexa++) {
	arr[indexa] = " ";
}
var who = new Array(10);
for (var indexa=0;indexa<arr.length;indexa++) {
	arr[indexa] = " ";
}

var content = new Array(10);
for (var indexa=0;indexa<arr.length;indexa++) {
	arr[indexa] = " ";
}
//
//  search twitter for all tweets containing the word 'banana' since Nov. 11, 2011
//
T.get('search/tweets', { q: key,geocode:'37.78157,-122.398720,1mi',count: 10 },
function(err, data, response) {
for (var indx in data.statuses) {
var tweet= data.statuses[indx];

date[indx]=tweet.created_at;
who[indx]=tweet.user.screen_name;
content[indx]=tweet.text;

//console.log('Date:' + tweet.created_at + ' : @'+ tweet.user.screen_name + ' : '+ tweet.text+'\n\n');
}
})
// var total = new Array(3);
// total[0]=date;
// total[1]=who;
// total[2]=content;
// return toral;
for(var i=0;i<dtae.length;i++){
	console.log(date[i]);
}

}

exports.tt=tt;