var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var commentSchema = new mongoose.Schema({
	userId: { type: ObjectId, ref: 'User', required: true },
	gifId: { type: ObjectId, ref: 'GifResponse', required: true },
	created: { type: Number },
	votes: {type: Object, default: {} }
})

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;