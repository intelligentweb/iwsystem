
 function key_from_name(namelist,keynumber,days,resp){

var Twit = require('twit')
var re=require('./mysql.js');

var T = new Twit({
    consumer_key:         'AUWczB88gYTtAPX49FrRBAp8G'
  , consumer_secret:      'smC1FdIpWDclsGhZQiaCecXoNlHcOut0CnYaLTlCVBXt8eoCZw'
  , access_token:         '3145436519-1WrmNdLDOAsqvgRl6t811ESOGHyKdb9JnxpNh1F'
  , access_token_secret:  'PUJoydFfkulfn3TNqjT3HAxhwFUHga5kxe8yh4aS53zfk'

  
})


//var namelist = "AmyTan";
var reg = / /;  
var names = namelist.split(reg);
// console.log(res[0]);   


var personalkey = new Array(); 
for(i=0;i<=names.length;i++) 
{ 
    personalkey[i]=new Array(); 
} 

var numberofkey = new Array(); 
for(i=0;i<=names.length;i++) 
{ 
    numberofkey[i]=new Array(); 
} 

var totalkey = new Array();
var totalnumberofkey = new Array();
var deleteKey = new Array();
var showName = new Array();


var num = 0;
var namecount = 0

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


//start **********************************************************************************************************************



for(var count = 0;count<names.length;count++){



var myquery = '\''+'from:'+names[namecount]+' '+searchDay+'\''; 

console.log(myquery);
T.get('search/tweets', { q: myquery },function(err, data, response) {


 for (var indx in data.statuses) {

var tweet= data.statuses[indx];

if(indx==0){
re.check_and_insert(tweet.user.screen_name,tweet.user.id,tweet.user.location,tweet.user.profile_image_url,tweet.user.description);
}

showName[num] = tweet.user.screen_name;
var reg = / /;
var res = tweet.text.split(reg);   

for (var index=0;index<res.length;index++) {
	res[index] = res[index].toLowerCase();
}

for (var index=0;index<res.length;index++) {


if(res[index]!="yes"&&res[index]!="just"&&res[index]!="at"&&res[index]!="in"&&res[index]!="through"&&res[index]!="about"&&res[index]!="that"&&res[index]!="will"&&res[index]!="should"&&res[index]!="there"&&res[index]!="here"&&res[index]!="a"&&res[index]!="the"&&res[index]!="an"&&res[index]!="rt"&&res[index]!="like"&&res[index]!="and"&&res[index]!="is"&&res[index]!="has"&&res[index]!="this"){

if(personalkey[num].length == 0){

	
	personalkey[num][0] = res[index];
	numberofkey[num][0] = 1;

	

}else{
	for (var inde = 0;inde < personalkey[num].length;inde++){


		if(res[index] == personalkey[num][inde]){

			numberofkey[num][inde] += 1;
		
			break;

		}else {
			if(inde == personalkey[num].length-1){
				personalkey[num][personalkey[num].length] = res[index];
				numberofkey[num][numberofkey[num].length] = 1;
					break;
			}
		}
	}
}


}

}



for (var index=0;index<res.length;index++) {

if(res[index]!="yes"&&res[index]!="just"&&res[index]!="at"&&res[index]!="in"&&res[index]!="through"&&res[index]!="about"&&res[index]!="that"&&res[index]!="will"&&res[index]!="should"&&res[index]!="there"&&res[index]!="here"&&res[index]!="a"&&res[index]!="the"&&res[index]!="an"&&res[index]!="rt"&&res[index]!="like"&&res[index]!="and"&&res[index]!="is"&&res[index]!="has"&&res[index]!="this"){

if(totalkey.length == 0){


	totalkey[0] = res[index];
	totalnumberofkey[0] = 1;

}else{
	for (var inde = 0;inde < totalkey.length;inde++){

		if(res[index] == totalkey[inde]){

			totalnumberofkey[inde] += 1;

			break;

		}else {
			if(inde == totalkey.length-1){
				totalkey[totalkey.length] = res[index];
				totalnumberofkey[totalnumberofkey.length] = 1;
				break;
			}
		}
	}
}

}

}


}

    for(var i=0;i<totalnumberofkey.length;i++){  

        for(var j=i;j<totalnumberofkey.length;j++){  
            if(totalnumberofkey[i]<totalnumberofkey[j]){  

                var temp=totalkey[i];  
                totalkey[i]=totalkey[j];  
                totalkey[j]=temp;  

				var tempp=totalnumberofkey[i];  
                totalnumberofkey[i]=totalnumberofkey[j];  
                totalnumberofkey[j]=tempp;  

            }  
        }  
    }  
  
num+=1;

if(num==names.length)
{

for(var i=0;i<totalkey.length;i++){  

var deleteThis = 0;

	for(var j=0;j<names.length;j++){
		var has = 0;
		for(var p=0;p<personalkey[j].length;p++){

			if(totalkey[i]==personalkey[j][p]){
				has = 1;
			}

		}
		if(has == 1){
			deleteThis = 0;
		}else{
			deleteThis = 1;
		}
		if(deleteThis == 1){
			deleteKey[deleteKey.length] = totalkey[i];
		}

	}
}


for(var i=0;i<deleteKey.length;i++){  

	for(var j=0;j<totalkey.length;j++){  

		if(deleteKey[i]==totalkey[j]){
			totalkey.splice(j,1);
			totalnumberofkey.splice(j,1);
			break;
		}

	}

}

for(var name_number=0;name_number<names.length;name_number++){

	for(var keys=0;keys<personalkey[name_number].length;keys++){

		re.check_and_keywords(names[name_number],personalkey[name_number][keys]);

	}

}



var html =
'<!DOCTYPE html>'+
'<html>'+
'<head lang="en">'+
    '<meta charset="UTF-8">'+
    '<title>form</title>'+
'</head>'+

'<body>'+
'<h1>Result:</h1>'+
'<h1>User:'+names+'</h1>'+
'<table border="1">'+

'<tr>'+
'<th>  </th>'
for(var i=0;i<keynumber;i++){
if(totalkey[i]!=null){
 html+='<th>'+totalkey[i]+'</th>'
}

}
 
'</tr>'

for(var j=0;j<names.length;j++){


html+='<tr>'

html+='<td>'+showName[j]+'</td>'

for(var i = 0;i<keynumber;i++){

	for(var q =0;q<personalkey[j].length;q++){

		if(personalkey[j][q]==totalkey[i]){
			//console.log(numberofkey[j][q]);
			html+='<td>'+numberofkey[j][q]+'</td>'
		}
	}	
}



html+=
'</tr>'

}

html+=
'<tr>'+
'<th>'+"total"+'</th>'
for(var i=0;i<keynumber;i++){
if(totalnumberofkey[i]){
 html+='<th>'+totalnumberofkey[i]+'</th>'
}
}
 
'</tr>'
html+=
'</table>'+

'</body>'+

'</html>'

      resp.writeHead(200,{"Content-Type":"text/html"});
      resp.write(html);
	  resp.end();
}

})

namecount+=1;
}

}


 exports.key_from_name=key_from_name;