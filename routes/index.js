const express = require('express');
const router = express.Router();
const indexContent = require('../services/getIndex');
const faqContent = require('../services/getFaq');
const servicesContent = require('../services/getServices');
var md = require('jstransformer')(require('jstransformer-markdown-it'));



/* GET home page. */
router.get('/', (req, res) => {
  faqContent.getFaq().then((dataFaq) => {
    return dataFaq;
  }).then((dataFaq) => {
    servicesContent.getServices().then((dataServices) => {
      indexContent.getIndex().then(function (data) {
        const aboutDescription = data.items[0].fields.aboutDescription;
        const whoAmIDescription = data.items[0].fields.whoAmIDescription;

        const faqContent = dataFaq.items.sort((a, b) => {
          console.log(a.fields.order);
          return a.fields.order > b.fields.order ? 1 : -1
        }).map((faq) => {
          return {
            question: faq.fields.question,
            answer: md.render(faq.fields.answer).body
          }
        });

        const serviceContent = dataServices.items.map((service) => {
          return {
            title: service.fields.title,
            shortDesc: service.fields.shortDesc,
            longDesc: md.render(service.fields.longDesc).body,
            iconString: service.fields.iconString,
          }
        });

        res.render('index', {
          title: 'Post-Ability',
          data: data.items[0].fields,
          aboutDescription: md.render(aboutDescription).body,
          whoAmIDescription: md.render(whoAmIDescription).body,
          faq: faqContent,
          services: serviceContent
        });
      });
    })
  })
});

module.exports = router;
