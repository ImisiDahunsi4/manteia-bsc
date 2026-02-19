const hre = require("hardhat");
const fs = require("fs");

async function main() {
    console.log("🔍 Checking BSC Testnet State...");

    // 1. Load Addresses
    let addresses = {};
    try {
        addresses = JSON.parse(fs.readFileSync("deployed_addresses.json"));
    } catch (e) {
        console.error("❌ deployed_addresses.json not found");
        return;
    }

    const USDC_ADDRESS = addresses.MOCK_USDC;
    const VAULT_ADDRESS = addresses.LENDING_VAULT;

    // User from env (the one who deployed/approved)
    const [signer] = await hre.ethers.getSigners();
    console.log("👤 User Address:", signer.address);

    const MockUSDC = await hre.ethers.getContractAt("MockUSDC", USDC_ADDRESS, signer);
    const LendingVault = await hre.ethers.getContractAt("LendingVault", VAULT_ADDRESS, signer);

    // 2. Check Vault Balance (Real Liquidity)
    const vaultUsdcBalance = await MockUSDC.balanceOf(VAULT_ADDRESS);
    console.log(`🏦 Vault USDC Balance (Liquidity): ${hre.ethers.formatUnits(vaultUsdcBalance, 6)} USDC`);

    // 3. Check User Balance
    const userUsdcBalance = await MockUSDC.balanceOf(signer.address);
    console.log(`💰 User USDC Balance: ${hre.ethers.formatUnits(userUsdcBalance, 6)} USDC`);

    // 4. Check Allowance (User -> Vault)
    const allowance = await MockUSDC.allowance(signer.address, VAULT_ADDRESS);
    console.log(`🔓 User Allowance to Vault: ${hre.ethers.formatUnits(allowance, 6)} USDC`);

    // 5. Check User Deposit in Vault (Accounting)
    const userDeposit = await LendingVault.userDeposits(signer.address);
    console.log(`📝 User Recorded Deposit in Vault: ${hre.ethers.formatUnits(userDeposit, 6)} USDC`);

    if (vaultUsdcBalance === 0n) {
        console.warn("\n⚠️  WARNING: Vault has 0 Liquidity. Loan requests will fail.");
    } else {
        console.log("\n✅ Vault has liquidity.");
    }

    if (allowance > 0n && userDeposit === 0n) {
        console.warn("⚠️  WARNING: You have approved funds but NOT deposited them.");
        console.log("   Run simulate_lender_bsc.js to deposit.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
