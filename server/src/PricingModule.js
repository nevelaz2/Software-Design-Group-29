//Pricing Module calculates suggested price and total amount due for requested gallons.

const express = require("express");
const router = express.Router();
const UserData = require("../Data/UserData.js");
const FuelQuoteData = require("../Data/FuelQuoteData.js");

const calculateSuggestedPrice = (gallonsRequested, location, hasHistory) => {
  // Factors declarations
  const currentPricePerGallon = 1.5;
  const companyProfitFactor = 0.1;
  const locationFactor = location === "in-state" ? 0.02 : 0.04;
  const rateHistoryFactor = hasHistory ? 0.01 : 0;
  const gallonsRequestedFactor = gallonsRequested > 1000 ? 0.02 : 0.03;

  const profitMargin =
    currentPricePerGallon *
    (locationFactor -
      rateHistoryFactor +
      gallonsRequestedFactor +
      companyProfitFactor);
  const suggestedPrice = currentPricePerGallon + profitMargin;
  // const totalPrice = gallonsRequested * suggestedPrice;

  return suggestedPrice.toFixed(2);
};

export default calculateSuggestedPrice;
