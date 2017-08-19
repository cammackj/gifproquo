import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'

Vue.use(Vuex)

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
var actions = {
	search({ commit, dispatch }, query) {
		var base = 'http://api.giphy.com/v1/gifs/'
		var apiKey = '&api_key=f097ee268bc6401291558d9b639c2970'
		var limiter = '&limit=24'
		var queryPrefix = 'search?q='
		var url = `${base}${queryPrefix}${query}${apiKey}${limiter}`

		fetch(url)
			.then(data => {
				data.json().then(gifs => {
					commit('setResults', gifs.data)
				})
			})
			.catch(error => {
				console.log(error)
			});
	},
	gifVote({ commit, dispatch }, { gifId, vote }) {
		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			url: '//localhost:3000/api/gifResponses/' + gifId + "/vote",
			data: JSON.stringify({ vote: vote })
		})

			// $.put('//localhost:3000/api/gifResponses/' + gifId + "/vote", { vote: vote })
			.then(data => {
				commit('updateGifResponseScore', { gifId: data._id, score: data.totalScore });
			})
			.fail(data => {
				console.log(data)
			})
	},
	getQuote({ commit, dispatch }, cb) {
		$.get('//localhost:3000/api/quotes').then(data => {
			commit('setQuotes', data[0]);
			dispatch('getGifs', data[0]._id)
		})
	},
	createQuote({ commit, dispatch }, content) {
		$.post('//localhost:3000/api/quotes', { content: content })
			.then(data => {
				commit('setQuotes', data);
				commit('setGifResponses', [])
			})
			.fail(data => {
				console.log(data)
			})

	},
	getGifs({ commit, dispatch }, quoteId) {
		return $.get(`//localhost:3000/api/quotes/${quoteId}/gifResponses`).then(data => {
			commit('setGifResponses', data)
		})
	},
	addGifResponse({ commit, dispatch }, { quoteId, gif }) {
		gif.quoteId = quoteId;
		gif.gifUrl = gif.images.original.url;
		$.post('//localhost:3000/api/gifResponses', gif).then(data => {
			dispatch('getGifs', quoteId);
		})
			.fail(data => {
				console.log(data)
			})
	},
	getComments({ commit, dispatch }, gifId) {
		$.get(`//localhost:3000/api/gifResponses/${gifId}/comments`).then(data => {

		})
	},
	register({ commit, dispatch }, user) {
		$.post('//localhost:3000/register', user).then(data => {
			console.log(data)
		})
			.fail(data => {
				console.log(data.message)
			})
	},
	login({ commit, dispatch }, user) {
		$.post('//localhost:3000/login', user)
			.then(data => {
				console.log(data)
			})
			.fail(data => {
				console.log(data.message)
			})
	}
}

var mutations = {
	setQuotes(state, quotes) {
		state.quotes = quotes;
	},
	setGifResponses(state, responses) {
		state.gifResponses = responses;
	},
	setResults(state, results) {
		state.results = results;
	},
	updateGifResponseScore(state, { gifId, score }) {
		var gifIndex = state.gifResponses.findIndex(gif => gif._id == gifId);
		Vue.set(state.gifResponses[gifIndex], 'totalScore', score);
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations
})