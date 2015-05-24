
//function addusers (id_twitter,screen_name_twitter,id_foursquare,description,location_live,profile_picture){
var mysql = require('mysql');
var connection = mysql.createConnection(
    {
      host     : 'stusql.dcs.shef.ac.uk',
      port     : '3306',
      user     : 'acr14lc',
      password : '528128f4',
      database : 'acr14lc'
    }
);
connection.connect();
console.log('Database has connected');

function check_and_insert(screen_name,twit_id,location,profile,description,visit_venue,retwit_user){
var has = 0;
var selectSQL = 'select screen_name from User';
var insertSQL = 'insert into User values("'+screen_name+'","'+twit_id+'","'+location+'","'+profile+'","'+description+'")';

connection.query(selectSQL, function (err2, rows) {
	

    if (err2) console.log(err2);
    // console.log("SELECT ==> ");
    for (var i in rows) {
        // console.log(rows[i].screen_name);

	if(rows[i].screen_name == screen_name){
		has = 1;
		// console.log("repeat");
	}
    }


if(has==0){
	var query = connection.query(insertSQL);
}

});

}

function insert_user_venue(screen_name,venue_name){
var has = 0;
var selectSQL = 'select * from User_Venue';
var insertSQL = 'insert into User_Venue values("'+screen_name+'","'+venue_name+'")';

connection.query(selectSQL, function (err2, rows) {
  

    if (err2) console.log(err2);
    // console.log("SELECT ==> ");
    for (var i in rows) {
        // console.log(rows[i].screen_name);

  if(rows[i].screen_name == screen_name&&rows[i].venue_name == venue_name){
    has = 1;
    // console.log("repeat");
  }
    }


if(has==0){
  var query = connection.query(insertSQL);
}

});

}



function check_and_retweeter(screen_name,retweeter_name,retweeter_picture){
var has = 0;
var selectSQL = 'select * from User_Retweet';
var insertSQL = 'insert into User_Retweet values("'+screen_name+'","'+retweeter_name+'","'+retweeter_picture+'")';

connection.query(selectSQL, function (err2, rows) {
  

    if (err2) console.log(err2);
    // console.log("SELECT ==> ");
    for (var i in rows) {
        // console.log(rows[i].screen_name);

  if(rows[i].screen_name == screen_name&&rows[i].retweeter == retweeter_name){
    console.log("repeated");
    has = 1;
    // console.log("repeat");
  }
    }


if(has==0){
  var query = connection.query(insertSQL);
}

});

}


function check_and_keywords(screen_name,keyword){
var has = 0;
var selectSQL = 'select * from User_Keyword';
var insertSQL = 'insert into User_Keyword values("'+screen_name+'","'+keyword+'")';

connection.query(selectSQL, function (err2, rows) {
  

    if (err2) console.log(err2);
    // console.log("SELECT ==> ");
    for (var i in rows) {
        // console.log(rows[i].screen_name);
        // console.log(rows[i]);
  if(rows[i].screen_name == screen_name&&rows[i].keyword == keyword){
    console.log("repeated");
    has = 1;
    // console.log("repeat");
  }
    }


if(has==0){
  var query = connection.query(insertSQL);
}

});

}


function add_user_inform(screen_name,twit_id,location,profile,description){

var insertSQL = 'insert into User values("'+screen_name+'","'+twit_id+'","'+location+'","'+profile+'","'+description+'")';
var query = connection.query(insertSQL);


// query.on('error', function(err) {
//     throw err;
// });

// query.on('fields', function(fields) {
//     //console.log(fields);
// });

// query.on('result', function(row) {
//    // console.log(row);
// });
 }

function add_venue_inform(venue_name,screen_name){

var insertSQL = 'insert into Venue values("'+venue_name+'","'+screen_name+'")';
var query = connection.query(insertSQL);


}

function add_user_keywords(screen_name_twitter,keywords){
 var insertSQL = 'insert into user_keywords values("'+screen_name_twitter+'","'+keywords+'")';
var query = connection.query(insertSQL);
}
 

 function add_user_retweet(screen_name_twitter,my_retweet,retweet_me){
var insertSQL = 'insert into user_retweet values("'+screen_name_twitter+'","'+my_retweet+'","'+retweet_me+'")';
var query = connection.query(insertSQL);

 }

 function add_user_tweet(screen_name_twitter,userid,tweet_text){
 var insertSQL = 'insert into user_tweet values("'+screen_name_twitter+'","'+userid+'","'+tweet_text+'")';
var query = connection.query(insertSQL);
}

function add_user_visit_venue(){
// var insertSQL = 'insert into user_visit_venue values("'+id_twitter+'","'+screen_name_twitter+'","'+id_foursquare+'","'+description+'","'+location_live+'","'+profile_picture+'")';
// var query = connection.query(insertSQL);
}
 

function showuserinfor(screen_name){
var showSQL = 'select * from users';
var query = connection.query(showSQL);
}

