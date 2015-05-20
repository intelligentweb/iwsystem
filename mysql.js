
//function addusers (id_twitter,screen_name_twitter,id_foursquare,description,location_live,profile_picture){
var mysql = require('mysql');
var connection = mysql.createConnection(
    {
      host     : 'stusql.dcs.shef.ac.uk',
      port     : '3306',
      user     : 'acp14sz',
      password : '75c417e0',
      database : 'acp14sz'
    }
);
connection.connect();
console.log('Database has connected');



function add_user_inform(id_twitter,screen_name_twitter,id_foursquare,description,location_live,profile_picture){

var insertSQL = 'insert into users values("'+id_twitter+'","'+screen_name_twitter+'","'+id_foursquare+'","'+description+'","'+location_live+'","'+profile_picture+'")';
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

function add_venue_inform(venue_id,venue_name){

var insertSQL = 'insert into venues values("'+venue_id+'","'+venue_name+'")';
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


connection.end();
//}

exports.add_user_inform=add_user_inform;
exports.add_venue_inform=add_venue_inform;
exports.add_user_keywords=add_user_keywords;
exports.add_user_retweet=add_user_retweet;
exports.add_user_tweet=add_user_tweet;
exports.add_user_visit_venue=add_user_visit_venue;
exports.showuserinfor=showuserinfor;
exports.showvenueinfor=showvenueinfor;