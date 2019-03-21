const expected = require('./../data/expected_output.json');
const input = require('./../data/input.json');
const { main } = require('./../app');
const { addOptions, getOptions } = require('./../../utils');
describe('Level 5', () => {
    test('addOptions function', () => {
        expect.assertions(2);
        expect(addOptions({ rentalDays: 1, options: ["gps"]}, "gps")).toEqual(500);
        return expect(addOptions({ rentalDays: 1, options: ["baby_seat"]}, "gps")).toEqual(0);
    });
    test('getOptions function', () => {
        expect.assertions(1);
        return expect(getOptions(input.options, 1)).toEqual(["gps", "baby_seat"]);
    });
    test('main exercise', () => {
        expect.assertions(1);
        return expect(main(input)).toEqual(expected);
    });
});