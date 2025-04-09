
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    edu: {
      url: "https://rpc.edu-chain.raas.gelato.cloud/fd947a6d7b1b4565b1bb1cab5e4048b5", // Replace with the RPC URL of the EDU blockchain
      // url:"https://rpc.open-campus-codex.gelato.digital",
      accounts: ["0x" + process.env.PRIVATE_KEY], // Replace with your private key
    },
  },
  
};

