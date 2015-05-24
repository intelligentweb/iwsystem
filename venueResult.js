var qs =require('querystring')
var request = require('request');
var re=require('./mysql.js');

function show_result(venue_id,res){

function getres(res){
	return res;
}
console.log("venue_id is "+venue_id);
// var vid = '\''+venue_id+'\'';
var headers = {
'User-Agent': 'Super Agent/0.0.1',
'Content-Type': 'application/x-www-form-urlencoded'
}
// Configure the request
var options = {
url: 'https://api.foursquare.com/v2/venues/'+venue_id,
method: 'GET',
headers: headers,
qs: {'oauth_token': 'L0WAMM3KYG11JCFRFZL2NHAAPLZ02FVPQYSYCDLYKA0LVGGO',
'v' :'20140806', m: 'foursquare'}
}

request(options,function (error, response, body, getres) {
// console.log("adfasdfasdfasdf");
var jsontext = body;  
var contact = JSON.parse(jsontext);

var venue_name = contact.response.venue.name;
var venue_location = contact.response.venue.location.formattedAddress;
var category = contact.response.venue.categories[0].name;
var url = contact.response.venue.canonicalUrl;
var description =contact.response.venue.tips.groups[0].items[0].text;

var photo = contact.response.venue.bestPhoto.prefix+'120x120'+contact.response.venue.bestPhoto.suffix;
// console.log("venue name:"+venue_name);
// console.log(venue_location);



var html =
'<!DOCTYPE html>'+
'<html>'+
'<head lang="en">'+
    '<meta charset="UTF-8">'+
    '<title>form</title>'+
'</head>'+

'<body>'+
'<form acton ="http://localhost:8200/" method="POST" >'+
'<h1>Result:</h1>'+
'<h1>Venue:'+venue_name+'</h1>'+
'<table border="1">'+

'<tr>'+
'<th>venue location</th>'+
'<th>category</th>'+
'<th>description</th>'+
'<th>photo Count</th>'+
'<th>url</th>'+
'</tr>'



html+='<tr>'

html+='<td>'+venue_location+'</td>'+'<td>'+category+'</td>'+'<td>'+description+'</td>'+'<td>'+'<img src='+photo+' />'+'</td>'+'<td>'+url+'</td>'

html+=
'</tr>'


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





function showonmap(ll,res){

var request = require('request');

// res.redirect('/result');
console.log("showmap ll is "+ll);

var placesnearby =  new Array();
var placepos = new Array();

var headers = {
'User-Agent': 'Super Agent/0.0.1',
'Content-Type': 'application/x-www-form-urlencoded'
}
// Configure the request
var query = JSON.stringify(ll);


var options = {
//url: 'https://api.foursquare.com/v2/checkins/resolve',
url: 'https://api.foursquare.com/v2/venues/search',
method: 'GET',
headers: headers,

qs: {'ll': ll.toString(), 'radius':'500','oauth_token': 'L0WAMM3KYG11JCFRFZL2NHAAPLZ02FVPQYSYCDLYKA0LVGGO',
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

  console.log(contact.response.venues[i]);
  placesnearby[i] =   contact.response.venues[i].name;
  var la = contact.response.venues[i].location.lat;
  var lon = contact.response.venues[i].location.lng;
  placepos[i] = la +','+lon;
  console.log("@@@@"+ placepos[i]);
}
}




var html =
'<!DOCTYPE html>'+
'<html>'+
'<head>'+
'<meta name="viewport" content="initial-scale=1.0, user-scalable=no"/>'+
'<style type="text/css">'+
'html { height: 100% }'+
'body { height: 100%; margin: 0; padding: 0 }'+
'#map-canvas { height: 100% }'+
'</style>'+
 '<title>Where I work</title>'+
 '<script type="text/javascript"'+
 'src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_BbMxx-ILdm9CFhwVs6_qDr3qr9_qpMQ&sensor=false">'+
 '</script>'+

 '<script type="text/javascript">'+

  'function initialize() {'

html+='var myLatlng = new google.maps.LatLng('+ll +');'

for(var j=0;j<10;j++){
   
html+= 'var myLatlng'+j+' = new google.maps.LatLng('+placepos[j] +');'

// html+='var marker'+j+' = new google.maps.Marker({'+
//   'position: myLatlng'+j+','+
//   'map: map,'+
//   'title:"Here!!" });'

}

html += 'var mapOptions = {'+
 'zoom: 18,'+
 'center: myLatlng };'+
 'var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);'


html+=  'var marker = new google.maps.Marker({'+
  'position: myLatlng,'+
  'map: map,'+
  'title:"Here!!" });'

for(var j=0;j<10;j++){
html+='var marker'+j+' = new google.maps.Marker({'+
  'position: myLatlng'+j+','+
  'map: map,'+
  'title:"Here!!" });'

}

 // 'var mapOptions = {'+
 // 'zoom: 18,'+
 // 'center: myLatlng };'+
 // 'var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);'+

 
 // 'var infowindow = new google.maps.InfoWindow({'+
 // 'content: '+'\''+''+'\''+','+
 // 'maxWidth:200 });'

for(var j=0;j<10;j++){
html+='var infowindow'+j+' = new google.maps.InfoWindow({'+
 'content: '+'\''+placesnearby[j]+'\''+','+
 'maxWidth:200 });'
}




// 'infowindow.open(map,marker);'


for(var j=0;j<10;j++){
html+='infowindow'+j+'.open(map,marker'+j+');'
}
html+=





 'google.maps.event.addListener(marker,'+ '\''+'click'+'\''+', function() {'+
 'infowindow.open(map, marker); });'+
 '}'+
 'google.maps.event.addDomListener(window,'+'\'' +'load'+'\''+', initialize);'+
 '</script>'






html+=
'</head>'+
'<body>'+
'<h1>Where I work</h1>'+
'<div id="map-canvas" style="background-color:#FFD700;width:50%;height:300pt;align:center;"/>'+
'<div><p>I work at the Department of Computer Science</p></div>'+
'</body>'
      
     console.log(html);
      res.writeHead(200,{"Content-Type":"text/html"});
      res.write(html);
      res.end();



})  // callback


}
exports.showonmap=showonmap;
exports.show_result=show_result;