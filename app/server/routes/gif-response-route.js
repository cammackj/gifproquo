var express = require('express')
var router = express.Router()
var gifResponses = require('../models/gif-response')
var comments = require('../models/comment')

router

	// .get('/', (req, res, next) => {
	// 	// TODO: DONT ALLOW USER TO GET ALL QUOTES
	// 	gifResponses.find(req.query)
	// 		.then(gifResponses => {
	// 			res.send(gifResponses)
	// 		})
	// 		.catch(next)
	// })
	.get('/:id', (req, res, next) => {
		gifResponses.findById(req.params.id)
			.then(gifResponse => {
				res.send(gifResponse)
			})
			.catch(next)
	})
	.get('/:id/comments', (req, res, next) => {
		comments.find({ gifId: req.params.id })
			.then(comments => {
				res.send(comments)
			}).catch(next)
	})
	.post('/', (req, res, next) => {
		// TODO: Check to see if quote is expired
		// if (!req.session.uid)
		// 	return res.send({ message: "You must be logged in to do that." })

		gifResponses.create(req.body)
			.then(gifResponse => {
				gifResponse.created = Math.floor(Date.now() / 1000);
				res.send(gifResponse)
			}).catch(next)
	})
	.put('/:id/vote', (req, res, next) => {
		if (!req.session.uid)
			return res.send({ message: "You must be logged in to do that." })

		let userVote = req.body.vote;
		let userId = req.body.userId;
		gifResponses.findById(req.params.id)
			.then(gifResponse => {
				updateUserVote(gifResponse, userVote, userId)
				gifResponse.save((err, todo) => {
					res.send(gifResponse);
				});
			}).catch(next)
	})

	// TODO: Soft delete
	.delete('/:id', (req, res, next) => {
		if (!req.session.uid)
			return res.send({ message: "You must be logged in to do that." })
		gifResponses.findById(req.params.id)
			.then(gifResponse => {
				if (req.session.uid.toString() == gifResponse.userId.toString()) {
					gifResponse.remove()
					res.send({ message: 'Successfully Removed' })
				} else {
					res.send({ message: 'You are not authorized to remove this response' })
				}
			}).catch(next)
	})

function updateUserVote(gifResponse, userVote, userId) {
	if (userVote) {
		if (gifResponse.votes[userId] == 1) {
			gifResponse.votes[userId] = 0
		} else {
			gifResponse.votes[userId] = 1
		}
	} else {
		if (gifResponse.votes[userId] == -1) {
			gifResponse.votes[userId] = 0
		} else {
			gifResponse.votes[userId] = -1
		}
	}
	getTotalPoints(gifResponse)
}

// Total points for gifResponses.
function getTotalPoints(gifResponse) {
	var total = 0;
	for (vote in gifResponse.votes) {
		total += gifResponse.votes[vote]
	}
	gifResponse.totalPoints = total
}



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

module.exports = router
