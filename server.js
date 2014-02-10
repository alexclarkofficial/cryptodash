var express = require('express');
// var http = require('http');
var request = require('superagent');
var cryptsy = require('cryptsy-api');

var app = express();

var debugMode = true;

var client = new cryptsy('asdf','asdf');



app.get('/markets/:market_id', function(req, res) {

    client.singlemarketdata(req.params.market_id, function(r) {
        if(r.error) {
            handleError(r.error, res, 'could not get data');
            return;
        }
        var market = {};
        for(var market_lbl in r.markets) {
            market = r.markets[market_lbl];
            break;
        }
        res.send({
            label: market.label,
            price: market.recenttrades[0].price
        });
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
