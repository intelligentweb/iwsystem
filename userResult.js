var re=require('./mysql.js');

function show_result(screen_name,res){
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

var tweets = new Array();
 

T.get('statuses/user_timeline', { screen_name : screen_name,count:100 },function(err, data, response) {



for(var i =0;i<data.length;i++)
{
//console.log(data[i].text);
tweets[i] = data[i].text;
}




var html =
'<!DOCTYPE html>'+
'<html>'+
'<head lang="en">'+
    '<meta charset="UTF-8">'+
    '<title>form</title>'+
'</head>'+
'<form action="http://localhost:3000/index.html" method="POST">'+

'<body>'+
'<h1>Result:'+screen_name+'</h1>'+
'<table border="1">'+

'<tr>'+
'<th>'+
'Tweets'+
'</th>'+
'</tr>'

for(var j=0;j<tweets.length;j++){

html+='<tr>'

html+='<td>'+tweets[j]+'</td>'


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


function show_retweet(id,res){
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

var tweets = new Array();
var images = new Array();
var inserted = new Array();

T.get('statuses/retweets/:id', { id : id },function(err, data, response) {


for(var k =0; k<data.length;k++){
  var has = 0;



for (var num in inserted) {
    console.log("insert");
if(inserted[num]==data[k].user.name){
  has = 1;
}
}
if(has == 0){

re.check_and_retweeter(data[k].retweeted_status.user.screen_name,data[k].user.name,data[k].user.profile_image_url);
inserted.push(data[k].user.name);
}



      // console.log(data[k].retweeted_status.user.screen_name);
      tweets[k] = data[k].user.name;
      images[k] = data[k].user.profile_image_url;
      // console.log("peopleretweet:"+"  "+"k="+k+"  "+tweets[k]);
}
 




var html =
'<!DOCTYPE html>'+
'<html>'+
'<head lang="en">'+
    '<meta charset="UTF-8">'+
    '<title>form</title>'+
'</head>'+
'<form action="http://localhost:3000/index.html" method="POST">'+

'<body>'+
'<h1>Result:'+'Retweeter'+'</h1>'+
'<table border="1">'+

'<tr>'+
'<th>'+
'Names'+
'</th>'+
'</tr>'

for(var j=0;j<tweets.length;j++){

html+='<tr>'

html+='<td>'+tweets[j]+'</td>'

html+='<td>'+'<img src="'+images[j]+'" >'+'</td>'

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


exports.show_retweet=show_retweet;
exports.show_result=show_result;
