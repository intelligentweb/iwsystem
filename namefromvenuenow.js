
 function user_from_venue_now (venuename,res){

var Twit = require('twit')

var T = new Twit({
    consumer_key:         'AUWczB88gYTtAPX49FrRBAp8G'
  , consumer_secret:      'smC1FdIpWDclsGhZQiaCecXoNlHcOut0CnYaLTlCVBXt8eoCZw'
  , access_token:         '3145436519-1WrmNdLDOAsqvgRl6t811ESOGHyKdb9JnxpNh1F'
  , access_token_secret:  'PUJoydFfkulfn3TNqjT3HAxhwFUHga5kxe8yh4aS53zfk'

  
})

var position = new Array(4); 
var namelist = new Array;
var query_place = '\''+ venuename  +'\'';

T.get('geo/search', { query: query_place },function(err, data, response) {

//console.log(data.result.places[0].bounding_box.coordinates[0][0][0]);
    position[0]=data.result.places[0].bounding_box.coordinates[0][0][0];
    position[1]=data.result.places[0].bounding_box.coordinates[0][0][1];
    position[2]=data.result.places[0].bounding_box.coordinates[0][2][0];
    position[3]=data.result.places[0].bounding_box.coordinates[0][2][1];

    console.log(position);

// var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ];
	//var sheffiled_us = [ '-88.473228', '30.144425', '-84.888247','35.008029'];

 // var sheffiled_uk=['-2.56475248726412','53.3015341502953','0.149787002205902', '54.5621550270294'];


var stream = T.stream('statuses/filter', { locations: position,stall_warnings: true })
var i=0;
stream.on('tweet', function (tweet) {
	
 console.log(tweet.user.name);
 console.log(i);
  
  namelist[i]=tweet.user.name;

  i++;
  if(i== 3)
  {
  	stream.stop();


var html =
'<!DOCTYPE html>'+
'<html>'+
'<head lang="en">'+
    '<meta charset="UTF-8">'+
    '<title>form</title>'+
'</head>'+

'<body>'+
'<h1>Result:</h1>'+
'<h1>Keywords:'+venuename+'</h1>'+
'<table border="1">'+

'<tr>'+
'<th>Namelist</th>'+
'</tr>'

for(var j=0;j<namelist.length;j++){

html+='<tr>'

html+='<td>'+namelist[j]+'</td>'

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

);






 }   //final )

exports.user_from_venue_now=user_from_venue_now;