const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    userId: req.body.userId,
    gallonsRequested: { type: Number, required: true},
    deliveryDate: { type: Date, required: true},
    pricePerGallon: { type: Number, required: false},
    totalPrice: { type: Number, required: false},
})

const FuelQuoteData = mongoose.model('FuelQuoteData', QuoteSchema, 'FuelQuoteData');

module.exports = FuelQuoteData;