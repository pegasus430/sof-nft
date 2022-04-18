const SofNFTCollection = artifacts.require("SofNFTCollection");

module.exports = async (deployer) => {
  await deployer.deploy(SofNFTCollection);
  const nftInst = await SofNFTCollection.deployed();
  console.log(nftInst.address);
};
