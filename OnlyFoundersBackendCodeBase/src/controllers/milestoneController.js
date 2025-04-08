const { Milestone } = require("../models/updateModel");
const {Campaign}=require("../models/campaignModel");
const Startup=require("../models/startupModel");
const { uploadFileToAzure } = require("../middlewares/storageMiddleware");

exports.createMilestone = async (req, res) => {
  try {
    const userId=req.user_id;
    const project=await Startup.findOne({user_id:userId});
    const projectId=project._id;
    const {campaignId}=req.body;
    const {  title, description, startDate, dueDate, status,fundingAmount, tasks } = req.body;
    console.log(userId);

    // Validate required fields
    if (!userId || !title || !description || !startDate || !dueDate || !status || fundingAmount === undefined) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const campaign=await Campaign.findOne({user_id:userId, "_id":campaignId});
    if(!campaign){
        return res.status(400).json({message:"No campaign found"});
    }

    // Create a new milestone instance
    const milestone = new Milestone({
      user_id:userId,
      project_id:projectId,
      campaign_id:campaignId,
      title,
      description,
      startDate: new Date(startDate),
      dueDate: new Date(dueDate),
    //   completedDate: completedDate ? new Date(completedDate) : null,
      progress:0,
      status,
      fundingAmount,
      tasks: tasks || [],
    });


    // Save milestone to database
    await milestone.save();

    res.status(200).json({ message: "Milestone created successfully", milestone });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.markTaskAsDone = async (req, res) => {
    try {
        const { taskId } = req.body;

        if (!taskId) {
            return res.status(400).json({ message: "Task ID is required" });
        }

        // Find the milestone containing the task
        const milestone = await Milestone.findOne({ "tasks._id": taskId });

        if (!milestone) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Update the specific task inside the tasks array
        let completedTasks = 0;
        milestone.tasks.forEach(task => {
            if (task._id.toString() === taskId) {
                task.completed = true;
            }
            if (task.completed) {
                completedTasks++; // Count completed tasks
            }
        });

        // Calculate progress percentage
        milestone.progress = Math.round((completedTasks / milestone.tasks.length) * 100);

        // If all tasks are completed, update status and completedDate
        if (completedTasks === milestone.tasks.length) {
            milestone.completedDate = new Date();
            milestone.status = "completed";
        }

        await milestone.save();

        return res.status(200).json({
            message: "Task marked as completed",
            milestone,
        });

    } catch (error) {
        console.error("Error marking task as completed:", error.message);
        res.status(500).json({ message: error.message });
    }
};


exports.addVerificationProof = async (req, res) => {
    try {
        const { milestoneId } = req.body;
        const files = req.files; // Assuming files are uploaded under the key "verificationProof"

        if (!milestoneId) {
            return res.status(400).json({ message: "Milestone ID is required" });
        }

        const milestone = await Milestone.findById(milestoneId);

        if (!milestone) {
            return res.status(404).json({ message: "Milestone not found" });
        }

        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        const containerName = process.env.AZURE_CONTAINER_NAME; // Azure Blob container

        // Upload files to Azure and get URLs
        const proofsUrls = files.verificationProofs
        ? await Promise.all(
            files.verificationProofs.map(async (file) => ({
              file_name: file.originalname,
              file_url: await uploadFileToAzure(containerName, file.buffer, file.originalname),
            }))
          )
        : [];
  

        // Add uploaded file data to verificationProof array
        milestone.verificationProof.push(...proofsUrls);

        await milestone.save();

        return res.status(200).json({
            message: "Verification proofs added successfully",
            verificationProofs: milestone.verificationProof
        });

    } catch (error) {
        console.error("Error adding verification proof:", error.message);
        res.status(500).json({ message: error.message });
    }
};


exports.getMilestone=async(req,res)=>{
    try{
        const {campaignId}= req.body;
        const milestones=await Milestone.find({campaign_id:campaignId});
        if(!milestones){
            return res.status(500).json({message:"Unable to fetch milestones"});
        }
        return res.status(200).json({message:"Milestone fetched successfully",milestones});

    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

exports.getAllMilestones=async(req,res)=>{
    try{
        const userId= req.user_id;
        const milestones=await Milestone.find({user_id:userId});
        if(!milestones){
            return res.status(500).json({message:"Unable to fetch milestones"});
        }
        return res.status(200).json({message:"Milestone fetched successfully",milestones});

    }catch(error){
        return res.status(500).json({message:error.message});
    }
};


exports.getUpcomingMilestones = async (req, res) => {
    try {
        const milestones = await Milestone.find({
            status: { $in: ["pending", "in-progress"] }
        }).populate("project_id campaign_id"); // Populating related project and campaign data

        res.status(200).json({ success: true, data: milestones });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};