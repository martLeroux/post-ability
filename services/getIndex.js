var client = require('./contentfulClient').client

function getIndex() {
  return client.getEntries()
}

module.exports = {
  getIndex
}