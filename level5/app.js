const input = require('./data/input');
const { filter, dateDiff, getRentalPriceWithDiscount, percentage, addOptions, getOptions } = require('./../utils');

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
                   rentalDays,
                   options: getOptions(input.options, rental.id)
                }
            })
    };
}

function calculateActors(results) {
    return results.rentals.map(rental => {
        const totalFee = percentage(rental.price, 30);
        const insurance_fee =  totalFee / 2;
        const assistance_fee = rental.rentalDays * 100;
        return {
            id: rental.id,
            options: rental.options,
            actions: [
                {
                    who: "driver",
                    type: "debit",
                    amount: rental.price + addOptions(rental, "gps") + addOptions(rental, "baby_seat") + addOptions(rental, "additional_insurance")
                },
                {
                    who: "owner",
                    type: "credit",
                    amount: rental.price - totalFee + addOptions(rental, "gps")+ addOptions(rental, "baby_seat")
                },
                {
                    who: "insurance",
                    type: "credit",
                    amount: insurance_fee
                },
                {
                    who: "assistance",
                    type: "credit",
                    amount: assistance_fee
                },
                {
                    who: "drivy",
                    type: "credit",
                    amount: totalFee - insurance_fee - assistance_fee + addOptions(rental, "additional_insurance")
                }
            ]
        }
    });
}

function main(input) {
    return {
        rentals: calculateActors(calculateRental(input))
    };
}

main(input);
    
module.exports = { main, getOptions, addOptions }