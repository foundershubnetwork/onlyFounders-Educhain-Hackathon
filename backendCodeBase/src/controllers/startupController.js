const Startup = require("../models/startupModel"); // Import Startup model
const { uploadFileToAzure } = require("../middlewares/storageMiddleware");
const {Profile}=require("../models/profileModel");
const {User}=require("../models/userModel");
const emailService = require("../services/emailService");
const path = require('path');
const {Campaign}=require("../models/campaignModel");
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init('72c64bcf935dfc27524cc84bb51bca17');


exports.basicStartupDetails = async (req, res) => {
  try {
    const userId = req.user_id;
    const profile = await Profile.findOne({ user_id: userId });

    if (!profile) {
      return res.status(500).json({ message: "First create your profile" });
    }

    const { 
      startupName, tagline, description, stage, category, blockchainPlatforms, 
      socialLinks, pitchDemoVideo, whitePaperText, pitchDeck_Url, wpaperurl, pitchDeckText 
    } = req.body;

    const file = req.files;
    const socialLinksParsed = socialLinks ? JSON.parse(socialLinks) : null;

    if (!startupName && !description && !stage && !category && !blockchainPlatforms && !file) {
      return res.status(400).json({ message: "At least one field must be provided to update" });
    }

    const containerName = process.env.AZURE_CONTAINER_NAME;

    // Upload new files only if provided
    const uploadedFiles = {};
    if (file) {
      if (file.whitePaper) {
        uploadedFiles.whitePaperUrl = await uploadFileToAzure(containerName, file.whitePaper[0].buffer, file.whitePaper[0].originalname);
      }
      if (file.pitchDeck) {
        uploadedFiles.pitchDeckUrl = await uploadFileToAzure(containerName, file.pitchDeck[0].buffer, file.pitchDeck[0].originalname);
      }
      if (file.startupLogo) {
        uploadedFiles.startupLogoUrl = await uploadFileToAzure(containerName, file.startupLogo[0].buffer, file.startupLogo[0].originalname);
      }
      if (file.bannerImage) {
        uploadedFiles.bannerImageUrl = await uploadFileToAzure(containerName, file.bannerImage[0].buffer, file.bannerImage[0].originalname);
      }
    }

    let startup = await Startup.findOne({ user_id: userId });

    if (startup) {
      // Update only provided fields
      if (startupName) startup.startupName = startupName;
      if (tagline) startup.tagline = tagline;
      if (description) startup.description = description;
      if (stage) startup.stage = stage;
      if (category) startup.category = category;
      if (blockchainPlatforms) startup.blockchainPlatforms = blockchainPlatforms;
      if (socialLinksParsed) startup.socialLinks = socialLinksParsed;
      if (whitePaperText) startup.whitepaperText = whitePaperText;
      if (wpaperurl) startup.whitepaper_Url = wpaperurl;
      if (pitchDeckText) startup.pitchDeckText = pitchDeckText;
      if (pitchDeck_Url) startup.pitchDeck_Url = pitchDeck_Url;
      if (pitchDemoVideo) startup.pitchDemoVideo_Url = pitchDemoVideo;

      // Update only if new files are uploaded, otherwise retain old values
      if (uploadedFiles.whitePaperUrl) {
        startup.whitepaper = { 
          file_name: file.whitePaper?.[0]?.originalname || startup.whitepaper?.file_name, 
          file_url: uploadedFiles.whitePaperUrl || startup.whitepaper?.file_url 
        };
      }
      if (uploadedFiles.pitchDeckUrl) {
        startup.pitchDeck = { 
          file_name: file.pitchDeck?.[0]?.originalname || startup.pitchDeck?.file_name, 
          file_url: uploadedFiles.pitchDeckUrl || startup.pitchDeck?.file_url 
        };
      }
      if (uploadedFiles.startupLogoUrl) {
        startup.startupLogo = { 
          file_name: file.startupLogo?.[0]?.originalname || startup.startupLogo?.file_name, 
          file_url: uploadedFiles.startupLogoUrl || startup.startupLogo?.file_url 
        };
      }
      if (uploadedFiles.bannerImageUrl) {
        startup.bannerImage = { 
          file_name: file.bannerImage?.[0]?.originalname || startup.bannerImage?.file_name, 
          file_url: uploadedFiles.bannerImageUrl || startup.bannerImage?.file_url 
        };
      }

      await startup.save({ validateBeforeSave: false });

      return res.status(200).json({ message: "Startup details updated successfully", startup });
    } else {
      // Create new startup
      startup = new Startup({
        user_id: userId,
        startupName,
        tagline,
        description,
        stage,
        category,
        blockchainPlatforms,
        socialLinks: socialLinksParsed,
        whitepaperText:whitePaperText,
        whitepaper_Url: wpaperurl,
        startupLogo: uploadedFiles.startupLogoUrl 
          ? { file_name: file.startupLogo?.[0]?.originalname, file_url: uploadedFiles.startupLogoUrl } 
          : null,
        bannerImage: uploadedFiles.bannerImageUrl 
          ? { file_name: file.bannerImage?.[0]?.originalname, file_url: uploadedFiles.bannerImageUrl } 
          : null,
        pitchDeck: uploadedFiles.pitchDeckUrl 
          ? { file_name: file.pitchDeck?.[0]?.originalname, file_url: uploadedFiles.pitchDeckUrl } 
          : null,
        pitchDeckText,
        pitchDeck_Url,
        pitchDemoVideo_Url: pitchDemoVideo || null,
      });

      await startup.save({ validateBeforeSave: false });

      return res.status(200).json({ message: "Startup step 1 saved successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.submitTractionDetails = async (req, res) => {
  try {
    const userId=req.user_id;
    const {
      waitlistSignups,
      strategicPartners,
      communitySize,
      growthMetrics,
      others
    } = req.body;

    // Find the startup and update traction metrics
    const startup = await Startup.findOneAndUpdate(
        { user_id: userId }, // Correct query filter
        {
          $set: {
            "traction.waitlistSignups": waitlistSignups,
            "traction.strategicPartners": strategicPartners,
            "traction.communitySize": communitySize,
            "traction.growthMetrics": growthMetrics,
            "traction.others": others,
          },
        },
        { new: true, runValidators: true } // Ensure updated data is returned
      );
      

    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    res.status(200).json({ message: "Step 2 updated successfully", traction:startup.traction});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addTeamMember = async (req, res) => {
  try {
    const userId=req.user_id // Assuming user ID is extracted from auth middleware
    const { fullName, title, shortBio, socialLinks } = req.body;
    const file = req.files; // File upload for profile picture

    if (!fullName || !title) {
      return res.status(400).json({ message: "Full name and title are required." });
    }

    // Convert socialLinks from JSON string to object (if sent as form-data)
    const socialLinksParsed = socialLinks ? JSON.parse(socialLinks) : {};

    const containerName = process.env.AZURE_CONTAINER_NAME; // The name of the Azure Blob container where you want to store the files

    // Upload the files to Azure and get URLs using your uploadFileToAzure function
    const profilePicUrl = file.profile_pic_file && file.profile_pic_file.length > 0
      ? await uploadFileToAzure(containerName, file.profile_pic_file[0].buffer, file.profile_pic_file[0].originalname)
      : null;

    const newTeamMember = {
      fullName,
      title,
      profilePicture: { file_name: file.profile_pic_file[0].originalname, file_url: profilePicUrl },
      shortBio,
      socialLinks: socialLinksParsed,
    };

    // Find and update startup
    const startup = await Startup.findOneAndUpdate(
      { user_id: userId },
      { $push: { coreTeam: newTeamMember } }, // Add new team member to the array
      { new: true, runValidators: true }
    );

    if (!startup) {
      return res.status(404).json({ message: "Startup not found." });
    }

    res.status(201).json({ message: "Team member added successfully.", coreTeam: startup.coreTeam });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.submitStartupRoadmap = async (req, res) => {
    try {
      const userId = req.user_id;
      const { roadmap } = req.body; // Expecting an array of roadmap objects
  
      if (!roadmap || !Array.isArray(roadmap) || roadmap.length === 0) {
        return res.status(400).json({ message: "Roadmap data is required and should be an array" });
      }
  
      // Find the startup entry
      let startup = await Startup.findOne({ user_id: userId });
      if (!startup) {
        return res.status(404).json({ message: "Startup not found. Please complete previous steps first." });
      }
  
      // Validate roadmap items
      const formattedRoadmap = roadmap.map(item => ({
        quarterYear: item.quarterYear,
        milestones: item.milestones, // Expecting array of strings
        status: item.status || "Incomplete" // Default status to Incomplete if not provided
      }));
  
      // Update startup with roadmap data
      startup.roadmap = formattedRoadmap;
      await startup.save({validateBeforeSave:false});
  
      res.status(200).json({ message: "Roadmap updated successfully", roadmap:startup.roadmap });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.submitStartupTokenomics = async (req, res) => {
    try {
      const userId = req.user_id;
      const {
        tokenName,
        symbol,
        totalSupply,
        tokenType,
        initialPrice,
        useCases,
        tokenDistribution
      } = req.body;
  
      if (!tokenName || !symbol || !totalSupply || !tokenType || !initialPrice || !useCases || !tokenDistribution) {
        return res.status(400).json({ message: "All tokenomics fields are required" });
      }
  
      // Find the startup entry
      let startup = await Startup.findOne({ user_id: userId });
      if (!startup) {
        return res.status(404).json({ message: "Startup not found. Please complete previous steps first." });
      }
  
      // Validate token distribution structure
      if (
        typeof tokenDistribution !== "object" ||
        tokenDistribution.publicSale == undefined ||
        tokenDistribution.teamAdvisors == undefined ||
        tokenDistribution.foundation == undefined ||
        tokenDistribution.ecosystemGrowth == undefined ||
        tokenDistribution.strategicPartners == undefined ||
        tokenDistribution.others==undefined
      ) {
        return res.status(400).json({ message: "Invalid token distribution format" });
      }
  
      // Convert useCases to an array if it’s a string (comma-separated)
      const formattedUseCases = Array.isArray(useCases) ? useCases : useCases.split(",");
  
      // Update tokenomics details
      startup.tokenomics = {
        tokenName,
        symbol,
        totalSupply,
        tokenType,
        initialPrice,
        useCases: formattedUseCases,
        tokenDistribution
      };
  
      const wasAlreadyCompleted = startup.completedStatus;
      // Mark Startup as completed
      startup.completedStatus = true;
  
      await startup.save();

      const user = await User.findOne({ user_id: userId }).lean().select("email username");
      const invite_link="https://www.onlyfounders.xyz/marketplace";

      if(!wasAlreadyCompleted){

        const templatePath = path.join(__dirname, '../templates/startupSubmissionMail.html');
        await emailService.sendInvitationMail(user.email, user.username, invite_link, "Your Web3 Project is Now in Review! 🚀", templatePath);


        mixpanel.track('Startup Register', {
          distinct_id: userId,// Unique user ID for tracking
          user_id:userId,
          project_id:startup._id,
          startupName:startup.startupName,
          startupCategory:startup.category,
          startupStage:startup.stage,
          signup_date: new Date().toISOString(),
        });
    
        mixpanel.people.set(userId, {
          $project_id:startup._id,
          $startupName:startup.startupName,
          $startupCategory:startup.category,
          $startupStage:startup.stage,
          $created: new Date().toISOString(),  // Timestamp for user creation
        });
      }
  
      return res.status(200).json({ message: "Tokenomics updated successfully, Startup marked as completed", tokenomics:startup.tokenomics });
  
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  exports.checkStartup=async(req,res)=>{
    try{
      const userId=req.user_id;
      const startup=await Startup.findOne({user_id:userId}).lean().select("_id");
      if(!startup){
        return res.status(200).json({status:false});
      }
      return res.status(200).json({status:true});

    }catch(error){
      return res.status(500).json({message:error.message});
    }
  };

exports.listAllStartups = async(req,res)=>{
    try{
        
        const startups=await Startup.find({completedStatus:true});
        if(!startups){
            res.status(500).json({message:"startups not found"});
        }
        return res.status(200).json({message:"All startups",startups});

    }catch(error){
        return res.status(500).json({message:error.message});

    }
}


  exports.upvoteStartup = async (req, res) => {
  const startupId = req.params.id;
  const userId = req.user_id; // Assuming you have user ID in req.user_id
  if (!startupId) return res.status(400).json({ error: 'startup ID is required' });

  if (!userId) return res.status(400).json({ error: 'User ID is required' });

  try {
    const startup = await Startup.findById(startupId);

    if (!startup) {
      return res.status(404).json({ error: 'startup not found' });
    }

    const hasUpvoted = startup.upvotedBy.includes(userId);

    if (hasUpvoted) {
      // Remove upvote
      startup.upvote -= 1;
      startup.upvotedBy = startup.upvotedBy.filter(id => id !== userId);
    } else {
      // Add upvote
      startup.upvote += 1;
      startup.upvotedBy.push(userId);
    }

    await startup.save();

    return res.status(200).json({
      success: true,
      upvote: startup.upvote,
      upvoted: !hasUpvoted
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.getUpvoteCount=async (req, res) => {
  try{

    const startupId = req.params.id;
    if (!startupId) return res.status(400).json({ error: 'startup ID is required' });
    const startup= await Startup.findOne({_id:startupId}).lean().select("upvote");
    if(!startup){
      return res.status(500).json({message:"No startup found"});
    }
    return res.status(200).json({message:"Upvote count",upvote:startup.upvote});

  }catch(error){
    return res.status(500).json({message:error.message});
  }
};

exports.hasUpvoted = async (req, res) => {
  try{
    const projectId=req.params.id;
    const userId=req.user_id;

    const hasUserUpvoted = await Startup.findOne({
      _id: projectId,
      upvotedBy: userId,
    });

    if(hasUserUpvoted){
      return res.status(200).json({message:"User has already upvoted",status:true});
    }
    else{
      return res.status(200).json({message:"User has not upvoted",status:false});
    }

    

  }catch(error){
    return res.status(500).json({message:error.message});
  }



};

exports.viewStartup = async (req, res) => {
  try {
    const { projectId } = req.body;

    // Find the startup
    const startup = await Startup.findOne({ _id: projectId });
    if (!startup) {
      return res.status(404).json({ message: "No startup found" });
    }

    // Get founder's profile using user_id from startup (assuming Startup has user_id field)
    const founderProfile = await Profile.findOne({ user_id: startup.user_id });

    // Attach founder name to the response
    const response = {
      ...startup._doc, // include all startup fields
      founderName: founderProfile ? founderProfile.username : null
    };

    return res.status(200).json({ message: "Startup detail", startup: response });

  } catch (error) {
    console.error("Error viewing startup:", error);
    return res.status(500).json({ message: error.message });
  }
};



exports.viewFounder = async(req,res)=>{

  try{
    const {projectId} = req.body;
    const startup=await Startup.findOne({_id:projectId});
    if(!startup){
        return res.status(500).json({message:"No startup found"});
    }
    console.log("user_id",startup.user_id);
    const founder=await Profile.findOne({user_id:startup.user_id});
    if(!founder){
        return res.status(500).json({message:"No founder found"});
    }
    return res.status(200).json({message:"Founder detail",founder});
  
  }catch(error){
    return res.status(500).json({message:error.message});
  }
};


exports.toggleWatchlist = async (req, res) => {
    try {
      const userId = req.user_id; // User ID from authentication middleware
      const { projectId } = req.body; // Startup ID from request body
  
      if (!projectId) {
        return res.status(400).json({ message: "Project ID is required" });
      }
  
      // Find the user's profile
      let profile = await Profile.findOne({ user_id: userId });
  
      if (!profile) {
        return res.status(404).json({ message: "User profile not found" });
      }
  
      let watchListField;
  
      // Determine whether to update founderData or investorData
      if (profile.role === "Founder" && profile.founderData) {
        watchListField = "founderData.watchList";
      } else if (profile.role === "Investor" && profile.investorData) {
        watchListField = "investorData.watchList";
      } else {
        return res.status(400).json({ message: "Invalid role or profile data missing" });
      }
  
      // Check if the project is already in the watchlist
      const isAlreadyInWatchlist = profile[profile.role.toLowerCase() + "Data"].watchList.includes(projectId);
  
      let update;
      if (isAlreadyInWatchlist) {
        // Remove from watchlist
        update = { $pull: { [watchListField]: projectId } };
      } else {
        // Add to watchlist
        update = { $addToSet: { [watchListField]: projectId } };
      }
  
      // Update the user's profile
      const updatedProfile = await Profile.findOneAndUpdate({ user_id: userId }, update, { new: true });
  
      res.status(200).json({
        message: isAlreadyInWatchlist ? "Removed from watchlist" : "Added to watchlist",
        profile: updatedProfile,
      });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  exports.getWatchlistStartups = async (req, res) => {
    try {
      const userId = req.user_id;
  
      // Find the user's profile
      const profile = await Profile.findOne({ user_id: userId });
  
      if (!profile) {
        return res.status(404).json({ message: "User profile not found" });
      }
  
      let watchListField;
      if (profile.role === "Founder" && profile.founderData) {
        watchListField = profile.founderData.watchList;
      } else if (profile.role === "Investor" && profile.investorData) {
        watchListField = profile.investorData.watchList;
      } else {
        return res.status(400).json({ message: "Invalid role or missing profile data" });
      }
  
      if (!watchListField || watchListField.length === 0) {
        return res.status(200).json({ message: "No startups in the watchlist", startups: [] });
      }
  
      // Fetch all startups in the watchlist
      const startups = await Startup.find({ _id: { $in: watchListField } });
  
      res.status(200).json({ message: "Watchlist startups fetched successfully", startups });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  exports.deleteStartup = async (req, res) => {
    try {
      const { projectId } = req.body; // Extract project ID from request body
      const userId = req.user_id; // Get user ID from authentication middleware
  
      // Find the startup owned by the user
      const startup = await Startup.findOne({ _id: projectId, user_id: userId });
  
      if (!startup) {
        return res.status(404).json({ message: "Startup not found or you don't have permission to delete it." });
      }
  
      // Delete the startup
      await Startup.findByIdAndDelete(projectId);
  
      res.status(200).json({ message: "Startup deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getFeaturedProjects = async (req, res) => {
    try {
      // Fetch all featured startups
      const startups = await Startup.find(
        { featuredStatus: "Featured" },
        "_id startupName user_id tagline category stage blockchainPlatforms totalRaised startupLogo bannerImage "
      );
  
      if (!startups || startups.length === 0) {
        return res.status(404).json({ message: "No featured startups found" });
      }
  
      // Extract all user_ids from startups to fetch profiles & campaigns efficiently
      const userIds = startups.map(startup => startup.user_id);
  
      // Fetch all founders' names in one query
      const profiles = await Profile.find({ user_id: { $in: userIds } }).select("user_id username");
      const profileMap = profiles.reduce((acc, profile) => {
        acc[profile.user_id] = profile.username;
        return acc;
      }, {});
  
      // Fetch all campaigns in one query
      const campaigns = await Campaign.find({ user_id: { $in: userIds } }).select("user_id fundingTarget deadline");
      const campaignMap = campaigns.reduce((acc, campaign) => {
        acc[campaign.user_id] = { fundingTarget: campaign.fundingTarget, fundingDeadline: campaign.deadline };
        return acc;
      }, {});
  
      // Construct the response
      const response = startups.map(startup => ({
        startupName: startup.startupName,
        startup_id:startup._id,
        startupLogo:startup.startupLogo?.file_url,
        bannerImage:startup.bannerImage?.file_url,
        founderName: profileMap[startup.user_id] || "Unknown",
        tagline: startup.tagline,
        category: startup.category,
        startupStage: startup.stage,
        blockchainPlatform: startup.blockchainPlatforms[0],
        totalRaised: startup.totalRaised,
        goal: campaignMap[startup.user_id]?.fundingTarget || null,
        deadline: campaignMap[startup.user_id]?.fundingDeadline || null,
      }));
  
      return res.status(200).json({ message: "Startup details", startups: response });
  
    } catch (error) {
      console.error("Error fetching featured startups:", error);
      return res.status(500).json({ message: error.message });
    }
  };
  
  exports.markRoadmapMilestoneDone = async (req, res) => {
    try {
      const { roadmapId, milestoneIndex } = req.body; // Get roadmapId and milestoneIndex from the request body
      const userId = req.user_id;
  
      // Find the startup by user_id
      const startup = await Startup.findOne({ user_id: userId });
  
      if (!startup) {
        return res.status(500).json({ message: "Startup not found" });
      }
  
      // Find the specific roadmap
      const roadmap = startup.roadmap.id(roadmapId);
  
      if (!roadmap) {
        return res.status(404).json({ message: "Roadmap not found" });
      }
  
      // Check if the milestone index is valid
      if (milestoneIndex < 0 || milestoneIndex >= roadmap.milestones.length) {
        return res.status(400).json({ message: "Invalid milestone index" });
      }
  
      // Mark the milestone as done
      roadmap.milestones[milestoneIndex].status = "Complete";
  
      // Check if all milestones are complete
      const allMilestonesComplete = roadmap.milestones.every(
        (milestone) => milestone.status === "Complete"
      );
  
      // Update roadmap status if all milestones are completed
      if (allMilestonesComplete) {
        roadmap.status = "Complete";
      }
  
      // Save the updated startup
      await startup.save();
  
      res.status(200).json({
        message: "Milestone marked as complete",
        roadmap,
      });
    } catch (error) {
      console.error("Error marking milestone:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  exports.getStartupListing = async (req, res) => {
    try {
      // Fetch all featured startups
      const startups = await Startup.find(
        {completedStatus:true},
        " _id startupName user_id tagline category stage blockchainPlatforms totalRaised startupLogo bannerImage featuredStatus verifiedStatus "
      );
  
      if (!startups || startups.length === 0) {
        return res.status(404).json({ message: "No featured startups found" });
      }
  
      // Extract all user_ids from startups to fetch profiles & campaigns efficiently
      const userIds = startups.map(startup => startup.user_id);
  
      // Fetch all founders' names in one query
      const profiles = await Profile.find({ user_id: { $in: userIds } }).select("user_id username");
      const profileMap = profiles.reduce((acc, profile) => {
        acc[profile.user_id] = profile.username;
        return acc;
      }, {});
  
      // Fetch all campaigns in one query
      const campaigns = await Campaign.find({ user_id: { $in: userIds } }).select("user_id fundingTarget deadline");
      const campaignMap = campaigns.reduce((acc, campaign) => {
        acc[campaign.user_id] = { fundingTarget: campaign.fundingTarget, fundingDeadline: campaign.deadline };
        return acc;
      }, {});
  
      // Construct the response
      const response = startups.map(startup => ({
        startup_id:startup._id,
        startupName: startup.startupName,
        startupLogo:startup.startupLogo?.file_url,
        bannerImage:startup.bannerImage?.file_url,
        founderName: profileMap[startup.user_id] || "Unknown",
        tagline: startup.tagline,
        category: startup.category,
        startupStage: startup.stage,
        blockchainPlatform: startup.blockchainPlatforms[0],
        totalRaised: startup.totalRaised,
        featuredStatus:startup.featuredStatus,
        verifiedStatus:startup.verifiedStatus,
        goal: campaignMap[startup.user_id]?.fundingTarget || null,
        deadline: campaignMap[startup.user_id]?.fundingDeadline || null,
      }));
  
      return res.status(200).json({ message: "Startup details", startups: response });
  
    } catch (error) {
      console.error("Error fetching featured startups:", error);
      return res.status(500).json({ message: error.message });
    }
  };

exports.deleteCoreTeamMember = async (req, res) => {
  const { startupId, teamMemberId } = req.body;

  try {
    const userId=req.user_id;
   
    const startup = await Startup.findById(startupId);

    if (!startup) {
      return res.status(500).json({ message: "Startup not found" });
    }

    if(userId !==startup.user_id){
      return res.status(500).json({message:"You cannot delete the team Member , Ask project owner"})
    }

    // Filter out the team member
    const initialLength = startup.coreTeam.length;
    startup.coreTeam = startup.coreTeam.filter(
      member => member._id.toString() !== teamMemberId
    );

    if (startup.coreTeam.length === initialLength) {
      return res.status(404).json({ message: "Team member not found" });
    }

    await startup.save();

    res.status(200).json({ message: "Team member deleted successfully", coreTeam: startup.coreTeam });
  } catch (error) {
    console.error("Error deleting team member:", error);
    res.status(500).json({ message: "Server error" });
  }
};
