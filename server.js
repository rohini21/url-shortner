var express = require('express');
var app = express();
var mongoose = require("mongoose");

app.use('/', express.static(__dirname + "/"));

app.get('/#/?_k=juazik', function (req, res) {
  console.log("mongoose--",mongoose.connect)
  mongoose.connect('mongodb://localhost/urlshortner');
		var db = mongoose.connection;
		db.on('error', function(e) {
   	 console.error('connection error:', e);
		});
		db.once('open', function(callback) {
		   console.log("connected succesfully")
		});
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});
