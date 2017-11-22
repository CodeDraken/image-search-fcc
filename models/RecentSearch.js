const mongoose = require('mongoose')
const { Schema } = mongoose

const recentSearchSchema = new Schema({
  term: String,
  when: Date
})

module.exports = mongoose.model('RecentSearch', recentSearchSchema)
