const express = require("express");
const router = express.Router();
const {Web3} = require("web3");
const authMiddleware=require("../middlewares/authMiddleware");
const { User } = require("../models/userModel");
const {NFT}=require("../models/nftModel");
require("dotenv").config();



router.post("/submit-quest-score",  authMiddleware.decodeJWT,async (req, res) => {
  const { quest_id, score ,totalScore} = req.body;
  const userId=req.user_id;

  if (!userId || !quest_id || typeof score !== "number" ||!totalScore) {
    return res.status(400).json({ message: "Missing or invalid parameters." });
  }

  try {
    const user = await User.findOne({ user_id:userId });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the quest already exists
    const existingQuest = user.questsCompleted.find(q => q.quest_id === quest_id);

    if (existingQuest) {
      // Update score and completedAt
      existingQuest.score = score;
      existingQuest.totalScore = totalScore;
      existingQuest.completedAt = new Date();
    } else {
      // Add new quest completion record
      user.questsCompleted.push({
        quest_id,
        score,
        totalScore,
        completedAt: new Date()
      });
    }

    await user.save();
    res.status(200).json({ message: "Quest score updated successfully.", questsCompleted: user.questsCompleted });

  } catch (error) {
    console.error("Error updating quest score:", error);
    res.status(500).json({ message: "Server error. Could not update quest score." });
  }
});

router.post("/mint-nft", authMiddleware.decodeJWT, async (req, res) => {
    console.log("Minting...");
  
    try {
      const userId = req.user_id;
      const { questId , questType} = req.body; // Extract quest ID from request body
  
      if (!userId || !questId) {
        return res.status(400).json({ error: "User ID and Quest ID are required" });
      }
  
      const user = await User.findOne({ user_id: userId });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const existingWallet = user.walletAddress;
      if (!existingWallet) {
        return res.status(400).json({ error: "No wallet address found for user" });
      }
  
      // ✅ Check if the user has already minted an NFT for this quest
      const questIndex = user.questsCompleted.findIndex(q => q.quest_id.toString() === questId);
      
      if (questIndex !== -1 && user.questsCompleted[questIndex].mintStatus) {
        return res.status(400).json({ error: "NFT already minted for this quest" });
      }

      const userQuest = user.questsCompleted[questIndex];
      if (userQuest.totalScore === 0) {
        return res.status(400).json({ error: "Invalid total score for this quest" });
      }
  
      const percentage = (userQuest.score / userQuest.totalScore) * 100;
  
      if (percentage < 50) {
        return res.status(403).json({
          error: "Score too low to mint NFT. You must score at least 50% to qualify.",
          score: userQuest.score,
          totalScore: userQuest.totalScore,
          percentageAchieved: percentage.toFixed(2) + "%"
        });
      }
   
      const nftData = await NFT.findOne({ questType: questType });

    if (!nftData) {
      return res.status(404).json({ error: "NFT metadata not found for this quest type" });
    }

    console.log("NFT Data:", nftData);
    const tokenURI = nftData.tokenURI;
  
      // NFT Metadata URL
      // const tokenURI = "https://aquamarine-generous-barracuda-163.mypinata.cloud/ipfs/bafkreiackmg56sz2zno3ghks77n7t6q32syhdi4cbz5dhr4ncidjl4ig7y";
  
      // Web3 setup
      // const web3 = new Web3('https://rpc.open-campus-codex.gelato.digital');
      const web3 = new Web3('https://rpc.edu-chain.raas.gelato.cloud/fd947a6d7b1b4565b1bb1cab5e4048b5');
      const account = web3.eth.accounts.privateKeyToAccount("0x" + process.env.PRIVATE_KEY);
      web3.eth.accounts.wallet.add(account);
      web3.eth.defaultAccount = account.address;
  
      // Contract details
      const contractAddress = "0x228aC046276070E68C759482B7cc2038E67ff75B";
      const SimpleNFT = require("../nft/artifacts/contracts/SimpleNFT.sol/SimpleNFT.json");
      const contract = new web3.eth.Contract(SimpleNFT.abi, contractAddress);
  
  
      // Prepare mint transaction
      const mintFunction = contract.methods.mintNFT(existingWallet, tokenURI);
      const gas = await mintFunction.estimateGas({ from: account.address });
      const gasPrice = await web3.eth.getGasPrice();
      const data = mintFunction.encodeABI();
  
      const tx = {
        from: account.address,
        to: contractAddress,
        data: data,
        gas: gas,
        gasPrice: gasPrice,
      };
  
      // Sign & send transaction
      const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);
      const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
      console.log("NFT minted successfully!", receipt.transactionHash);
  
      // ✅ Update mint status for this specific quest
      if (questIndex !== -1) {
        // If quest already exists, update mint status
        user.questsCompleted[questIndex].mintStatus = true;
      } else {
        // If quest doesn't exist, add it
        user.questsCompleted.push({ quest_id: questId, mintStatus: true });
      }

      console.log(nftData.image);
  
      await user.save();
  
      return res.json({
        message: "NFT minted successfully!",
        status: "success",
        transactionHash: receipt.transactionHash,
        recipient: existingWallet,
        image: nftData.image,
      });
  
    } catch (error) {
      console.error("Error minting NFT:", error);
      return res.status(500).json({ error: "Error minting NFT" });
    }
  });


  router.get('/quest-status', authMiddleware.decodeJWT, async (req, res) => {
    const userId = req.user_id;
  
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
  
    try {
      const user = await User.findOne({ user_id: userId });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Return status for all completed quests
      const questStatuses = user.questsCompleted.map(quest => ({
        questId: quest.quest_id,
        status: "attempted",
        score: quest.score || 0
      }));
  
      return res.json({
        quests: questStatuses
      });
  
    } catch (err) {
      console.error("Error fetching quest statuses:", err);
      return res.status(500).json({ message: "Server error" });
    }
  });
  


  
module.exports = router;
