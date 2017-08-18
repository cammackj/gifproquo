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
	}) // api/galaxies/329409238/stars
	.post('/', (req, res, next) => {
		quotes.create(req.body)
			.then(quote => {
				res.send(quote)
			}).catch(next)
	})
	// .put('/:id', (req, res, next) => {
	// 	var id = req.params.id
	// 	stars.findByIdAndUpdate(id, req.body)
	// 		.then(quote => {
	// 			res.send({ message: 'Successfully Updated' })
	// 		}).catch(next)
	//})
	.delete('/:id', (req, res, next) => {
		quotes.findByIdAndRemove(req.params.id)
			.then(quote => {
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
