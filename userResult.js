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

qs: {'ll': ll.toString(), 'intent':'checkin','oauth_token': 'L0WAMM3KYG11JCFRFZL2NHAAPLZ02FVPQYSYCDLYKA0LVGGO',
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

for(var j=0;j<placepos.length;j++){
   
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

for(var j=0;j<placepos.length;j++){
html+='var marker'+j+' = new google.maps.Marker({'+
  'position: myLatlng'+j+','+
  'map: map,'+
  'title:"Here!!" });'

}
html+=
 // 'var mapOptions = {'+
 // 'zoom: 18,'+
 // 'center: myLatlng };'+
 // 'var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);'+

 
 'var infowindow = new google.maps.InfoWindow({'+
 'content: '+'\''+'Yes'+'\''+','+
 'maxWidth:200 });'+



'infowindow.open(map,marker);'+
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


exports.show_retweet=show_retweet;
exports.show_result=show_result;
exports.showonmap=showonmap;