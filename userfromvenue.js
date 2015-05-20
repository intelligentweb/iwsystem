var qs =require('querystring')
var request = require('request');



 function user_from_venue(venueid,days,res){

var headers = {
'User-Agent': 'Super Agent/0.0.1',
'Content-Type': 'application/x-www-form-urlencoded'
}
// Configure the request


function getres(res){
  return res;
}
var query = 'https://api.foursquare.com/v2/venues/'+venueid;
var options = {
//url: 'https://api.foursquare.com/v2/venues/430d0a00f964a5203e271fe3',
url: query,
method: 'GET',
headers: headers,
qs: {'oauth_token': 'TNE31IIHKAZWDBH2Z5GWRRA4QJH0U25EOQTTS0UOCVE1LZ30',
'v' :'20140806', m: 'swarm'}
}




request(options,function (error, response, body, getres) {
if (!error && response.statusCode == 200) {

var users = new Array(10);
for (var indexa=0;indexa<users.length;indexa++) {
	users[indexa] = " ";
}

var jsontext = body;  
var contact = JSON.parse(jsontext);
var result = contact.response.venue.hereNow;

var s1 = JSON.stringify(result); 
console.log(s1);

var html =
'<!DOCTYPE html>'+
'<html>'+
'<head lang="en">'+
    '<meta charset="UTF-8">'+
    '<title>form</title>'+
'</head>'+

'<body>'+
'<h1>Result:</h1>'+
'<h1>Venueid:'+venueid+'</h1>'

html+=

s1

html+=


'</body>'+

'</html>'


  
      res.writeHead(200,{"Content-Type":"text/html"});
      res.write(html);
      res.end();


}



})


 }

 exports.user_from_venue=user_from_venue;