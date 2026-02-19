const hre = require("hardhat");

async function main() {
    console.log("Available networks:", Object.keys(hre.config.networks));
    if (hre.config.networks.bscTestnet) {
        console.log("bscTestnet found:", hre.config.networks.bscTestnet);
    } else {
        console.log("bscTestnet NOT found!");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
