const {Update} = require("../models/updateModel");
const { uploadFileToAzure } = require("../middlewares/storageMiddleware");

exports.createUpdate = async (user_id, project_id, update_id, title, updateType, content, files) => {
    try {
      console.log("user_id:", user_id);
      console.log("project_id:", project_id);
      console.log("title:", title);
      console.log("files:", files);
  
      const containerName = process.env.AZURE_CONTAINER_NAME; // Azure Blob container name
  
      // Upload attachments to Azure and get their URLs
      const attachmentUrls = files.attachments
        ? await Promise.all(
            files.attachments.map(async (file) => ({
              file_name: file.originalname,
              file_url: await uploadFileToAzure(containerName, file.buffer, file.originalname),
            }))
          )
        : [];
  
      if (update_id) {
        // Check if the update exists and is associated with the provided project_id
        const existingUpdate = await Update.findOne({ _id: update_id, project_id });
  
        if (!existingUpdate) {
          throw new Error("Update not found or does not belong to the specified project");
        }
  
        // Update only the fields that are provided
        existingUpdate.title = title || existingUpdate.title;
        existingUpdate.updateType = updateType || existingUpdate.updateType;
        existingUpdate.content = content || existingUpdate.content;
  
        // Append new attachments if provided
        if (attachmentUrls.length > 0) {
          existingUpdate.attachments = [...existingUpdate.attachments, ...attachmentUrls];
        }
  
        // Save the updated document
        await existingUpdate.save();
        console.log("Updated Update:", existingUpdate);
        return existingUpdate;
      } else {
        // If `update_id` is not provided, create a new update
        const newUpdate = new Update({
          user_id,
          project_id,
          title,
          updateType,
          content,
          attachments: attachmentUrls,
        });
  
        const savedUpdate = await newUpdate.save();
        console.log("Created Update:", savedUpdate);
        return savedUpdate;
      }
    } catch (error) {
      console.error("Error in createProjectUpdate:", error);
      throw error; // Rethrow the error to be handled by a global error handler
    }
  };
  
exports.getAllUpdates=async(user_id,projectId)=>{

    try{

        const updates= await Update.find({project_id:projectId});
        if(!updates){
            throw new Error("No updates found");
        }
        return updates;


    }catch(error){
        throw error;
    }


};


exports.deleteUpdate = async (userId, updateId) => {
  try {
    // Find the update and ensure the user owns it
    const update = await Update.findOne({ _id: updateId, user_id: userId });

    if (!update) {
     throw new Error("No update found");
    }

    // Delete the update
    await Update.deleteOne({ _id: updateId });

    return update;
  } catch (error) {
    throw new Error("Error deleting update: " + error.message);
  }
};


exports.likeUpdate=async(update_id)=>{

    try{

        if(!update_id){
            throw new Error("update Id required");
        }
        const update=await Update.findOne({_id:update_id});
        update.likes=update.likes+1;
        console.log(update.likes);
        await update.save();
        return update.likes;


    }catch(error){
        throw new Error("Error deleting update: " + error.message);
    }


};
