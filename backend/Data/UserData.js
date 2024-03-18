const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const UserSchema = new Schema({
   username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    address: { type: String, required: false },
    country: { type: String, required: false }
})

const UserData = Mongoose.model("Users", UserSchema, "Users");

module.exports = UserData;
