const mongoose = require('mongoose');

const earlyAccessUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
      required:true,
    },
    telegram:{
      type:String,
      trim:true,
      required:true,
    },
    role: {
      type: String,
      required: true,
    },
    walletAddress: {
      type: String,
      required: true,
      trim: true,
    },

    applicationStatus:{type:String,default:"Pending"},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('EarlyAccessUser', earlyAccessUserSchema);
