const calculateSuggestedPrice = require("./PricingModule.js");
const Express = require("express");
const Router = Express.Router();

Router.get("/getpricing", async (req, res) => {
  const { gallonsRequested, existingCustomer, Location } = req.query;

  const suggestedPrice = calculateSuggestedPrice(gallonsRequested, existingCustomer, Location)
  return res.status(200).send({ 
    suggestedPrice: suggestedPrice, 
    totalDue: suggestedPrice * gallonsRequested 
  })
})

module.exports = Router;