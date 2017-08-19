import $ from 'jquery'

var state = {
  results: [],
  submissions: [],
  quotes: [{ content: "Loading..." }],
  gifResponses:[]
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
      state.quotes = data
      cb()
    })
  },
  getGifs(index) {
    let quoteId = state.quotes[index]._id
    $.get(`//localhost:3000/api/quotes/${quoteId}/gifResponses`).then(data=>{
    state.gifResponses= data
    })
  },
  getComments(gifId){
  $.get(`//localhost:3000/api/gifResponses/${gifId}/comments`).then(data=>{

  })
  }
}

export { store }