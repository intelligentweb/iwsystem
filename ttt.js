var Twit = require('twit')

var T = new Twit({
    consumer_key:         'AUWczB88gYTtAPX49FrRBAp8G'
  , consumer_secret:      'smC1FdIpWDclsGhZQiaCecXoNlHcOut0CnYaLTlCVBXt8eoCZw'
  , access_token:         '3145436519-1WrmNdLDOAsqvgRl6t811ESOGHyKdb9JnxpNh1F'
  , access_token_secret:  'PUJoydFfkulfn3TNqjT3HAxhwFUHga5kxe8yh4aS53zfk'
})


var IDstr = new Array(10);
for (var indexa=0;indexa<10;indexa++) {
  IDstr[indexa] = null;
}

var aa = '601038645508837376';

T.get('statuses/retweets/:id', { id :aa   },function(err, data, response) {

//'\''+IDstr[i]+ '\''
console.log(data.length);

for(var i =0; i< data.length;i++){


console.log(data[0].user.name);

}

});