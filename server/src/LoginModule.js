const Mongoose = require("mongoose");
const Express = require('express');

const Bcrypt = require("bcrypt");
const SaltRounds = 10; // For Bcrypt - hashing passwords

const Router = Express.Router();

const UserData = require("../Data/UserData.js");

Router.post("/createuserdata", async (Request, Response) => {
    try {
        const {userId, username, password} = Request.body;

        const HashedPassword = await Bcrypt.hash(password, SaltRounds);

        const NewUser = new UserData({
            userId: userId,
            username: username,
            password: HashedPassword
        })

        await NewUser.save();

        Response.status(200).send("User data has been created");
    } catch (Error) {
        console.log(Error);
        Response.status(500).send("An error occurred while creating user data");
    }
})

Router.get("/finduser", async (Request, Response) => {
    try {
        const User = await UserData.findOne({username: Request.query.username});

        if (User) {
            Response.status(200).send({found: "true", username: User.username});
        } else {
            Response.status(200).send({found: "false"});
        }
    } catch (Error) {
        console.log("Error occurred in finduser");
        Response.status(500).send(Error.toString());
    }
})

Router.get(("/compare-password"), async (Request, Response) => {
    try {
        const User = await UserData.findOne({username: Request.query.username});

        const PasswordMatches = await Bcrypt.compare(Request.query.password, User.password);

        console.log(Request.query.password, User.password);

        if (PasswordMatches) {
            Response.status(200).send("true");
        } else {
            Response.status(200).send("false");
        }
    } catch (Error) {
        Response.status(500).send(Error.toString());
    }
})

module.exports = Router;
