const expected = require('./../data/expected_output.json');
const input = require('./../data/input.json');
const { filter, dateDiff, multiplication, sum, getRentalPrice } = require('./../../utils');
const { main } = require('./../app');

describe('Level 1', () => {
    test('sum function', () => {
        expect.assertions(1);
        return expect(sum(1,2)).toEqual(3);
    });
    test('multiplication function', () => {
        expect.assertions(1);
        return expect(multiplication(1,2)).toEqual(2);
    });
    test('dateDiff function', () => {
        expect.assertions(1);
        return expect(dateDiff('2017-12-8','2017-12-9')).toEqual(2);
    });
    test('filter function', () => {
        expect.assertions(2);
        expect(filter([{ "id": 1, "price_per_day": 2000, "price_per_km": 10 }],1,'price_per_km')).toEqual(10);
        return expect(filter([{ "id": 1, "price_per_day": 2000, "price_per_km": 10 }],1,'price_per_day')).toEqual(2000);
    });
    test('getRentalPrice function', () => {
        expect.assertions(1);
        const pricePerDay = filter(input.cars, input.rentals[0].car_id, "price_per_day");
        const pricePerKm = filter(input.cars, input.rentals[0].car_id, "price_per_km");
        const rentalDays = dateDiff(input.rentals[0].start_date, input.rentals[0].end_date);
        const distance = input.rentals[0].distance;
        return expect(getRentalPrice(rentalDays, pricePerDay, distance, pricePerKm)).toEqual(7000);
    });
    test('main exercise', () => {
        expect.assertions(1);
        return expect(main(input)).toEqual(expected);
    });
});