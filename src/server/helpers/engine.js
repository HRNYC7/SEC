// const Diff = require('diff-match-patch');
const { getDomTree } = require('../helpers/diffAPI.js');

// const diff = async function(url1, url2) {
//   const diffObj = Diff.diff_main(extractCoreDoc(url1), extractCoreDoc(url2));
// }

const getElementIndex =function(node) {
  var index = 0;
  while ( (node = node.previousElementSibling) ) {
      index++;
  }
  return index;
}

const extractCoreDoc = async function(url) {
  const docHeaders = [
    "Business",
    "Risk Factors",
    "Unresolved Staff Comments",
    "Properties",
    "Legal Proceedings",
    "Mine Safety Disclosures",
    "Market for Registrant’s Common Equity, Related Stockholder Matters and Issuer Purchases of Equity Securities",
    "Selected Financial Data",
    "Management’s Discussion and Analysis of Financial Condition and Results of Operations",
    "Quantitative and Qualitative Disclosures About Market Risk",
    "Financial Statements and Supplementary Data",
    "Changes in and Disagreements with Accountants on Accounting and Financial Disclosure",
    "Controls and Procedures",
    "Other Information"
  ]
  const $ = await getDomTree(url);

  $('text')
  .children()
  .each(function(x,i) {
    if(this.name = 'table') {
      // scan doc for table
      if(this.children[0] && this.children[0].name === 'tbody') {
        if(this.children[0].children[1] && this.children[0].children[1].name === 'tr') {
          var docHeaderIndexOfInnerText = docHeaders.indexOf(this.children[0].children[1].children[1].children[0].children[0].children[0].data)
          if(docHeaderIndexOfInnerText !== -1) {
            // get section header and index of parent.children array
            docHeaders[docHeaderIndexOfInnerText] = {
              section: docHeaders[docHeaderIndexOfInnerText],
              tableIndex: x
            }
          }
        }
      }
    }
  })

  // Only get content of 1st four 
  for(i = 0; i <= 5; i++ ) {
    docHeaders[i] = {
      section: docHeaders[i].section,
      tableIndex: docHeaders[i].tableIndex,
      content: pushDivs($, docHeaders[i].tableIndex, docHeaders[i+1].tableIndex), 
    }
  }
  return docHeaders
}

const pushDivs = function($, startIndex, endIndex) {
  var content = "";
  let currIndex = startIndex + 1;
  while(currIndex < endIndex) {
    var DomTextElement = $('text').children()[currIndex]
    if(DomTextElement.children[0] && DomTextElement.children[0].name === 'font') {
      content = content + DomTextElement.children[0].children[0].data + "\n";
    }
      currIndex++;
  }
  return content;
}

module.exports = {
  extractCoreDoc
}