function showvenueinfor(venue_name){

var showSQL = 'select * from venues';
var query = connection.query(showSQL);

}


function show_user(screen_name,res){
var has = 0;
var selectSQL = 'select * from User';
var selectSQL2 = 'select * from User_Venue';
var selectSQL3 = 'select * from User_Retweet';

var ids = new Array();
var locations = new Array();
var profiles = new Array();
var descriptions = new Array();
var retweeters = new Array();
var retweeter_pic = new Array();
var visit_places = new Array();

connection.query(selectSQL, function (err2, rows) {
  
    if (err2) console.log(err2);

    for (var i in rows) {

      if(rows[i].screen_name == screen_name){        
        ids.push(rows[i].twit_id);
        locations.push(rows[i].locaton);
        profiles.push(rows[i].profile);
        descriptions.push(rows[i].description);  
      }
    }

connection.query(selectSQL2, function (err2, rows) {
  
    if (err2) console.log(err2);

    for (var i in rows) {

if(rows[i].screen_name == screen_name){        

visit_places.push(rows[i].venue_name);
}
  }


connection.query(selectSQL3, function (err2, rows) {
  
    if (err2) console.log(err2);

    for (var i in rows) {

if(rows[i].screen_name == screen_name){        

retweeters.push(rows[i].retweeter);
retweeter_pic.push(rows[i].retweeter_picture);
}
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
'<h1>Result:'+screen_name+'</h1>'+
'<table border="1">'+

'<tr>'+
'<th>'+
'Tweets'+'<td>'+'Twit id'+'</td>'+'<td>'+'location'+'</td>'+'<td>'+'picture'+'</td>'+'<td>'+'descriptions'+'</td>'+
'</th>'+
'</tr>'

for(var j=0;j<ids.length;j++){

html+='<tr>'
html+='<td>'+screen_name+'</td>'
html+='<td>'+ids[j]+'</td>'
html+='<td>'+locations[j]+'</td>'
html+='<td>'+'<img src="'+profiles[j]+'" >'+'</td>'
html+='<td>'+descriptions[j]+'</td>'

html+=
'</tr>'

}


html+=
'</table>'+

'<table border="1">'+
'<h1>locations they have visited</h1>'

for(var j=0;j<visit_places.length;j++){
html+='<td>'+visit_places[j]+'</td>'
}

html+=
'</table>'+

'<table border="1">'+
'<h1>people who have retweeted their messages</h1>'
for(var j=0;j<retweeters.length;j++){
  html+='<tr>'
html+='<td>'+retweeters[j]+'</td>'
html+='<td>'+'<img src="'+retweeter_pic[j]+'" >'+'</td>'

html+='</tr>'
}

html+=
'</table>'+

'</form>'+
'</body>'+

'</html>'


  
  res.writeHead(200,{"Content-Type":"text/html"});
  res.write(html);
  res.end();

    });
  });
});



}


function show_venue(venue_name,res){
var has = 0;
var selectSQL = 'select * from Venue';

var pictures = new Array();
var category = new Array();
var address = new Array();
var URL = new Array();
var description = new Array();


connection.query(selectSQL, function (err2, rows) {
  
    if (err2) console.log(err2);

    for (var i in rows) {

      if(rows[i].venue_name == venue_name){        
        pictures.push(rows[i].picture);
        category.push(rows[i].category);
        address.push(rows[i].address);
        URL.push(rows[i].rul);
        description.push(rows[i].description);
      }
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
'<h1>Result:'+venue_name+'</h1>'+
'<table border="1">'+

'<tr>'+
'<th>'+
'Name'+'<td>'+'address'+'</td>'+'<td>'+'category'+'</td>'+'<td>'+'picture'+'</td>'+'<td>'+'description'+'</td>'+'<td>'+'URL'+'</td>'+
'</th>'+
'</tr>'

for(var j=0;j<address.length;j++){

html+='<tr>'
html+='<td>'+venue_name+'</td>'
html+='<td>'+address[j]+'</td>'
html+='<td>'+category[j]+'</td>'
html+='<td>'+'<img src="'+pictures[j]+'" >'+'</td>'
html+='<td>'+description[j]+'</td>'
html+='<td>'+URL[j]+'</td>'

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

});


}

// connection.end();
//}

exports.add_user_inform=add_user_inform;
exports.add_venue_inform=add_venue_inform;
exports.add_user_keywords=add_user_keywords;
exports.add_user_retweet=add_user_retweet;
exports.add_user_tweet=add_user_tweet;
exports.add_user_visit_venue=add_user_visit_venue;
exports.showuserinfor=showuserinfor;
exports.showvenueinfor=showvenueinfor;
exports.check_and_insert=check_and_insert;
exports.check_and_retweeter=check_and_retweeter;
exports.check_and_keywords=check_and_keywords;
exports.show_user=show_user;
exports.show_venue=show_venue;
exports.insert_user_venue=insert_user_venue;