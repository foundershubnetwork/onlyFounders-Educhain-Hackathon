
const Startup = require("../models/startupModel"); // Import Startup model
const { uploadFileToAzure } = require("../middlewares/storageMiddleware");
const { Profile } = require("../models/profileModel");
const { FounderVerification } = require("../models/profileModel");
const crypto=require("crypto");
const {User}=require("../models/userModel");

exports.requestVerification = async (req, res) => {
    try {
        const { twitterHandle, walletAddress } = req.body;
        // const userId = req.user_id;
        // Check if already requested
        const existingRequest = await FounderVerification.findOne({  twitterHandle, walletAddress });
        if (existingRequest && existingRequest.verificationCode ) {
            const code = existingRequest.verificationCode;
            return res.status(400).json({ message: "Verification token", code });
        }

        // Store request
        const newRequest = new FounderVerification({twitterHandle, walletAddress });
        await newRequest.save({validateBeforeSave:false});


        const founder = await FounderVerification.findOne({  twitterHandle, walletAddress });
        if (!founder) {
            return res.status(404).json({ message: "Founder not found" });
        }
        const verificationCode = crypto.randomBytes(4).toString("hex").toUpperCase(); // Example: "A9F3E2D4"

        // Save code in database
        founder.verificationCode = verificationCode;
        await founder.save();

        return res.status(200).json({ message: "Verification code generated", verificationCode });


    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.processVerification = async (req, res) => {


    try {
        const { verificationCode } = req.body;
        const userId = req.user_id;
        const profile = await Profile.findOne({ user_id: userId }).lean();

        if (!profile || !profile.founderData) {
            return res.status(404).json({ message: "Founder data not found" });
        }

        // Extract Twitter handle from socialLinks map
        const twitterHandle = profile.founderData.socialLinks?.["twitter"]

        if (!twitterHandle) {
            return res.status(404).json({ message: "Twitter handle not found" });
        }

        const user=await User.findOne({user_id:userId}).lean();
        
        if(!user.walletAddress){
            return res.status(404).json({ message: "wallet Address needs to be filled in profile" });
        }
        // Find founder request
        const founder = await FounderVerification.findOne({ twitterHandle, walletAddress:user.walletAddress });
        if (!founder) {
            return res.status(404).json({ message: "Founder not found" });
        }

        // Check if the verification code matches
        if (founder.verificationCode !== verificationCode) {
            return res.status(400).json({ message: "Invalid verification code" });
        }

        // Mark founder as verified
        founder.isVerified = true;
        await founder.save();

        return res.status(200).json({ message: "Verification successful. You can now list your startup." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


};
