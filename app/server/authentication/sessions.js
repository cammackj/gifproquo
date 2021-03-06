let session = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(session);

let store = new MongoDBStore({
	uri: 'mongodb://student:student@ds054298.mlab.com:54298/gifproquo',
	collection: 'Sessions'
});

store.on('error', error => {
	console.error('SESSION ERROR:', error);
});

module.exports = session({
	secret: "It's dangerous to go alone",
	cookie: {
		maxAge: 1000 * 60 * 15* 60 * 24 * 7 // 1 week
	},
	store: store,
	resave: true,
	saveUninitialized: true
});