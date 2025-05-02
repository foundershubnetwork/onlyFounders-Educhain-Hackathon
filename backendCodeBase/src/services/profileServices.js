const { Profile } = require("../models/profileModel");
const { User } = require("../models/userModel");
const { uploadFileToAzure } = require("../middlewares/storageMiddleware");
const emailService = require("./emailService");
const path = require('path');
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init('72c64bcf935dfc27524cc84bb51bca17');


exports.submitRole = async (userId, role) => {
  try {

    let existingProfile = await Profile.findOne({ user_id: userId });
    if (!existingProfile) {
      const profile = new Profile({ user_id: userId, role: role });
      await profile.save({ validateBeforeSave: false });
      return profile;
    }
    else {
      existingProfile.role = role;
      await existingProfile.save({ validateBeforeSave: false });
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

      const bannerImageUrl = file.bannerImage && file.bannerImage.length > 0
      ? await uploadFileToAzure(containerName, file.bannerImage[0].buffer, file.bannerImage[0].originalname)
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

    existingProfile.bannerImage = {
      file_name: file.bannerImage?.[0]?.originalname || existingProfile.bannerImage?.file_name,
      file_url: bannerImageUrl || existingProfile.bannerImage?.file_url
    };

    // Role-based data updates
    if (profileData.role === "Founder") {
      existingProfile.founderData = profileData.founderData;
    } else if (profileData.role === "Investor") {
      existingProfile.investorData = profileData.investorData;
    } else if (profileData.role === "ServiceProvider") {
      existingProfile.serviceProviderData = profileData.serviceProviderData;
    }

    const wasAlreadyCompleted = existingProfile.completedStatus; // Check before updating
    existingProfile.completedStatus = true;

    // Save the updated profile
    await existingProfile.save();

    const user = await User.findOne({ user_id: userId }).lean().select("email");
    if (!user) {
      throw new Error("User not found");
    }

    const invite_link = "https://onlyfounders.xyz/";

    if (!wasAlreadyCompleted) {
      const role = profileData.role;

      if (role === "Founder") {
        const templatePath = path.join(__dirname, '../templates/profileSubmissionMail.html');
        await emailService.sendInvitationMail(user.email, profileData.username, invite_link, "AI-Driven Funding Opportunities Unlocked – Profile Completed!", templatePath);
      } else if (role === "Investor") {
        const templatePath = path.join(__dirname, '../templates/investorProfileMail.html');
        await emailService.sendInvitationMail(user.email, profileData.username, invite_link, "Tailored Investment Opportunities Unlocked – Profile Completed!", templatePath);
      } else if (role === "ServiceProvider") {
        const templatePath = path.join(__dirname, '../templates/serviceProviderMail.html');
        await emailService.sendInvitationMail(user.email, profileData.username, invite_link, "Your Listing is Optimized, More Visibility, More Clients – Profile Completed", templatePath);
      }
    }

    mixpanel.track('ProfileCreation', {
      distinct_id: userId,
      username: profileData.username,  // Unique user ID for tracking
      role: existingProfile.role,
      Bio: profileData.bio,
      location: profileData.location,
      signup_date: new Date().toISOString(),
    });

    mixpanel.people.set(userId, {
      $name: profileData.username,
      $role: existingProfile.role,
      $Bio: profileData.bio,
      $location: profileData.location,
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


