var client = require('./contentfulClient').client

function getIndex() {
  return client.getEntries({
    'content_type': 'index'
  })
}

module.exports = {
  getIndex
}