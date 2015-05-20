var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');


var index = require('./routes/index');
var result = require('./routes/result');
var tfromkey = require('./tfromkey');
var venuefromuser = require('./venuefromuser');
var userfromvenue= require('./userfromvenue2')
var keyfromname = require('./keyfromname2')
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
//app.use('/tfromkey', tfromkey);
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



// app.post('http://localhost:8200/',function (req, res) {
//      console.log('bbbbbbbbbb');
//     if (req.method == 'POST') {

//         var body = '';
//         req.on('data', function (data) {
//             body += data;
//             if (body.length > 1e6) {
//                 response.writeHead(413,
//                     {'Content-Type': 'text/plain'}).end();
//                 req.connection.destroy();
//             }
//         });
//         req.on('end', function () {

//             var POST = querystring.parse(body);
//             if(POST.first){ tfromkey.tweet_from_key(POST.keywords,POST.LatitudeandLongitude,response);}
//             if(POST.second){keyfromname.key_from_name(POST.Screen_name,10,10,response);}
//             if(POST.third){ venuefromuser.venue_from_user(POST.User,20,response);}
//             if(POST.fourth){userfromvenue.user_from_venue(POST.venueid,20,response); }

           

//            console.log('response end');

//         });
//     }

//       var POST = querystring.parse(req.body);
//             if(POST.first){ tfromkey.tweet_from_key(POST.keywords,POST.LatitudeandLongitude,response);}
//             if(POST.second){keyfromname.key_from_name(POST.Screen_name,10,10,response);}
//             if(POST.third){ venuefromuser.venue_from_user(POST.User,20,response);}
//             if(POST.fourth){userfromvenue.user_from_venue(POST.venueid,20,response); }


  
// });





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
            if(POST.second){keyfromname.key_from_name(POST.Screen_name,3,20,response);}
            if(POST.third){ venuefromuser.venue_from_user(POST.User,20,response);}
            if(POST.fourth){userfromvenue.user_from_venue(POST.venueid,5,response); }

            //database.showuserinfor('ShengyanZhao');
     console.log('response end');

        });
    }
    
});


server.listen(3000);
module.exports = app;
