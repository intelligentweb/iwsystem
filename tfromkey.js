

function tweet_from_key(key,Location,res){

console.log(key);

var Twit = require('twit')
var T = new Twit({
    consumer_key:         'AUWczB88gYTtAPX49FrRBAp8G'
  , consumer_secret:      'smC1FdIpWDclsGhZQiaCecXoNlHcOut0CnYaLTlCVBXt8eoCZw'
  , access_token:         '3145436519-1WrmNdLDOAsqvgRl6t811ESOGHyKdb9JnxpNh1F'
  , access_token_secret:  'PUJoydFfkulfn3TNqjT3HAxhwFUHga5kxe8yh4aS53zfk'
})



function getres(res){
	return res;
}

var num = 0;

// console.log('location:'+Location);
// console.log('key:'+key);

if(key==''&& Location=='' ){
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end('Error, can not get value!' + '\n');
}

if(key!=''){

T.get('search/tweets', { q: key,geocode:Location,count: 50 },
function(err, data,response, getres) {


// console.log('enter t.get  callback');
var date = new Array();
var who = new Array();
var content = new Array();
var tweetID = new Array();
var IDstr = new Array();
var peopleretweet = new Array(); 
var retweetCount = new Array();




for (var indx in data.statuses) {
var tweet= data.statuses[indx];
console.log(data.statuses[indx]);
// date[indx]=tweet.created_at;
who[indx]=tweet.user.screen_name;
content[indx]=tweet.text;
tweetID[indx]=tweet.id;
IDstr[indx]=tweet.id_str.toString();
retweetCount[indx]=tweet.retweeted;

var ge = / /;
var dateres = tweet.created_at.split(ge); 

date[indx] = dateres[0]+" "+dateres[1]+" "+dateres[2]+" "+dateres[5];
}
 


var html =
'<!DOCTYPE html>'+
'<html>'+
'<head lang="en">'+
    '<meta charset="UTF-8">'+
    '<title>form</title>'+
'</head>'+

'<body>'+
'<form action="http://localhost:3000/index.html" method="POST">'+
'<h1>Result:</h1>'+
'<h1>Keywords:'+key+'</h1>'+
'<table border="1">'+

'<tr>'+
'<th>Date</th>'+
'<th>Who</th>'+
'<th>Content</th>'+
'<th>Have Retweet?</th>'+
'<th>Retweet</th>'+
'</tr>'

for(var j=0;j<who.length;j++){

html+='<tr>'

html+='<td>'+date[j]+'</td>'+'<td>'+who[j]+'</td>'+'<td>'+content[j]+'</td>'+'<td>'+retweetCount[j]+'</td>'
html+='<td><button name="redetail" type="submit" value='+IDstr[j]+'>'+'Click'+'</button></td>'
// +'<input  name = "redetail" type="submit" value='+ IDstr[j] +'>'+
html+=
'</tr>'

}
html+=
'</table>'+
'</form>'+
'</body>'+

'</html>'


  
      res.writeHead(200,{"Content-Type":"text/html"});
      res.write(html);
      res.end();


})  
 
}

}

exports.tweet_from_key=tweet_from_key;
