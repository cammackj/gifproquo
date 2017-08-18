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
		comments.create(req.body)
			.then(comment => {
				res.send(comment)
			}).catch(next)
	})
	// .put('/:id', (req, res, next) => {
	// 	var id = req.params.id
	// 	stars.findByIdAndUpdate(id, req.body)
	// 		.then(comment => {
	// 			res.send({ message: 'Successfully Updated' })
	// 		}).catch(next)
	//})
	.delete('/:id', (req, res, next) => {
		comments.findByIdAndRemove(req.params.id)
			.then(comment => {
				res.send({ message: 'Successfully Removed' })
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

module.exports = router
