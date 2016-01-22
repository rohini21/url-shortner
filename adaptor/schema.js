var mongoose = require("mongoose");
var schema   = {
	code :String,
	url  :String
}
module.exports.Model = mongoose.model('url',schema)