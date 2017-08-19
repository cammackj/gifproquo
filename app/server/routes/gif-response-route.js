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
		// TODO: DONT ALLOW USER TO GET ALL QUOTES
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
	}) // api/galaxies/329409238/stars
	.post('/', (req, res, next) => {
		if (!req.session.uid)
			return res.send({ message: "You must be logged in to do that." })

		gifResponses.create(req.body)
			.then(gifResponse => {
				res.send(gifResponse)
			}).catch(next)
	})
	// .put('/:id', (req, res, next) => {
	// 	var id = req.params.id
	// 	stars.findByIdAndUpdate(id, req.body)
	// 		.then(gifResponse => {
	// 			res.send({ message: 'Successfully Updated' })
	// 		}).catch(next)
	//})
	.delete('/:id', (req, res, next) => {
		if (!req.session.uid)
			return res.send({ message: "You must be logged in to do that." })
		gifResponses.findById(req.params.id)
			.then(gifResponse => {
				if (req.session.uid.toString() == quote.userId.toString()) {
					gifResponse.remove()
					res.send({ message: 'Successfully Removed' })
				} else {
					res.send({ message: 'You are not authorized to remove this response' })
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

module.exports = router
