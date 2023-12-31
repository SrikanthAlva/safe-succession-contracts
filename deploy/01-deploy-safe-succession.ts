import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import {
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../helper-hardhat-config"
import verify from "../utils/verify"
import { ethers } from "hardhat"

const deployStorage: DeployFunction = async (
    hre: HardhatRuntimeEnvironment
) => {
    const { deployments, network, getNamedAccounts } = hre
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments
    const chainId = network.config.chainId || 31337

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    if (developmentChains.includes(network.name)) {
        // Write code Specific to Local Network Testing
    }

    const args: any[] = []

    const safeSuccession = await deploy("SafeSuccession", {
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: waitBlockConfirmations,
    })

    // if (
    //     !developmentChains.includes(network.name) &&
    //     process.env.POLYGONSCAN_API_KEY &&
    //     process.env.VERIFY_CONTRACTS
    // ) {
    //     log("Verifying...")
    //     await verify(safeSuccession.address, args)
    // }
}

export default deployStorage
deployStorage.tags = ["all", "safe"]
