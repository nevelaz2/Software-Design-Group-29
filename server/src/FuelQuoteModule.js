
// Gleici Pereira
// Includes fuel quote form, fuel quote history.

// const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const UserData = require("../Data/UserData.js");
const FuelQuoteData = require("../Data/FuelQuoteData.js");
const calculateSuggestedPrice = require("./PricingModule.js");

// Creates a new Quote
router.post("/user/quotes", async (req, res) => {
  try {

    const userId = req.query.userId;

    const {gallonsRequested, deliveryDate, location, hasHistory } = req.body;

    // Input data validation
    if (!gallonsRequested || !deliveryDate || !location || !hasHistory) {
      return res.status(400).send("Missing required fields.");
    }

    // Call PricingModule
    let suggestedPricePerGallon = calculateSuggestedPrice(gallonsRequested, location, hasHistory);
    let totalPrice = suggestedPricePerGallon * gallonsRequested;


    // Saves fuel quote
    const newFuelQuote = new FuelQuoteData({
      UserID: userId,
      GallonsRequested: gallonsRequested,
      DeliveryDate: deliveryDate,
      Location: location,
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
router.get("/user/quotes/history", async (req, res) => {
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

module.exports = router;
