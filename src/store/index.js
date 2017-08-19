import $ from 'jquery'
import vue from 'vue';

var state = {
	results: [],
	submissions: [],
	quotes: { content: "Loading..." },
	gifResponses: []

}

$.ajaxSetup({
	crossDomain: true,
	xhrFields: {
		withCredentials: true
	}
})

function getGifs() {
	let quoteId = state.quotes._id
	return $.get(`//localhost:3000/api/quotes/${quoteId}/gifResponses`).then(data => {
		vue.set(state, 'gifResponses', data);
	})
}

let store = {
	state: state,
	search(query) {
		var base = 'http://api.giphy.com/v1/gifs/'
		var apiKey = '&api_key=f097ee268bc6401291558d9b639c2970'
		var limiter = '&limit=24'
		var queryPrefix = 'search?q='
		var url = `${base}${queryPrefix}${query}${apiKey}${limiter}`

		return new Promise(function (resolve, reject) {
			$.get(url)
				.then(data => { resolve(data) })
				.catch(error => { reject(error) });
		})
	},

	// Adding and Removing submissions to a Quote

	addSubmission(gif) {
		state.submissions.push(gif)
	},
	removeSubmission(gif) {
		var index = state.submissions.indexOf(gif)
		state.submissions.splice(index, 1)
	},
	getQuote(cb) {
		//  return new Promise(function (resolve, reject) {
		//    $.get('//localhost:3000/api/quotes')
		//     .then(data => { resolve(data) })
		//     .catch(error => { reject(error) });
		// })
		$.get('//localhost:3000/api/quotes').then(data => {

			// state.quotes=data[0]
			state.quotes.content = data[0].content
			state.quotes.expired = data[0].expired
			state.quotes.totalPoints = data[0].totalPoints
			state.quotes.userId = data[0].userId
			state.quotes._id = data[0]._id

			getGifs().then(cb)
		})
	},
	createQuote(content) {
		$.post('//localhost:3000/api/quotes', { content: content })
			.then(data => {
				console.log(data);
			})
			.fail(data => {
				console.log(data.message)
			})

	},
	getComments(gifId) {
		$.get(`//localhost:3000/api/gifResponses/${gifId}/comments`).then(data => {

		})
	},
	register(user) {

		$.post('//localhost:3000/register', user).then(data => {
			console.log(data)
		})
			.fail(data => {
				console.log(data.message)
			})
	},
	login(user) {
		$.post('//localhost:3000/login', user).then(data => {
			console.log(data)
		})
			.fail(data => {
				console.log(data.message)
			})
	}
}

export { store }