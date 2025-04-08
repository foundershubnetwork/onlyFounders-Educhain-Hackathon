const express = require("express");
// const { register, login } = require("../controllers/authController");

const authMiddleware=require("../middlewares/authMiddleware");
const verificationController=require("../controllers/verificationController");
const router = express.Router();

const { auth } = require("express-oauth2-jwt-bearer");

router.post("/get-verification-code",authMiddleware.decodeJWT,verificationController.requestVerification);

router.post("/process-verification-request",authMiddleware.decodeJWT,verificationController.processVerification);


module.exports = router;