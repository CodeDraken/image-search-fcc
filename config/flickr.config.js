const key = process.env.flickrKey || require('../secretKeys.js').flickrKeys.key

module.exports = {
  flickrUrl: (options) => {
    let formattedOptions = ''

    for (let option in options) {
      const value = options[option]
      formattedOptions += `&${option}=${value}`
    }

    return `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&format=json&nojsoncallback=1${formattedOptions}`
  }
}
