
 function user_from_venue_now (venuename,res){

var Twit = require('twit')
var re=require('./mysql.js');

var T = new Twit({
    consumer_key:         'AUWczB88gYTtAPX49FrRBAp8G'
  , consumer_secret:      'smC1FdIpWDclsGhZQiaCecXoNlHcOut0CnYaLTlCVBXt8eoCZw'
  , access_token:         '3145436519-1WrmNdLDOAsqvgRl6t811ESOGHyKdb9JnxpNh1F'
  , access_token_secret:  'PUJoydFfkulfn3TNqjT3HAxhwFUHga5kxe8yh4aS53zfk'

  
})

var position = new Array(4); 
var namelist = new Array;
var query_place = '\''+ venuename  +'\'';
var useratthere = new Array();
var userNames = new Array();
var userLocations = new Array();
var userDescription = new Array();
var userImage = new Array();
var inserted = new Array();
var uinserted = new Array();
var vinserted = new Array();



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
	
 // console.log(i);
var has = 0;
var has1 =0;
useratthere[i]=tweet.user.screen_name;
userNames[i]=tweet.user.name;
userLocations[i]=tweet.user.location;
userDescription[i]=tweet.user.description;
userImage[i]= tweet.user.profile_image_url;

for (var num in inserted) {
if(inserted[num]==tweet.user.screen_name){
  has = 1;
}
}
if(has == 0){
re.check_and_insert(tweet.user.screen_name,tweet.user.id,tweet.user.location,tweet.user.profile_image_url,tweet.user.description);
inserted.push(tweet.user.screen_name);

}
 // console.log("aaaaaa");

for (var number in uinserted) {
    
if(uinserted[number]==tweet.user.screen_name&&vinserted[number]==venuename){
  has1 = 1;
}

}
if(has1 == 0){
      console.log("insert user-----venue");
re.insert_user_venue(tweet.user.screen_name,venuename);
uinserted.push(tweet.user.screen_name);
vinserted.push(venuename);

}







  i++;
  if(i== 4)
  {
  	stream.stop();


var html = 
'<!DOCTYPE html>'+
'<html>'+
'<head lang="en">'+
    '<meta charset="UTF-8">'+
    '<title>form</title>'+
'</head>'+
'<form action="http://localhost:3000/index.html" method="POST">'+

'<body>'+
'<h1>Result:</h1>'+
'<h1>Location:'+venuename+'</h1>'+
'<table border="1">'+

'<tr>'+
'<th>'+
'<td>Screen Name</td>'+
'<td>Name</td>'+
'<td>Location</td>'+
'<td>Description</td>'+
'<td>More Information</td>'+
'</th>'+
'</tr>'

for(var j=0;j<useratthere.length;j++){

html+='<tr>'

html+='<td>'+'<img src="'+userImage[j]+'" >'+'</td>'

html+='<td>'+useratthere[j]+'</td>'

html+='<td>'+userNames[j]+'</td>'

html+='<td>'+userLocations[j]+'</td>'

html+='<td>'+userDescription[j]+'</td>'

html+='<td>'+'<input  name = "detail" type="submit" value='+ useratthere[j] +'>'+'</td>'

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






}
})
	






}

);






 }   //final )

exports.user_from_venue_now=user_from_venue_now;