
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
var insertSQL = 'insert into User values("'+screen_name+'","'+twit_id+'","'+location+'","'+profile+'","'+description+'","'+visit_venue+'","'+retwit_user+'")';

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

function add_user_inform(screen_name,twit_id,location,profile,description,visit_venue,retwit_user){

var insertSQL = 'insert into User values("'+screen_name+'","'+twit_id+'","'+location+'","'+profile+'","'+description+'","'+visit_venue+'","'+retwit_user+'")';
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