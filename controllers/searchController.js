const axios = require('axios')

const { flickrUrl } = require('../config/flickr.config')

const searchController = {
  async search (req, res) {
    try {
      const { search } = req.params
      let { per_page, ...options } = req.query

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
    } catch (error) {
      console.log(error)
    }
  },

  async latest (req, res) {

  }
}

module.exports = searchController
