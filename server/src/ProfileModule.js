// Hassaan Haqqani ProfileModule.js (Client Profile Management Module) (Group 29 Software Design Raj Singh)

const express = require('express');
const router = express.Router();
const UserData = require("../Data/UserData.js"); // Assuming UserData is in the correct path
const UserCred = require("../Data/UserCredentialsData.js")

const Bcrypt = require("bcrypt");
const SaltRounds = 10; // For Bcrypt - hashing passwords

// Retrieve User Profile
router.get('/profile/:username', async (req, res) => {
    try {
        const user = await UserCred.findOne({ Username: req.params.username });
        if (!user) {
            return res.status(404).send('User not found');
        }
        // Exclude the password when sending back the user profile
        const { password, ...profileWithoutPassword } = user.toObject();
        res.status(200).json(profileWithoutPassword);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update User Profile
router.put('/profile/:username', async (req, res) => {
    try {
        const { fullname: name, address1, address2, city, state, zip, password } = req.body;
        const user = await UserCred.findOne({ Username: req.params.username });
        // Not sure if 404 error catches are needed but just in case.
        if (!user) {
            return res.status(404).send('User not found');
        }
        const { UserID } = user.toObject();
        const user_info = await UserData.findOne({ _id: UserID.toString() });
        // console.log(user_info)
        if(!user_info){
            return res.status(404).send('User_Info not found');
        }

        // Update and save the user profile
        if (name) user_info.FullName = name;
        if (address1) user_info.Address1 = address1;
        if (address2) user_info.Address2 = address2;
        if (city) user_info.City = city;
        if (state) user_info.State = state;
        if (zip) user_info.Zip = zip;
        if (password){
            const HashedPassword = await Bcrypt.hash(password, SaltRounds);
            user.Password = HashedPassword;
        } 

        await user.save();
        await user_info.save();
        res.status(200).send('User profile updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Fetch user's address 
router.get('/user/:userId/address', async (req, res) => {
    try {
      const user = await UserCred.findOne({ UserID: req.params.userId });
      if (!user) {
        return res.status(404).send('User not found.');
      }
      const { UserID } = user.toObject();
      const userInfo = await UserData.findOne({ _id: UserID.toString() });
      if (!userInfo) {
        return res.status(404).send('User info not found');
      }
      const { Address1, Address2, City, State, Zip } = userInfo;
      res.json({
        address1: Address1,
        address2: Address2,
        city: City,
        state: State,
        zip: Zip
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


module.exports = router;
