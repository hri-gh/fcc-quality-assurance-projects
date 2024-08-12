'use strict';

// const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let input = req.query.input;

    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      // console.log('invalid number and unit')
      return res.send('invalid number and unit');
    }

    if (initNum === 'invalid number') {
      // console.log("invalid number")
      return res.send('invalid number');
    }

    if (initUnit === 'invalid unit') {
      // console.log("invalid unit")
      return res.send('invalid unit');
    }

    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let responseString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: responseString
    });
  });

};
