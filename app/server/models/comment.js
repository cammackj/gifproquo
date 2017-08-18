var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;

var commentSchema = new mongoose.Schema({
	userId: { type: ObjectId, ref: 'User', required: true },
	gifId: { type: ObjectId, ref: 'GifResponse', required: true },
	created: {type: Number},
	upVotes: { type: Object },
	downVotes: { type: Object }

})

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;