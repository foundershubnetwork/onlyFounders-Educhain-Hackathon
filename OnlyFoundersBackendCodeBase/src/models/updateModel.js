const mongoose = require("mongoose");

  const fileSchema = new mongoose.Schema({
    file_name: { type: String, required: true },
    file_url: { type: String, required: true } // URL of the file on the cloud
});

const updateSchema = new mongoose.Schema(
  {
    user_id: { type: String, required:true },
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: "Startup", required: true },
    title: { type: String, required: true },
    updateType: { type: String, enum: ["Progress", "Announcement", "Milestone", "Other"], required: true },
    content: { type: String, required: true },
    attachments: { type: [fileSchema], required: true }, // Store file URLs or paths
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);


const commentSchema = new mongoose.Schema(
  {
    updateId: { type: mongoose.Schema.Types.ObjectId, ref: "Update", required: true }, // Reference to the update
    profileId: { type: String,required:true}, // User who commented
    investorName: { type: String, required: true }, // Name of investor
    investorType: { type: String, required: true }, // Individual / Institutional
    content: { type: String, required: true }, // Comment text
    likes: {type:Number} // number of likes
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);







// Define the task schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});



// Define the milestone schema




const Update = mongoose.model("Update", updateSchema);

const Comment = mongoose.model("Comment", commentSchema);


module.exports = {Update ,Comment};
