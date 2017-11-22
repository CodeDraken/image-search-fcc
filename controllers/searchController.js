
const searchController = {
  async search (req, res) {
    const { search } = req.params
    let { per_page, ...options } = req.query

    // the offset / number of images to grab
    per_page = per_page
      ? +per_page
      : 10

    res.json({ search, per_page, options })
  },

  async latest (req, res) {

  }
}

module.exports = searchController
