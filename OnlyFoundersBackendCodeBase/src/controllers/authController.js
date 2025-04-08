const authServices = require("../services/authServices");

const EarlyAccessUser = require('../models/earlyAccess');

exports.storeUserFromFrontend = async (req, res) => {
  try {
    const {userInput} = req.body; // Data coming from frontend
    const user = await authServices.storeUserFromFrontend(userInput);
    res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await authServices.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// early access user functionality



// Create a new early access user
exports.storeEarlyAccessUser = async (req, res) => {
  try {
    const { username, email, twitter,telegram, role, walletAddress } = req.body;

    // Check if user already exists
    const existingUser = await EarlyAccessUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Create and save the user
    const member = new EarlyAccessUser({
      name:username,
      email,
      twitter,
      telegram,
      role,
      walletAddress,
    });

    await member.save();
    res.status(201).json({ message: 'User added successfully', member });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

