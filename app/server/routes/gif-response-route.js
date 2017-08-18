var express = require('express')
var router = express.Router()
var gifResponses = require('../models/gif-response')

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
	.post('/', (req, res, next) => {
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
		gifResponses.findByIdAndRemove(req.params.id)
			.then(gifResponse => {
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
