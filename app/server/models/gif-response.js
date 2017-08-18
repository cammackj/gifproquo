var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var gifResponseSchema = new mongoose.Schema({
	userId: { type: ObjectId, required: true, ref: 'User' },
	quoteID: { type: ObjectId, required: true, ref: 'Quote' },
	gifUrl: { type: String, required: true },
	created: { type: Number },
	upVotes: { type: Object },
	downVotes: { type: Object }

})

var GifResponse = mongoose.model("GifResponse", gifResponseSchema);

module.exports = GifResponse;