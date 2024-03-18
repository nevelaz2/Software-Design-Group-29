const Express = require("express");
const BodyParser = require("body-parser");
const Cors = require("cors");
const Mongoose = require("mongoose");

const { CreateUserData } = require("./LoginModule.js");

const Server = Express();
const Port = 3001;

const DataBaseURI = "mongodb+srv://username:password@atlascluster.ckxw4ub.mongodb.net/clusterName?retryWrites=true&w=majority&appName=AtlasCluster";

Server.use(Cors());
Server.use(BodyParser.json());

Mongoose.connect(DataBaseURI).then(() => {
    console.log("Connected to MongoDB");

    Server.listen(Port, "localhost", () => {
        console.log(`Listening on port ${Port}`);
    })
}).catch(Error => {
    console.log("Error:", Error);
})

Server.post("/createuserdata", CreateUserData);