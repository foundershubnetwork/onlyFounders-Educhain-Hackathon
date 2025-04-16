const { Profile } = require("../models/profileModel");
const mongoose = require('mongoose');
const Startup = require("../models/startupModel");
const { Milestone } = require("../models/campaignModel");
const {Campaign}=require("../models/campaignModel");
const profileService = require("../services/profileServices");
const {User}=require("../models/userModel");

exports.submitRole = async (req, res) => {

  try {
    const userId = req.user_id;
    const { role } = req.body;
    const variable = await profileService.submitRole(userId, role);
    return res.status(200).json({ message: variable });


  } catch (error) {
    return res.status(500).json({ error: error.message });
  }


};

exports.createProfile = async (req, res) => {
  try {
    const userId = req.user_id;
    const file = req.files;

    // Fetch existing user profile
    const role = await Profile.findOne({ user_id: userId });

    if (!role) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(role.role);
    let { username, professionalTitle, bio, location, founderData, investorData, serviceProviderData } = req.body;

    if (!["Founder", "Investor", "ServiceProvider"].includes(role.role)) {
      return res.status(400).json({ message: "Invalid role. Must be 'Founder', 'Investor', or 'ServiceProvider'." });
    }

    // Convert stringified JSON to an object (if applicable)
    try {
      founderData = founderData ? JSON.parse(founderData) : undefined;
      investorData = investorData ? JSON.parse(investorData) : undefined;
      serviceProviderData = serviceProviderData ? JSON.parse(serviceProviderData) : undefined;
    } catch (error) {
      return res.status(400).json({ message: "Invalid JSON format in request body" });
    }

    // Build profile object
    const profileData = {
      user_id: userId,
      username,
      role: role.role,
      professionalTitle,
      bio,
      location,
    };

    // Assign role-specific data
    if (role.role === "Founder" && founderData) {
      profileData.founderData = founderData;
    }
    if (role.role === "Investor" && investorData) {
      profileData.investorData = investorData;
    }
    if (role.role === "ServiceProvider" && serviceProviderData) {
      profileData.serviceProviderData = serviceProviderData;
    }

    const profile = await profileService.createProfile(userId, profileData, file);
    res.status(201).json({ message: "Profile created successfully", profile });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const userId = req.user_id;
    const profile = await Profile.findOne({user_id:userId});

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// if user click on any profile then they can be able to see their dashboard so getting the userId in request body
exports.getFounderProjectStats = async (req, res) => {
  try {
    const { profileId } = req.body;

    // 1️⃣ Find the startup project
    const project = await Startup.findOne({ user_id: profileId });
    if (!project) {
      return res.status(404).json({ message: "Startup not found" });
    }

    // 2️⃣ Find the campaign and its milestones
    const campaign = await Campaign.findOne({ user_id: profileId });
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    const { milestones, fundingTarget } = campaign;

    // 3️⃣ Calculate milestone stats
    const totalMilestones = milestones.length;
    const completedMilestones = milestones.filter(
      (milestone) => milestone.milestoneStatus === "completed"
    ).length;
    const completionRate =
      totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

    // 4️⃣ Calculate total funding released from completed milestones
    const totalFunding = milestones
      .filter((milestone) => milestone.fundingReleaseStatus === true)
      .reduce((sum, milestone) => sum + milestone.fundPercentage, 0);

    // 5️⃣ Get the next milestone's title
    const nextMilestone = milestones
      .filter((milestone) => milestone.milestoneStatus !== "completed")
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0];
    const nextMilestoneTitle = nextMilestone ? nextMilestone.name : null;

    // 6️⃣ Investor Stats
    const totalRaised = project.totalRaised;
    const investorCount = project.investers.length;
    const totalInvestment = project.investers.reduce(
      (sum, investor) => sum + investor.amount,
      0
    );
    const avgInvestment = investorCount ? totalInvestment / investorCount : 0;
    const InvesterEngagement = investorCount > 5 ? "High" : "Low";

    // 7️⃣ Aggregation for individual vs institutional investors
    const startupId = project._id; // Get actual startup ID

    const aggregatedData = await Startup.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(startupId) } },
      { $unwind: "$investers" },
      {
        $lookup: {
          from: "profiles",
          localField: "investers.profile",
          foreignField: "_id",
          as: "investorProfile",
        },
      },
      { $unwind: "$investorProfile" },
      {
        $group: {
          _id: "$investorProfile.investorData.investorType",
          count: { $sum: 1 },
          totalInvestment: { $sum: "$investers.amount" },
        },
      },
    ]);

    let individualInvestors = 0;
    let institutionalInvestors = 0;

    aggregatedData.forEach((entry) => {
      if (entry._id === "Individual") {
        individualInvestors = entry.count;
      } else if (entry._id === "Institutional") {
        institutionalInvestors = entry.count;
      }
    });

    // 8️⃣ Return the updated stats
    return res.status(200).json({
      totalRaised,
      investerCount: investorCount,
      avgInvestment,
      totalMilestones,
      completedMilestones,
      totalCampaign: 1, // Since only 1 campaign per user
      completionRate,
      totalFunding,
      nextMilestone: nextMilestoneTitle,
      InvesterEngagement,
      institutionalInvestor: institutionalInvestors,
      individualInvestors,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// 1️⃣ API to Get Upcoming Milestones (Not Completed)
exports.getUpcomingMilestones = async (req, res) => {
  try {
    const { profileId } = req.body;

    // Fetch the campaign with milestones
    const campaign = await Campaign.findOne({ user_id: profileId });

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Filter upcoming (not completed) milestones
    const upcomingMilestones = campaign.milestones.filter(
      (milestone) => milestone.milestoneStatus !== "completed"
    );

    // Return upcoming milestones
    return res.status(200).json({
      message: "Upcoming milestones retrieved successfully",
      upcomingMilestones,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// 2️⃣ API to Get All Milestones from the Campaign
exports.getAllMilestones = async (req, res) => {
  try {
    const { profileId } = req.body;

    // Fetch the campaign with milestones
    const campaign = await Campaign.findOne({ user_id: profileId });

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Return all milestones
    return res.status(200).json({
      message: "All milestones retrieved successfully",
      milestones: campaign.milestones,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.addWalletAddress = async (req, res) => {
  try {
    const userId = req.user_id; // Ensure this is set correctly from authentication
    const { walletAddress } = req.body;

    // Validate wallet address (optional, but recommended)
    if (!walletAddress) {
      return res.status(400).json({ message: "Wallet address is required" });
    }

    // Find user and update walletAddress in one step
    const user = await User.findOneAndUpdate(
      { user_id: userId }, 
      { walletAddress }, // Updates wallet address
      { new: true } // Returns updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Wallet address updated", user });

  } catch (error) {
    console.error("Error updating wallet address:", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getOnboardingStatus=async(req,res)=>{

  try{
    const userId=req.user_id;
    let status=false;
    const profile=await Profile.findOne({user_id:userId});
    if(!profile){
      return res.status(200).json({status:false});
    }
    return res.status(200).json({status:profile.completedStatus,role:profile.role});

  }catch(error){
    return res.status(500).json({error:error.message});
  }



};