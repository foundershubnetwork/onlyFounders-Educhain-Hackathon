const { User } = require("../models/userModel");
const { Blogs } = require("../models/blogsModel");
const { Profile } = require("../models/profileModel");
const EarlyAccessUser = require("../models/earlyAccess");
const { uploadFileToAzure } = require("../middlewares/storageMiddleware");
const Mixpanel = require('mixpanel');
const mixpanel = Mixpanel.init('72c64bcf935dfc27524cc84bb51bca17');
const Startup = require("../models/startupModel");
const { Campaign } = require("../models/campaignModel");
const { Update } = require("../models/updateModel");
const { Comment } = require("../models/updateModel");
const crypto = require("crypto");
const emailService = require("../services/emailService");
const path = require('path');

exports.getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blogs.find({});
      return res.status(200).json({ message: "Blogs retrieved successfully", blogs });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return res.status(500).json({ message: error.message });
    }
  };



  exports.upvoteBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user_id; // Assuming you have user ID in req.user_id
  if (!blogId) return res.status(400).json({ error: 'Blog ID is required' });

  if (!userId) return res.status(400).json({ error: 'User ID is required' });

  try {
    const blog = await Blogs.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const hasUpvoted = blog.upvotedBy.includes(userId);

    if (hasUpvoted) {
      // Remove upvote
      blog.upvote -= 1;
      blog.upvotedBy = blog.upvotedBy.filter(id => id !== userId);
    } else {
      // Add upvote
      blog.upvote += 1;
      blog.upvotedBy.push(userId);
    }

    await blog.save();

    return res.status(200).json({
      success: true,
      upvote: blog.upvote,
      upvoted: !hasUpvoted
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getBlogById = async (req, res) => {
  
  try {
    const blogId = req.params.id;
    if (!blogId) return res.status(400).json({ error: 'Blog ID is required' });

    const blog = await Blogs.findById(blogId);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    return res.status(200).json({ message: "Blog retrieved successfully", blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({ message: error.message });
  }
};
