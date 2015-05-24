
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

console.log(screen_name);

//choose time*****************************************************************************************************************
var day = days;
var searchDay = 'since:';
// since:2010-12-27
var time = new Date();
searchDay += time.getFullYear();
searchDay += '-';
if(time.getDate()>days){
    console.log(">>>>>");
    console.log(time);
    searchDay +=time.getMonth()+1;
    searchDay += '-';
    searchDay += time.getDate()-days;
}else{
        console.log("<<<<<");
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
places[count]=contact.response.checkin.venue.name;
placeid[count] = contact.response.checkin.venue.id;
lat[count] = contact.response.checkin.venue.location.lat;
lng[count] = contact.response.checkin.venue.location.lng;
ll[count] = lat[count]+','+lng[count];
console.log("LL is "+ll[count]);
// console.log('i2='+i);
 // console.log(places);
// console.log('count='+count);
count++;
}
 //console.log(count);
// console.log('i='+i);



if(count==shortids.length){
// console.log(places);

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
'<h1>User:'+screen_name+'</h1>'+
'<table border="1">'+

'<tr>'+
'<th>Places</th>'+
'</tr>'

for(var j=0;j<places.length;j++){

html+='<tr>'

html+='<td>'+places[j]+'</td>'   

html+='<td><button name="venueonmap" type="submit" value='+ll[j]+'>'+'ShowMap'+'</button></td>'

html+='<td><button name="venuedetail" type="submit" value='+placeid[j]+'>'+'ShowDetail'+'</button></td>'

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


})


}


exports.venue_from_user=venue_from_user;