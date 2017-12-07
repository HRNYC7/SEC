// Add helper functions related to the Diff API here.
require('es6-promise').polyfill();
require('isomorphic-fetch');
const jsdom = require("jsdom");

const apiHelpers = {
  filterDomFor10QURL: function(htmlObj){
    return fetch(`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${cik}&type=10&dateb=&owner=exclude&count=12`)
      .then(function(resp) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response;
      })

    htmlObj.$('tr').filter(function(x) { 
      return $(this)
             .children()
             .eq(0)[0]
             .innerText == '10-Q'
    })
    .map(function(x) {
      var a = [];
      a.push($(this).children().eq(1).children().eq(0)[0].href)
      return a
    })
  }, 
  
  filterDomFor10KURL: function(htmlObj) {
    return htmlObj.$('tr').filter(function(x) { 
      return $(this)
             .children()
             .eq(0)[0]
             .innerText == '10-K'
    })
    .map(function(x) {
      var a = [];
      a.push($(this).children().eq(1).children().eq(0)[0].href)
      return a
    })
  },
  
  searchDomForFinalURL: function(htmlObj) {
    return htmlObj.$('tr').eq(1).children().eq(2)[0].innerText
  }
}

module.exports = apiHelpers;