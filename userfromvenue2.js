

function user_from_venue(venuename,days,res){
var Twit = require('twit')
var re=require('./mysql.js');

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
var userID = new Array();
var inserted = new Array();

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

var place = "Dubai"
var myquery = '\''+"swarmapp.com/c/ "+venuename+' '+searchDay+'\''; 
console.log(myquery);

T.get('search/tweets', { q:myquery },function(err, data, response) {

//console.log(data);

for (var indx in data.statuses) {
var tweet= data.statuses[indx];
var has = 0;
// var reg = / /;
// var res = tweet.text.split(reg);   
//console.log(tweet.user.screen_name);
userID[indx] = tweet.user.id;
console.log(userID);
useratthere[indx]=tweet.user.screen_name;
userNames[indx]=tweet.user.name;
userLocations[indx]=tweet.user.location;
userDescription[indx]=tweet.user.description;
userImage[indx]= tweet.user.profile_image_url;


for (var num in inserted) {
    console.log("insert");
if(inserted[num]==tweet.user.screen_name){
  has = 1;
}
}
if(has == 0){

re.check_and_insert(tweet.user.screen_name,tweet.user.id,tweet.user.location,tweet.user.profile_image_url,tweet.user.description);
inserted.push(tweet.user.screen_name);

}

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



}

//re.add_user_inform("snam","tid","beijing","http://jjj","hssjjsjsa dasdasd mkmkda","shef","clt");
console.log("I am thererererer");



var html = 
'<!DOCTYPE html>'+
'<html>'+
'<head lang="en">'+
    '<meta charset="UTF-8">'+
    '<title>form</title>'+
'</head>'+
'<body>'+
'<form action="http://localhost:3000/index.html" method="POST">'+
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

html+='<td><button name="detail" type="submit" value='+useratthere[j]+'>'+'Click'+'</button></td>'
// html+='<td>'+'<input  name = "detail" type="submit" value='+ useratthere[j] +'>'+'</td>'

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