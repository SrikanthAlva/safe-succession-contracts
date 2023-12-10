import { ethers, network } from "hardhat"
import { SafeSuccession } from "../typechain-types"

// yarn hardhat run scripts/interact.ts
// npx hardhat run scripts/interact.ts
// hh run scripts/interact.ts

async function sampleScript() {
    // Script Body

    const accounts = await ethers.getSigners()

    const deployer = accounts[0]
    const bidder1 = accounts[1]

    const safeSuccessionContract: SafeSuccession = await ethers.getContract(
        "SafeSuccession"
    )
    const storeTx = await safeSuccessionContract.createWill()
    await storeTx.wait(1)

    // const retrieveValue = await safeSuccessionContract.retrieve()
    // console.log("Stored Value", retrieveValue.toString())

    // Connect with Different Account with the Smart Contract

    // const bidderConnectedContract = await safeSuccessionContract.connect(bidder1)
    // const storeTx2 = await bidderConnectedContract.store(21)
    // await storeTx2.wait(1)
    // const retrieveValue2 = await bidderConnectedContract.retrieve()
    // console.log("Stored Value ", retrieveValue2.toString())
}

sampleScript()
    .then(() => process.exit(0))
    .catch((error: any) => {
        console.error(error)
        process.exit(1)
    })
