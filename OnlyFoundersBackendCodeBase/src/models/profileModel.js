const mongoose = require("mongoose");


const activitySchema = new mongoose.Schema({
  activityType: { type: String },
  content: { type: String }
}, { timestamps: true });

const founderSchema = new mongoose.Schema(
  {

    experienceLevel: { type: String },
    skills: { type: [String], default: [] },
    recentActivity: { type: [activitySchema], default: [] },
    socialLinks: {
      type: Map,
      of: String,
      default: {},
    },
    completedStatus: { type: String, default: false },
    watchList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Startup" }]
  },
  { timestamps: true }
);

const investorSchema = new mongoose.Schema(
  {
    investorType: { type: String },
    investmentExperience: { type: String },
    minInvestment: { type: Number },
    maxInvestment: { type: Number },
    investmentInterest: { type: [String], default: [] },
    recentActivity: { type: [activitySchema], default: [] },
    socialLinks: {
      type: Map,
      of: String,
      default: {},
    },
    completedStatus: { type: String, default: false },
    watchList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Startup" }],
  },
  { timestamps: true }
);

const fileSchema = new mongoose.Schema({
  file_name: { type: String, required: true },
  file_url: { type: String, required: true } // URL of the file on the cloud
});

const serviceProviderSchema = new mongoose.Schema({

  businessName: { type: String, default: "" },
  nameOfServiceProvider: { type: String, default: "" },
  email: { type: String, default: "" },
  category: { type: String, default: "" },
  serviceDescription: { type: String, default: "" },
  pricingModel: { type: String, default: "" },
  websiteUrl: { type: String, default: "" },
  companySocialLinks: {
    type: Map, // Map to store key-value pairs
    of: String, // The value of each key will be a string (URL)
    default: {}, // Default empty map
  },

  personalSocialLinks: {
    type: Map, // Map to store key-value pairs
    of: String, // The value of each key will be a string (URL)
    default: {},
  }


}, { timestamps: true });

const profileSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    role: { type: String, default: "Investor" },
    professionalTitle: { type: String },
    bio: { type: String },
    location: { type: String },
    profilePic: { type: fileSchema, required: true },
    status:{type:String,default:"Unverified"},
    completedStatus:{type:Boolean,default:false},
    founderData: { type: founderSchema, required: false, default: undefined }, // Prevent auto-initialization
    investorData: { type: investorSchema, required: false, default: undefined }, // Prevent auto-initialization
    serviceProviderData: { type: serviceProviderSchema, required: false, default: undefined }

  },
  { timestamps: true }
);


const founderVerificationSchema = new mongoose.Schema({
  // user_id:{type:String,required:true},
  twitterHandle: { type: String, required: true, unique: true },
  walletAddress: { type: String, required: true, unique: true },
  verificationCode: { type: String, required: true }, // Alphanumeric Code
  isVerified: { type: Boolean, default: false }, // Whether the founder is verified
}, { timestamps: true });

const FounderVerification = mongoose.model("FounderVerification", founderVerificationSchema);


const Profile = mongoose.model("Profile", profileSchema);




module.exports = { Profile,FounderVerification }
