'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  app.get('/api/convert', (req, res) => {
    try {
      let convertHandler = new ConvertHandler(req.query.input);
      res.json({
        initNum: convertHandler.num,
        initUnit: convertHandler.unit,
        returnNum: convertHandler.convert(),
        returnUnit: convertHandler.getReturnUnit(),
        string: convertHandler.getString()
      });
    } catch (error) {
      res.json({ error: error.message });
    }
  });
};
