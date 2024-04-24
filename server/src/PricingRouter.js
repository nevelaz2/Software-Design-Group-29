const calculateSuggestedPrice = require("./PricingModule.js");
const Express = require("express");
const Router = Express.Router();

Router.get("/getpricing", async (req, res) => {
  try{
    const { gallonsRequested, existingCustomer, Location } = req.query;

    if(!gallonsRequested || existingCustomer === null || !Location)
      return res.status(400).send("Missing required fields.");

    const suggestedPrice = calculateSuggestedPrice(parseInt(gallonsRequested), Location, Boolean(existingCustomer))
    return res.status(200).send({ 
      suggestedPrice: suggestedPrice, 
      totalDue: suggestedPrice * gallonsRequested 
    })
  } catch (err) {
    res.status(500).send(err.message);
  }
})

module.exports = Router;