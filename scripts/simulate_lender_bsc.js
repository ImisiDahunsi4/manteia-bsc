const hre = require("hardhat");
const fs = require("fs");

async function main() {
    console.log("🚀 Starting BSC Lender Simulation (Funding Vault)...");

    // 1. Setup Wallet
    const [signer] = await hre.ethers.getSigners();
    console.log("👤 Lender Wallet:", signer.address);
    console.log("   BNB Balance:", hre.ethers.formatEther(await hre.ethers.provider.getBalance(signer.address)));

    // 2. Load Addresses
    let addresses = {};
    try {
        addresses = JSON.parse(fs.readFileSync("deployed_addresses.json"));
    } catch (e) {
        console.error("❌ deployed_addresses.json not found");
        return;
    }

    const USDC_ADDRESS = addresses.MOCK_USDC;
    const VAULT_ADDRESS = addresses.LENDING_VAULT;

    const MockUSDC = await hre.ethers.getContractAt("MockUSDC", USDC_ADDRESS, signer);
    const LendingVault = await hre.ethers.getContractAt("LendingVault", VAULT_ADDRESS, signer);

    // 3. Check Protocol State
    const usdcBal = await MockUSDC.balanceOf(signer.address);
    console.log(`💰 User USDC: ${hre.ethers.formatUnits(usdcBal, 6)}`);

    // 4. Deposit Logic
    const depositAmount = 20000n * 10n ** 6n; // 20,000 USDC

    // Check Allowance
    const allowance = await MockUSDC.allowance(signer.address, VAULT_ADDRESS);
    console.log(`🔓 Allowance: ${hre.ethers.formatUnits(allowance, 6)} USDC`);

    if (allowance < depositAmount) {
        console.log("⚠️  Allowance too low. Approving...");
        const approveTx = await MockUSDC.approve(VAULT_ADDRESS, depositAmount);
        await approveTx.wait();
        console.log("✅ Approved!");
    } else {
        console.log("✅ Allowance sufficient.");
    }

    // Check Balance
    if (usdcBal < depositAmount) {
        console.log("⚠️  Insufficient USDC balance. Minting...");
        try {
            const mintTx = await MockUSDC.mint(signer.address, depositAmount);
            await mintTx.wait();
            console.log("✅ Minted 20,000 USDC");
        } catch (e) {
            console.error("❌ Mint failed via script. Use Frontend Faucet if this fails.");
        }
    }

    // Execute Deposit
    console.log(`🏦 Depositing ${hre.ethers.formatUnits(depositAmount, 6)} USDC into Vault...`);
    try {
        const tx = await LendingVault.deposit(depositAmount);
        console.log("   Tx Hash:", tx.hash);
        console.log("   Waiting for confirmation...");
        await tx.wait();
        console.log("✅ Deposit Successful!");
    } catch (e) {
        console.error("❌ Deposit Failed:", e.message);
    }

    // Final Check
    const vaultBal = await MockUSDC.balanceOf(VAULT_ADDRESS);
    console.log(`\n🎉 Final Vault Liquidity: ${hre.ethers.formatUnits(vaultBal, 6)} USDC`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
