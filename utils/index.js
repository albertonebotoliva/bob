const sum = (a, b) => a + b;
const multiplication = (a, b) => a * b;
const filter = (arr, id, key) => arr.filter(element => element.id === id)[0][key];
const dateDiff = (start, end) => Math.floor(Math.abs(new Date(start) - new Date(end)) /86400000) + 1;
const getRentalPrice = (rentalDays, pricePerDay, distance, pricePerKm) => sum(multiplication(rentalDays, pricePerDay), multiplication(distance, pricePerKm));

const discount = (price, percentage) => price - (price * percentage / 100);
const applyDiscount = (day, price) => day > 10 ? discount(price, 50) : day > 4 ?  discount(price, 30) : day > 1 ?  discount(price, 10) : price;
const getRentalPriceWithDiscount = (rentalDays, pricePerDay, distance, pricePerKm) => {
    let timePrice = 0;
    for(let i = 1; i <= rentalDays; i++) {
        timePrice += applyDiscount(i, pricePerDay)
    }
    return sum(timePrice, multiplication(distance, pricePerKm))
};

const percentage = (price, value) => price * value / 100;

const optionsCalculus = {
    gps: days => days * 500,
    baby_seat: days => days * 200,
    additional_insurance: days => days * 1000
}

function addOptions({rentalDays, options}, extra) {
    let total = 0;
    options.forEach(option => {
        if(option === extra)
        total += optionsCalculus[option](rentalDays, option)
    })
    return total;
}
function getOptions(options, rentalId) {
    const output = [];
    options.forEach(option => option.rental_id === rentalId && output.push(option.type))
    return output;
}
module.exports = { 
    filter, dateDiff, 
    multiplication, sum, 
    getRentalPrice, getRentalPriceWithDiscount, 
    applyDiscount, discount,
    percentage,
    optionsCalculus, addOptions, getOptions
}