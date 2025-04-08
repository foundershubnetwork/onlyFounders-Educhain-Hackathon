
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    edu: {
      url: "https://rpc.edu-chain.raas.gelato.cloud/fd947a6d7b1b4565b1bb1cab5e4048b5", // Replace with the RPC URL of the EDU blockchain
      // url:"https://rpc.open-campus-codex.gelato.digital",
      accounts: [`0xd526f09224fc1ebb554f49812d0a0b86987fc3d7cba71ec4d358cc73bf4a5d06`], // Replace with your private key
    },
  },
  
};

// contract Address:  0xe5deE58A1BEF2E7CF8649dA944E128d00144E1Fc