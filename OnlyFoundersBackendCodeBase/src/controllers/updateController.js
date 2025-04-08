const updateService = require("../services/updateServices");
const {Profile}=require("../models/profileModel");
const {Comment}=require("../models/updateModel");
const Startup=require("../models/startupModel");
const {Update}=require("../models/updateModel");


exports.createUpdate = async (req, res) => {
  try {
    const userId= req.user_id;
    const {  update_id,title, updateType, content } = req.body;
    const file = req.files;
    const project_id=await Startup.findOne({user_id:userId});

    if (!userId || !project_id || !title || !updateType || !content) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }


    const update = await updateService.createUpdate(userId, project_id, update_id, title, updateType, content, file);

    res.status(201).json({ message: "Update created successfully", update });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUpdates=async (req,res)=>{

    try{
        const userId=req.user_id;
        const {projectId}=req.body;
        if(!userId || !projectId){
            res.status(400).json({message:"ProjectId and userId is must"});
        }
        const updates=await updateService.getAllUpdates(userId,projectId);
        return res.status(200).json({message:"All updates",updates});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

exports.getUpdatesInDashboard = async(req,res)=>{
  try{
    const userId=req.user_id;
        if(!userId){
            res.status(400).json({message:"userId is must"});
        }
        const updates= await Update.find({user_id:userId});
        if(!updates){
            throw new Error("No updates found");
        }
        return res.status(200).json({message:"All updates",updates});

  }catch(error){
    res.status(500).json({message:error.message});
  }
};


exports.deleteUpdate = async (req, res) => {
  try {
    const userId = req.user_id;
    const { update_id } = req.body;

    if (!update_id) {
      return res.status(400).json({ message: "Update ID is required." });
    }

    const deletedUpdate = await updateService.deleteUpdate(userId, update_id);

    if (!deletedUpdate) {
      return res.status(404).json({ message: "Update not found or not authorized to delete." });
    }

    res.status(200).json({ message: "Update deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likeUpdate=async(req,res)=>{

    try{
        const userId=req.user_id;
        const{update_id}=req.body;
        const likeupdate = await updateService.likeUpdate(update_id);
        if(!likeupdate){
            return res.status(500).json({message:"Unbale to fetch likes"});
        }
        return res.status(200).json({message:"Likes",likeupdate});

    }catch(error){
        return res.status(500).json({message:error.message});
    }


};

exports.addComment= async (req, res) => {
  try {

    const profileId=req.user_id;// that has logged in and come on comment section
    const { updateId, content } = req.body;

    // Fetch the investor details from the Profile schema
    const profile = await Profile.findOne({user_id:profileId});
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    const investorName = profile.username;
    const investorType = profile.investorData?.investorType || "Unknown";

    // Create a new comment
    const newComment = new Comment({
      updateId,
      profileId,
      investorName,
      investorType,
      content,
    });

    await newComment.save();


    return res.status(201).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllCommentofUpdate= async (req, res) => {
  try {
    const { updateId } = req.body;
    const comments = await Comment.find({ updateId }).sort({ createdAt: -1 });

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



