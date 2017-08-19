var express = require("express");
var bodyParser = require("body-parser");
// var mongoose = require("mongoose");
var authRoutes = require('./authentication/auth-routes');
var sessions = require('./authentication/sessions');
var categoryRoute = require('./routes/category-route')
var commentRoute = require('./routes/comment-route')
var gifResponseRoute = require('./routes/gif-response-route')
var quoteRoute = require('./routes/quote-route')
var userRoute = require('./routes/user-route')
var server = express();
var port = 3000;


var cors = require('cors')
server.use('/', cors({
	origin: 'http://localhost:8080',
	credentials: true
}))
//MIDDLEWARE
// server.use(express.static(__dirname + "/"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(sessions);
server.use('/', authRoutes);

server.use('/api/categories', categoryRoute);
server.use('/api/comments', commentRoute);
server.use('/api/gifResponses', gifResponseRoute);
server.use('/api/quotes', quoteRoute);
// server.use('/api/users', userRoute);

server.listen(port, () => {
	console.log("starting up Node, on port 3000")
});

var dbConnect = require("./config/db/mlab-config");





