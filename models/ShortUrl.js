const mongoose = require('mongoose')
const { Schema } = mongoose

const shortUrlSchema = new Schema({
  originalUrl: String,
  shortUrl: String
}, { timestamps: true })

module.exports = mongoose.model('ShortUrl', shortUrlSchema)
