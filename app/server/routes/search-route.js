// sort quotes by:
// Age
// TotalScore
// Expired: bool
// GifReponses greater than n

var express = require('express')
var router = express.Router()
var quotes = require('../models/quote')

router
	.get('/', (req, res, next) => {

	})