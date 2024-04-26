//Pricing Module calculates suggested price for requested gallons.

const calculateSuggestedPrice = (gallonsRequested, location, hasHistory) => {

  // Factors
  const currentPricePerGallon = 1.5;
  const companyProfitFactor = 0.1;
  const locationFactor = location === "TX" ? 0.02 : 0.04;
  const rateHistoryFactor = hasHistory ? 0.01 : 0;
  const gallonsRequestedFactor = gallonsRequested > 1000 ? 0.02 : 0.03;

  const profitMargin = currentPricePerGallon * (locationFactor - rateHistoryFactor + gallonsRequestedFactor + companyProfitFactor);
  const suggestedPrice = currentPricePerGallon + profitMargin;

  return suggestedPrice.toFixed(2);

};

module.exports = calculateSuggestedPrice;