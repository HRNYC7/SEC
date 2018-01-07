/**
 * Wrapper for interacting with the database for Documents
 */

const Datastore = require('../config/schema.js');

const Documents = {
  create: function(doc) {
    var taskKey = Datastore.key('Document')
    Datastore.save({
      entity: taskKey,
      date: doc
    })
    .then(() => console.log(`[DATASTORE] Task ${taskKey.id} created successfully.`))
    .catch((err) => console.error(`[DATASTORE] Error: ${err}.`))
  },

  searchTicker: function(ticker) {
    const query = Datastore.createQuery('Document').filter('ticker', '=', ticker);
    return Datastore.runQuery(query)
      .then(results => {
        console.log(`[DATASTORE] Query for "ticker = ${ticker}" successful.`);
        console.log(`Results: \n`)
        console.log(results)
        if(results.length = 0) {
          console.log(`No saved documents for ticker = ${ticker}.`)
        } 
        return results;
      })
      .catch(err => console.log(`[DATASTORE] Error: ${err}.`))
  }
}

module.exports = Documents;
