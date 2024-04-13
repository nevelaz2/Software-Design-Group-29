const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
    UserID: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    GallonsRequested: { type: Number, required: true},
    DeliveryDate: { type: Date, required: true},
    // PricePerGallon: { type: Number, required: false},
    HasHistory: { type: Boolean, required: true},
    TotalPrice: { type: Number, required: false},
})

const FuelQuoteData = mongoose.model('FuelQuoteData', QuoteSchema, 'FuelQuoteData');

module.exports = FuelQuoteData;