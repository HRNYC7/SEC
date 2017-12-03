// Add helper functions related to the Diff API here.

const filterDomForQtrlyFilingDocumentsURL = function(htmlObj){
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
} 

 const getCIK = (ticker) => 
  new Promise((resolve, reject) => {
    const CikUrl = `https://csuite.xbrl.us/php/dispatch.php?Task=xbrlCIKLookup&Ticker=${ticker}`
    fetch(CikUrl)
      .then(response => response.text())
      .then(xml => {
        const re = new RegExp(/<cik>(\d*)<\/cik>/i);
        const CIK = xml.match(re)[1];
        resolve(CIK)
      })
      .catch(err => reject(err))
  })


module.exports.handleSearch = (req, res) => {
  const ticker = req.query && req.query.q
  if (ticker) {
    //calls helpers
    getCIK(ticker)
      .then(CIK => {
        // get more info
        console.log(CIK)
        res.send(`${CIK}`)
      })
      .catch(err => console.log(err))

  } else {
    res.send('denied')
  }

  // res.send(stuff)
}
