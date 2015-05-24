

var qs =require('querystring')
var request = require('request');

function venue_from_venue(lll,res){


var placesnearby =  new Array();
var placescate = new Array();
var placecheckincount = new Array();
var currentcount = new Array();
var currentsummary = new Array();

var headers = {
'User-Agent': 'Super Agent/0.0.1',
'Content-Type': 'application/x-www-form-urlencoded'
}
// Configure the request
var query = JSON.stringify(lll);

console.log(lll);
var options = {
//url: 'https://api.foursquare.com/v2/checkins/resolve',
url: 'https://api.foursquare.com/v2/venues/search',
method: 'GET',
headers: headers,

qs: {'near': lll.toString(),'oauth_token': 'L0WAMM3KYG11JCFRFZL2NHAAPLZ02FVPQYSYCDLYKA0LVGGO',
'v' :'20140806', m: 'swarm'}
}



request(options,function (error, response, body, getres) {
if (!error && response.statusCode == 200) {
// Print out the response body

//console.log(body);
var jsontext = body;  
var contact = JSON.parse(jsontext);
console.log("There are  "+contact.response.venues.length+"  places nearby");

 for(var i =0; i<contact.response.venues.length; i++){

 	if(contact.response.venues[i].categories[0]){

	console.log(contact.response.venues[i]);

  placesnearby[i] =   contact.response.venues[i].name;
  placescate[i] =   contact.response.venues[i].categories[0].name;
  placecheckincount[i] =   contact.response.venues[i].stats.checkinsCount;
  currentcount[i] =   contact.response.venues[i].hereNow.count;
  currentsummary[i] =   contact.response.venues[i].hereNow.summary;
}


	else{

		  placesnearby[i] =   contact.response.venues[i].name;
  			placescate[i] = "No categories";
  			placecheckincount[i] =   contact.response.venues[i].stats.checkinsCount;
  currentcount[i] =   contact.response.venues[i].hereNow.count;
  currentsummary[i] =   contact.response.venues[i].hereNow.summary;
	} 
	
 }


   console.log(placesnearby);


var html =
'<!DOCTYPE html>'+
'<html>'+
'<head lang="en">'+
    '<meta charset="UTF-8">'+
    '<title>form</title>'+
'</head>'+

'<body>'+
'<h1>Result:</h1>'+
'<h1>Place nearby :'+query+'</h1>'+
'<table border="1">'+

'<tr>'+
'<td>Places Name</td>'+'<td>category</td>'+'<td>Total Checkin Number</td>'+'<td>Current Checkin Number</td>'+'<td>Summary</td>'+
'</tr>'

for(var j=0;j<placesnearby.length;j++){

html+='<tr>'

html+='<td>'+placesnearby[j]+'</td>'+'<td>'+placescate[j]+'</td>'+'<td>'+placecheckincount[j]+'</td>'+'<td>'+currentcount[j]+'</td>'+'<td>'+currentsummary[j]+'</td>'

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
});


 } 
 exports.venue_from_venue=venue_from_venue;