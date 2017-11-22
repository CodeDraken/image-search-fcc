// urlRoutes handles creating new short urls

const searchController = require('../controllers/urlController')
const express = require('express')
const searchRouter = express.Router()

// use * to avoid issues with urls
searchRouter.get('/api/imagesearch/:search', searchController.search)

// redirect short urls to original urls
searchRouter.get('/:shortUrl', searchController.shortUrlRedirect)

module.exports = searchRouter
