const Express = require("express");
const BodyParser = require("body-parser");
const Cors = require("cors");
const Mongoose = require("mongoose");

const FuelQuoteModule = require("./FuelQuoteModule.js")
const LoginRouter = require("./LoginModule.js");
const ProfileRouter = require("./ProfileModule.js"); // Import the ProfileModule router

const Server = Express();
const Port = 3001;

const DataBaseURI = "mongodb+srv://username:password@atlascluster.ckxw4ub.mongodb.net/Testing2?retryWrites=true&w=majority&appName=AtlasCluster";

Server.use(Cors());
Server.use(BodyParser.json());

Mongoose.connect(DataBaseURI).then(() => {
    console.log("Connected to MongoDB");

    Server.listen(Port, "localhost", () => {
        console.log(`Listening on port ${Port}`);
    });
}).catch(Error => {
    console.log("Error:", Error);
});

Server.use(FuelQuoteModule);
Server.use(LoginRouter); 
Server.use(ProfileRouter); //  the ProfileModule router 
