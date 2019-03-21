//NOTE: Rental price = (number of rental days * price per day) + (distance * price per km)
const input = require('./data/input');
const { filter, dateDiff, getRentalPrice } = require('./../utils');

function main(input) {
    return {
        rentals: input.rentals.map(rental => {
           const pricePerDay = filter(input.cars, rental.car_id, "price_per_day");
           const pricePerKm = filter(input.cars, rental.car_id, "price_per_km");
           const rentalDays = dateDiff(rental.start_date, rental.end_date);
           const distance = rental.distance;
           return {
                   id: rental.id,
                   price: getRentalPrice(rentalDays, pricePerDay, distance, pricePerKm)
                }
            })
    }
}

//main(input);

module.exports = { main }
