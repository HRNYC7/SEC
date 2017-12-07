/**
 * Placeholder document for all routes that require more than a single function call.e
 */

const apiHelper = require('../helpers/diffAPI.js');
const 

/** GET TICKER */

const getDoc =async function(ticker, docType = '10-Q') {
  // get CIK for ticker
  // var cik = await getCIK(ticker);
  // get document page urls
  // var pageURLS = docType === "10-K" ? await apiHelper.filterDomFor10KURL(cik) : await apiHelper.filterDomFor10QURL(cik);
  // get final urls
  // var finalURLS = pageURLS.map(async (acc, pageURL) => {
  //   return await apiHelper.searchDomForFinalURL(pageURL)
  // })
  // process diffs
  // return diffs
}