# AI Build Log: constructing Manteia

**Date:** February 19, 2026
**Project:** Manteia (Privacy-First Lending on BSC)
**AI Agent:** Antigravity (Google DeepMind)

## 📖 Introduction

This log documents the collaborative journey between the User and the AI Agent in building **Manteia**. It highlights how AI was leveraged not just for code generation, but for architectural decision-making, debugging complex cross-chain issues, and refining the product vision from an ambiguous concept to a polished, functional dApp on the BNB Smart Chain.

---

## Phase 1: Ideation & Conceptualization

*The initial spark was broad: "Privacy-preserving lending." The exact mechanism was undefined.*

**User Query:** "I want to build a lending app where users don't reveal their identity but can still prove they have money. Maybe using ZK?"

**AI Reasoning:**
-   analyzed the "Privacy Paradox" in DeFi.
-   Proposed using **Circom** for client-side Zero-Knowledge Proof generation.
-   suggested a "Revenue Verification" model: Borrowers prove off-chain income (e.g., Stripe, Bank APIs) without uploading the PDF itself.
-   **Pivot:** Instead of just "identity," we focused on "Creditworthiness preserving privacy."

**Outcome:** Defined the core loop: **Verify Off-Chain Data -> Generate Proof -> Request Loan -> Smart Contract Verifies Proof -> Fund Loan.**

---

## Phase 2: Architecture & scaffolding

*Building the foundation requires selecting the right stack for speed and reliability.*

**Log Entry #4:**
> **AI:** "For the frontend, I recommend Next.js 15 with Wagmi/RainbowKit for robust wallet handling. For the backend, we need a lightweight indexer. Supabase is perfect for syncing on-chain events to the UI in real-time."

**Implementation:**
-   Scaffolded Next.js app with a modern, dark-mode-first UI (TailwindCSS).
-   Created the **Design System**: specific color palettes (`#00D4AA` teal for success/money) and glassmorphism cards.
-   Wrote the `revenue_check.circom` circuit to mathematically prove `revenue > threshold`.

---

## Phase 3: Smart Contract Development

*Translating logic into Solidity.*

**Challenge:** How to verify the ZK proof on-chain efficiently?
**AI Solution:**
-   Generated `Groth16` verifier contracts using `snarkjs`.
-   Drafted `ManteiaFactory.sol` to handle loan requests.
-   Drafted `LendingVault.sol` to manage the liquidity pool.
-   **Optimization:** Added a `MockUSDC` token to simulate stablecoin flows on testnets without needing a bridge.

---

## Phase 4: The BSC Integration (The "Pivot")

*The user decided to target the BNB Smart Chain ecosystem.*

**User Request:** "Move this to BSC. It needs to work on BNB Chain."

**AI Action Plan:**
1.  **Re-configuration:** Updated `hardhat.config.js` to target **BSC Testnet (Chain ID 97)**.
2.  **RPC Management:** Identified reliable public RPC nodes for deployment (`https://data-seed-pre-0-s1.bnbchain.org:8545`).
3.  **Deployment:** Scripted the deployment process (`scripts/deploy.js`) to launch contracts on BSC.

**Crucial Debugging Session (Log #13):**
*Issue:* "Insufficient Liquidity" error when requesting a loan.
*AI Analysis:* "The error comes from the Vault contract. I suspected the Vault was empty. I wrote a script `check_bsc_state.js` which confirmed the Vault balance was 0 USDC."
*Fix:* "I wrote a simulation script `simulate_lender_bsc.js` to mint MockUSDC and deposit it into the Vault. Once funded, the borrower flow worked perfectly."

---

## Phase 5: UI Polish & User Experience

*Making it feel "Premium" and "Responsive".*

**Refinement:**
-   **Dynamic Toasts:** The UI initially linked to the wrong block explorer. AI updated `getExplorerLink` to intelligently detect `chainId` and link to **BscScan** or **MantleScan** dynamically.
-   **Real-Time Feedback:** Users were unsure if transactions went through. AI added a "Verify Transaction ↗" link directly in the toast notification, allowing users to track their tx hash immediately.
-   **Supabase Sync:** Fixed a case-sensitivity bug where `0xAbC...` from the wallet didn't match `0xabc...` in the database, ensuring the "Active Loan" status updates instantly.

---

## 🏆 Final Result

Manteia is now a fully functional, privacy-preserving lending protocol running on **BNB Smart Chain**. It leverages ZKPs for privacy, efficient smart contracts for lending logic, and a high-performance UI for a seamless user experience.

**Key AI Contributions:**
-   **Full Stack Generation:** From Solidity to React to Circom.
-   **Complex Debugging:** Solving liquidity and RPC issues on BSC.
-   **UX Optimization:** Proactive improvements to error handling and notifications.

*This log serves as a testament to the power of AI-augmented development.*
