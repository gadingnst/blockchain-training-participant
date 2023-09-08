import { ethers } from "hardhat";

async function main() {
  try {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account:', deployer.address);
    console.log('Account balance:', (await deployer.getBalance()).toString());

    const TrainingParticipant = await ethers.getContractFactory("TrainingParticipant");
    const contract = await TrainingParticipant.deploy();

    await contract.deployed();
    console.log(`Deployed! Contract address: ${contract.address}`);
  } catch (err) {
    console.error(err)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});