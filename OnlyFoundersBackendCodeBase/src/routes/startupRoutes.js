const express = require("express");
// const { register, login } = require("../controllers/authController");
const campaignController=require("../controllers/campaignController");
const authMiddleware=require("../middlewares/authMiddleware");
const startupController=require("../controllers/startupController");

const router = express.Router();
const multer = require('multer');
const { auth } = require("express-oauth2-jwt-bearer");

// Configure multer to store files in memory (or to disk if needed)
const storage = multer.memoryStorage(); // or multer.diskStorage for disk storage
const upload = multer({ storage: storage });

router.post("/submit-basic-startup-details",upload.fields([
    { name: 'whitePaper', maxCount: 1 },
    {name:'pitchDeck',maxCount:1},
    {name:'pitchDemoVideo',maxCount:1},
    {name:'startupLogo',maxCount:1},
    {name:'bannerImage',maxCount:1}
]),authMiddleware.decodeJWT,startupController.basicStartupDetails);

router.post("/submit-traction-details",authMiddleware.decodeJWT,startupController.submitTractionDetails);

router.post("/add-team-member",upload.fields([
    { name: 'profile_pic_file', maxCount: 1 }
]),authMiddleware.decodeJWT,startupController.addTeamMember);

router.post("/add-roadmap",authMiddleware.decodeJWT,startupController.submitStartupRoadmap);

router.post("/mark-roadmap-milestones",authMiddleware.decodeJWT,startupController.markRoadmapMilestoneDone);

router.post("/submit-tokenomics-details",authMiddleware.decodeJWT,startupController.submitStartupTokenomics);

router.get("/list-all-startups",authMiddleware.decodeJWT,startupController.listAllStartups);

router.post("/view-startup",authMiddleware.decodeJWT,startupController.viewStartup);

router.post("/add-to-watchList",authMiddleware.decodeJWT,startupController.toggleWatchlist);

router.get("/list-watchList",authMiddleware.decodeJWT,startupController.getWatchlistStartups);

router.delete("/delete-startup",authMiddleware.decodeJWT,startupController.deleteStartup);

router.delete("/delete-teamMember",authMiddleware.decodeJWT, startupController.deleteCoreTeamMember);


// console.log("***************************************************************************",campaignController);
// console.log("***************************************************************************",campaignController.submitCampaignBasicDetails);

// done
router.post("/submit-basic-campaign-details",upload.fields([
    { name: 'bannerImage', maxCount: 1 }
]),authMiddleware.decodeJWT,campaignController.submitCampaignBasicDetails);

// done
router.post("/submit-campaign-financial-details",authMiddleware.decodeJWT,campaignController.submitCampaignFundingDetails);

// done
router.post("/fetch-predefined-milestones",authMiddleware.decodeJWT,campaignController.fetchMilestones);

// done
router.post("/submit-milestones",authMiddleware.decodeJWT,campaignController.submitCampaignMilestones);
//done
router.post("/add-faqs",authMiddleware.decodeJWT,campaignController.addFaq);

//done
router.post("/edit-faq",authMiddleware.decodeJWT,campaignController.editFaq);

//done
router.delete("/delete-faq",authMiddleware.decodeJWT,campaignController.deleteFaq);

//done
router.post("/change-campaign-visibility",authMiddleware.decodeJWT,campaignController.changeVisibility);

//done
router.post("/change-campaign-status",authMiddleware.decodeJWT,campaignController.changeStatus);

//done
router.post("/get-tokenomics",authMiddleware.decodeJWT,campaignController.getTokenomicsDetails);

//done
router.get("/get-faqs",authMiddleware.decodeJWT,campaignController.getFaq);

//done
router.get("/list-campaigns",authMiddleware.decodeJWT,campaignController.listCampaign);

//done
router.post("/get-campaign",authMiddleware.decodeJWT,campaignController.getCampaign);

router.get("/get-projectId",authMiddleware.decodeJWT,campaignController.getProjectId);

//done
router.post("/mark-milestones-task-done",authMiddleware.decodeJWT,campaignController.updateRequirementStatus);

//done
router.post("/submit-verification-url",authMiddleware.decodeJWT,campaignController.verifyMilestoneCompletion);

router.get("/get-featured-projects",startupController.getFeaturedProjects);

router.get("/get-startup-listing",startupController.getStartupListing);

module.exports = router;