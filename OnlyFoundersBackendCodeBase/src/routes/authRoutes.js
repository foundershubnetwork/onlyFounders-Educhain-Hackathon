const express = require("express");
// const { register, login } = require("../controllers/authController");
const authController=require("../controllers/authController");
const authMiddleware=require("../middlewares/authMiddleware");
const router = express.Router();

//done
router.post("/register-user",authController.storeUserFromFrontend);
router.get("/get-all-user",authController.getAllUsers);

// early access routes
//done
router.post("/store-early-access-user",authController.storeEarlyAccessUser);

module.exports = router;