
var qs =require('querystring')
var request = require('request');

function venue_from_user(screen_name,days,res){

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

var quary='swarmapp/c/ from:';

//T.get('search/tweets', { q:'swarmapp/c/ from:stevewoz' ,count: 5 }, function(err, data, response,getres) {
T.get('search/tweets', { q:quary+screen_name ,count: 5 }, function(err, data, response,getres) {
  
var shortids = new Array(10);
for (var indexa=0;indexa<shortids.length;indexa++) {
  shortids[indexa] = " "; 
}

var places = new Array(10);
for (var indexa=0;indexa<places.length;indexa++) {
  places[indexa] = " "; 
}

for (var indx in data.statuses) {
var reg = 'https://www.swarmapp.com/c/'; 
var s1 = JSON.stringify(data.statuses[indx].entities.urls); 
 var s2 = s1.split(reg);
 var s3 =s2[1].split(/"/);
  shortids[indx]=s3[0];
  //console.log(shortids[indx]);
}




// FFFFFFFFFFFFFFFFFFFFOOOOOOOOOOOOOOOOOOOOOOOOOOO
for(var i=0;i<shortids.length;i++){

var headers = {
'User-Agent': 'Super Agent/0.0.1',
'Content-Type': 'application/x-www-form-urlencoded'
}
// Configure the request
var options = {
url: 'https://api.foursquare.com/v2/checkins/resolve',
method: 'GET',
headers: headers,
qs: {'shortId': shortids[i],'oauth_token': 'TNE31IIHKAZWDBH2Z5GWRRA4QJH0U25EOQTTS0UOCVE1LZ30',
'v' :'20140806', m: 'swarm'}
}
// Start the request
//console.log(index);




var count =0;
request(options,function (error, response, body, getres) {
if (!error && response.statusCode == 200) {
// Print out the response body

//console.log(body);
var jsontext = body;  
var contact = JSON.parse(jsontext);
places[count]=contact.response.checkin.venue.name;
// console.log(contact.response.checkin.venue.name);
// console.log('i2='+i);
// console.log(places);
// console.log('count='+count);
count++;
}
console.log(count);
console.log('i='+i);
if(count==5){
// console.log(places);

var html =
'<!DOCTYPE html>'+
'<html>'+
'<head lang="en">'+
    '<meta charset="UTF-8">'+
    '<title>form</title>'+
'</head>'+

'<body>'+
'<h1>Result:</h1>'+
'<h1>User:'+screen_name+'</h1>'+
'<table border="1">'+

'<tr>'+
'<th>Places</th>'+
'</tr>'

for(var j=0;j<shortids.length;j++){

html+='<tr>'

html+='<td>'+places[j]+'</td>'

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


})


}


exports.venue_from_user=venue_from_user;