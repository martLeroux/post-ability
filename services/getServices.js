var client = require('./contentfulClient').client

function getServices() {
  return client.getEntries({
    'content_type': 'services'
  })
}

module.exports = {
  getServices
}