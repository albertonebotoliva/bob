const expected = require('./../data/expected_output.json');
const input = require('./../data/input.json');
const { main } = require('./../app');

describe('Level 4', () => {
    test('main exercise', () => {
        expect.assertions(1);
        return expect(main(input)).toEqual(expected);
    });
});