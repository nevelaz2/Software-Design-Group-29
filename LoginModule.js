const UserData = require("../Data/UserData.js");

const CreateUserData = async (Request, Response) => {
    const NewUser = new UserData(Request.body);

    NewUser.save().then(() => {
        Response.send("User data has been created");
    }).catch(Error => {
        console.log(Error);
    })
}

module.exports = { CreateUserData };