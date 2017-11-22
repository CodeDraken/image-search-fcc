const axios = require('axios')

const { RecentSearch } = require('../models')
const { flickrUrl } = require('../config/flickr.config')

const searchController = {
  async search (req, res) {
    const { search } = req.params
    let { per_page, ...options } = req.query

    try {
      // the offset / number of images to grab
      per_page = per_page
        ? +per_page
        : 10

      // search for images on flickr
      const apiEndpoint = flickrUrl({ text: search, per_page, ...options })
      const { data } = await axios.get(apiEndpoint)

      // convert data to links to the images
      const dataLinks = {
        ...data,
        photos: {
          ...data.photos,
          photo: data.photos.photo.map(({ farm, server, id, secret, owner, title }) => ({
            url: `https://www.flickr.com/photos/${owner}/${id}`,
            img: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`,
            title
          }))
        }
      }

      res.json({ dataLinks })

      // update recent searches in DB
      try {
        await new RecentSearch({
          term: options.text || search,
          when: Date.now()
        }).save()
      } catch (error) {
        console.log('could not save search to DB', error)
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Oops something went wrong!', error })
    }
  },

  async latest (req, res) {
    try {
      const recentSearches = await RecentSearch.find().limit(10)

      res.json(recentSearches.map(({ when, term }) => ({ when, term })))
    } catch (error) {
      res.status(500).json({
        message: 'Could not load recent searches!', error
      })
    }
  }
}

module.exports = searchController
