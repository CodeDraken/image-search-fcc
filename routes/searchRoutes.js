// urlRoutes handles creating new short urls

const searchController = require('../controllers/searchController')
const express = require('express')
const searchRouter = express.Router()

// use * to avoid issues with urls
searchRouter.get('/:search', searchController.search)

// redirect short urls to original urls
searchRouter.get('/latest', searchController.latest)

module.exports = searchRouter
