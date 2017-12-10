// Add helper functions related to the Diff API here.
require('es6-promise').polyfill();
require('isomorphic-fetch');
const { JSDOM } = require("jsdom");
const jQuery = require("jquery");
const cheerio = require("cheerio");

const apiHelpers = {
  filterDomFor10QURL: async function(url){
    const $ = await this.getDomTree(url);
    var b =[];

    $('.tableFile2')
    .find('tbody')
    .children()
    .each(function(x, i) {
      if(this.children[1].children[0].data === '10-Q') {
        b.push(this.children[3].children[0].attribs.href);
      }
    })
    return b;
  }, 
  
  filterDomFor10KURL: function(url) {
    const $ = this.getDomTree(url);
    var b =[];
    
    $('.tableFile2')
    .find('tbody')
    .children()
    .each(function(x, i) {
      if(this.children[1].children[0].data === '10-K') {
        b.push(this.children[3].children[0].attribs.href);
      }
    })
    return b;
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