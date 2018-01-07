/**
 * Wrapper for interacting with the database for Documents
 */

const Datastore = require('../config/schema.js');

const Documents = {
  createMany: function(documentLinks) {
    documentLinks.forEach(link => {
      var taskKey = Datastore.key('Documents')
      Datastore.insert({
        key: taskKey,
        data: link
      })
      .then(() => {
        console.log('[DATASTORE] Successful Data entry for:')
        console.log(link)
      })

    })
  },

  searchTicker: function(ticker) {
    const query = Datastore.createQuery('Documents').filter('ticker', '=', ticker);
    return Datastore.runQuery(query)
      .then(entities => {
        console.log(`-------------\n[DATASTORE] Query for "ticker = ${ticker}" successfully returned ${entities[0].length} entities.`);
        return entities[0];
      })
      .catch(err => console.log(`[DATASTORE] Error: ${err}.`))
  }
}

module.exports = Documents;
