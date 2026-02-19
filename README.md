# Manteia - Privacy-First Lending on BNB Chain

**Manteia** is a privacy-preserving lending protocol built on the **BNB Smart Chain (BSC)**. It leverages Zero-Knowledge Proofs (ZKPs) to allow borrowers to prove their creditworthiness (e.g., revenue, identity) without revealing sensitive underlying data. Lenders can fund "Verified Grade-A" loans with confidence, earning stable yields.

![Manteia Dashboard](https://via.placeholder.com/1200x600.png?text=Manteia+Dashboard+Preview)

## 🚀 Features

-   **Privacy-First:** Users generate ZK proofs locally (in-browser) to verify off-chain data (e.g., Stripe revenue).
-   **BNB Chain Powered:** Deployed on **BSC Testnet** for fast, low-cost transactions.
-   **Undercollateralized Loans:** Borrow against your reputation and proven revenue, not just crypto assets.
-   **Lender Yield:** Liquidity providers earn interest from real-world business loans.
-   **Real-Time Transparency:** All transactions and loan statuses are verifiable on-chain.

## 🛠️ Technology Stack

-   **Blockchain:** BNB Smart Chain (Testnet)
-   **Frontend:** Next.js 15, TailwindCSS, Phosphor Icons
-   **Web3 Integration:** Wagmi, RainbowKit, Viem
-   **Smart Contracts:** Solidity, Hardhat
-   **Zero-Knowledge:** Circom, SnarkJS
-   **Database:** Supabase (for off-chain indexing and real-time UI updates)

## 📦 Contracts (BSC Testnet)

| Contract | Address | Explorer |
| :--- | :--- | :--- |
| **ManteiaFactory** | `0xfE29315A177202359670Aca61bC760100d009228` | [View on BscScan](https://testnet.bscscan.com/address/0xfE29315A177202359670Aca61bC760100d009228) |
| **LendingVault** | `0xea000455B70747069792D40552739343De53E4DD` | [View on BscScan](https://testnet.bscscan.com/address/0xea000455B70747069792D40552739343De53E4DD) |
| **MockUSDC** | `0xE9Fa0ae8E97e88FA0fa3528b76921356af31376a` | [View on BscScan](https://testnet.bscscan.com/address/0xE9Fa0ae8E97e88FA0fa3528b76921356af31376a) |

## 🏁 Getting Started

### Prerequisites

-   Node.js 18+
-   A browser wallet (e.g., MetaMask, Rabby) configured for **BSC Testnet**.
-   **tBNB** for gas (Get it from the [BNB Chain Faucet](https://www.bnbchain.org/en/testnet-faucet)).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ImisiDahunsi4/manteia-bsc.git
    cd manteia-bsc
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the App:**
    Visit `http://localhost:3000` to start ensuring your financial privacy!

## 🧪 Testing the Flow

1.  **Connect Wallet:** Use the "Connect Wallet" button (top right). Ensure you are on **BSC Testnet**.
2.  **Verify Revenue:** Click "Verify Revenue" on the dashboard. This generates a mock ZK proof of >$50k revenue.
3.  **Request Loan:** Adjust the slider to your desired amount and click "Request Loan".
4.  **Confirm:** Sign the transaction in your wallet.
5.  **Track:** Watch the toast notification for a direct link to BscScan to verify your transaction immediately!

## 🛡️ License

MIT
