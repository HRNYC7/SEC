// Add helper functions related to the Diff API here.
require('es6-promise').polyfill();
require('isomorphic-fetch');
const { JSDOM } = require("jsdom");
const jQuery = require("jquery");
const cheerio = require("cheerio");

const apiHelpers = {
  filterDomFor10QURL: async function(url){
    const $ = await this.getDomTree(url);
    console.log("-----------------------------------");
    // $('.tableFile2').find('tbody').children().eq(2).children().eq(0).contents().map(function(c){
    //   console.log(this)
    // })


    var a = $('.tableFile2').find('tbody').children()
    .map(function(x) {
    //   if(this.children[1].children[0].data === '10-K') {
    //     return this
    //   }

      console.log('----------------')
      console.log(this.children[2])
      // console.log(this)
    })

    // return $('tr')
    // .filter(function(x) { 
    //   return $(this)
    //         .children()
    //         .eq(0)[0]
    //         .innerText == '10-K'
    // })
    // .map(function(x) {
    //   var a = [];
    //   a.push($(this).children().eq(1).children().eq(0)[0].href)
    //   return a
    // })
    return 12;
  }, 
  
  filterDomFor10KURL: function(url) {
    const $ = this.getDomTree(url);
    return $('tr')
      .filter(function(x) { 
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
  },

  getDomTree: function(url) {
    return fetch(url)
      .then(resp => {
        if(resp.status >= 400) {
          throw new Error('Bad response from server');
        }
        return resp.text()
      })
      .then(body => {
        return cheerio.load(body)
      })

  }

}

module.exports = apiHelpers;