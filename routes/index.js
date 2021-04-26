const express = require('express');
const router = express.Router();
const indexContent = require('../services/getIndex');
const faqContent = require('../services/getFaq');
var md = require('jstransformer')(require('jstransformer-markdown-it'));



/* GET home page. */
router.get('/', (req, res) => {
  faqContent.getFaq().then((dataFaq) => {
    console.log(dataFaq);
    return dataFaq;
  }).then((dataFaq) => {
    indexContent.getIndex().then(function (data) {
      console.log(dataFaq.items[0].fields);
      const aboutDescription = data.items[0].fields.aboutDescription;
      const whoAmIDescription = data.items[0].fields.whoAmIDescription;

      const faqContent = dataFaq.items.map((faq) => {
        console.log(faq.fields.question);
        return {
          question: faq.fields.question,
          answer: md.render(faq.fields.answer).body
        }
      });
      console.log(faqContent);
      res.render('index', {
        title: 'Post-Ability',
        data: data.items[0].fields,
        aboutDescription: md.render(aboutDescription).body,
        whoAmIDescription: md.render(whoAmIDescription).body,
        faq: faqContent
      });
    })
  })
});

module.exports = router;
