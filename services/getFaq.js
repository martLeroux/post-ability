var client = require('./contentfulClient').client

function getFaq() {
  return client.getEntries({
    'content_type': 'faq'
  })
}

module.exports = {
  getFaq
}