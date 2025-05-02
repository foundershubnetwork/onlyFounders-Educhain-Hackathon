const express = require("express");
// const { register, login } = require("../controllers/authController");
const authController=require("../controllers/authController");
const authMiddleware=require("../middlewares/authMiddleware");
const blogController=require("../controllers/blogController");
const profileController=require("../controllers/profileController");
const verificationController=require("../controllers/verificationController");
const router = express.Router();
const multer = require('multer');
const { auth } = require("express-oauth2-jwt-bearer");
// Configure multer to store files in memory (or to disk if needed)
const storage = multer.memoryStorage(); // or multer.diskStorage for disk storage
const upload = multer({ storage: storage });


router.get("/get-all-blogs",blogController.getAllBlogs);

router.post("/upvote-blog/:id",authMiddleware.decodeJWT,blogController.upvoteBlog);

router.get("/get-blog-by-id/:id",blogController.getBlogById);



module.exports = router;












