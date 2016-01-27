var express    = require('express');
var app        = express();

var mongoose   = require("mongoose");
var cors 			 = require('cors');
var Model 		 = require("./schema").Model;
var userHelper = require("./user-helper");

//app.use(cors());

mongoose.connect('mongodb://localhost/urlShortner')
var db = mongoose.connection


db.once('open', function(callback) {
	console.log("connected to urlShortner")
})

db.on('error', function(e) {
	 console.error('connection error:', e)
});

//allows CORS
app.use("*",function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  next()
});

app.get('/url', function (req, res) {
	var random = userHelper.randomString(6,'abktldmghncdew')
		console.log("req------",req.query.url)
	var snip   = new Model({
		code :random,
		url  :req.query.url
	});
	
	Model.findOne({url:req.query.url}, function(err, data){
		if(data){
			res.send("http://localhost:9001/"+data.code);
		} else{
			snip.save(function(err, snip) {
			  if (err) return console.error(err);
				res.send("http://localhost:9001/"+random);
			});
		}
  });
});

app.get('/:code',function(req, res){
	console.log("req.query",req.params.code)
	Model.findOne({code: req.params.code}, function(err, data){
		res.redirect(302,data.url)
  });
})
/*app.get('/getUrl/', function (req, res) {
	Model.findOne(req.query.code, function(err, data){
		res.redirect(302,data.url)
    //res.send(data.url)
  });
})*/

app.listen(9001, function () {
  console.log('Snipper app listening on port 9001!');
});
