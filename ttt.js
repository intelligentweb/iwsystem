var qs =require('querystring')
var request = require('request');

var headers = {
'User-Agent': 'Super Agent/0.0.1',
'Content-Type': 'application/x-www-form-urlencoded'
}
// Configure the request
var options = {
url: 'https://api.foursquare.com/v2/venues/4b058771f964a5205e9322e3',
method: 'GET',
headers: headers,
qs: {'oauth_token': 'L0WAMM3KYG11JCFRFZL2NHAAPLZ02FVPQYSYCDLYKA0LVGGO',
'v' :'20140806', m: 'foursquare'}
}

request(options,function (error, response, body, getres) {
// console.log("adfasdfasdfasdf");
var jsontext = body;  
var contact = JSON.parse(jsontext);

var venue_name = contact.response.venue.name;
var venue_location = contact.response.venue.location.formattedAddress;
var category = contact.response.venue.categories[0].name;
var url = contact.response.venue.canonicalUrl;
var description =contact.response.venue.tips.groups[0].items[0].text;
var photo = contact.response.venue.bestPhoto.prefix+'120x120'+contact.response.venue.bestPhoto.suffix;
console.log(venue_name);
console.log(venue_location);
console.log(category);
console.log(url);
console.log(description);
console.log(photo);


})