// var personalkey = new Array(); 
// var totalkey = new Array();
// var deleteKey = new Array();
// personalkey[0] = new Array();
// personalkey[1] = new Array();

// personalkey[0] = ['one','two','three','four','five','nine','ten','eleven'];
// personalkey[1] = ['four','five','six','seven','eight','nine','ten'];
// totalkey = ['one','two','three','four','five','six','seven','eight','nine','ten','eleven'];


// for(var i=0;i<totalkey.length;i++){  

// var deleteThis = 0;

// 	for(var j=0;j<2;j++){
// 		var has = 0;
// 		for(var p=0;p<personalkey[j].length;p++){

// 			if(totalkey[i]==personalkey[j][p]){
// 				has = 1;
// 			}

// 		}
// 		if(has == 1){
// 			deleteThis = 0;
// 		}else{
// 			deleteThis = 1;
// 		}
// 		if(deleteThis == 1){
// 			deleteKey[deleteKey.length] = totalkey[i];
// 		}

// 	}
// }
// console.log(deleteKey);


// for(var i=0;i<deleteKey.length;i++){  

// 	for(var j=0;j<totalkey.length;j++){  

// 		if(deleteKey[i]==totalkey[j]){
// 			totalkey.splice(j,1);
// 			break;
// 		}

// 	}

// }


// console.log(totalkey);

// var Upper = new Array();
// Upper = ["ONE","TWO","THREE"];

// console.log(Upper);


// for(var i=0;i<Upper.length;i++){
// 	var a = Upper[i].toLowerCase();
// 	Upper[i].toString().toLowerCase();
// 	console.log(a);
// }

var Twit = require('twit')

var T = new Twit({
    consumer_key:         'AUWczB88gYTtAPX49FrRBAp8G'
  , consumer_secret:      'smC1FdIpWDclsGhZQiaCecXoNlHcOut0CnYaLTlCVBXt8eoCZw'
  , access_token:         '3145436519-1WrmNdLDOAsqvgRl6t811ESOGHyKdb9JnxpNh1F'
  , access_token_secret:  'PUJoydFfkulfn3TNqjT3HAxhwFUHga5kxe8yh4aS53zfk'


})
				//-2.56475248726412,  53.3015341502953



T.get('search/tweets', { q:'' ,geocode:'-2.473228,53.144425,100mi'},function(err, data, response) {


// console.log("now number is : "+num );
// console.log(myquery);

console.log(data.statuses.length);

for (i=0 ;i<data.statuses.length;i++){
console.log(data.statuses[i].user.name);
}

//  for (var indx in data.statuses) {

// var tweet= data.statuses[indx];
// console.log(tweet);
// }

})