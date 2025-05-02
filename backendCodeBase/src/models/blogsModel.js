const mongoose = require("mongoose");


const fileSchema = new mongoose.Schema({
  file_name: { type: String},
  file_url: { type: String} // URL of the file on the cloud
});

const blogsSchema = new mongoose.Schema({
  user_id: {type: String,required: true },
  title: {type: String,required: true},
  headerImage:{type:fileSchema},
  description: {type: String,required: true},
  categories: {type: [String],default: []},
  content: {type: String,required: true},
  upvote:{type: Number,default: 0},
  upvotedBy: { type: [String], default: [] }, 

}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const Blogs = mongoose.model("Blogs", blogsSchema);

module.exports = {Blogs};