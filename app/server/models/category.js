var mongoose = require("mongoose");


var categorySchema = new mongoose.Schema({
	name: { type: String },
	quotes:{type:Object}


})

var Category = mongoose.model("Category", categorySchema);

module.exports = Category;