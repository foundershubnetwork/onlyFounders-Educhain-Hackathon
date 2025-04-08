const {Campaign}=require("../models/campaignModel");
const Startup = require("../models/startupModel"); // Import Startup model
const { uploadFileToAzure } = require("../middlewares/storageMiddleware");
const {Profile}=require("../models/profileModel");
const {Milestone}=require("../models/campaignModel");

exports.submitCampaignBasicDetails = async (req, res) => {
  try {
    const userId = req.user_id;
    const project = await Startup.findOne({ user_id: userId });
    const projectId = project?._id;

    if (!userId || !projectId) {
      return res.status(400).json({
        message: "No campaigns can be created. Please list your startup first.",
      });
    }

    const file = req.files;
    const { campaignOverview, stage } = req.body; // Get stage from req.body
    const containerName = process.env.AZURE_CONTAINER_NAME;
    const campaignId = req.body.campaign_id || null;

    const bannerImageUrl =
      file.bannerImage && file.bannerImage.length > 0
        ? await uploadFileToAzure(
            containerName,
            file.bannerImage[0].buffer,
            file.bannerImage[0].originalname
          )
        : null;

    let campaign;

    if (campaignId) {
      // Check if the campaign exists to update
      campaign = await Campaign.findById(campaignId);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }

      // Update campaign details
      campaign.campaignOverview = campaignOverview;
      campaign.campaignName = project.startupName;
      campaign.tagline = project.tagline;
      campaign.description = project.description;
      campaign.category = project.category;
      campaign.stage = stage || project.stage; // Use the new stage if provided
      campaign.logo = project.startupLogo;
      campaign.tokenPrice = project.tokenPrice;
      campaign.banner = {
        file_name:
          file.bannerImage?.[0]?.originalname || project.bannerImage?.file_name,
        file_url: bannerImageUrl || campaign.banner.file_url,
      };
      campaign.socialLinks = project.socialLinks;
    } else {
      // Create a new campaign
      campaign = new Campaign({
        user_id: userId,
        project_id: projectId,
        campaignOverview,
        campaignName: project.startupName,
        tagline: project.tagline,
        description: project.description,
        category: project.category,
        stage: stage || project.stage, // Use the new stage if provided
        logo: project.startupLogo,
        tokenPrice: project.tokenPrice,
        banner: {
          file_name: file.bannerImage?.[0]?.originalname,
          file_url: bannerImageUrl,
        },
        socialLinks: project.socialLinks || {},
      });
    }

    // ✅ Update startup stage if changed
    if (stage && stage !== project.stage) {
      project.stage = stage;
      await project.save(); // Save the updated stage in Startup
    }

    // Save or update campaign
    await campaign.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: "Step 1 saved successfully",
      campaign_id: campaign._id,
      campaign,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

  


  exports.submitCampaignFundingDetails = async (req, res) => {
    try {
      const { campaign_id, fundingTarget, fundraisingWallet, acceptedCurrencyType, fullyDilutedValuation, initialMarketCap, vestingSummary, deadline ,dealName,dealRound,} = req.body;
  
      const campaign = await Campaign.findById(campaign_id);
  
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
  
      // Update funding details
      campaign.fundingTarget = fundingTarget;
      campaign.fundraisingWallet = fundraisingWallet;
      campaign.acceptedCurrencyType = acceptedCurrencyType;
      campaign.fullyDilutedValuation = fullyDilutedValuation;
      campaign.initialMarketCap = initialMarketCap;
      campaign.vestingSummary = vestingSummary;
      campaign.deadline = deadline;
      campaign.dealName = dealName;
      campaign.dealRound = dealRound;
  
      await campaign.save();
      return res.status(200).json({
        message: "Step 2 saved successfully",
        campaign,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
  

  exports.addFaq = async (req, res) => {
    try {
      const { campaign_id, faqs } = req.body;
  
      const campaign = await Campaign.findById(campaign_id);
  
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
  
      // Validate FAQ limit
      if (!faqs || faqs.length < 1 || faqs.length > 5) {
        return res.status(400).json({
          message: "FAQs must contain at least 1 and at most 5 entries",
        });
      }
  
      // Update FAQs
      campaign.faqs = faqs;
  
      await campaign.save();
      return res.status(200).json({
        message: "Step 4 saved successfully",
        campaign,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
  

  // Fetch predefined milestones based on startup stage from Step 1
exports.fetchMilestones = async (req, res) => {
  try {
    const { campaign_id } = req.body;

    //  Check if the campaign exists
    const campaign = await Campaign.findById(campaign_id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    //  Get the startup stage from the campaign
    const { stage } = campaign;

    //  Fetch predefined milestones based on startup stage
    const predefinedMilestones = await Milestone.findOne({ stage });
    if (!predefinedMilestones || predefinedMilestones.milestones.length === 0) {
      return res
        .status(404)
        .json({ message: "No predefined milestones found for this stage" });
    }

    // Return predefined milestones to frontend for display
    return res.status(200).json({
      message: "Predefined milestones fetched successfully",
      predefinedMilestones: predefinedMilestones.milestones,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


// Submit predefined + user milestones together
exports.submitCampaignMilestones = async (req, res) => {
  try {
    const { campaign_id, userMilestones } = req.body;
   

    // 1️⃣ Check if the campaign exists
    const campaign = await Campaign.findById(campaign_id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    const { stage } = campaign;

    //  Fetch predefined milestones based on startup stage
    const predefinedMilestones = await Milestone.findOne({ stage });
    if (!predefinedMilestones || predefinedMilestones.milestones.length === 0) {
      return res
        .status(404)
        .json({ message: "No predefined milestones found for this stage" });
    }

    // 2️⃣ Combine predefined and user milestones
    const allMilestones = [];

    // Add predefined milestones if provided
    // Add predefined milestones correctly
if (
  predefinedMilestones &&
  predefinedMilestones.milestones &&
  predefinedMilestones.milestones.length > 0
) {
  predefinedMilestones.milestones.forEach((milestone) => {
    allMilestones.push({
      milestoneId: milestone.milestoneId,
      name: milestone.name,
      fundPercentage: milestone.fundPercentage,
      description: milestone.description,
      requirements: milestone.requirements || [],
      verificationProof: milestone.verificationProof || "url",
      milestoneStatus: milestone.milestoneStatus || "incomplete",
    });
  });
}

// Add user-defined milestones if provided
if (userMilestones && userMilestones.length > 0) {
  userMilestones.forEach((milestone) => {
    allMilestones.push({
      milestoneId: milestone.milestoneId,
      name: milestone.name,
      fundPercentage: milestone.fundPercentage,
      description: milestone.description,
      requirements: milestone.requirements || [],
      verificationProof: milestone.verificationProof || "url",
      milestoneStatus: milestone.milestoneStatus || "incomplete",
    });
  });
}

    const totalMilestones = allMilestones.length;
    const milestoneFundPercentage = totalMilestones > 0 ? campaign.fundingTarget / totalMilestones : 0;

    // Update the fundPercentage for all milestones
    allMilestones.forEach((milestone) => {
      milestone.fundPercentage = milestoneFundPercentage;
    });

    console.log(allMilestones);
    // 3️⃣ Save milestones in the campaign
    campaign.milestones = allMilestones;
    campaign.campaignCompletionStatus=true;
    await campaign.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: "Step 5: Milestones added successfully",
      milestones: campaign.milestones,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};



// Edit a Specific FAQ
exports.editFaq = async (req, res) => {
    try {
        const { campaignId, faqId, question, answer } = req.body;

        if (!campaignId || !faqId) {
            return res.status(400).json({ message: 'Campaign ID and FAQ ID are required' });
        }

        let campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        // Find the FAQ inside the campaign
        let faq = campaign.faqs.id(faqId);
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        // Update the specific FAQ fields
        if (question) faq.question = question;
        if (answer) faq.answer = answer;

        await campaign.save();
        res.status(200).json({ message: 'FAQ updated successfully', campaign });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.deleteFaq= async (req, res) => {
    try {
        const { campaignId, faqId } = req.body;
        const userId=req.user_id;
        let campaign = await Campaign.findOne({_id:campaignId, user_id:userId});
        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        // Find the FAQ inside the campaign
        const faqIndex = campaign.faqs.findIndex(faq => faq._id.toString() === faqId);
        if (faqIndex === -1) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        // Remove the FAQ at the found index
        campaign.faqs.splice(faqIndex, 1);

        await campaign.save();
        res.status(200).json({ message: 'FAQ deleted successfully', campaign });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.deleteCampaign = async (req, res) => {
    try {
      const { campaignId } = req.body; // Extract project ID from request body
      const userId = req.user_id; // Get user ID from authentication middleware
  
      // Find the startup owned by the user
      const campaign = await Campaign.findOne({ _id: campaignId, user_id: userId });
  
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found or you don't have permission to delete it." });
      }
  
      // Delete the startup
      await Campaign.findByIdAndDelete(campaignId);
  
      res.status(200).json({ message: "Campaign deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.changeVisibility = async(req,res)=>{

    try{
        const userId=req.user_id;
        const {campaignId,visibilityStatus}=req.body;
        const campaign=await Campaign.findOne({_id:campaignId,user_id:userId});
        if(!campaign){
            return res.status(500).json({message:"campaign not found"});
        }
        campaign.visibility=visibilityStatus;
        await campaign.save();
        return res.status(200).json({message:"visibility changed succesfully",campaign});

    }catch(error){
        return res.status(500).json({message:error.message});
    }


};

exports.changeStatus = async(req,res)=>{

    try{
        const userId=req.user_id;
        const {campaignId,status}=req.body;
        const campaign=await Campaign.findOne({_id:campaignId,user_id:userId});
        if(!campaign){
            return res.status(500).json({message:"campaign not found"});
        }
        campaign.campaignStatus=status;
        await campaign.save();
        return res.status(200).json({message:"status changed succesfully",campaign});

    }catch(error){
        return res.status(500).json({message:error.message});
    }


};

exports.getTokenomicsDetails =async(req,res)=>{
    try{
        const {campaignId}=req.body;
        const campaign=await Campaign.findOne({_id:campaignId});
        if(!campaign){
            return res.status(500).json({message:"No campaign found"});
        }
        const projectId= campaign.project_id;
        const project=await Startup.findOne({_id:projectId});
        const tokenomics=project.tokenomics;
        if(!tokenomics){
            return res.status(500).json({message:"No tokenomics found"});
        }
        return res.status(200).json({message:"tokenomics details",tokenomics});

    }catch(error){
        return res.status(500).json({message:error.message});
    }
};

exports.getFaq = async (req, res) => {
    try {
      const { campaignId } = req.body;
  
      // Find the campaign by ID
      const campaign = await Campaign.findOne({ _id: campaignId });
  
      // Check if campaign exists
      if (!campaign) {
        return res.status(404).json({ message: "No campaign found" });
      }
  
      // Get the FAQs from the campaign
      const faqs = campaign.faqs || [];
  
      // Check if FAQs are empty
      if (faqs.length === 0) {
        return res.status(404).json({ message: "No FAQs found" });
      }
  
      // Return the FAQs
      return res.status(200).json({
        message: "FAQs retrieved successfully",
        faqs,
      });
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      return res.status(500).json({ message: error.message });
    }
  };

exports.getCampaign = async(req,res)=>{
    try{
        const {campaignId}=req.body;
        const campaign = await Campaign.findOne({ _id: campaignId });
  
      // Check if campaign exists
      if (!campaign) {
        return res.status(404).json({ message: "No campaign found" });
      }
      return res.status(200).json({
        message: "campaign retrieved successfully",
        campaign,
      });

    }catch(error){
        console.error("Error fetching FAQs:", error);
        return res.status(500).json({ message: error.message });
    }
};

exports.listCampaign = async (req, res) => {
  try {
    // Fetch all campaigns with relevant fields and populate totalRaised from Startup
    const campaigns = await Campaign.find({campaignCompletionStatus:true})
      .populate("project_id", "totalRaised") // Fetch totalRaised from Startup
      .select(
        "_id campaignName tagline category stage fundingTarget deadline milestones banner logo campaignStatus"
      );

    if (!campaigns || campaigns.length === 0) {
      return res.status(404).json({ message: "No campaigns found" });
    }

    // Map campaigns to the required format
    const campaignList = campaigns.map((campaign) => ({
      campaignName: campaign.campaignName,
      campaignId:campaign._id,
      tagline: campaign.tagline,
      category: campaign.category,
      stage: campaign.stage,
      banner:campaign.banner,
      logo:campaign.logo,
      campaignStatus:campaign.campaignStatus,
      fundingTarget: campaign.fundingTarget,
      deadline: campaign.deadline,
      totalRaised: campaign.project_id?.totalRaised || 0, // Get totalRaised from Startup
      totalMilestones: campaign.milestones?.length || 0, // Count milestones
    }));

    return res.status(200).json({
      message: "Campaigns retrieved successfully",
      campaigns: campaignList,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// exports.getCampaign=async(req,res)=>{
//   try{
//     const {campaignId} = req.body;
//             const campaign=await Campaign.findOne({_id:campaignId});
//             if(!campaign){
//                 return res.status(500).json({message:"No campaign found"});
//             }
//             return res.status(200).json({message:"Campaign detail",campaign});

//   }catch(error){
//     return res.status(500).json({message:error.message});
//   }
// };


// Update requirement status and check milestone completion
exports.updateRequirementStatus = async (req, res) => {
  try {
    const { campaignId, milestoneId, requirementIndex ,Completionstatus} = req.body;

    // Find the campaign by ID
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    // Find the milestone by milestoneId
    const milestoneIndex = campaign.milestones.findIndex(
      (milestone) => milestone.milestoneId === milestoneId
    );
    if (milestoneIndex === -1) {
      return res.status(404).json({ error: 'Milestone not found' });
    }

    // Check if requirement index is valid
    if (
      requirementIndex < 0 ||
      requirementIndex >= campaign.milestones[milestoneIndex].requirements.length
    ) {
      return res.status(404).json({ error: 'Invalid requirement index' });
    }

    // Update requirement status
    if (Completionstatus) {
      campaign.milestones[milestoneIndex].requirements[requirementIndex].status =
        Completionstatus;
    } else {
      campaign.milestones[milestoneIndex].requirements[requirementIndex].status =
        "incomplete"; // Fallback if Completionstatus is invalid
    }
    

    // Check if all requirements are marked as complete
    const allRequirementsComplete = campaign.milestones[milestoneIndex].requirements.every(
      (req) => req.status === 'complete'
    );

    // If all requirements are complete and verification URL is provided, mark milestone as complete
    // if (allRequirementsComplete && verificationUrl) {
    //   campaign.milestones[milestoneIndex].verificationProof = verificationUrl;
    // }

    // Save updated campaign
    await campaign.save();
    res.status(200).json({
      message: 'Requirement status updated successfully!',
      milestone: campaign.milestones[milestoneIndex],
    });
  } catch (error) {
    console.error('Error updating requirement status:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.verifyMilestoneCompletion = async (req, res) => {
  try {
    const { campaignId, milestoneId, verificationUrl } = req.body;

    // 1️⃣ Find the campaign by ID
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    // 2️⃣ Find the milestone by milestoneId
    const milestoneIndex = campaign.milestones.findIndex(
      (milestone) => milestone.milestoneId === milestoneId
    );
    if (milestoneIndex === -1) {
      return res.status(404).json({ error: "Milestone not found" });
    }

    const milestone = campaign.milestones[milestoneIndex];

    // 3️⃣ Check if all requirements are marked as 'complete'
    const allRequirementsComplete = milestone.requirements.every(
      (req) => req.status === "complete"
    );

    if (!allRequirementsComplete) {
      return res
        .status(400)
        .json({ error: "All requirements are not marked as complete" });
    }

    // 4️⃣ Update milestone status and add verification URL if provided
    if (!verificationUrl) {
      return res
        .status(400)
        .json({ error: "Verification URL is required to mark milestone complete" });
    }

    milestone.verificationProof = verificationUrl;
    // milestone.milestoneStatus = "complete";

    // // 5️⃣ Check if all milestones are completed to update campaign status
    // const allMilestonesComplete = campaign.milestones.every(
    //   (ms) => ms.milestoneStatus === "complete"
    // );
    // if (allMilestonesComplete) {
    //   campaign.campaignCompletionStatus = true;
    // }

    // 6️⃣ Save the updated campaign
    await campaign.save();

    res.status(200).json({
      message: "Milestone verified and marked as complete successfully!",
      milestone: milestone,
    });
  } catch (error) {
    console.error("Error verifying milestone completion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.getProjectId = async (req, res) => {
  try {
    const userId = req.user_id;
    const project = await Startup.findOne({ user_id: userId }).lean().select("_id");

    if (!project) {
      return res.status(500).send("No Startup found for this user");
    }

    return res.status(200).json({projectId:project._id});
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
