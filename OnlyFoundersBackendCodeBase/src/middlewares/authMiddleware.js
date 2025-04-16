const { Profile } = require("../models/profileModel");
const {User} = require("../models/userModel"); // Import User model


const isAdmin = async(req, res, next) => {
  try {
    // Ensure user is attached by decodeJWT
    const userId=req.user_id;
    if (!userId) {
      return res.status(401).json({ message: "userId not found" });
    }
    
    const profile= await Profile.findOne({user_id:userId});
    // Check if the user has admin privileges
    if (profile.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // If the user is an admin, proceed to the next middleware/controller
    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};



const decodeJWT = async (req, res, next) => {
  try {
    // Extract user_id from headers
    const userId = req.headers["user_id"];

    if (!userId) {
      return res.status(401).json({ message: "User ID missing in headers" });
    }

    // Query MongoDB to find the user
    const user = await User.findOne({ user_id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user object and user_id to the request
    req.user = user;
    req.user_id = user.user_id;

    console.log("User authenticated:", user);

    next(); // Pass control to the next middleware
  } catch (error) {
    console.error("Error in authMiddleware:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {decodeJWT , isAdmin};
