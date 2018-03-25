// Add helper functions related to the Diff API here.
require('es6-promise').polyfill();
require('isomorphic-fetch');
const cheerio = require('cheerio');
const Documents = require('../controllers/documents.js');

const filterDomFor10QURL = async function(ticker, CIK){
  const url = `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${CIK}&type=10&dateb=&owner=exclude&count=12`
  const $ = await getDomTree(url);
  var links = [];

  $('.tableFile2')
  .find('tbody')
  .children()
  .each(function(x, i) {
    if(this.children[1].children[0].data === '10-Q') {
      links.push({
        ticker,
        CIK,
        link: this.children[3].children[0].attribs.href,
        date: this.children[7].children[0].data,
        docType: "10-Q"
      });
    }
  })

  return Promise.all(links.map(async linkObj => {
    var finalURL = `https://www.sec.gov${linkObj.link}`;
    var newLinkExt = await searchDomForFinalURL(finalURL, '10-Q');

    return {
      ticker: linkObj.ticker,
      CIK: linkObj.CIK,
      link: `https://www.sec.gov${newLinkExt}`,
      date: formatDate(linkObj.date),
      docType: linkObj.docType
    }
  }))

};

const filterDomFor10KURL = async function(ticker, CIK) {
  const url = `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${CIK}&type=10&dateb=&owner=exclude&count=12`
  const $ = await getDomTree(url);
  var links = [];
  $('.tableFile2')
  .find('tbody')
  .children()
  .each(function() {
    if(this.children[1].children[0].data === '10-K') {
      links.push({
        ticker,
        CIK,
        link: this.children[3].children[0].attribs.href,
        date: this.children[7].children[0].data,
        docType: "10-K"
      });
    }
  })

  return Promise.all(links.map(async linkObj => {
    var finalURL = `https://www.sec.gov${linkObj.link}`;
    var newLinkExt = await searchDomForFinalURL(finalURL, '10-K');

    return {
      ticker: linkObj.ticker,
      CIK: linkObj.CIK,
      link: `https://www.sec.gov${newLinkExt}`,
      date: formatDate(linkObj.date),
      docType: linkObj.docType
    }
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
      return cheerio.load(body, {
        decodeEntities: true,
        normalizeWhitespace: true,
      })
    })
};

const getCIK = ticker => {
  return new Promise((resolve, reject) => {
    const CikUrl = `https://csuite.xbrl.us/php/dispatch.php?Task=xbrlCIKLookup&Ticker=${ticker}`
    fetch(CikUrl)
      .then(response => response.text())
      .then(xml => {
        const re = new RegExp(/<cik>(\d*)<\/cik>/i);
        const CIK = xml.match(re) ? xml.match(re)[1] : 'Not a valid ticker'
        console.log(`CIK for ${ticker}: ${CIK}`)
        resolve(CIK)
      })
      .catch(err => reject(err))
  })
};

const formatDate = date => {
  const day = parseInt(date.slice(8,10));
  const month = parseInt(date.slice(5,7));
  const year = parseInt(date.slice(0,4));
  var quarter;

  if(month <= 3) quarter = 1;
  else if (month > 3 && month <= 6) quarter = 2;
  else if (month > 6 && month <= 9) quarter = 3;
  else if (month > 9) quarter = 4;

  return {year, month, day, quarter}
};

const checkDatabase = async ticker => {
  return await Documents.searchTicker(ticker);
}

const handleSearch = async (req, res) => {
  const ticker = req.params.ticker.toUpperCase();
  if (ticker) {
    var links = await checkDatabase(ticker);
    if(links.length === 0) {
      var CIK = await getCIK(ticker);
      if(CIK === "Not a valid ticker") {
        res.send("Not a valid ticker")
      } else {
        Qlinks = await filterDomFor10QURL(ticker, CIK);
        Klinks = await filterDomFor10KURL(ticker, CIK);
        links = Qlinks.concat(Klinks)
        Documents.createMany(links);
      }
    }
    res.send(links)
  } else {
    res.send('denied')
  }
}

module.exports = {
  handleSearch,
  getDomTree
}