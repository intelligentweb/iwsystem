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

T.get('statuses/retweets/:id', { id : id },function(err, data, response) {


for(var k =0; k<data.length;k++){
      console.log(data[k]);
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


function showonmap(res){

// res.redirect('/result');
console.log("enter  showmpa");

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

  'function initialize() {'+
  'var myLatlng = new google.maps.LatLng(53.38108855193859, -1.4801287651062012);'+
  'var myLatlng1 = new google.maps.LatLng(53.28108855193859, -1.4801287651062012);'+
 'var mapOptions = {'+
 'zoom: 18,'+
 'center: myLatlng }'+
 'var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);'+

 'var marker = new google.maps.Marker({'+
 'position: myLatlng,'+
 'map: map,'+
 'title:"Here!!" });'+

 'var infowindow = new google.maps.InfoWindow({'+
 'content: '+'Yes'+','+
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

}










exports.show_retweet=show_retweet;
exports.show_result=show_result;
exports.showonmap=showonmap;