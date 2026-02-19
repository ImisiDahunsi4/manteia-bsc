const hre = require("hardhat");

async function main() {
    const [signer] = await hre.ethers.getSigners();
    console.log("Deployer Address:", signer.address);
    const balance = await hre.ethers.provider.getBalance(signer.address);
    console.log("Deployer Balance (Wei):", balance.toString());
    console.log("Deployer Balance (BNB):", hre.ethers.formatEther(balance));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
