const { Profile } = require("../models/profileModel");
const { uploadFileToAzure } = require("../middlewares/storageMiddleware");
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init('72c64bcf935dfc27524cc84bb51bca17');


exports.submitRole = async (userId,role) => {
    try {
    
       let existingProfile=await Profile.findOne({user_id:userId});
       if(!existingProfile){
        const profile = new Profile({user_id:userId, role:role});
         await profile.save({validateBeforeSave:false});
         return profile;
       }
       else{
        existingProfile.role=role;
        await existingProfile.save({validateBeforeSave:false});
        return existingProfile;
       }
      
      
    } catch (error) {
      throw new Error(error.message);
    }
  };

  exports.createProfile = async (userId, profileData, file) => {
    try {
      const containerName = process.env.AZURE_CONTAINER_NAME; // Azure Blob container name
  
      // Upload the profile picture to Azure
      const profilePicUrl = file.profile_pic_file && file.profile_pic_file.length > 0
        ? await uploadFileToAzure(containerName, file.profile_pic_file[0].buffer, file.profile_pic_file[0].originalname)
        : null;
  
      // Check if the profile already exists
      let existingProfile = await Profile.findOne({ user_id: userId });
  
      if (!existingProfile) {
        throw new Error("Profile not found"); // Handle case where profile doesn't exist
      }
  
      // Update common profile fields
      existingProfile.username = profileData.username;
      existingProfile.professionalTitle = profileData.professionalTitle;
      existingProfile.bio = profileData.bio;
      existingProfile.location = profileData.location;
      existingProfile.profilePic = { 
        file_name: file.profile_pic_file?.[0]?.originalname || existingProfile.profilePic?.file_name, 
        file_url: profilePicUrl || existingProfile.profilePic?.file_url 
      };
  
      // Role-based data updates
      if (profileData.role === "Founder") {
        existingProfile.founderData = profileData.founderData;
      } else if (profileData.role === "Investor") {
        existingProfile.investorData = profileData.investorData;
      } else if (profileData.role === "ServiceProvider") {
        existingProfile.serviceProviderData = profileData.serviceProviderData;
      }
      
      existingProfile.completedStatus=true;
      // Save the updated profile
      await existingProfile.save();

      mixpanel.track('ProfileCreation', {
        distinct_id: userId,
        username:profileData.username,  // Unique user ID for tracking
        role:existingProfile.role,
        Bio:profileData.bio,
        location:profileData.location,
        signup_date: new Date().toISOString(),
      });
  
      mixpanel.people.set(userId, {
        $name: profileData.username,
        $role:existingProfile.role,
        $Bio:profileData.bio,
        $location:profileData.location,
        $created: new Date().toISOString(),  // Timestamp for user creation
      });
      return existingProfile;
      
    } catch (error) {
      throw new Error(error.message);
    }
  };
  

exports.getProfileByUserId = async (userId) => {
  try {
    return await Profile.findOne({ user_id: userId });
  } catch (error) {
    throw new Error(error.message);
  }
};


