const express = require('express');
const router = express.Router();
const indexContent = require('../services/getIndex');
var md = require('jstransformer')(require('jstransformer-markdown-it'));



/* GET home page. */
router.get('/', (req, res) => {
  indexContent.getIndex().then(function (data) {
    const aboutDescription = data.items[0].fields.aboutDescription;
    const whoAmIDescription = data.items[0].fields.whoAmIDescription;
    res.render('index', {
      title: 'Post-Ability',
      data: data.items[0].fields,
      aboutDescription: md.render(aboutDescription).body,
      whoAmIDescription: md.render(whoAmIDescription).body,
    });
  })
});

module.exports = router;
