const input = require('./data/input');
const { filter, dateDiff, getRentalPriceWithDiscount, percentage } = require('./../utils');

function calculateRental(input) {
    return {
        rentals: input.rentals.map((rental,index) => {
           const pricePerDay = filter(input.cars, rental.car_id, "price_per_day");
           const pricePerKm = filter(input.cars, rental.car_id, "price_per_km");
           const rentalDays = dateDiff(rental.start_date, rental.end_date);
           const distance = rental.distance;
           return {
                   id: rental.id,
                   price: getRentalPriceWithDiscount(rentalDays, pricePerDay, distance, pricePerKm),
                   rentalDays
                }
            })
    };
}

function calculateCommission(results) {
    return results.rentals.map(rental => {
        const totalFee = percentage(rental.price, 30);
        const insurance_fee =  totalFee / 2;
        const assistance_fee = rental.rentalDays * 100;
        return {
            id: rental.id,
            price: rental.price,
            commission: {
                insurance_fee,
                assistance_fee,
                drivy_fee: totalFee - insurance_fee - assistance_fee
            }
        }
    });
}

function main(input) {
    return {
        rentals: calculateCommission(calculateRental(input))
    };

}

//main(input)
    
    
module.exports = { main, calculateCommission }