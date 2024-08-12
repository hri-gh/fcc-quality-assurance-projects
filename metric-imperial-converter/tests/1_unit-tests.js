const chai = require('chai');
const ConvertHandler = require('../controllers/convertHandler.js');

let assert = chai.assert;
let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {

    test('should correctly read a whole number input', function () {
        assert.equal(convertHandler.getNum('32L'), 32);
    });

    test('should correctly read a decimal number input', function () {
        assert.equal(convertHandler.getNum('3.2L'), 3.2);
    });

    test('should correctly read a fractional input', function () {
        assert.equal(convertHandler.getNum('1/2L'), 0.5);
    });

    test('should correctly read a fractional input with a decimal', function () {
        assert.equal(convertHandler.getNum('5.4/3L'), 1.8);
    });

    test('should correctly return an error on a double-fraction', function () {
        assert.equal(convertHandler.getNum('3/2/3L'), 'invalid number');
    });

    test('should correctly default to a numerical input of 1 when no numerical input is provided', function () {
        assert.equal(convertHandler.getNum('L'), 1);
    });

    test('should correctly read each valid input unit', function () {
        assert.equal(convertHandler.getUnit('32L'), 'L');
    });

    test('should correctly return an error for an invalid input unit', function () {
        assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
    });

    test('should return the correct return unit for each valid input unit.', function () {
        assert.equal(convertHandler.getReturnUnit('l'), 'gal');
    });

    test('should correctly return the spelled-out string unit for each valid input unit', function () {
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    });

    test('should correctly convert gal to L', function () {
        assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    });

    // Convert L to gal
    test('should correctly convert L to gal', function () {
        assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    });

    // Convert mi to km
    test('should correctly convert mi to km', function () {
        assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    });

    // Convert km to mi
    test('should correctly convert km to mi', function () {
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    });

    // Convert lbs to kg
    test('should correctly convert lbs to kg', function () {
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    });

    // Convert kg to lbs
    test('should correctly convert kg to lbs', function () {
        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    });
});
