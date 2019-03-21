const expected = require('./../data/expected_output.json');
const input = require('./../data/input.json');
const { getRentalPriceWithDiscount, applyDiscount, discount } = require('./../../utils');
const { main } = require('./../app');

describe('Level 2', () => {
    test('discount function', () => {
        expect.assertions(1);
        return expect(discount(100, 20)).toEqual(80);
    });
    test('withDiscount function', () => {
        expect.assertions(4);
        expect(applyDiscount(1, 100)).toEqual(100);
        expect(applyDiscount(2, 100)).toEqual(90);
        expect(applyDiscount(5, 100)).toEqual(70);
        return expect(applyDiscount(11, 100)).toEqual(50);
    });
    test('getRentalPriceWithDiscount function', () => {
        expect.assertions(1);
        return expect(getRentalPriceWithDiscount(1, 1000, 1, 1000)).toEqual(2000);
    });
    test('main exercise', () => {
        expect.assertions(1);
        return expect(main(input)).toEqual(expected);
    });
});