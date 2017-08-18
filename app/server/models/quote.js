var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var quoteSchema = new mongoose.Schema({
	created:{type:Number}, 
	expired:{type:Boolean, default:false},
	categories:{type:Object}, 
	upVotes:{type:Object}, 
	downVotes:{type:Object}
	
})

var Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;