const mongoose = require("mongoose");


const questSchema = new mongoose.Schema({
  quest_id: { type: String }, // Reference to Quest model
  completedAt: { type: Date, default: Date.now }, // Timestamp of completion
  mintStatus: { type: Boolean, default: false } ,// Whether the NFT was minted
  score:{type:Number,default:0}, // Score for the quest
  totalScore:{type:Number,default:0}, // Total score for the quest
});

const userSchema = new mongoose.Schema({
  user_id: {type: String,required: true,unique: true },

  email: {type: String,required: true,unique: true,lowercase: true},
  username: {type: String,required: true},
  password: { type: String},
  walletAddress: {type: String},
  role: { type: String, enum: ["user", "Admin"], default: "user" } ,
  // Stores completed quests & NFT mint status
  questsCompleted: [questSchema]
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const User = mongoose.model("User", userSchema);

module.exports = {User};
