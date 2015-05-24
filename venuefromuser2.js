
var qs =require('querystring')
var request = require('request');
var re=require('./mysql.js');

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

// console.log(screen_name);

//choose time*****************************************************************************************************************
var day = days;
var searchDay = 'since:';
// since:2010-12-27
var time = new Date();
searchDay += time.getFullYear();
searchDay += '-';
if(time.getDate()>days){
    // console.log(">>>>>");
    console.log(time);
    searchDay +=time.getMonth()+1;
    searchDay += '-';
    searchDay += time.getDate()-days;
}else{
        // console.log("<<<<<");
        if(time.getMonth()!=1){
            searchDay +=time.getMonth();
            searchDay += '-';
            var lastMonth = time.getMonth();

            if(lastMonth == 1||lastMonth == 3||lastMonth == 5||lastMonth == 7||lastMonth == 8||lastMonth == 10||lastMonth == 12){
                searchDay += (time.getDate()+31-days);
            }
            if(lastMonth == 2 ){
                searchDay += (time.getDate()+28-days);
            }
            if(lastMonth == 4||lastMonth == 6||lastMonth == 9||lastMonth == 11){
                searchDay += (time.getDate()+30-days);
            }

        }else{
            searchDay = time.getFullYear()-1+"-"+12+time.getDate()+31-days;
        }    
}
//****************************************************************************************************************************

// var screen_name='Bryankorourke';

var quary='swarmapp/c/ from:';
var myquery = quary+screen_name+' '+searchDay
console.log(myquery);
//T.get('search/tweets', { q:'swarmapp/c/ from:stevewoz' ,count: 5 }, function(err, data, response,getres) {
T.get('search/tweets', { q:myquery ,count: 50 }, function(err, data, response,getres) {
  
var shortids = new Array();
var places = new Array();
var placeid = new Array();
var lat = new Array();
var lng = new Array();
var ll = new Array();
var photos = new Array();
var category = new Array();
var address = new Array();
var URL = new Array();
var description = new Array();

for (var indx in data.statuses) {

var tweet= data.statuses[indx];

if(indx==0){
  re.check_and_insert(tweet.user.screen_name,tweet.user.id,tweet.user.location,tweet.user.profile_image_url,tweet.user.description);
}

// re.check_and_insert(tweet.user.screen_name,tweet.user.id,tweet.user.location,tweet.user.profile_image_url,tweet.user.description,'','');


var reg = 'https://www.swarmapp.com/c/'; 
var s1 = JSON.stringify(data.statuses[indx].entities.urls); 
 var s2 = s1.split(reg);
 var s3 =s2[1].split(/"/);
  shortids[indx]=s3[0];
 // console.log(shortids[indx]);
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
qs: {'shortId': shortids[i],'oauth_token': 'L0WAMM3KYG11JCFRFZL2NHAAPLZ02FVPQYSYCDLYKA0LVGGO',
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
places.push(contact.response.checkin.venue.name);
placeid.push(contact.response.checkin.venue.id);
lat.push(contact.response.checkin.venue.location.lat);
lng.push(contact.response.checkin.venue.location.lng);
ll.push(contact.response.checkin.venue.location.lat+','+contact.response.checkin.venue.location.lng);
// console.log("LL is "+ll[count]);
// console.log('i2='+i);
 // console.log(places);
// console.log('count='+count);



var options2 = {
url: 'https://api.foursquare.com/v2/venues/'+contact.response.checkin.venue.id,
method: 'GET',
headers: headers,
qs: {'oauth_token': 'L0WAMM3KYG11JCFRFZL2NHAAPLZ02FVPQYSYCDLYKA0LVGGO',
'v' :'20140806', m: 'foursquare'}
}

request(options2,function (error, response, body, getres) {
// console.log("adfasdfasdfasdf");
var jsontext1 = body;  

var contact1 = JSON.parse(jsontext);
console.log(contact1.response.checkin.venue.name);
console.log(contact1.response.checkin.venue.name);

var contact1 = JSON.parse(jsontext1);




for(var index=0;index<places.length;index++){
  if(contact1.response.venue.name==places[index]){

    if(contact1.response.venue.bestPhoto!=null)photos[index]=contact1.response.venue.bestPhoto.prefix+'120x120'+contact1.response.venue.bestPhoto.suffix;
      category[index]=contact1.response.venue.categories[0].name;
      address[index]=contact1.response.venue.location.formattedAddress;
      URL[index]=contact1.response.venue.canonicalUrl;
    if(contact1.response.venue.tips!=null)description[index]=contact1.response.venue.tips.groups[0].items[0].text;

  }
}








count++;







if(count==shortids.length){
// console.log(places);

var html =
'<!DOCTYPE html>'+
'<html>'+
'<head lang="en">'+
    '<meta charset="UTF-8">'+
    '<title>form</title>'+
'</head>'+
'<meta name="viewport" content="initial-scale=1.0, user-scalable=no"/>'+
'<style type="text/css">'+
'html { height: 100% }'+
'body { height: 100%; margin: 0; padding: 0 }'+
'#map-canvas { height: 100% }'+
'</style>'+

'<body>'+
'<form acton ="http://localhost:8200/" method="POST" >'+
'<h1>Result:</h1>'+
'<h1>User:'+screen_name+'</h1>'+
'<table border="1">'+

'<tr>'+
'<th>Places</th>'+'<th>photo</th>'+'<th>category</th>'+'<th>URL</th>'+'<th>address</th>'+'<th>description</th>'+
'</tr>'

for(var j=0;j<places.length;j++){

html+='<tr>'

html+='<td>'+places[j]+'</td>'   
html+='<td>'+'<img src="'+photos[j]+'" >'+'</td>'   
html+='<td>'+category[j]+'</td>'   
html+='<td><a href="'+URL[j]+'">'+URL[j]+'</a></td>' 
html+='<td>'+address[j]+'</td>'   
html+='<td>'+description[j]+'</td>'   

html+='<td><button name="venueonmap" type="submit" value='+ll[j]+'>'+'Surroundings'+'</button></td>'

'</tr>'

}
html+=
'</table>'+

//**************************

'<tr>'+
 '<title>On Google Map</title>'+

 '<script type="text/javascript"'+
 'src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB_BbMxx-ILdm9CFhwVs6_qDr3qr9_qpMQ&sensor=false">'+
 '</script>'+

 '<script type="text/javascript">'+

  'function initialize() {'

//html+='var myLatlng = new google.maps.LatLng('+ll +');'

for(var j=0;j<ll.length;j++){
   
html+= 'var myLatlng'+j+' = new google.maps.LatLng('+ll[j] +');'

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

for(var j=0;j<ll.length;j++){
html+='var marker'+j+' = new google.maps.Marker({'+
  'position: myLatlng'+j+','+
  'map: map,'+
  'title:"Here!!" });'

}
html+=

 'var infowindow = new google.maps.InfoWindow({'+
 'content: '+'\''+'venue on may'+'\''+','+
 'maxWidth:200 });'+



'infowindow.open(map,marker);'+
 'google.maps.event.addListener(marker,'+ '\''+'click'+'\''+', function() {'+
 'infowindow.open(map, marker); });'+
 '}'+
 'google.maps.event.addDomListener(window,'+'\'' +'load'+'\''+', initialize);'+
 '</script>'+


'</tr>'+

//**************************


'</form>'+
'</body>'+

'</html>'


  
      res.writeHead(200,{"Content-Type":"text/html"});
      res.write(html);
      res.end();


}


})






}
 //console.log(count);
// console.log('i='+i);




})


} 


})


}


exports.venue_from_user=venue_from_user;