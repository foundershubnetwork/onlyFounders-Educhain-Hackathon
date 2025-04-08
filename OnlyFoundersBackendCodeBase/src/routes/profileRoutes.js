const express = require("express");
// const { register, login } = require("../controllers/authController");
const profileController=require("../controllers/profileController");
const updateController=require("../controllers/updateController");
const authMiddleware=require("../middlewares/authMiddleware");
const milestoneController = require("../controllers/milestoneController");
const router = express.Router();
const multer = require('multer');
const { auth } = require("express-oauth2-jwt-bearer");

// Configure multer to store files in memory (or to disk if needed)
const storage = multer.memoryStorage(); // or multer.diskStorage for disk storage
const upload = multer({ storage: storage });

//done
router.post("/submit-role",authMiddleware.decodeJWT,profileController.submitRole);
//done
router.post("/submit-personal-details",upload.fields([
    { name: 'profile_pic_file', maxCount: 1 }
]),authMiddleware.decodeJWT,profileController.createProfile);

//done
router.get("/get-onboarding-status",authMiddleware.decodeJWT,profileController.getOnboardingStatus);

//done
router.get("/get-profile",authMiddleware.decodeJWT,profileController.getProfile);

//done
router.post("/create-update",upload.fields([
    { name: 'attachments', maxCount: 5 }
]),authMiddleware.decodeJWT,updateController.createUpdate);

//done
router.post("/get-updates",authMiddleware.decodeJWT,updateController.getAllUpdates);

//done
router.get("/get-updates-in-dashboard",authMiddleware.decodeJWT,updateController.getUpdatesInDashboard);

//done
router.delete("/delete-update",authMiddleware.decodeJWT,updateController.deleteUpdate);

//done
router.post("/like-update",authMiddleware.decodeJWT,updateController.likeUpdate);

//done
router.post("/add-comment",authMiddleware.decodeJWT,updateController.addComment);

//done
router.post("/get-comments",authMiddleware.decodeJWT,updateController.getAllCommentofUpdate);

// POST API to create a milestone
// router.post("/create-milestone", authMiddleware.decodeJWT,milestoneController.createMilestone);
// router.post("/mark-as-done",authMiddleware.decodeJWT,milestoneController.markTaskAsDone);

// router.post("/add-verification-proof",upload.fields([
//     { name: 'verificationProofs', maxCount: 5 }
// ]),authMiddleware.decodeJWT,milestoneController.addVerificationProof);


//done
router.post("/get-upcoming-milestones",authMiddleware.decodeJWT,profileController.getUpcomingMilestones);


//done
router.post("/get-all-milestones",authMiddleware.decodeJWT,profileController.getAllMilestones);

//done
router.post("/get-founder-projectStats",authMiddleware.decodeJWT,profileController.getFounderProjectStats);

//done
router.post("/add-walletAddress",authMiddleware.decodeJWT,profileController.addWalletAddress);

module.exports = router;