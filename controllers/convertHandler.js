function ConvertHandler(input) {

  this.units = {
    gal: ['gallons', 'L'],
    L: ['liters', 'gal'],
    mi: ['miles', 'km'],
    km: ['kilometers', 'mi'],
    lbs: ['pounds', 'kg'],
    kg: ['kilograms', 'lbs']
  };

  this.splits = input.split(/(^\W+|[a-zA-Z]+$)/).filter(Boolean);

  this.getNum = () => {
    this.isNumValid = true;
    if (1 in this.splits) {
      if (/\/.*\/|\..*\./.test(this.splits[0])) {
        this.isNumValid = false;
        return;
      }
      return Function('"use strict";return (' + this.splits[0] + ")")();
    }
    return 1;
  };
  
  this.getUnit = () => {
    let unit = 1 in this.splits ? this.splits[1] : this.splits[0];
    unit = unit.toLowerCase();
    return unit == 'l' ? 'L' : unit;
  };

  this.unit = this.getUnit();
  this.num = this.getNum();
  this.isUnitValid = Object.keys(this.units).includes(this.unit);
  if (!this.isNumValid && !this.isUnitValid) {
    throw new Error('invalid number and unit');
  } else if (!this.isUnitValid) {
    throw new Error('invalid unit');
  } else if (!this.isNumValid) {
    throw new Error('invalid number');
  }
  
  this.getReturnUnit = () => this.units[this.unit][1];

  this.spellOutUnit = (unit) => this.units[unit][0];
  
  this.convert = () =>  {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (this.unit) {
      case 'gal':
        result = this.num * galToL;
        break;
      case 'L':
        result = this.num / galToL;
        break;
      case 'mi':
        result = this.num * miToKm;
        break;
      case 'km':
        result = this.num / miToKm;
        break;
      case 'lbs':
        result = this.num * lbsToKg;
        break;
      case 'kg':
        result = this.num / lbsToKg;
        break;
    }
    return Number.parseFloat(result.toFixed(5));
  };
  
  this.getString = function() {
    return `${this.num} ${this.spellOutUnit(this.unit)} converts to ${this.convert()} ${this.spellOutUnit(this.getReturnUnit())}`;
  };
  
}

module.exports = ConvertHandler;
