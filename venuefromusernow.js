

var qs =require('querystring')
var request = require('request');


var headers = {
'User-Agent': 'Super Agent/0.0.1',
'Content-Type': 'application/x-www-form-urlencoded'
}
// Configure the request
var options = {
url: 'https://api.foursquare.com/v2/users/search',
method: 'GET',
headers: headers,
qs: {'twitter': 'ShengyanZhao','oauth_token': 'L0WAMM3KYG11JCFRFZL2NHAAPLZ02FVPQYSYCDLYKA0LVGGO',
'v' :'20140806', m: 'swarm'}
}

var userid=null;

request(options,function (error, response, body, getres) {
if (!error && response.statusCode == 200) {
// Print out the response body

//console.log(body);
var jsontext = body;  
var contact = JSON.parse(jsontext);
userid = contact.response.results[0].id;

console.log(contact.response.results[0].id);
// console.log('i2='+i);
// console.log(places);ShengyanZhao
// console.log('count='+count);



var fsconn = {
  clientId: '2DSWUN',
  clientSecret: 'YCSISJ'
}

var foursquare = require('foursquare-streams').createClient(fsconn)

var opts = {
  'near': 'NYC',
  'limit': 50,
}

foursquare.getVenues(opts).pipe(...) // pipe that stream, dog!





}
})

