// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const CredibilityScore = await hre.ethers.getContractFactory(
    "contracts/CredibilityScore.sol:CredibilityScore"
  );

  const credibilityScore = await CredibilityScore.deploy();

  await credibilityScore.deployed();

  console.log("CredibilityScore deployed to:", credibilityScore.address);

  // We get the contract to deploy
  const ApniBachat = await hre.ethers.getContractFactory(
    "contracts/ApniBachat.sol:ApniBachat"
  );

  const apniBachat = await ApniBachat.deploy(credibilityScore.address);

  await apniBachat.deployed();

  console.log("ApniBachat deployed to:", apniBachat.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
