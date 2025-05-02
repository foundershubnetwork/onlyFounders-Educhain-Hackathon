const express = require("express");
// const { register, login } = require("../controllers/authController");
const authController=require("../controllers/authController");
const authMiddleware=require("../middlewares/authMiddleware");
const adminController=require("../controllers/adminController");
const profileController=require("../controllers/profileController");
const verificationController=require("../controllers/verificationController");
const router = express.Router();
const multer = require('multer');
const { auth } = require("express-oauth2-jwt-bearer");
// Configure multer to store files in memory (or to disk if needed)
const storage = multer.memoryStorage(); // or multer.diskStorage for disk storage
const upload = multer({ storage: storage });


router.get("/admin-dashboard", authMiddleware.decodeJWT, authMiddleware.isAdmin, (req, res) => {
    res.json({ message: "Welcome, Admin!", user: req.user });
  });

  //done
router.get("/get-all-users",authMiddleware.decodeJWT, authMiddleware.isAdmin,adminController.getAllUsers);
//done
router.get("/profiles/:role", authMiddleware.decodeJWT, authMiddleware.isAdmin,adminController.getProfilesByRole);

router.get("/get-all-profiles",authMiddleware.decodeJWT, authMiddleware.isAdmin,adminController.getAllProfiles);
//done
router.get("/get-profile/:user_id",authMiddleware.decodeJWT, authMiddleware.isAdmin, adminController.getProfileByUserId);

//done
router.put("/block/:user_id",authMiddleware.decodeJWT, authMiddleware.isAdmin, adminController.blockUser);

//done
router.put("/change-status/:user_id",authMiddleware.decodeJWT, authMiddleware.isAdmin, adminController.verifyUser);
//done
router.put("/suspend/:user_id",authMiddleware.decodeJWT, authMiddleware.isAdmin, adminController.suspendUser);

router.delete("/delete-user/:user_id",authMiddleware.decodeJWT, authMiddleware.isAdmin,adminController.deleteProfile);

//done
router.get("/get-all-startups",authMiddleware.decodeJWT, authMiddleware.isAdmin,adminController.getAllStartups);
router.get("/view-all-startups",authMiddleware.decodeJWT, authMiddleware.isAdmin,adminController.viewStartup);

router.get("/get-startup-documents/:startupId",authMiddleware.decodeJWT, authMiddleware.isAdmin,adminController.getStartupDocuments);

router.post("/get-verification-code",authMiddleware.decodeJWT,authMiddleware.isAdmin,verificationController.requestVerification);

//done
router.patch("/change-status/:startupId/:featuredStatus", authMiddleware.decodeJWT,authMiddleware.isAdmin,adminController.updateStartupStatus);

//done
router.patch("/change-verification-status/:startupId/:verificationStatus", authMiddleware.decodeJWT,authMiddleware.isAdmin,adminController.changeVerificationStatus);

router.delete("/delete-startup/:startupId",authMiddleware.decodeJWT,authMiddleware.isAdmin,adminController.deleteStartup);

// Campaigns routes - admin

router.get("/get-campaigns",authMiddleware.decodeJWT,authMiddleware.isAdmin,adminController.getAllCampaigns);

router.get("/get-campaign-by-id/:campaign_id",authMiddleware.decodeJWT,authMiddleware.isAdmin,adminController.getCampaignById);

router.get("/get-milestones/:campaignId",authMiddleware.decodeJWT,authMiddleware.isAdmin,adminController.getMilestones);

router.patch("/approve-reject-milestones/:campaignId/:milestoneId",authMiddleware.decodeJWT,authMiddleware.isAdmin,adminController.approveMilestone);

router.delete("/delete-campaign/:campaign_id",authMiddleware.decodeJWT,authMiddleware.isAdmin,adminController.deleteCampaign);

router.post("/register-user-by-admin",authMiddleware.decodeJWT, authMiddleware.isAdmin, adminController.registerUserByAdmin);

router.get("/get-analytics",authMiddleware.decodeJWT, authMiddleware.isAdmin, adminController.adminAnalytics);

router.post("/submit-role",authMiddleware.decodeJWT, authMiddleware.isAdmin,profileController.submitRole);
router.post("/submit-personal-details",upload.fields([
    { name: 'profile_pic_file', maxCount: 1 }
]),authMiddleware.decodeJWT, authMiddleware.isAdmin,profileController.createProfile);

router.post("/add-investment-in-campaign",authMiddleware.decodeJWT, authMiddleware.isAdmin,adminController.addInvestment);

router.get("/get-all-investments/:campaign_id",authMiddleware.decodeJWT, authMiddleware.isAdmin,adminController.getAllInvestments);
// early access routes

router.get("/get-early-access-users",adminController.getAllEarlyAccessUser);
router.post('/accept-application/:id',adminController.acceptApplication);
router.post('/reject-application/:id',adminController.rejectApplication);
router.get('/get-earlyaccess-analytics',adminController.getEarlyAccessStatistics);


// Add blogs
router.post('/add-blog',upload.fields([
    { name: 'headerImage', maxCount: 1 }
]),authMiddleware.decodeJWT, authMiddleware.isAdmin,adminController.addBlogs);

router.put('/edit-blog/:id',upload.fields([
    { name: 'headerImage', maxCount: 1 }
]),authMiddleware.decodeJWT, authMiddleware.isAdmin,adminController.editBlogs);

router.get('/get-all-blogs',authMiddleware.decodeJWT, authMiddleware.isAdmin,adminController.getBlogs);

router.delete("/delete-blog/:blogId",authMiddleware.decodeJWT,authMiddleware.isAdmin,adminController.deleteBlog);


module.exports = router;