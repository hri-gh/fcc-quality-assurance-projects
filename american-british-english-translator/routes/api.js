'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      console.log(req.body)

      // Check for missing fields (locale must exist)
      if (locale === undefined || text === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      // Check for empty text (text exists but is empty or only whitespace)
      if (text.trim() === '') {
        return res.json({ error: 'No text to translate' });
      }

      // Check for valid locale
      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.json({ error: 'Invalid value for locale field' });
      }

      const result = translator.translate(text, locale);
      res.json(result);
    });
};
