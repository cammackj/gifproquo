var express = require('express')
var router = express.Router()
var quotes = require('../models/quote')
var gifResponses = require('../models/gif-response')

router
	.get('/', (req, res, next) => {
		// TODO: DONT ALLOW USER TO GET ALL QUOTES
		quotes.find(req.query)
			.then(quotes => {
				res.send(quotes)
			})
			.catch(next)
	})
	.get('/:id', (req, res, next) => {
		quotes.findById(req.params.id)
			.then(quote => {
				res.send(quote)
			})
			.catch(next)
	})
	.get('/:id/gifResponses', (req, res, next) => {
		gifResponses.find({ quoteId: req.params.id })
			.then(gifResponses => {
				res.send(gifResponses)
			}).catch(next)
	})
	.post('/', (req, res, next) => {
		if (!req.session.uid)
			return res.send({ message: "You must be logged in to do that." })
		quotes.create(req.body)
			.then(quote => {
				quote.created = Math.floor(Date.now() / 1000);
				res.send(quote)
			}).catch(next)
	})
	.put('/:id/vote', (req, res, next) => {
		if (!req.session.uid)
			return res.send({ message: "You must be logged in to do that." })

		let userVote = req.body.vote;
		let userId = req.body.userId;
		quotes.findById(req.params.id)
			.then(quote => {
				updateUserVote(quote, userVote, userId)
				quote.save((err, todo) => {
					res.send(quote);
				});
			}).catch(next)
	})
	.delete('/:id', (req, res, next) => {
		if (!req.session.uid)
			return res.send({ message: "You must be logged in to do that." })
		quotes.findById(req.params.id)
			.then(quote => {
				if (req.session.uid.toString() == quote.userId.toString()) {
					quote.remove()
					res.send({ message: 'Successfully Removed' })
				} else {
					res.send({ message: 'You are not authorized to remove this quote' })
				}
			}).catch(next)
	})

// ERROR HANDLER
router.use('/', (err, req, res, next) => {
	if (err) {
		res.send(418, {
			success: false,
			error: err.message
		})
	} else {
		res.send(400, {
			success: false,
			error: 'Something failed please try again later'
		})
	}
})

function updateUserVote(quote, userVote, userId) {
	if (userVote) {
		if (quote.votes[userId] == 1) {
			quote.votes[userId] = 0
		} else {
			quote.votes[userId] = 1
		}
	} else {
		if (quote.votes[userId] == -1) {
			quote.votes[userId] = 0
		} else {
			quote.votes[userId] = -1
		}
	}
	getTotalPoints(quote)
}

function getTotalPoints(quote) {
	var total = 0;
	for (vote in quote.votes) {
		total += quote.votes[vote]
	}
	console.log(total)
	quote.totalPoints = total
}

module.exports = router
