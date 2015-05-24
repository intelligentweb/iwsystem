var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var util=require('util');
var fs= require('fs');
var index = require('./routes/index');
var result = require('./routes/result');
var googlemap = require('./routes/showmap');
var tfromkey= require('./tfromkey');
var showresult = require('./userResult');
var showvenueresult = require('./venueResult');
var venuefromuser = require('./venuefromuser2');
var userfromvenue= require('./userfromvenue2');
var keyfromname = require('./keyfromname2');
var userfromvenuennow = require('./userfromvenuenow');
var venuefromvenue = require('./venuefromvenue');
var tfromkey = require('./tfromkey')
var re=require('./mysql.js');

var app = express();
var http = require('http');
var url = require('url');
var querystring = require('querystring');
// var database = require('./mysql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/googlemaptest', googlemap);
app.use('/result', result);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(8200,function(){
    console.log("Server Start!");
});





var server = http.createServer(function (request, response) {
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
            if (body.length > 1e6) {
                response.writeHead(413,
                    {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });
        request.on('end', function () {

            var POST = querystring.parse(body);
            if(POST.first){ tfromkey.tweet_from_key(POST.keywords,POST.LatitudeandLongitude,response);}
            if(POST.second){keyfromname.key_from_name(POST.Screen_name,POST.select2a,POST.select2b,response);}
            if(POST.third){venuefromuser.venue_from_user(POST.User,POST.select3,response);}
            if(POST.fourth&&POST.select4==0){userfromvenuennow.user_from_venue_now(POST.venueid,response); }
            if(POST.fourth&&POST.select4!=0){userfromvenue.user_from_venue(POST.venueid,POST.select4,response); }
            if(POST.fifth){venuefromvenue.venue_from_venue(POST.venue,response);}

            if(POST.sixth){
            if(POST.sqlscreen_name!=''&&POST.sqlvenue_name!=''){}
            if(POST.sqlscreen_name!=''&&POST.sqlvenue_name==''){re.show_user(POST.sqlscreen_name,response);}
            if(POST.sqlscreen_name==''&&POST.sqlvenue_name!=''){re.show_venue(POST.sqlvenue_name,response);}
            if(POST.sqlscreen_name==''&&POST.sqlvenue_name==''){}
            }
            if(POST.detail){showresult.show_result(POST.detail,response);}
            if(POST.redetail){showresult.show_retweet(POST.redetail,response);}
            if(POST.venueonmap){showvenueresult.showonmap(POST.venueonmap,response);}
            if(POST.venuedetail){showvenueresult.show_result(POST.venuedetail,response);}
            if(POST.user_screen){re.show_user(POST.user_screen,response);}
        });
    }
    
});
server.listen(3000);

module.exports = app;
