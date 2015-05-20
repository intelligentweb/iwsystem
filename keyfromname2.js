
 function key_from_name(namelist,keynumber,days,resp){

var Twit = require('twit')

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
//var myquery = '\''+' '+searchDay+'\''; 

// console.log(names[namecount]);
// console.log(myquery);
// T.get('statuses/user_timeline', { screen_name :names[namecount] }, function(err, data, response) {
T.get('search/tweets', { q: myquery },function(err, data, response) {



// console.log("now number is : "+num );
// console.log(myquery);

 for (var indx in data.statuses) {

var tweet= data.statuses[indx];
var reg = / /;
var res = tweet.text.split(reg);   
console.log(res);
console.log("************************************");

for (var index=0;index<res.length;index++) {
	console.log(res[index]);

if(res[index]!="yes"&&res[index]!="a"&&res[index]!="the"&&res[index]!="an"&&res[index]!="RT"&&res[index]!="like"&&res[index]!="and"&&res[index]!="is"&&res[index]!="has"&&res[index]!="this"){
console.log("enter");
if(personalkey[num].length == 0){

	// console.log("now is using: "+num);
	personalkey[num][0] = res[index];
	numberofkey[num][0] = 1;

	// console.log(res[0]+"put into[0][0],number : "+numberofkey[0][0]);

}else{
	for (var inde = 0;inde < personalkey[num].length;inde++){

		// console.log("personal[0].length: "+ personalkey[0].length);

		if(res[index] == personalkey[num][inde]){

			numberofkey[num][inde] += 1;
			// console.log(personalkey[0][inde]+"plus one,now is : "+numberofkey[0][inde]);
			break;

		}else {
			if(inde == personalkey[num].length-1){
				personalkey[num][personalkey[num].length] = res[index];
				numberofkey[num][numberofkey[num].length] = 1;
				// console.log(res[index]+"is into ????"+personalkey[0][personalkey[0].length]+"number is: "+numberofkey[0][personalkey[0].length]);
				break;
			}
		}
	}
}


}

}



for (var index=0;index<res.length;index++) {

if(res[index]!="yes"&&res[index]!="a"&&res[index]!="the"&&res[index]!="an"&&res[index]!="RT"&&res[index]!="like"&&res[index]!="and"&&res[index]!="is"&&res[index]!="has"&&res[index]!="this"){

if(totalkey.length == 0){

	// console.log("now is using: "+num);
	totalkey[0] = res[index];
	totalnumberofkey[0] = 1;

	// console.log(res[0]+"put into[0][0],number : "+numberofkey[0][0]);

}else{
	for (var inde = 0;inde < totalkey.length;inde++){

		// console.log("personal[0].length: "+ personalkey[0].length);

		if(res[index] == totalkey[inde]){

			totalnumberofkey[inde] += 1;
			// console.log(personalkey[0][inde]+"plus one,now is : "+numberofkey[0][inde]);
			break;

		}else {
			if(inde == totalkey.length-1){
				totalkey[totalkey.length] = res[index];
				totalnumberofkey[totalnumberofkey.length] = 1;
				// console.log(res[index]+"is into ????"+personalkey[0][personalkey[0].length]+"number is: "+numberofkey[0][personalkey[0].length]);
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
// }

num+=1;

if(num==names.length)
{

// console.log("total key");
 console.log(totalkey);
 console.log(totalnumberofkey);

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
			break;
		}

	}

}

console.log(personalkey[0]);    
console.log(personalkey[1]); 
console.log(totalkey);          


// console.log("total key");
// console.log(totalkey);
// console.log(totalnumberofkey);

// for(var i=0;i<names.length;i++){  
// console.log("name:"+names[i]);
// console.log(personalkey[i]);
// console.log(numberofkey[i]);
// }


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
 html+='<th>'+totalkey[i]+'</th>'
}
 
'</tr>'

for(var j=0;j<names.length;j++){


html+='<tr>'

html+='<td>'+names[j]+'</td>'

for(var i = 0;i<keynumber;i++){

	for(var q =0;q<personalkey[j].length;q++){

		if(personalkey[j][q]==totalkey[i]){
			//console.log(numberofkey[j][q]);
			html+='<td>'+numberofkey[j][q]+'</td>'
		}
	}	
}



// for(var q=0;q<keynumber;q++){
// 	html+='<td>'+numberofkey[q]+'</td>'

//  }

//html+='<td>'+totalnumberofkey[j]+'</td>'

//html+='<td>'+arr[j]+'</td>'+'<td>'+brr[j]+'</td>'

html+=
'</tr>'

}

html+=
'<tr>'+
'<th>'+"total"+'</th>'
for(var i=0;i<keynumber;i++){
 html+='<th>'+totalnumberofkey[i]+'</th>'
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