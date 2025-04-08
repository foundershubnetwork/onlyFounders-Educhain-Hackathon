const mongoose = require("mongoose");




const nftSchema = new mongoose.Schema({
 questType:{type:String , required:true},
 tokenURI:{type:String, required :true},
 image:{type:String, required:true},
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

const NFT = mongoose.model("NFT", nftSchema);

module.exports = {NFT};
