const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const UserSchema = new Schema({
    FullName: { type: String, required: false },
    Address1: { type: String, required: false },
    Address2: { type: String, required: false },
    City: { type: String, required: false },
    State: { type: String, required: false },
    Zip: { type: Number, required: false }
})

const UserData = Mongoose.model("Users", UserSchema, "Users");

module.exports = UserData;