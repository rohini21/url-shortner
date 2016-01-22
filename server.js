var express  = require('express');
var app      = express();
var mongoose = require("mongoose");


//allows CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function (req, res) {
	console.log("in get",req.query)
	var rdm = randomString(6,'abktld')
	console.log(rdm);

  mongoose.connect('mongodb://localhost/urlShortner');

	var db = mongoose.connection;

	db.on('error', function(e) {
 	 console.error('connection error:', e);
	});

	db.once('open', function(callback) {
		var Snip = mongoose.model('url',{
		  code:String,
		  url:String
		},'url');

		/*var snip = new Snip({
		  code:rdm,
		  url:req.query.url
		});
		//res.send(rdm);
		snip.save(function(err, snip) {
		  if (err) return console.error(err);
		  console.log("made",snip);
		});*/

		Snip.find(function(err, thor){
		  console.log("xyzzdfhfxh");
		  if (err) return console.error(err);
		  console.log("xyz",thor);
		});
		mongoose.connection.db.listCollections().toArray(function(error, names) {
    if (error) {
      console.log("error",error)
    } else {
      names.map(function(cname) {
        console.log(cname.name);
      });
    }
  });
	  console.log("connected to mongo db succesfully")
	});
	mongoose.connection.close()
});

app.listen(9001, function () {
  console.log('Example app listening on port 9001!');
});

function randomString(length, chars) {
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
	return result;
}
