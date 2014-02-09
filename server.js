var express = require('express');
// var http = require('http');
var request = require('superagent');

var app = express();

var debugMode = true;

app.get('/', function(req, res) {

    request.get('http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=132')
      .on('error', function(err) {
        handleError(err, res, 'could not get data');
      })
      .end(function(r){
        if(r.error) {
           handleError(r.error, res, 'could not get data');
           return;
        }
        res.send(r.body.return.markets.DOGE.recenttrades[0].price);
      });

});

function handleError(err, res, message) {
  logError(err);
  if(!debugMode) {
    res.send(message);
  } else {
    res.send({
      message: message,
      error: err
    });
  }
}

function logError(err) {
  console.log('ERROR: ' +
    err.message + '\n' +
    err.stack
  );
}

var port = process.env.PORT;
app.listen(port, function() {
  console.log("Listening on " + port);
});
