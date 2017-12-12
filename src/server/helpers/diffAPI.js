// Add helper functions related to the Diff API here.
require('es6-promise').polyfill();
require('isomorphic-fetch');
const cheerio = require("cheerio");

const filterDomFor10QURL = async function(url){
  const $ = await getDomTree(url);
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
    var newLinkExt = await searchDomForFinalURL(finalURL, '10-Q');
    return newLinkExt
  }))

};

const filterDomFor10KURL = async function(url) {
  const $ = await getDomTree(url);
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
    var newLinkExt = await searchDomForFinalURL(finalURL, '10-K');
    return newLinkExt
  }))
};

const searchDomForFinalURL = async function(url, filingType) {
  const $ = await getDomTree(url);
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
};

const getDomTree = function(url) {
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
};

const getCIK = (ticker) => {
  return new Promise((resolve, reject) => {
    const CikUrl = `https://csuite.xbrl.us/php/dispatch.php?Task=xbrlCIKLookup&Ticker=${ticker}`
    fetch(CikUrl)
      .then(response => response.text())
      .then(xml => {
        const re = new RegExp(/<cik>(\d*)<\/cik>/i);
        const CIK = xml.match(re)[1];
        console.log(CIK)
        resolve(CIK)
      })
      .catch(err => reject(err))
  })
};


module.exports.handleSearch = async (req, res) => {
  const ticker = req.params.ticker
  console.log(ticker)
  if (ticker) {
    //calls helpers
    var CIK = await getCIK(ticker);
    var links = await filterDomFor10QURL(`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${CIK}&type=10&dateb=&owner=exclude&count=12`);
    res.send(links)
  } else {
    res.send('denied')
  }
}
