const { ShortUrl } = require('../models')
const { siteUrl } = require('../config/url.config')

const urlRe = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi

const urlController = {
  // create a new short url and add to DB
  async newShortUrl (req, res) {
    try {
      const originalUrl = req.query.url

      if (urlRe.test(originalUrl)) {
        // TODO: obviously this is bad.
        // but fine for now b/c it's just a sample project
        const id = (Math.random() * 1000000 >> 0).toString()

        const data = await new ShortUrl({
          originalUrl: originalUrl,
          shortUrl: siteUrl + id
        }).save()

        return res.json(data)
      }

      return res.status(400).json({ error: 'Bad url' })
    } catch (error) {
      return res.status(500).json({ error })
    }
  },

  async shortUrlRedirect (req, res) {
    const { shortUrl } = req.params

    try {
      // query the DB
      const shortUrlObj = await ShortUrl.findOne({ shortUrl: siteUrl + shortUrl })
      const re = /^(http|https):\/\//i

      if (re.test(shortUrlObj)) {
        return res.redirect(shortUrlObj.originalUrl)
      }

      // in case the url doesn't have http
      return res.redirect(`http://${shortUrlObj.originalUrl}`)
    } catch (error) {
      // send index.html if no link found
      return res.redirect('/')
    }
  }
}

module.exports = urlController
