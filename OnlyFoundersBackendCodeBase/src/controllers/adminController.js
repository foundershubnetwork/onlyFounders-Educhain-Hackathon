const { User } = require("../models/userModel");
const { Profile } = require("../models/profileModel");
const EarlyAccessUser=require("../models/earlyAccess");
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init('72c64bcf935dfc27524cc84bb51bca17');
const Startup = require("../models/startupModel");
const {Campaign} = require("../models/campaignModel");
const {Update}=require("../models/updateModel");
const {Comment}=require("../models/updateModel");
const crypto = require("crypto");
const emailService=require("../services/emailService");
const path = require('path');


// Get list of all registered users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find({ role: "user" }).select("-password"); // Only users with role "user"
      return res.status(200).json({ message: "Users registered on the platform", users });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

// Get list of profiles categorized by role
exports. getProfilesByRole = async (req, res) => {
  try {
    const { role } = req.params; // Role from route parameter (founder, investor, service provider)

    if (!["Founder", "Investor", "ServiceProvider"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const profiles = await Profile.find({ role }); // Exclude large files
    res.status(200).json({message:"Profiles:",profiles});
  } catch (error) {
    console.error("Error fetching profiles by role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get detailed profile by user_id
exports. getProfileByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const profile = await Profile.findOne({ user_id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Block a user
exports. blockUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const blockeduser=await Profile.findOne({user_id});
    if(blockeduser.status=="blocked"){
        return res.status(500).json({ message: "user already blocked" });
    }

    const user = await Profile.findOneAndUpdate(
      { user_id },
      { $set: { status: "blocked" } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   
    res.status(200).json({ message: "User blocked successfully", user });
  } catch (error) {
    console.error("Error blocking user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Verify a user (mark as verified)
exports. verifyUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const verifiedUser=await Profile.findOne({user_id});
    if(verifiedUser.status=="verified"){
        return res.status(500).json({ message: "user already verified" });
    }

    const user = await Profile.findOneAndUpdate(
      { user_id },
      { $set: { status:"verified" } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User verified successfully", user });
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Suspend a user
exports. suspendUser = async (req, res) => {
  try {
    const { user_id } = req.params;


    const suspendeduser=await Profile.findOne({user_id});
    if(suspendeduser.status=="suspended"){
        return res.status(500).json({ message: "user already suspended" });
    }

    const user = await Profile.findOneAndUpdate(
      { user_id },
      { $set: { status: "suspended" } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User suspended successfully", user });
  } catch (error) {
    console.error("Error suspending user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new profile
exports. addProfile = async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    await newProfile.save();
    res.status(201).json({ message: "Profile added successfully", newProfile });
  } catch (error) {
    console.error("Error adding profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//  register user
exports.registerUserByAdmin = async (req, res) => {
  try {
    const {userInput}=req.body;

    // Validate required fields
    if (!userInput.user_id || !userInput.email || !userInput.username || !userInput.walletAddress) {
        return res.status(500).json({message:"Missing required fields - userId, email,username,walletAddress"});
    }

    // Check if a user with the same email or user_id already exists
    const existingUser = await User.findOne({
      $or: [{ email: userInput.email }, { user_id: userInput.user_id }]
    });

    if (existingUser) {
      return res.status(500).json({message:"User with this email or user ID already exists"});
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
      walletAddress: userInput.walletAddress,
      role:userInput.role
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
    return res.status(200).json({message:newUser});
  } catch (error) {
    console.error("Error storing user:", error.message);
    return res.status(500).json({message:error.message});
  }
};

exports.submitRoleByAdmin = async (req, res) => {

  try {
    const userId = req.body;
    const { role } = req.body;
    const variable = await profileService.submitRole(userId, role);
    return res.status(200).json({ message: variable });


  } catch (error) {
    return res.status(500).json({ error: error.message });
  }


};

// Delete a profile
exports. deleteProfile = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user=await User.findOneAndDelete({user_id});
    if(!user){
        return res.status(404).json({ message: "user not found" });
    }
    const profile = await Profile.findOneAndDelete({ user_id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllStartups = async (req, res) => {
  try{

    const startups = await Startup.find().populate("investers.profile", "username role");
    return res.status(200).json({
      message: "Startups retrieved successfully",startups
    }
    );
  }catch(error){
    console.error("Error fetching startups:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// 1. Get all startups
exports.viewStartup = async (req, res) => {
  try {
    const startups = await Startup.find().populate("investers.profile", "username role");
    const campaigns = await Campaign.find({});
    const profiles = await Profile.find({});

    const startupDetails = startups.map((startup) => {
      const profile = profiles.find((p) => p.user_id === startup.user_id);
      const campaign = campaigns.find((c) => c.project_id?.toString() === startup._id.toString());

      return {
        name: startup.startupName,
        founder: profile?.username || "Unknown",
        created: startup.createdAt,
        description: startup.description,
        industry: startup.category,
        location: profile?.location || "N/A",
        members: startup.coreTeam?.length || 0, // 👈 just the count
        website: startup.socialLinks?.get("website") || null,
        totalRaised: startup.totalRaised || 0,
        fundingStage: startup.stage,
        verification: startup.verifiedStatus || "Unverified",
        featured: startup.featuredStatus || "No",
        trending: startup.featuredStatus === "Trending" ? "Yes" : "No",
        campaign: campaign || null
      };
    });

    res.status(200).json({
      message: "List of startups",
      startups: startupDetails
    });
  } catch (error) {
    console.error("Error fetching startups:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// 3. Mark a startup as featured, verified, or trending
exports.updateStartupStatus = async (req, res) => {
  try {
    const { startupId } = req.params;
    const { featuredStatus } = req.params; // Expected values: "Featured", "Verified", "Trending"

    if (!["Featured", "Trending"].includes(featuredStatus)) {
      return res.status(400).json({ message: "Invalid status provided" });
    }

    const startup = await Startup.findByIdAndUpdate(
      startupId,
      { $set: { featuredStatus:featuredStatus } },
      { new: true }
    );

    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    res.status(200).json({ message: `Startup marked as ${featuredStatus}`, startup });
  } catch (error) {
    console.error("Error updating startup status:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.changeVerificationStatus = async (req, res) => {
    try {
      const { startupId } = req.params;
      const { verificationStatus } = req.params; // Expected values: "Featured", "Verified", "Trending"
  
      if (!["Verified", "Unverified"].includes(verificationStatus)) {
        return res.status(400).json({ message: "Invalid status provided" });
      }
  
      const startup = await Startup.findByIdAndUpdate(
        startupId,
        { $set: { verifiedStatus:verificationStatus } },
        { new: true }
      );
  
      if (!startup) {
        return res.status(404).json({ message: "Startup not found" });
      }
  
      res.status(200).json({ message: `Startup marked as ${verificationStatus}`, startup });
    } catch (error) {
      console.error("Error updating startup status:", error);
      res.status(500).json({ message: error.message });
    }
  };

// 4. Add a new startup
exports.addStartup = async (req, res) => {
  try {
    const newStartup = new Startup(req.body);
    await newStartup.save();

    res.status(201).json({ message: "Startup added successfully", startup: newStartup });
  } catch (error) {
    console.error("Error adding startup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 5. Delete a startup
exports.deleteStartup = async (req, res) => {
  try {
    const { startupId } = req.params;

    const startup = await Startup.findByIdAndDelete(startupId);

    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    res.status(200).json({ message: "Startup deleted successfully" });
  } catch (error) {
    console.error("Error deleting startup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// Get all campaigns (Basic details for listing)
exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({})
      .select("campaignName campaignStatus fundingTarget fundingReleased"); // Select only necessary fields

    res.status(200).json({ message: "Campaigns retrieved successfully", campaigns });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get campaign details by ID (Detailed View)
exports.getCampaignById = async (req, res) => {
  try {
    const { campaign_id } = req.params;
    const campaign = await Campaign.findById(campaign_id);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json({ message: "Campaign details retrieved", campaign });
  } catch (error) {
    console.error("Error fetching campaign:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add a new campaign
exports.addCampaign = async (req, res) => {
  try {
    const newCampaign = new Campaign(req.body);
    await newCampaign.save();

    res.status(201).json({ message: "Campaign added successfully", campaign: newCampaign });
  } catch (error) {
    console.error("Error adding campaign:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Edit an existing campaign
exports.editCampaign = async (req, res) => {
  try {
    const { campaign_id } = req.params;
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      campaign_id,
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json({ message: "Campaign updated successfully", campaign: updatedCampaign });
  } catch (error) {
    console.error("Error updating campaign:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const { campaign_id } = req.params;
    const deletedCampaign = await Campaign.findByIdAndDelete(campaign_id);

    if (!deletedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    console.error("Error deleting campaign:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Get platform statistics for admin dashboard
exports.adminAnalytics = async (req, res) => {
  try {
    // Count of user profiles based on role
    const totalUsers = await User.countDocuments();
    const foundersCount = await Profile.countDocuments({ role: "Founder" });
    const investorsCount = await Profile.countDocuments({ role: "Investor" });
    const serviceProvidersCount = await Profile.countDocuments({ role: "ServiceProvider" });

    // Count of startups based on verification status
    const totalStartups = await Startup.countDocuments();
    const verifiedStartups = await Startup.countDocuments({ verifiedStatus: "Verified" });
    const featuredStartups = await Startup.countDocuments({ featuredStatus: "Featured" });
    const trendingStartups = await Startup.countDocuments({ featuredStatus: "Trending" });

    // Count of updates and comments for user engagement
    const totalUpdates = await Update.countDocuments();
    const totalComments = await Comment.countDocuments();

    return res.status(200).json({
      message: "Platform statistics retrieved successfully",
      users: {
        total: totalUsers,
        founders: foundersCount,
        investors: investorsCount,
        serviceProviders: serviceProvidersCount,
      },
      startups: {
        total: totalStartups,
        verified: verifiedStartups,
        featured: featuredStartups,
        trending: trendingStartups,
      },
      engagement: {
        updates: totalUpdates,
        comments: totalComments,
      }
    });
  } catch (error) {
    console.error("Error fetching platform statistics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// early access admin functionality

exports.getAllEarlyAccessUser = async (req, res) => {
  try {
    const { userId } = req.query; // Use query for GET requests

    // Check if userId is valid for admin
    if (userId !== "62684") {
      return res.status(403).json({ message: "Only Admin protected Route" });
    }

    // Get all users
    const users = await EarlyAccessUser.find({});
    return res.status(200).json({
      message: "Users registered on the platform",
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error:error.message });
  }
};



// Accept Application
exports.acceptApplication = async (req, res) => {
  try {

    const {userId}=req.query;
    if (userId !== "62684") {
      return res.status(403).json({ message: "Only Admin protected Route" });
    }
    const { id } = req.params;

    const user = await EarlyAccessUser.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.applicationStatus === 'Accepted') {
      return res.status(400).json({ error: 'Application is already accepted' });
    }

    user.applicationStatus = 'Accepted';
    await user.save();

    if(user.role==="Founder"){
     const templatePath = path.join(__dirname, '../templates/acceptApplicationFounder.html');
    await emailService.sendEmail(user.email, "", "You're In | OnlyFounders Access Granted", templatePath);
    }
    else if(user.role==="Investor"){
      const templatePath = path.join(__dirname, '../templates/acceptApplicationInvestor.html');
    await emailService.sendEmail(user.email, "", "VIP Access Granted | OnlyFounders Investment Platform", templatePath);
    }
    res.status(200).json({
      message: 'Application accepted successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject Application
exports.rejectApplication = async (req, res) => {
  try {

    const {userId}=req.query;
    if (userId !== "62684") {
      return res.status(403).json({ message: "Only Admin protected Route" });
    }
    const { id } = req.params;

    const user = await EarlyAccessUser.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.applicationStatus === 'Rejected') {
      return res.status(400).json({ error: 'Application is already rejected' });
    }

    user.applicationStatus = 'Rejected';
    await user.save();

    if(user.role==="Founder"){
      const templatePath = path.join(__dirname, '../templates/FounderRejection.html');
     await emailService.sendEmail(user.email, "", "OnlyFounders Update | Not a Match (For Now)", templatePath);
     }
     
    res.status(200).json({
      message: 'Application rejected successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEarlyAccessStatistics=async(req,res)=>{

  try{

    const {userId}=req.query;
    if (userId !== "62684") {
      return res.status(403).json({ message: "Only Admin protected Route" });
    }

    const totalEntries=await EarlyAccessUser.countDocuments();
    const acceptedEntries=await EarlyAccessUser.countDocuments({applicationStatus:"Accepted"});
    const rejectedEntries=await EarlyAccessUser.countDocuments({applicationStatus:"Rejected"});

    return res.status(200).json({
      message:"EarlyAccess Statistics",
      totalEntries:totalEntries,
      acceptedEntries:acceptedEntries,
      rejectedEntries:rejectedEntries

    })
  }catch(error){
    return res.status(500).json({error:error.message});
  }



};