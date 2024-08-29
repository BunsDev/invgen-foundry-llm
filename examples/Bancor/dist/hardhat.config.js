"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const named_accounts_1 = require("./data/named-accounts");
const Constants_1 = require("./utils/Constants");
require("./test/Setup");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-solhint");
require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");
const tenderly = __importStar(require("@tenderly/hardhat-tenderly"));
require("@typechain/hardhat");
require("dotenv/config");
require("hardhat-contract-sizer");
require("hardhat-dependency-compiler");
require("hardhat-deploy");
require("hardhat-storage-layout");
require("hardhat-watcher");
require("solidity-coverage");
const chainIds_json_1 = __importDefault(require("./utils/chainIds.json"));
const rpcUrls_json_1 = __importDefault(require("./utils/rpcUrls.json"));
tenderly.setup();
const { TENDERLY_TESTNET_PROVIDER_URL = '', VERIFY_API_KEY = '', GAS_PRICE: gasPrice = 'auto', TENDERLY_IS_FORK = false, TENDERLY_FORK_ID = '', TENDERLY_PROJECT = '', TENDERLY_TEST_PROJECT = '', TENDERLY_USERNAME = '', TENDERLY_NETWORK_NAME = Constants_1.DeploymentNetwork.Mainnet } = process.env;
const mochaOptions = () => {
    let timeout = 600000;
    let grep = '';
    let reporter;
    let invert = false;
    return {
        timeout,
        color: true,
        bail: true,
        grep,
        invert,
        reporter
    };
};
const config = {
    networks: {
        [Constants_1.DeploymentNetwork.Hardhat]: {
            accounts: {
                count: 20,
                accountsBalance: '10000000000000000000000000000000000000000000000'
            },
            allowUnlimitedContractSize: true,
            saveDeployments: false,
            live: false
        },
        [Constants_1.DeploymentNetwork.Mainnet]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Mainnet],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Mainnet],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Mainnet}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Optimism]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Optimism],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Optimism],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Optimism}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Cronos]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Cronos],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Cronos],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Cronos}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Rootstock]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Rootstock],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Rootstock],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Rootstock}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Telos]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Telos],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Telos],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Telos}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.BSC]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.BSC],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.BSC],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.BSC}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Gnosis]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Gnosis],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Gnosis],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Gnosis}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Polygon]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Polygon],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Polygon],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Polygon}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Fantom]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Fantom],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Fantom],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Fantom}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Hedera]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Hedera],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Hedera],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Hedera}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.ZkSync]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.ZkSync],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.ZkSync],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.ZkSync}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.PulseChain]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.PulseChain],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.PulseChain],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.PulseChain}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Astar]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Astar],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Astar],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Astar}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Metis]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Metis],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Metis],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Metis}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Moonbeam]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Moonbeam],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Moonbeam],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Moonbeam}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Kava]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Kava],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Kava],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Kava}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Mantle]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Mantle],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Mantle],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Mantle}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Canto]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Canto],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Canto],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Canto}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Klaytn]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Klaytn],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Klaytn],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Klaytn}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Base]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Base],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Base],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Base}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Fusion]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Fusion],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Fusion],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Fusion}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Mode]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Mode],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Mode],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Mode}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Arbitrum]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Arbitrum],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Arbitrum],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Arbitrum}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Celo]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Celo],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Celo],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Celo}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Avalanche]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Avalanche],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Avalanche],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Avalanche}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Linea]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Linea],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Linea],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Linea}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Scroll]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Scroll],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Scroll],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Scroll}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Aurora]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Aurora],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Aurora],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Aurora}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Sei]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Sei],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Sei],
            gasPrice,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Sei}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            },
            httpHeaders: {
                'x-apikey': process.env.SEI_RPC_API_KEY || ''
            }
        },
        [Constants_1.DeploymentNetwork.Sepolia]: {
            chainId: chainIds_json_1.default[Constants_1.DeploymentNetwork.Sepolia],
            url: rpcUrls_json_1.default[Constants_1.DeploymentNetwork.Sepolia],
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${Constants_1.DeploymentNetwork.Sepolia}`],
            verify: {
                etherscan: {
                    apiKey: VERIFY_API_KEY
                }
            }
        },
        [Constants_1.DeploymentNetwork.Tenderly]: {
            chainId: Number(chainIds_json_1.default[TENDERLY_NETWORK_NAME]),
            url: TENDERLY_IS_FORK ? `https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}` : TENDERLY_TESTNET_PROVIDER_URL,
            autoImpersonate: true,
            saveDeployments: true,
            live: true,
            deploy: [`deploy/scripts/${TENDERLY_NETWORK_NAME}`]
        }
    },
    tenderly: {
        forkNetwork: chainIds_json_1.default[TENDERLY_NETWORK_NAME].toString(),
        project: TENDERLY_PROJECT || TENDERLY_TEST_PROJECT,
        username: TENDERLY_USERNAME,
        privateVerification: true
    },
    solidity: {
        compilers: [
            {
                version: '0.8.19',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 2000
                    },
                    metadata: {
                        bytecodeHash: 'none'
                    },
                    outputSelection: {
                        '*': {
                            '*': ['storageLayout'] // Enable slots, offsets and types of the contract's state variables
                        }
                    }
                }
            }
        ]
    },
    paths: {
        deploy: ['deploy/scripts']
    },
    dependencyCompiler: {
        paths: [
            '@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol',
            'hardhat-deploy/solc_0.8/proxy/OptimizedTransparentUpgradeableProxy.sol'
        ]
    },
    namedAccounts: named_accounts_1.NamedAccounts,
    external: {
        deployments: {
            [Constants_1.DeploymentNetwork.Mainnet]: [`deployments/${Constants_1.DeploymentNetwork.Mainnet}`],
            [Constants_1.DeploymentNetwork.Mantle]: [`deployments/${Constants_1.DeploymentNetwork.Mantle}`],
            [Constants_1.DeploymentNetwork.Base]: [`deployments/${Constants_1.DeploymentNetwork.Base}`],
            [Constants_1.DeploymentNetwork.Arbitrum]: [`deployments/${Constants_1.DeploymentNetwork.Arbitrum}`],
            [Constants_1.DeploymentNetwork.Tenderly]: [`deployments/${Constants_1.DeploymentNetwork.Tenderly}`],
            [Constants_1.DeploymentNetwork.TenderlyTestnet]: [`deployments/${Constants_1.DeploymentNetwork.TenderlyTestnet}`]
        }
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: false,
        disambiguatePaths: false
    },
    watcher: {
        test: {
            tasks: [{ command: 'test' }],
            files: ['./test/**/*', './contracts/**/*', './deploy/**/*'],
            verbose: true
        }
    },
    mocha: mochaOptions()
};
exports.default = config;
//# sourceMappingURL=hardhat.config.js.map