const {User} = require("../models/userModel");
const bcrypt = require("bcryptjs");
const emailService=require("./emailService");
const path = require('path');

const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init('72c64bcf935dfc27524cc84bb51bca17');

exports.storeUserFromFrontend = async (userInput) => {
  try {
    console.log("User input from frontend in service: ", userInput);

    // Validate required fields
    if (!userInput.user_id || !userInput.email || !userInput.username) {
      throw new Error("Missing required fields: user_id, email, username");
    }

    // Check if a user with the same email or user_id already exists
    const existingUser = await User.findOne({
      $or: [{ email: userInput.email }, { user_id: userInput.user_id }]
    });

    if (existingUser) {
      throw new Error("User with this email or user ID already exists");
    }

    // Hash password only if provided, otherwise store an empty string
    let hashedPassword = "";
    if (userInput.password) {
      hashedPassword = await bcrypt.hash(userInput.password, 10);
    }

    // Create and save the new user
    const newUser = new User({
      user_id: userInput.user_id,
      email: userInput.email,
      username: userInput.username,
      password: hashedPassword, // Store hashed password or empty string
      // walletAddress: userInput.walletAddress
    });

    await newUser.save();

    mixpanel.track('User Signup', {
      distinct_id: userInput.user_id,  // Unique user ID for tracking
      name: userInput.username,
      email: userInput.email,
      signup_date: new Date().toISOString(),
    });

    mixpanel.people.set(userInput.user_id, {
      $name: userInput.username,
      $email: userInput.email,
      $created: new Date().toISOString(),  // Timestamp for user creation
    });

    console.log("User successfully created:", newUser);
     const templatePath = path.join(__dirname, '../templates/welcome.html');
    const firstName = userInput.username;
    await emailService.sendEmail(userInput.email, firstName, "Welcome to foundersHub network", templatePath);
    return newUser;
  } catch (error) {
    console.error("Error storing user:", error.message);
    throw error;
  }
};

exports.getAllUsers = async () => {
  try {
    const users = await User.find().select("-password"); // Exclude password from results
    return users;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};
