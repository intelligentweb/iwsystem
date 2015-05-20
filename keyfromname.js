require('querystring')

 function key_from_name(names,keynumber,days,resp){
var Twit = require('twit')
var screenname = names;
var T = new Twit({
    consumer_key:         'AUWczB88gYTtAPX49FrRBAp8G'
  , consumer_secret:      'smC1FdIpWDclsGhZQiaCecXoNlHcOut0CnYaLTlCVBXt8eoCZw'
  , access_token:         '3145436519-1WrmNdLDOAsqvgRl6t811ESOGHyKdb9JnxpNh1F'
  , access_token_secret:  'PUJoydFfkulfn3TNqjT3HAxhwFUHga5kxe8yh4aS53zfk'
})


function getres(resp){
	return resp;
}


T.get('statuses/user_timeline', { screen_name :names }, function(err, data, response,getres) {

var arr = new Array(30);
for (var indexa=0;indexa<arr.length;indexa++) {
	arr[indexa] = " ";
}

var brr = new Array(30);
for (var indexb=0;indexb<brr.length;indexb++) {
	brr[indexb] = 0;
}

  for (var indx in data) {
var tweet= data[indx];
var reg = / /;  
var res = tweet.text.split(reg);   

for (var inde=0;inde<res.length;inde++) {

	for (var index=0;index<arr.length;index++) {

		if(res[inde]!=arr[index]&&res[inde]!="A"&&res[inde]!="a"&&res[inde]!="RT"&&arr[index]==" "){
			arr[index]=res[inde];
		}
		if(res[inde]==arr[index]){
			brr[index]+=1;
			break;
		}
	}
}
}
console.log(arr);




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
'<th>Keywords</th>'+
'<th>Count</th>'+
'</tr>'

for(var j=0;j<arr.length;j++){

html+='<tr>'

html+='<td>'+arr[j]+'</td>'+'<td>'+brr[j]+'</td>'

html+=
'</tr>'

}
html+=
'</table>'+

'</body>'+

'</html>'


  
      resp.writeHead(200,{"Content-Type":"text/html"});
      resp.write(html);
	  resp.end();




})


 }

 exports.key_from_name=key_from_name;

				




