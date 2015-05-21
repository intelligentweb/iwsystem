

var qs =require('querystring')
var request = require('request');


var headers = {
'User-Agent': 'Super Agent/0.0.1',
'Content-Type': 'application/x-www-form-urlencoded'
}
// Configure the request
var options = {
url: 'https://api.foursquare.com/v2/checkins/resolve',
method: 'GET',
headers: headers,
qs: {'shortId': 'egxkO7tpTS3','oauth_token': 'TNE31IIHKAZWDBH2Z5GWRRA4QJH0U25EOQTTS0UOCVE1LZ30',
'v' :'20140806', m: 'swarm'}
}



request(options,function (error, response, body, getres) {
if (!error && response.statusCode == 200) {
// Print out the response body

//console.log(body);
var jsontext = body;  
var contact = JSON.parse(jsontext);

console.log(contact.response.checkin.venue.name);
// console.log('i2='+i);
// console.log(places);
// console.log('count='+count);

}



})
