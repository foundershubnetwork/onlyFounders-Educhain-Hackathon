const { User } = require("../models/userModel");
const { Blogs } = require("../models/blogsModel");
const { Investor } = require("../models/campaignModel")
const { Investment } = require("../models/campaignModel");
const { Profile } = require("../models/profileModel");
const EarlyAccessUser = require("../models/earlyAccess");
const { uploadFileToAzure } = require("../middlewares/storageMiddleware");
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init('72c64bcf935dfc27524cc84bb51bca17');
const Startup = require("../models/startupModel");
const { Campaign } = require("../models/campaignModel");
const { Update } = require("../models/updateModel");
const { Comment } = require("../models/updateModel");
const crypto = require("crypto");
const emailService = require("../services/emailService");
const path = require('path');


// Get list of all registered users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");

    const userIds = users.map(user => user.user_id);

    const profiles = await Profile.find({ user_id: { $in: userIds } }).select("user_id status");

    const profileMap = {};
    profiles.forEach(profile => {
      profileMap[profile.user_id] = profile.status;
    });

    const usersWithStatus = users.map(user => ({
      ...user.toObject(),
      status: profileMap[user.user_id] || "none" // fallback if no profile
    }));

    return res.status(200).json({
      message: "Users registered on the platform",
      users: usersWithStatus,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.aggregate([
      {
        $lookup: {
          from: "users", // the name of the User collection (check your actual MongoDB collection name)
          localField: "user_id",
          foreignField: "user_id",
          as: "userInfo"
        }
      },
      {
        $unwind: "$userInfo"
      },
      {
        $project: {
          _id: 0,
          user_id: "$userInfo.user_id",
          profilePic: "$profilePic.file_url",
          username: {
            $ifNull: [
              { $ifNull: ["$username", null] },
              "$userInfo.username"
            ]
          },
          email: "$userInfo.email",
          location: "$location",
          role: "$role",
          professionalTitle: "$professionalTitle",
          status: "$status"
        }
      }
      
      
    ]);

    return res.status(200).json({
      message: "All user profiles with info",
      profiles
    });

  } catch (error) {
    console.error("Error fetching profiles:", error);
    return res.status(500).json({ message: error.message });
  }
};


// Get list of profiles categorized by role
exports.getProfilesByRole = async (req, res) => {
  try {
    const { role } = req.params;

    if (!["Founder", "Investor", "ServiceProvider"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Get all profiles with this role
    const profiles = await Profile.find({ role }).lean();

    // Extract all user_ids from profiles
    const userIds = profiles.map((profile) => profile.user_id);

    // Get user emails
    const users = await User.find(
      { user_id: { $in: userIds } },
      { user_id: 1, email: 1 }
    ).lean();

    // Build a map: user_id => email
    const emailMap = users.reduce((map, user) => {
      map[user.user_id] = user.email;
      return map;
    }, {});

    // Get startups for those users (if they are Founders)
    let startupMap = {};
    if (role === "Founder") {
      const startups = await Startup.find(
        { user_id: { $in: userIds } },
        { user_id: 1 }
      ).lean();

      startupMap = startups.reduce((map, startup) => {
        map[startup.user_id] = startup._id; // assuming 1 startup per user
        return map;
      }, {});
    }

    // Merge email and startup ID into profile
    const profilesWithExtras = profiles.map((profile) => ({
      ...profile,
      email: emailMap[profile.user_id?.toString()] || null,
      startup_id: startupMap[profile.user_id] || null,
    }));

    res.status(200).json({ message: "Profiles:", profiles: profilesWithExtras });
  } catch (error) {
    console.error("Error fetching profiles by role:", error);
    res.status(500).json({ message: error.message });
  }
};


// Get detailed profile by user_id
exports.getProfileByUserId = async (req, res) => {
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
exports.blockUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const blockeduser = await Profile.findOne({ user_id });
    if (blockeduser.status == "blocked") {
      return res.status(500).json({ message: "user already blocked" });
    }

    const email= await User.findOne({user_id}).lean().select("email");
    const user = await Profile.findOneAndUpdate(
      { user_id },
      { $set: { status: "blocked" } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User blocked successfully", user });
    const templatePath = path.join(__dirname, '../templates/blockUserFromAdmin.html');
    const firstName = blockeduser.username;
    console.log("email",email.email);
    await emailService.sendEmail(email.email, firstName, "Your OnlyFounders Account Has Been Blocked", templatePath);
  } catch (error) {
    console.error("Error blocking user:", error);
    res.status(500).json({ message: error.message});
  }
};

// Verify a user (mark as verified)
exports.verifyUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const {status}=req.body;
    const verifiedUser = await Profile.findOne({ user_id });
    if (verifiedUser.status == status) {
      return res.status(500).json({ message: `user already ${status}` });
    }

    const email= await User.findOne({user_id}).lean().select("email");

    const user = await Profile.findOneAndUpdate(
      { user_id },
      { $set: { status: status } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: `user ${status} successfully`, user });
        const templatePath = path.join(__dirname, '../templates/VerifyUserfromAdmin.html');
        const firstName = verifiedUser.username;
        console.log("email",email.email);
        await emailService.sendEmail(email.email, firstName, "Welcome Aboard — You’re Now Verified on OnlyFounders", templatePath);

  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ message: error.message });
  }
};

