var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function (request, response) {


console.log("request handler 'start' was called");  
    
    // var html = '<html>'+'<head>'+'<body>'+'<form action="/upload" method="post" enctype="multipart/form-data">'+
    //       '<input type="file" name="upload"/><input type="submit" value="upload file">'+'</form></body></html>';


    if (request.method == "POST") {

        var body = '';
        request.on('data', function (data) {
            body += data;
            // if body >  1e6 === 1 * Math.pow(10, 6) ~~~ 1MB
            // flood attack or faulty client
            // (code 413: request entity too large), kill request
            if (body.length > 1e6) {
                response.writeHead(413,
                    {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });
        request.on('end', function () {


            var POST = querystring.parse(body);
            console.log("@@@@@@@@@"+POST.keywords);


 var html = '<html>'+
'<head>'+
'<meta http-equiv="content-type" content="text/html; charset=UTF-8">'+
'<link rel="stylesheet" href="css/result.css" type="text/css" media="all">'+
'<link rel="stylesheet" type="text/css" href="./css/style.css" />'+
'<script src="./js/myjs.js">'+'</script>'+
'<script type="text/javascript" src="./js/common.js">'+'</script>'+
'</head>'+
'<body>'+ 
'<div class=/u0027head/u0027>'+
            '<div id=/u0027head_logo/u0027>'+
             '<img src=/u0027./image/logo.jpg/u0027>'+ 
            '</div>'+
            '<div id=/u0027head_title/u0027>Query Social Network System</div>'+
'</div>'+
    '<div class="wrapper">'+
        '<div id="result_title">'+"The results of xxxxx:"+'</div>'+
        '<div id="result_show"> the results which the user select will be shown HERE!</div>'+
    '</div>'+
    '<div id=/u0027bottom/u0027>'+
                '<div class="bottom_content">'+
                    '<ul>'+
                        '<li><a href=us.html/>About us</a></li>'+
                        '<li class=/u0027xian/u0027>|</li>'+
                        '<li>Copyright&nbsp;&copy;:2015</li>'+
                        '<li class=/u0027xian/u0027>|</li>'+
                        '<li><a href=https://www.sheffield.ac.uk>The university of Sheffield</a></li>'+
                        '<li class=/u0027xian/u0027>|</li>'+
                        '<li>E-mail:lcheng3@sheffield.ac.uk</li>'+
                    '</ul>'+
                    '</div>'+
            '</div>'+
'</body>'+
'</html>'
   
    console.log(POST);
    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(html);
    response.end();

            // console.log(body);
            // console.log(POST);
            // response.writeHead(200, {"Content-Type": "text/plain"});
            // response.end('Hello ' + POST.firstname + ' '+ POST.lastname + '\n');


// now to get the different parameters use// POST.<field name> e.g. POST.user
        });
    }
});
// Listen on port 3000, IP defaults to 127.0.0.1 (localhost)
server.listen(3000);