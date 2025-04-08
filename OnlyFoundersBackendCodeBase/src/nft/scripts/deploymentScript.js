async function main() {
    const SimpleNFT = await ethers.getContractFactory("SimpleNFT");
    const simpleNFT = await SimpleNFT.deploy();
    await simpleNFT.deployed();
  
    console.log("SimpleNFT deployed to:", simpleNFT.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

   //contract address - 0xe5deE58A1BEF2E7CF8649dA944E128d00144E1Fc

  //  mainnet address - 0x21a6F8157f7Bb86980025282826156aDbf3D91bd