// Suspend a user
exports.suspendUser = async (req, res) => {
  try {
    const { user_id } = req.params;


    const suspendeduser = await Profile.findOne({ user_id });
    if (suspendeduser.status == "suspended") {
      return res.status(500).json({ message: "user already suspended" });
    }

    const user = await Profile.findOneAndUpdate(
      { user_id },
      { $set: { status: "suspended" } },
      { new: true }
    );

    const email= await User.findOne({user_id}).lean().select("email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User suspended successfully", user });
    const templatePath = path.join(__dirname, '../templates/suspendUserFromAdmin.html');
    const firstName = suspendeduser.username;
    console.log("email",email.email);
    await emailService.sendEmail(email.email, firstName, "Your OnlyFounders Account Has Been Temporarily Suspended", templatePath);

  } catch (error) {
    console.error("Error suspending user:", error);
    res.status(500).json({ message: error.message});
  }
};

// Add a new profile
exports.addProfile = async (req, res) => {
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
    const { userInput } = req.body;

    // Validate required fields
    if (!userInput.user_id || !userInput.email || !userInput.username || !userInput.walletAddress) {
      return res.status(500).json({ message: "Missing required fields - userId, email,username,walletAddress" });
    }

    // Check if a user with the same email or user_id already exists
    const existingUser = await User.findOne({
      $or: [{ email: userInput.email }, { user_id: userInput.user_id }]
    });

    if (existingUser) {
      return res.status(500).json({ message: "User with this email or user ID already exists" });
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
      role: userInput.role
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
    return res.status(200).json({ message: newUser });
  } catch (error) {
    console.error("Error storing user:", error.message);
    return res.status(500).json({ message: error.message });
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
exports.deleteProfile = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findOneAndDelete({ user_id });
    if (!user) {
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
  try {
    const startups = await Startup.find();
    const campaigns = await Campaign.find({});
    const profiles = await Profile.find({}).lean().select("username");

    const startupDetails = startups.map((startup) => {
      const profile = profiles.find((p) => p.user_id === startup.user_id);
      const campaign = campaigns.find((c) => c.project_id?.toString() === startup._id.toString());

      return {
        _id:startup._id,
        name: startup.startupName,
        founder: profile?.username || "Unknown",
        created: startup.createdAt,
        description: startup.description,
        industry: startup.category,
        location: profile?.location || "N/A",
        members: startup.coreTeam?.length || 0, // 👈 just the count
        website: startup.socialLinks?.get("website") || null,
        totalRaised: campaign?.totalRaisedOnPlatform || 0,
        fundingStage: startup.stage,
        verification: startup.verifiedStatus || "Unverified",
        featuredStatus: startup.featuredStatus || null,
        campaign: campaign ? "Yes" : "NO"

      };
    });

    res.status(200).json({
      message: "List of startups",
      startups: startupDetails
    });
  } catch (error) {
    console.error("Error fetching startups:", error);
    res.status(500).json({ message: error.message });
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
      { $set: { featuredStatus: featuredStatus } },
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
      { $set: { verifiedStatus: verificationStatus } },
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

// Add investors to a campaign
exports.addInvestment = async (req, res) => {
  try {
    const {
      name,
      email,
      telegram,
      twitter,
      nationality,
      amount,
      date, // date of investment
      walletAddress,
      secondaryWalletAddress,
      campaignId
    } = req.body;

    if (!campaignId) {
      return res.status(400).json({ error: 'Campaign ID is required' });
    }

    // Check if campaign exists
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Check if investor already exists (by email)
    let investor = await Investor.findOne({ email });

    if (!investor) {
      // Create new investor
      investor = new Investor({
        name,
        email,
        telegram,
        twitter,
        nationality
      });
      await investor.save();
    }

    // Create new investment
    const investment = new Investment({
      investor_id: investor._id,
      campaign_id: campaign._id,
      amount,
      date: date || Date.now(), // fallback to now
      walletAddress,
      secondaryWalletAddress
    });

    await investment.save();

    res.status(201).json({
      message: 'Investment added successfully',
      investmentId: investment._id
    });
  } catch (error) {
    console.error('Error adding investment:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllInvestments = async (req, res) => {
  try {
    const { campaign_id } = req.params; // Get campaign ID from request parameters
    const rawInvestments = await Investment.find({ campaign_id }).populate('investor_id');

    const grouped = {};
    for (const inv of rawInvestments) {
      const id = inv.investor_id._id.toString();
      if (!grouped[id]) {
        grouped[id] = {
          investor: inv.investor_id,
          investments: []
        };
      }
      grouped[id].investments.push({
        amount: inv.amount,
        date: inv.date,
        walletAddress: inv.walletAddress,
        secondaryWalletAddress: inv.secondaryWalletAddress,
      });
    }

    const result = Object.values(grouped);
    return res.status(200).json({
      message: "Investments retrieved successfully",
      investments: result,
    });


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


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
    return res.status(500).json({ error: error.message });
  }
};



// Accept Application
exports.acceptApplication = async (req, res) => {
  try {

    const { userId } = req.query;
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

    if (user.role === "Founder") {
      const templatePath = path.join(__dirname, '../templates/acceptApplicationFounder.html');
      await emailService.sendEmail(user.email, "", "You're In | OnlyFounders Access Granted", templatePath);
    }
    else if (user.role === "Investor") {
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

    const { userId } = req.query;
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

    if (user.role === "Founder") {
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

exports.getEarlyAccessStatistics = async (req, res) => {

  try {

    const { userId } = req.query;
    if (userId !== "62684") {
      return res.status(403).json({ message: "Only Admin protected Route" });
    }

    const totalEntries = await EarlyAccessUser.countDocuments();
    const acceptedEntries = await EarlyAccessUser.countDocuments({ applicationStatus: "Accepted" });
    const rejectedEntries = await EarlyAccessUser.countDocuments({ applicationStatus: "Rejected" });

    return res.status(200).json({
      message: "EarlyAccess Statistics",
      totalEntries: totalEntries,
      acceptedEntries: acceptedEntries,
      rejectedEntries: rejectedEntries

    })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }



};

// Add blogs 

exports.addBlogs = async (req, res) => {
  try {
    const { title, description, categories, content } = req.body;
    const file = req.files;

    if (!title || !description || !categories || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const containerName = process.env.AZURE_CONTAINER_NAME; // Azure Blob container name

    // Upload the profile picture to Azure
    const headerImageUrl = file.headerImage && file.headerImage.length > 0
      ? await uploadFileToAzure(containerName, file.headerImage[0].buffer, file.headerImage[0].originalname)
      : null;

    const newBlog = new Blogs({
      user_id: req.user_id,
      title,
      description,
      categories,
      content,
      headerImage: {
        file_name: file.headerImage?.[0]?.originalname || null,
        file_url: headerImageUrl || null
      }
    });

    await newBlog.save();

    return res.status(200).json({ message: "Blog added successfully", blog: newBlog });
  } catch (error) {
    console.error("Error adding blog:", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.editBlogs = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, description, categories, content } = req.body;
    const file = req.files;

    const blog = await Blogs.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update fields only if provided
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (categories) blog.categories = categories;
    if (content) blog.content = content;

    // Handle new header image (if uploaded)
    if (file?.headerImage?.[0]) {
      const containerName = process.env.AZURE_CONTAINER_NAME;
      const newHeaderImageUrl = await uploadFileToAzure(
        containerName,
        file.headerImage[0].buffer,
        file.headerImage[0].originalname
      );
      blog.headerImage = {
        file_name: file.headerImage[0].originalname,
        file_url: newHeaderImageUrl
      };
    }

    await blog.save();
    return res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({});
    return res.status(200).json({ message: "Blogs retrieved successfully", blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ message: error.message });
  }
}

exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blogs.findByIdAndDelete(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog deleted successfully" });

  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({ message: error.message });
  }
};


// get milestones of campaign in admin 

exports.getMilestones= async (req, res) => {
  try {
    const { campaignId } = req.params;

    const campaign = await Campaign.findById(campaignId).select('milestones');

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.status(200).json({
      milestones: campaign.milestones
    });
  } catch (err) {
    console.error('Error fetching milestones:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// PATCH /api/campaigns/:campaignId/:milestoneId/approval
exports.approveMilestone = async (req, res) => {
  try {
    const { campaignId, milestoneId } = req.params;
    const { status, reason } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const campaign = await Campaign.findOneAndUpdate(
      { _id: campaignId, 'milestones.milestoneId': milestoneId },
      {
        $set: {
          'milestones.$.adminApprovalStatus': status,
          'milestones.$.rejectionReason': status === 'rejected' ? reason : null,
        },
      },
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign or milestone not found' });
    }

    const user = await User.findOne({user_id:campaign.user_id}).lean().select("email username");
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("email: ",user.email);

    if(status==='rejected'){
      const templatePath = path.join(__dirname, '../templates/milestoneRejectionMail.html');
      await emailService.sendMilestoneRejectionEmail(user.email,user.username, reason, "Milestone Rejected", templatePath);
    }

    res.status(200).json({ message: `Milestone ${status} successfully` });
  } catch (err) {
    console.error('Error updating milestone approval:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getStartupDocuments=async(req,res)=>{
  try {
    const { startupId } = req.params;
    const documents = await Startup.findOne({_id:startupId}).select("whitepaper_Url pitchDeck pitchDeck_Url pitchDeckText pitchDemoVideo_Url socialLinks");
    if (!documents) {
      return res.status(404).json({ message: "Startup not found" });
    }
    return res.status(200).json({ message: "Documents retrieved successfully", documents });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return res.status(500).json({ message: error.message });
  }
}