// Hassaan Haqqani ProfileModule.js (Client Profile Management Module) (Group 29 Software Design Raj Singh)

const express = require('express');
const router = express.Router();
const UserData = require("../Data/UserData.js"); // Assuming UserData is in the correct path

// Retrieve User Profile
router.get('/profile/:username', async (req, res) => {
    try {
        const user = await UserData.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).send('User not found');
        }
        // Exclude the password when sending back the user profile
        const { password, ...profileWithoutPassword } = user.toObject();
        res.json(profileWithoutPassword);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update User Profile
router.put('/profile/:username', async (req, res) => {
    try {
        const { name, address, country, password } = req.body;
        const user = await UserData.findOne({ username: req.params.username });
        // Not sure if 404 error catches are needed but just in case.
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update and save the user profile
        if (name) user.name = name;
        if (address) user.address = address;
        if (country) user.country = country;
        if (password) user.password = password;

        await user.save();
        res.send('User profile updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;