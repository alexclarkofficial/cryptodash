var express = require('express');
// var http = require('http');
var request = require('superagent');

var app = express();

app.get('/', function(req, res) {

    // http call here
    request.get('http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=132')
      .end(function(r){
        var x = 0;
        res.send(r.body.return.markets.DOGE.recenttrades[0].price);
        // ['return']['markets']['DOGE']['recenttrades'][0]['price']);
      });

    // res.send('HEY!');
});

var port = process.env.PORT;
app.listen(port, function() {
  console.log("Listening on " + port);
});
