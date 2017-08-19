var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var gifResponseSchema = new mongoose.Schema({
	userId: { type: ObjectId, required: true, ref: 'User' },
	quoteId: { type: ObjectId, required: true, ref: 'Quote' },
	gifUrl: { type: String, required: true },
	created: { type: Number },
	votes: { type: Object, default: {} },
	totalScore: { type: Number, default: 0 }
})

var GifResponse = mongoose.model("GifResponse", gifResponseSchema);

module.exports = GifResponse;