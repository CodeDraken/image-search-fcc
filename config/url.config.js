module.exports = {
  // changes if prod or dev
  siteUrl: process.env.PROJECT_DOMAIN
  ? process.env.PROJECT_DOMAIN
  : 'http://localhost:3000/'
}
