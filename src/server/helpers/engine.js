const Diff = require('diff-match-patch');
const { getDomTree } = require('../helpers/diffAPI.js');

const diff = async function(url1, url2) {
  var [core1, core2] = await extractCoreDoc(url1, url2);
  var dmp = new Diff();
  dmp.Diff_Timeout = 60;

  var retHTML = "";

  for(var i = 0; i <= 5; i++) {
    var section = dmp.diff_main(core1[i].content, core2[i].content);
    dmp.diff_cleanupSemantic(section);
    retHTML = `${retHTML}${dmp.diff_prettyHtml(section)}<hr align="CENTER" seize="3" style="COLOR: #999999" width="100%">`; 
  }

  return `<html> 
  <head> 
    <title>Express HTML</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  </head> 
  <body>
    ${retHTML}
  </body>
  `
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
    $('text').find('table').filter(function(i, el) {
      return $(this).find('b').filter(function(i, el) {
        var txt = $(this).text()
        txt = txt.slice(0,txt.length - 1)
        return domSectionsList.indexOf(txt) > -1;
      }).length > 0 
    }).each(function(i, el) {
      for(var i = 0; i < domSectionsList.length; i++) {
        if($(this).text().indexOf(domSectionsList[i]) > -1) {
          domSectionsList[i] = {
            section: domSectionsList[i],
            tableIndex: $(this).index()
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
        if(DomTextElement.children.length > 1) {
          for(var i = 0; i < DomTextElement.children.length; i++) {
            if(DomTextElement.children[i].children[0].data === undefined){
              content = content + DomTextElement.children[i].children[0].children[0].data;
            } else {
              content = content + DomTextElement.children[i].children[0].data
            }
          }
          content = content + "\n\n";
        } else {
          content = content + DomTextElement.children[0].children[0].data + "\n\n";
        }
      }
        currIndex++;
    }
  } else {
    // Insert for non a- URL
    while(currIndex < endIndex) {
      var DomTextElement = domBody('text').children()[currIndex]
      if(DomTextElement.name === 'p') {
        DomTextElement.children.forEach(function(child) {
          content = content + dig(child);
          if(child.type === 'tag' && child.children.length === 1 && child.next === null) {
            content = content + "\n\n"
          }
        })
      }
        currIndex++;
    }
  }

  return content;
}

const dig = function(de) {
  var content = ""
  // No children && data
  if(de.data && de.children === undefined) {
    content = content + de.data
  } else if(de.data === undefined && de.children) {
    // no data && children
    de.children.forEach(function(child) {
      content = content + dig(child);
    })
  } else if(de.data && de.children) {
    // data && children
    content = content + data;
    de.children.forEach(function(child) {
      content = content + dig(child);
    })
  }
  return content;
}

module.exports = {
  diff
}