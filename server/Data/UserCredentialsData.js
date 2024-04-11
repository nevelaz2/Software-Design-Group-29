const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const UserCredentialsSchema = new Schema({
    UserID: { type: Mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    Username: { type: String, required: true },
    Password: { type: String, required: true },
})

const UserCredentialsData = Mongoose.model("Credentials", UserCredentialsSchema, "Credentials");

module.exports = UserCredentialsData;