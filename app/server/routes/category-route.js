var express = require('express')
var router = express.Router()
var categories = require('../models/category')
var gifResponses = require('../models/gif-response')

router

	// .get('/', (req, res, next) => {
	// 	// TODO: DONT ALLOW USER TO GET ALL QUOTES
	// 	categories.find(req.query)
	// 		.then(categories => {
	// 			res.send(categories)
	// 		})
	// 		.catch(next)
	// })
	// .get('/:id', (req, res, next) => {
	// 	// TODO: DONT ALLOW USER TO GET ALL QUOTES
	// 	categories.findById(req.params.id)
	// 		.then(category => {
	// 			Users.find({ email: req.body.email.toLowerCase() })
	// 			gifResponses.findById(category.gifId)
	// 				.then(gifResponse => {
	// 					res.send(gifResponse)
	// 				})
	// 				.catch(next)
	// 		})
	// 		.catch(next)
	// })
	.post('/', (req, res, next) => {
		categories.create(req.body)
			.then(category => {
				res.send(category)
			}).catch(next)
	})
	// .put('/:id', (req, res, next) => {
	// 	var id = req.params.id
	// 	stars.findByIdAndUpdate(id, req.body)
	// 		.then(category => {
	// 			res.send({ message: 'Successfully Updated' })
	// 		}).catch(next)
	//})
	.delete('/:id', (req, res, next) => {
		categories.findByIdAndRemove(req.params.id)
			.then(category => {
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