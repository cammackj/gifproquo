var express = require('express')
var router = express.Router()
var comments = require('../models/comment')
var gifResponses = require('../models/gif-response')

router

	// .get('/', (req, res, next) => {
	// 	// TODO: DONT ALLOW USER TO GET ALL QUOTES
	// 	comments.find(req.query)
	// 		.then(comments => {
	// 			res.send(comments)
	// 		})
	// 		.catch(next)
	// })
	.get('/:id', (req, res, next) => {
		// TODO: DONT ALLOW USER TO GET ALL QUOTES
		comments.findById(req.params.id)
			.then(comment => {
				gifResponses.findById(comment.gifId)
					.then(gifResponse => {
						res.send(gifResponse)
					})
					.catch(next)
			})
			.catch(next)
	})
	.post('/', (req, res, next) => {
		if (!req.session.uid)
			return res.send({ message: "You must be logged in to do that." })

		comments.create(req.body)
			.then(comment => {
				comment.created = Math.floor(Date.now() / 1000);				
				res.send(comment)
			}).catch(next)
	})
	.put('/:id/vote', (req, res, next) => {
		if (!req.session.uid)
			return res.send({ message: "You must be logged in to do that." })

		let userVote = req.body.vote;
		let userId = req.body.userId;
		comments.findById(req.params.id)
			.then(comment => {
				updateUserVote(comment, userVote, userId)
				comment.save((err, todo) => {
					res.send(comment);
				});
			}).catch(next)
	})
	.delete('/:id', (req, res, next) => {
		if (!req.session.uid) {
			return res.send({ message: "You must be logged in to do that." })
		}
		comments.findById(req.params.id)
			.then(comment => {
				if (req.session.uid.toString() == quote.userId.toString()) {
					comment.remove()
					res.send({ message: 'Successfully Removed' })
				} else {
					res.send({ message: 'You are not authorized to remove this comment' })
				}
				res.send({ message: 'Successfully Removed' })
			}).catch(next)
	})

function updateUserVote(comment, userVote, userId) {
	if (userVote) {
		if (comment.votes[userId] == 1) {
			comment.votes[userId] = 0
		} else {
			comment.votes[userId] = 1
		}
	} else {
		if (comment.votes[userId] == -1) {
			comment.votes[userId] = 0
		} else {
			comment.votes[userId] = -1
		}
	}
	getTotalPoints(comment)
}

// Total points for comments.
function getTotalPoints(comment) {
	var total = 0;
	for (vote in comment.votes) {
		total += comment.votes[vote]
	}
	comment.totalPoints = total
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
