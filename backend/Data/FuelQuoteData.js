const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    gallonsRequested: { type: Number, required: true},
    deliveryDate: { type: Date, required: true},
    pricePerGallon: { type: Number, required: false},
    totalPrice: { type: Number, required: false},
})

const FuelQuoteData = mongoose.model('FuelQuoteData', QuoteSchema);

module.exports = FuelQuoteData;