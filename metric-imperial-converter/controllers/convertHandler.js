function ConvertHandler() {

  this.getNum = function (input) {
    let result;
    // Regular expression to extract the number from input
    let numRegex = /^[.\d\/]+/;
    let match = input.match(numRegex);

    if (!match) {
      return 1; // Default to 1 if no number is provided
    }

    const numberString = match[0];
    // Check for double fractions (more than one '/')
    const slashCount = (numberString.match(/\//g) || []).length;

    if (slashCount > 1) {
      return 'invalid number';
    }

    // Evaluate the fraction or decimal
    try {
      result = eval(numberString);
    } catch (e) {
      return 'invalid number';
    }

    return result;

  };

  this.getUnit = function (input) {
    let unitRegex = /[a-zA-Z]+$/;
    let unit = input.match(unitRegex)[0].toLowerCase();

    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];

    if (validUnits.includes(unit)) {
      return unit === 'l' ? 'L' : unit;
    } else {
      return 'invalid unit';
    }
  };

  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      'gal': 'L',
      'l': 'gal',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };

    return unitMap[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function (unit) {
    const spellOutMap = {
      'gal': 'gallons',
      'L': 'liters',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };

    return spellOutMap[unit.toLowerCase()];
  };

  this.convert = function (initNum, initUnit) {
    const conversionRates = {
      'gal': 3.78541,
      'L': 1 / 3.78541,
      'l': 1 / 3.78541,
      'lbs': 0.453592,
      'kg': 1 / 0.453592,
      'mi': 1.60934,
      'km': 1 / 1.60934
    };
    // const galToL = 3.78541;
    // const lbsToKg = 0.453592;
    // const miToKm = 1.60934;

    let result = initNum * conversionRates[initUnit.toLowerCase()];
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
}

module.exports = ConvertHandler;
