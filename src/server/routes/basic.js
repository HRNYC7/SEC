/**
 * Placeholder document for all routes that require more than a single function call.e
 */
const router = require('express').Router()
const fetch = require('isomorphic-fetch')

const { handleSearch } = require('../helpers/diffAPI')

router.get('/search/:ticker', handleSearch)

module.exports = router
