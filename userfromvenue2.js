

function user_from_venue(venuename,days,res){
var Twit = require('twit')

var T = new Twit({
    consumer_key:         'AUWczB88gYTtAPX49FrRBAp8G'
  , consumer_secret:      'smC1FdIpWDclsGhZQiaCecXoNlHcOut0CnYaLTlCVBXt8eoCZw'
  , access_token:         '3145436519-1WrmNdLDOAsqvgRl6t811ESOGHyKdb9JnxpNh1F'
  , access_token_secret:  'PUJoydFfkulfn3TNqjT3HAxhwFUHga5kxe8yh4aS53zfk'
})




var useratthere = new Array();
var userNames = new Array();
var userLocations = new Array();
var userDescription = new Array();
var userImage = new Array();

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
            switch (lastMonth){
            case 1,3,5,7,8,10,11: searchDay += time.getDate()+31-days;
            break;
            case 2: searchDay += time.getDate()+28-days;
            break;
            case 4,6,9,12: searchDay += time.getDate()+30-days;
            break;
            }
        }else{
            searchDay = time.getFullYear()-1+"-"+12+time.getDate()+31-days;
        }    
}
//****************************************************************************************************************************

var place = "Dubai"
var myquery = '\''+"swarmapp.com/c/ "+venuename+' '+searchDay+'\''; 
console.log(myquery);

T.get('search/tweets', { q:myquery },function(err, data, response) {

//console.log(data);

for (var indx in data.statuses) {
var tweet= data.statuses[indx];
// var reg = / /;
// var res = tweet.text.split(reg);   
//console.log(tweet.user.screen_name);

useratthere[indx]=tweet.user.screen_name;
userNames[indx]=tweet.user.name;
userLocations[indx]=tweet.user.location;
userDescription[indx]=tweet.user.description;
userImage[indx]= tweet.user.profile_image_url;
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



})
}

 exports.user_from_venue=user_from_venue;