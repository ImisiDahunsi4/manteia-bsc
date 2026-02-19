const hre = require("hardhat");
const fs = require("fs");

async function main() {
    console.log("🚀 Starting BSC Borrower Simulation...");

    // 1. Setup Wallet
    const [signer] = await hre.ethers.getSigners();
    console.log("👤 Borrower Wallet:", signer.address);

    // 2. Load Addresses
    let addresses = {};
    try {
        addresses = JSON.parse(fs.readFileSync("deployed_addresses.json"));
    } catch (e) {
        console.error("❌ deployed_addresses.json not found");
        return;
    }

    const USDC_ADDRESS = addresses.MOCK_USDC;
    const FACTORY_ADDRESS = addresses.MANTEIA_FACTORY;

    const ManteiaFactory = await hre.ethers.getContractAt("ManteiaFactory", FACTORY_ADDRESS, signer);
    const MockUSDC = await hre.ethers.getContractAt("MockUSDC", USDC_ADDRESS, signer);

    // 3. Mock ZK Proof
    const a = [0, 0];
    const b = [[0, 0], [0, 0]];
    const c = [0, 0];
    const input = [1, 12345];
    const ipfsHash = "QmTestHashBSC";

    // 4. Request Loan
    const loanAmount = 1000n * 10n ** 6n; // 1,000 USDC
    console.log(`💸 Requesting Loan: ${hre.ethers.formatUnits(loanAmount, 6)} USDC...`);

    const preBalance = await MockUSDC.balanceOf(signer.address);

    try {
        const tx = await ManteiaFactory.requestLoan(
            a, b, c, input,
            loanAmount,
            ipfsHash
        );
        console.log("   Tx Hash:", tx.hash);
        console.log("   Waiting for confirmation...");

        await tx.wait();
        console.log("✅ Loan Processed!");

        const postBalance = await MockUSDC.balanceOf(signer.address);
        console.log(`   Old Balance: ${hre.ethers.formatUnits(preBalance, 6)} USDC`);
        console.log(`   New Balance: ${hre.ethers.formatUnits(postBalance, 6)} USDC`);

        if (postBalance > preBalance) {
            console.log("🎉 SUCCESS: Loan Funded!");
        } else {
            console.warn("⚠️  Balance unchanged. Check Vault Liquidity.");
        }

    } catch (e) {
        console.error("❌ Loan Request Failed:", e.message);
        if (e.message.includes("Insufficient liquidity")) {
            // Should not happen now
            console.error("FATAL: Vault still empty?");
        }
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
