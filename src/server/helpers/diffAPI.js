// Add helper functions related to the Diff API here.
require('es6-promise').polyfill();
require('isomorphic-fetch');
const { JSDOM } = require("jsdom");
const jQuery = require("jquery");
const cheerio = require("cheerio");

const apiHelpers = {
  filterDomFor10QURL: async function(url){
    const $ = await this.getDomTree(url);
    var links = [];

    $('.tableFile2')
    .find('tbody')
    .children()
    .each(function(x, i) {
      if(this.children[1].children[0].data === '10-Q') {
        links.push(this.children[3].children[0].attribs.href);
      }
    })

    return Promise.all(links.map(async link => {
      var finalURL = `https://www.sec.gov${link}`;
      var newLinkExt = await this.searchDomForFinalURL(finalURL, '10-Q');
      return newLinkExt
    }))

  }, 
  
  filterDomFor10KURL: async function(url) {
    const $ = await this.getDomTree(url);
    var links = [];
    
    $('.tableFile2')
    .find('tbody')
    .children()
    .each(function() {
      if(this.children[1].children[0].data === '10-K') {
        links.push(this.children[3].children[0].attribs.href);
      }
    })

    return Promise.all(links.map(async link => {
      var finalURL = `https://www.sec.gov${link}`;
      var newLinkExt = await this.searchDomForFinalURL(finalURL, '10-K');
      return newLinkExt
    }))
  },
  
  searchDomForFinalURL: async function(url, filingType) {
    const $ = await this.getDomTree(url);
    var link;

    $('.tableFile')
    .find('tbody')
    .children()
    .each(function() {
      if(this.children[3].children[0] && this.children[3].children[0].data.includes(filingType)) {
        link = this.children[5].children[0].attribs.href;
      }
    })
    return link;
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