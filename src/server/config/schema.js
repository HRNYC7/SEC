/**
 * Imports the Google Cloud client library and configures datastore
 */
const Datastore = require('@google-cloud/datastore')({
  projectID: "hrnyc-sec2",
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
})

module.exports = Datastore;