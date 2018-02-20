const Diff = require('diff-match-patch');
const { getDomTree } = require('../helpers/diffAPI.js');

const diff = async function(url1, url2) {
  const diffObj = Diff.diff_main(extractCoreDoc(url1), extractCoreDoc(url2));
}

const extractCoreDoc = async function(url1, url2) {
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
  ];

  const $1 = await getDomTree(url1);
  const $2 = await getDomTree(url2);

  // returns docHeaders section with table local for each section for easier access;
  var docHeaders1 = getSectionLocal($1, url1, docHeaders.slice(0,docHeaders.length - 1));
  var docHeaders2 = getSectionLocal($2, url2, docHeaders.slice(0,docHeaders.length - 1));
  
  // Only get content of 1st four.
  for(var i = 0; i <= 5; i++ ) {
    docHeaders1[i] = pushContent(url1, docHeaders1, $1, i);
    docHeaders2[i] = pushContent(url2, docHeaders2, $2, i);
  }

  return [docHeaders1, docHeaders2];
}

const pushContent = function(url, docHeaders, domBody, i) {

  docHeaders[i] = {
    section: docHeaders[i].section,
    tableIndex: docHeaders[i].tableIndex,
    content: getContent(url, domBody, docHeaders[i].tableIndex, docHeaders[i+1].tableIndex), 
  };

  return docHeaders[i];
}

const getSectionLocal = function($, url, domSectionsList) {

  if(url[url.lastIndexOf('/') + 1] === 'a') {
    $('text')
    .children()
    .each(function(x,i) {
      if(this.name = 'table') {
        // scan doc for table
        if(this.children[0] && this.children[0].name === 'tbody') {
          if(this.children[0].children[1] && this.children[0].children[1].name === 'tr') {
            var docHeaderIndexOfInnerText = domSectionsList.indexOf(this.children[0].children[1].children[1].children[0].children[0].children[0].data)
            if(docHeaderIndexOfInnerText !== -1) {
              // get section header and index of parent.children array
              domSectionsList[docHeaderIndexOfInnerText] = {
                section: domSectionsList[docHeaderIndexOfInnerText],
                tableIndex: x
              }
            }
          }
        }
      }
    });
  } else {
    $('text')
    .find('b')
    .each(function(x,i) {
      if(this.parent.name = 'td') {
        if(this.children[0] && this.children[0].data) {
          var data = this.children[0].data;
          var docHeaderIndexOfInnerText = domSectionsList.indexOf(data.slice(0,data.length - 1));
          if(docHeaderIndexOfInnerText !== -1) {
            domSectionsList[docHeaderIndexOfInnerText] = {
              section: domSectionsList[docHeaderIndexOfInnerText],
              tableIndex: x
            }
          }
        }
      }
    })
  }

  return domSectionsList;
}

const getContent = function(url, domBody, startIndex, endIndex) {
  var content = "";
  var currIndex = startIndex + 1;
  if(url[url.lastIndexOf('/') + 1] === 'a') {
    while(currIndex < endIndex) {
      var DomTextElement = domBody('text').children()[currIndex]
      if(DomTextElement.children[0] && DomTextElement.children[0].name === 'font') {
        content = content + DomTextElement.children[0].children[0].data + "\n";
      }
        currIndex++;
    }
  } else {
    // Insert for non a- URL
  }

  return content;
}

module.exports = {
  extractCoreDoc
}