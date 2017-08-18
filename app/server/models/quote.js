var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var quoteSchema = new mongoose.Schema({
	created: { type: Number },
	expired: { type: Boolean, default: false },
	// categories:{type:Object, required:true}, 
	votes: { type: Object, default: {} },
	userId: { type: ObjectId, ref: "User", required: true },
	content: { type: String, required: true },
	totalPoints: { type: Number, default: 0 }
})

var Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;