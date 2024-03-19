// Gleici Pereira 
// Includes fuel quote form, fuel quote history, and quotes filtering (extra). Filtering by date, or gallons requested. Quote history contains all information from quote form.

const express = require('express');
const router = express.Router();
const FuelQuoteData = require("../Data/FuelQuoteData.js"); 


// Creates a new Fuel Quote
router.post('/quote', async (req, res) => {
    try {
        const { userId, gallonsRequested, deliveryDate, pricePerGallon, totalPrice } = req.body;

        // Input data validation
        if (!userId || !gallonsRequested || !deliveryDate) {
            return res.status(400).send('Missing required fields');
        }

        // Calculates suggested price per gallon (Using pricing module)


        // Total Price
        totalPrice = (pricePerGallon * gallonsRequested);

        // Saves fuel quote
        const newFuelQuote = new FuelQuoteData({
            userId,
            gallonsRequested,
            deliveryDate,
            pricePerGallon,
            totalPrice,
        });

        await newFuelQuote.save();
        res.send('Quote created successfully!');
    } catch (error) {
        res.status(500).send(error.message);
    }
});



// Fuel Quote History
router.get('/quote/history/:userId', async (req, res) => {
    try {

        const userId = req.params.userId;

        // Displays quotes for userId
        const fuelQuotes = await FuelQuoteData.find({ userId });

        res.json(fuelQuotes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});



// Quotes filtering (extra)
router.get('/quote/filter', async (req, res) => {
    try {

        // Filter parameters from query string
        const { userId, startDate, endDate, minGallons, maxGallons } = req.query;

        // Creates filter
        const filter = {};
        if (userId) filter.userId = userId;
        if (startDate && endDate) {
            filter.deliveryDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        if (minGallons && maxGallons) {
            filter.gallonsRequested = { $gte: minGallons, $lte: maxGallons };
        }

        // Performs query
        const fuelQuotes = await FuelQuoteData.find(filter);

        res.json(fuelQuotes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;