var express = require('express');
var http = require('http');

var app = express();

app.get('/', function(req, res) {

    // http call here

    res.send('HEY!');
});

var port = process.env.PORT;
app.listen(port, function() {
  console.log("Listening on " + port);
});
