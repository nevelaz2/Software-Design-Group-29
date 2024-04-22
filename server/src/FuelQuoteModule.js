// Gleici Pereira
// Includes fuel quote form, fuel quote history.

const express = require("express");
const router = express.Router();
const FuelQuoteData = require("../Data/FuelQuoteData.js");

// Creates a new Quote
router.post("/quote", async (req, res) => {
  try {
    const { userId, gallonsRequested, deliveryDate, hasHistory } = req.body;

    // Input data validation
    if (!gallonsRequested || !deliveryDate || !hasHistory) {
      return res.status(400).send("Missing required fields");
    }

    // Call PricingModule with required parameters to calculate suggested pricePerGallon

    // Total Price (suggested priceperGallon returned from PricingModule)
    let totalPrice = pricePerGallon * gallonsRequested;

    // Saves fuel quote
    const newFuelQuote = new FuelQuoteData({
      UserID: userId,
      GallonsRequested: gallonsRequested,
      DeliveryDate: deliveryDate,
      HasHistory: hasHistory,
      TotalPrice: totalPrice,
    });

    await newFuelQuote.save();
    res.status(200).send("Quote created successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Fuel Quote History
router.get("/quote/history/:userId", async (req, res) => {
  try {
    // Displays quotes for userId
    const fuelQuotes = await FuelQuoteData.findOne({
      UserID: req.params.userId,
    });

    res.status(200).json(fuelQuotes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// // Quotes filtering
// router.get("/quote/filter", async (req, res) => {
//   try {
//     // Filter parameters from query string
//     const { userId, startDate, endDate, minGallons, maxGallons } = req.query;

//     // Creates filter
//     const filter = {};
//     if (userId) {
//       filter.UserID = userId;
//     }

//     if (startDate && endDate) {
//       filter.DeliveryData = {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate),
//       };
//     }
//     if (minGallons && maxGallons) {
//       filter.GallonsRequested = { $gte: minGallons, $lte: maxGallons };
//     }

//     // Performs query
//     const fuelQuotes = await FuelQuoteData.find(filter);

//     res.status(200).json(fuelQuotes);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

module.exports = router;
