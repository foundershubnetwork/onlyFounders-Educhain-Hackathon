const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    file_name: { type: String, required: true },
    file_url: { type: String, required: true } // URL of the file on the cloud
});

// Core Team Schema
const coreTeamSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  title: { type: String, required: true },
  profilePicture: { type: fileSchema }, // Store URL of profile picture
  shortBio: { type: String },
  socialLinks: {
    type: Map,
    of: String,
    default: {},
  },
});

// FAQ Schema
const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

// Roadmap Schema
const roadmapSchema = new mongoose.Schema({
  quarterYear: { type: String, required: true }, // Example: "Q1 2025"
  milestones: [
    {
      content: { type: String, required: true },
      status: { type: String, enum: ["pending", "Complete"], default: "pending" }
    }
  ], // Array of milestones with content and status
  status: { type: String, enum: ["Incomplete", "Complete"], default: "Incomplete" }
});


// Token Distribution Schema
const tokenDistributionSchema = new mongoose.Schema({
  publicSale: { type: Number, required: true ,default:0},
  teamAdvisors: { type: Number, required: true ,default:0},
  foundation: { type: Number, required: true,default:0 },
  ecosystemGrowth: { type: Number, required: true,default:0 },
  strategicPartners: { type: Number, required: true,default:0 },
  others:{type:Number,required:true,default:0}
});

// Vesting Schedule Schema
const vestingScheduleSchema = new mongoose.Schema({
  lockupPeriod: { type: String, required: true }, // Example: "12 months lock-up"
  releaseTerms: { type: String, required: true } // Example: "Gradual release over 24 months"
});

// Tokenomics Schema
const tokenomicsSchema = new mongoose.Schema({
  tokenName: { type: String, required: true },
  symbol: { type: String, required: true },
  totalSupply: { type: Number, required: true },
  tokenType: { type: String, required: true },
  initialPrice: { type: Number, required: true },
  useCases: { type: [String], required: true }, // Example: ["Payments", "Staking"]
  tokenDistribution: { type: tokenDistributionSchema, required: true },
//   vestingSchedule: { type: vestingScheduleSchema, required: true }
});

// Traction & Metrics Schema
const tractionSchema = new mongoose.Schema({
  waitlistSignups: { type: Number, default: 0 },
  strategicPartners: { type: Number, default: 0 },
  githubStars: { type: Number, default: 0 },
  storageCapacity: { type: String }, // Example: "500TB committed"
  nodeOperators: { type: Number, default: 0 },
  // developerInterest: { type: String }, // Additional developer engagement metrics
  growthMetrics: { type: String } // Example: "20% growth in users over 6 months"
});




// Startup Schema
const startupSchema = new mongoose.Schema(
  {
    user_id:{type:String,required:true},
    startupName: { type: String, required: true },
    startupLogo: { type: fileSchema, required: true }, // Store URL of logo
    bannerImage: { type: fileSchema, required: true }, // Store URL of banner
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    stage: { type: String, required: true },
    category: { type: String, required: true },
    blockchainPlatforms: { type: [String], required: true }, // Example: ["Ethereum", "BNB"]
    socialLinks: {
        type: Map,
        of: String,
        default: {},
      },
    whitepaper: { type: fileSchema },
    whitepaper_Url:{type:String} ,// Store URL of whitepaper
    whitepaperText:{type:String},
    pitchDeck:{type:fileSchema},
    pitchDeck_Url:{type:String},
    pitchDeckText:{type:String},
    pitchDemoVideo_Url:{type:String},
    traction: { type: tractionSchema, default: {} },
    faq: { type: [faqSchema], default: [] },
    coreTeam: { type: [coreTeamSchema], default: [] },
    roadmap: { type: [roadmapSchema], default: [] },
    tokenomics: { type: tokenomicsSchema, required: true },
    verifiedStatus:{type:String,default:"Unverified"},
    featuredStatus:{type:String,default:"Trending"},
    completedStatus:{type:Boolean,default:false},
    totalRaised :{type:Number,default:0},
    investers: [
      {
        profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
        amount: Number, // Investment amount
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Startup", startupSchema);
