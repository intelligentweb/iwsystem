

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

console.log('location:'+Location);
console.log('key:'+key);

if(key==''&& Location=='' ){
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end('Error, can not get value!' + '\n');
}

if(key!=''){

T.get('search/tweets', { q: key,geocode:Location,count: 10 },
function(err, data,response, getres) {


console.log('enter t.get  callback');
 var date = new Array();
// for (var indexa=0;indexa<date.length;indexa++) {
// 	date[indexa] = " ";
// }

var who = new Array();
// for (var indexa=0;indexa<who.length;indexa++) {
// 	who[indexa] = " ";
// }

var content = new Array();
// for (var indexa=0;indexa<content.length;indexa++) {
// 	content[indexa] = " ";
// }

var tweetID = new Array();
// for (var indexa=0;indexa<content.length;indexa++) {
// 	tweetID[indexa] = " ";
// }

var IDstr = new Array();
// for (var indexa=0;indexa<content.length;indexa++) {
//   IDstr[indexa] = " ";
// }

var peopleretweet = new Array(); 

// for(i=0;i<=tweetID.length;i++) 
// { 
//     peopleretweet[i]=new Array(); 
// } 




for (var indx in data.statuses) {
var tweet= data.statuses[indx];

date[indx]=tweet.created_at;
who[indx]=tweet.user.screen_name;
content[indx]=tweet.text;
tweetID[indx]=tweet.id;
IDstr[indx]=tweet.id_str.toString();
}

//res.end();
//string_decoder.StringDecoder(encoding);

 



///////////////////////////////////////////////////////////////retweet
for(var i =0;i<tweetID.length;i++){

var query = '\''+IDstr[i]+ '\'';
T.get('statuses/retweets/:id', { id : IDstr[i] },function(err, data, response) {

    peopleretweet[i]=" ";

for(var k =0; k<data.length;k++){

      peopleretweet[i] = peopleretweet[i]+data[k].user.name+'|  ';

      console.log("peopleretweet:"+i+"  "+"k="+k+"  "+peopleretweet[i]);
}
 

      // console.log(peopleretweet);


              
    

num+=1;



if(num==tweetID.length)
{
var html =
'<!DOCTYPE html>'+
'<html>'+
'<head lang="en">'+
    '<meta charset="UTF-8">'+
    '<title>form</title>'+
'</head>'+

'<body>'+
'<h1>Result:</h1>'+
'<h1>Keywords:'+key+'</h1>'+
'<table border="1">'+

'<tr>'+
'<th>Date</th>'+
'<th>Who</th>'+
'<th>Content</th>'+
'<th>Retweet</th>'+
'</tr>'

for(var j=0;j<who.length;j++){

html+='<tr>'

html+='<td>'+date[j]+'</td>'+'<td>'+who[j]+'</td>'+'<td>'+content[j]+'</td>'
html+='<td>'+'<input  name = "redetail" type="submit" value='+ 'Test' +'>'+'</td>'

html+=
'</tr>'

}
html+=
'</table>'+

'</body>'+

'</html>'


  
      res.writeHead(200,{"Content-Type":"text/html"});
      res.write(html);
      res.end();

}
})
}

///////////////////////////////////////////////////////////////////////////////////





//return date;
})  // 
 

 }

}

exports.tweet_from_key=tweet_from_key;
