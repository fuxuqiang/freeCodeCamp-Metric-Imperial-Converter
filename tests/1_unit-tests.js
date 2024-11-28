const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

suite('Unit Tests', function(){
  test('correctly read a whole number input', () => {
    assert.isNumber(new ConvertHandler('1gal').num);
  });
  test('correctly read a decimal number input', () => {
    assert.isNumber(new ConvertHandler('1.1L').num);
  });
  test('correctly read a fractional input', () => {
    assert.isNumber(new ConvertHandler('1/5mi').num);
  });
  test('correctly read a fractional input with a decimal', () => {
    assert.isNumber(new ConvertHandler('1.5/7km').num);
  });
  test('correctly return an error on a double-fraction', () => {
    assert.throws(() => new ConvertHandler('3/2/3lbs'), Error);
  });
  test('correctly default to a numerical input of 1 when no numerical input is provided', () => {
    assert.equal(new ConvertHandler('mi').num, 1);
  });
  test('correctly read each valid input unit', () => {
    assert.isTrue(new ConvertHandler('10gal').isUnitValid);
    assert.isTrue(new ConvertHandler('1l').isUnitValid);
    assert.isTrue(new ConvertHandler('1lbs').isUnitValid);
    assert.isTrue(new ConvertHandler('1kg').isUnitValid);
    assert.isTrue(new ConvertHandler('1mi').isUnitValid);
    assert.isTrue(new ConvertHandler('1km').isUnitValid);
  });
  test('correctly return an error for an invalid input unit', () => {
    assert.throws(() => new ConvertHandler('1min'), Error);
  });
  test('return the correct return unit for each valid input unit', () => {
    assert.equal(new ConvertHandler('1GAL').unit, 'gal');
    assert.equal(new ConvertHandler('10l').unit, 'L');
    assert.equal(new ConvertHandler('10lbs').unit, 'lbs');
    assert.equal(new ConvertHandler('10kg').unit, 'kg');
    assert.equal(new ConvertHandler('mi').unit, 'mi');
    assert.equal(new ConvertHandler('10KM').unit, 'km');
  });
  test('correctly return the spelled-out string unit for each valid input unit', () => {
    const handler1 = new ConvertHandler('1GAL');
    assert.equal(handler1.spellOutUnit(handler1.unit), 'gallons');
    const handler2 = new ConvertHandler('10L');
    assert.equal(handler2.spellOutUnit(handler2.unit), 'liters');
    const handler3 = new ConvertHandler('10kg');
    assert.equal(handler3.spellOutUnit(handler3.unit), 'kilograms');
    const handler4 = new ConvertHandler('1/5mi');
    assert.equal(handler4.spellOutUnit(handler4.unit), 'miles');
    const handler5 = new ConvertHandler('lbs');
    assert.equal(handler5.spellOutUnit(handler5.unit), 'pounds');
    const handler6 = new ConvertHandler('1.5/7km');
    assert.equal(handler6.spellOutUnit(handler6.unit), 'kilometers');
  });
  test('correctly convert gal to L', () => {
    assert.equal(new ConvertHandler('1/2gal').getReturnUnit(), 'L');
  });
  test('correctly convert L to gal', () => {
    assert.equal(new ConvertHandler('1.5L').getReturnUnit(), 'gal');
  });
  test('correctly convert mi to km', () => {
    assert.equal(new ConvertHandler('1.2/5mi').getReturnUnit(), 'km');
  });
  test('correctly convert km to mi', () => {
    assert.equal(new ConvertHandler('3/2.7km').getReturnUnit(), 'mi');
  });
  test('correctly convert lbs to kg', () => {
    assert.equal(new ConvertHandler('1.5LBS').getReturnUnit(), 'kg');
  });
  test('correctly convert kg to lbs', () => {
    assert.equal(new ConvertHandler('1/5KG').getReturnUnit(), 'lbs');
  });
});