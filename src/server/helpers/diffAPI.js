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