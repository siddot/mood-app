const Mood = artifacts.require("Mood");
const MoodyToken = artifacts.require("MoodyToken");
const MoodySwap = artifacts.require("MoodySwap");

module.exports = async function(deployer) {
  // deploy MoodyToken.sol
  await deployer.deploy(MoodyToken);
  const token = await MoodyToken.deployed()

  // Deploy Mood.sol
  await deployer.deploy(Mood);
  const mood = await Mood.deployed()


  // deploy MoodySwap.sol
  await deployer.deploy(MoodySwap, token.address, mood.address);
  const swap = await MoodySwap.deployed()

  // Transfer all tokens to MoodySwap (1 million)
  await token.transfer(swap.address, '1000000000000000000000000')

}