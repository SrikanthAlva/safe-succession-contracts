import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "hardhat-deploy"
import "hardhat-contract-sizer"
import "dotenv/config"
import "solidity-docgen"

const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || ""
const ARBI_RPC_URL = process.env.ARBI_RPC_URL || ""
const CELO_RPC_URL = process.env.CELO_RPC_URL || ""
const SCROLL_RPC_URL = process.env.SCROLL_RPC_URL || ""
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || ""
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.20",
                settings: {
                    viaIR: true,
                    optimizer: {
                        enabled: true,
                        runs: 300,
                    },
                },
            },
        ],
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        localhost: {
            chainId: 31337,
        },
        polygonMumbai: {
            url: MUMBAI_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            saveDeployments: true,
            chainId: 80001,
        },
        arbitrumSepoliaTestnet: {
            url: ARBI_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            saveDeployments: true,
            chainId: 421614,
        },
        celoTestnet: {
            url: CELO_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            saveDeployments: true,
            chainId: 44787,
        },
        scrollTestnet: {
            url: SCROLL_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            saveDeployments: true,
            chainId: 534351,
        },
    },
    etherscan: {
        apiKey: {
            polygon: POLYGONSCAN_API_KEY,
            polygonMumbai: POLYGONSCAN_API_KEY,
        },
    },
    // gasReporter: {
    //     enabled: true,
    //     currency: "USD",
    //     outputFile: "gas-report.txt",
    //     noColors: true,
    //     coinmarketcap: COINMARKETCAP_API_KEY,
    //     token: "MATIC",
    // },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: false,
        disambiguatePaths: false,
        strict: false,
    },
    // docgen: {
    //     outputDir: "./docs",
    //     pages: "items",
    //     collapseNewlines: true,
    // },
    // mocha: {
    //     timeout: 300000, // 200 Seconds
    // },
}

export default config
