const mongoose = require('mongoose');

  const fileSchema = new mongoose.Schema({
    file_name: { type: String, required: true },
    file_url: { type: String, required: true } // URL of the file on the cloud
});



const requirementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['incomplete', 'complete', 'pending'],
    default: 'incomplete',
  },
});

const UserMilestoneSchema = new mongoose.Schema({
  milestoneId: {type: String,required: true},
  name: {type: String,required: true},
  fundPercentage: {type: Number,default: 0},
  description: {type: String,required: true},
  requirements: [requirementSchema],
  verificationProof: {
    type: String,
    default: 'url',
  },
  milestoneStatus: {
    type: String,
    enum: ['incomplete', 'complete', 'pending'],
    default: 'incomplete',
  },
  adminApprovalStatus: {
    type: String,
    enum: ['approved', 'rejected', 'pending'],
    default: 'pending',
  },
  rejectionReason: {
    type: String,
    default: null,
  },
});

const milestoneSchema = new mongoose.Schema({
  stage: {
    type: String,
    required: true,
    enum: ['Ideation', 'Prototype', 'MVP', 'Public Beta'],
  },
  fundingType:{type:String},
  milestones: [UserMilestoneSchema],
});

const InvestorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  telegram: { type: String, required: true },
  twitter: { type: String, required: true },
  nationality: { type: String, required: true },
});

const InvestmentSchema = new mongoose.Schema({
  investor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Investor", required: true },
  campaign_id: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign", required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  walletAddress: { type: String, required: true },
  secondaryWalletAddress: { type: String },
});

const CampaignSchema = new mongoose.Schema({
    user_id :{type:String,required:true},
    project_id:{ type: mongoose.Schema.Types.ObjectId, ref: "Startup", required: true },
    campaignOverview:{type:String,required:true},
    campaignName: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stage: { type: String, required: true },
    logo: { type: fileSchema, required: true }, // URL to logo image
    banner: { type: fileSchema, required: true } ,// URL to banner image
    socialLinks: {
        type: Map,
        of: String,
        default: {},
      },
    whitePaper:{type:fileSchema,required:true},
    fundingTarget: { type: Number, required: true },
    totalRaisedOnPlatform: { type: Number, default: 0 },
    fundraisingWallet:{type:String},
    acceptedCurrencyType:{type:String},
    fullyDilutedValuation:{type:Number,default:0},
    initialMarketCap:{type:Number,default:0},
    vestingSummary:{type:String},
    deadline: { type: Date, required: true },
    dealName:{type:String},
    dealRound:{type:String},
    tokenPrice:{type:Number},
  faqs: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true }
    }
  ],

  milestones:{type:[UserMilestoneSchema]},


  verifiedStatus:{type:Boolean,default:false},
  campaignCompletionStatus:{type:Boolean,default:false},

  visibility:{type:String,required:true,default:"Public"},
  campaignStatus:{type:String,required:true,default:"Active"}
});

const Milestone = mongoose.model("Milestone", milestoneSchema);
const Investor = mongoose.model("Investor", InvestorSchema);
const Investment = mongoose.model("Investment", InvestmentSchema);
const Campaign=mongoose.model('Campaign', CampaignSchema);
module.exports ={Milestone,Campaign ,Investor,Investment}; 

