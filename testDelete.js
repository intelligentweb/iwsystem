// // var personalkey = new Array(); 
// // var totalkey = new Array();
// // var deleteKey = new Array();
// // personalkey[0] = new Array();
// // personalkey[1] = new Array();

// // personalkey[0] = ['one','two','three','four','five','nine','ten','eleven'];
// // personalkey[1] = ['four','five','six','seven','eight','nine','ten'];
// // totalkey = ['one','two','three','four','five','six','seven','eight','nine','ten','eleven'];


// // for(var i=0;i<totalkey.length;i++){  

// // var deleteThis = 0;

// // 	for(var j=0;j<2;j++){
// // 		var has = 0;
// // 		for(var p=0;p<personalkey[j].length;p++){

// // 			if(totalkey[i]==personalkey[j][p]){
// // 				has = 1;
// // 			}

// // 		}
// // 		if(has == 1){
// // 			deleteThis = 0;
// // 		}else{
// // 			deleteThis = 1;
// // 		}
// // 		if(deleteThis == 1){
// // 			deleteKey[deleteKey.length] = totalkey[i];
// // 		}

// // 	}
// // }
// // console.log(deleteKey);


// // for(var i=0;i<deleteKey.length;i++){  

// // 	for(var j=0;j<totalkey.length;j++){  

// // 		if(deleteKey[i]==totalkey[j]){
// // 			totalkey.splice(j,1);
// // 			break;
// // 		}

// // 	}

// // }


// // console.log(totalkey);

// // var Upper = new Array();
// // Upper = ["ONE","TWO","THREE"];

// // console.log(Upper);


// // for(var i=0;i<Upper.length;i++){
// // 	var a = Upper[i].toLowerCase();
// // 	Upper[i].toString().toLowerCase();
// // 	console.log(a);
// // }

// var Twit = require('twit')

// var T = new Twit({
//     consumer_key:         'AUWczB88gYTtAPX49FrRBAp8G'
//   , consumer_secret:      'smC1FdIpWDclsGhZQiaCecXoNlHcOut0CnYaLTlCVBXt8eoCZw'
//   , access_token:         '3145436519-1WrmNdLDOAsqvgRl6t811ESOGHyKdb9JnxpNh1F'
//   , access_token_secret:  'PUJoydFfkulfn3TNqjT3HAxhwFUHga5kxe8yh4aS53zfk'

  
// })
// // 				//-2.56475248726412,  53.3015341502953

// // var venuename = 'Sheffield';
// // var position = new Array(4); 
// // var namelist = new Array;
// // var query_place = '\''+ venuename  +'\'';

// // T.get('geo/search', { query: query_place },function(err, data, response) {
// // 	var myLocation = '\'';
// // 	var myQuery 
// // //console.log(data.result.places[0].bounding_box.coordinates[0][0][0]);
// //     position[0]=data.result.places[0].bounding_box.coordinates[0][0][0];
// //     position[1]=data.result.places[0].bounding_box.coordinates[0][0][1];
// //     position[2]=data.result.places[0].bounding_box.coordinates[0][2][0];
// //     position[3]=data.result.places[0].bounding_box.coordinates[0][2][1];


// // 	myLocation +=  position[0];
// // 	myLocation += ',';
// // 	myLocation +=  position[1];
// // 	myLocation += ',100mi';
// // 	myLocation += '\'';

// // console.log(myLocation);



// T.get('statuses/user_timeline', { screen_name :'kwangger' , count:100},function(err, data, response) {


// for(var i =0;i<data.length;i++)
// {
// console.log(data[i].text);
// }
// // for (i=0 ;i<data.statuses.length;i++){
// // console.log(data.statuses[i].user.name);
// // }

// //  for (var indx in data.statuses) {

// // var tweet= data.statuses[indx];
// // console.log(tweet);
// // }

// })




// // })

// var mysql = require('mysql');
// var connection = mysql.createConnection(
//     {
//       host     : 'stusql.dcs.shef.ac.uk',
//       port     : '3306',
//       user     : 'acr14lc',
//       password : '528128f4',
//       database : 'acr14lc'
//     }
// );

// connection.connect();
// console.log('Database has connected');

// var username='aaaaaa';

// var has = 0;
// var selectSQL = 'select screen_name from User';
// var insertSQL = 'insert into User values("'+'screen_name'+'","'+'twit_id'+'","'+'location'+'","'+'profile'+'","'+'description'+'","'+'visit_venue'+'","'+'retwit_user'+'")';

// // connection.query(selectSQL, function (err2, rows) {
	

// //     if (err2) console.log(err2);
// //     console.log("SELECT ==> ");
// //     for (var i in rows) {
// //         console.log(rows[i].screen_name);

// // 	if(rows[i].screen_name == username){
// // 		has = 1;
// // 	}
// //     }

// // console.log(has);
// // if(has==0){
// // 	console.log("insert");
// // 	var query = connection.query(insertSQL);
// // }


// // });

// var showSQL = 'select * from User';
// var query = connection.query(showSQL);
// console.log(query);


var fs= require('fs');
var path = require('path');
var tempAccount = 'this is my account';


fs.writeFile(path.join(__dirname, 'account.js'), tempAccount, function (err) {
        if (err) throw err;
        console.log("Export Account Success!");
    });



<?xml version="1.0"?>

<rdf:RDF
xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" 
xmlns:venue="http://www.recshop.fake/venue#">

<rdf:Description
 rdf:about="http://www.recshop.fake/venue/Sheffield">
  <venue:photo>http://www.photo.com</venue:photo>
  <venue:name>Sheffield</venue:name>
  <venue:category>city</venue:category>
  <venue:address>S3 7lg</venue:address>
  <venue:URL>url</venue:URL>
  <venue:description>THIS IS SHEFFIELD</venue:description>
</rdf:Description>

</rdf:RDF>