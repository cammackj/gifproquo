var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var quoteSchema = new mongoose.Schema({
	created:{type:Number},
	expired:{type:Boolean, default:false},
	// categories:{type:Object, required:true}, 
	upVotes:{type:Object}, 
	downVotes:{type:Object},
	userId:{type:ObjectId, ref:"User", required: true},
	content:{type:String, required:true}
})

var Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;