const expected = require('./../data/expected_output.json');
const input = require('./../data/input.json');
const {  percentage } = require('./../../utils');
const { main } = require('./../app');

describe('Level 3', () => {
    test('percentage function', () => {
        expect.assertions(1);
        return expect(percentage(100, 20)).toEqual(20);
    });
    test('main exercise', () => {
        expect.assertions(1);
        return expect(main(input)).toEqual(expected);
    });
});