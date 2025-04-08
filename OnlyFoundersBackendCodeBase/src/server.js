
require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet")



const authRoutes = require("./routes/authRoutes");
const verificationRoutes=require("./routes/verificationRoutes");
// const walletRoutes = require("./routes/walletRoutes");
const profileRoutes=require("./routes/profileRoutes");
// const dataRoomRoutes=require("./routes/dataRoomRoutes");
const nftRoutes=require("./routes/nftRoutes");
const startupRoutes=require("./routes/startupRoutes");
const adminRoutes=require("./routes/adminRoutes");
// const networkRoutes=require("./routes/networkRoutes");
// const questRoutes=require("./routes/questRoutes");
// const feedbackRoutes=require("./routes/feedbackRoutes");

// const marketplaceRoutes=require("./routes/marketplaceRoutes.js");
const app = express();



// Middleware
// app.use(cors());

app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());
app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://www.onlyfounders.xyz",
        "https://mvp-f3ai-devbranch.azurewebsites.net",
        "https://development-branch-market.azurewebsites.net",
        "https://www.app.foundershub.network"
      ],
      credentials: true,
    })
  );
// app.use(express.json());



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.use("/api/auth", authRoutes);
app.use("/api/verification",verificationRoutes);
// app.use("/api/walletconnect",walletRoutes);
app.use("/api/profile",profileRoutes);
// app.use("/api/dataroom",dataRoomRoutes);
app.use("/api/nft",nftRoutes);
app.use("/api/startup",startupRoutes);
app.use("/api/admin",adminRoutes);
// app.use("/api/network",networkRoutes);
// app.use("/api/marketplace",marketplaceRoutes);
// app.use("/api/quests",questRoutes);
// app.use("/api/feedback",feedbackRoutes);
// // app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
 
  
  module.exports = app;

