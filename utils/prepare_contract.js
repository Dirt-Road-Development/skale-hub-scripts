const contracts = require("../contracts");
const chains = require("../chains");
const { Contract, JsonRpcProvider, Wallet } = require("ethers");
require("dotenv").config();



function prepare_contract(contractName, chainName, isMainnet = true) {

	const privateKey = process.env.PRIVATE_KEY;

	if (privateKey === undefined || privateKey === null) {
		throw new Error("Private Key Missing From .env");
	}
		
	const contractNames = Object.keys(contracts);
	const chainNames = Object.keys(chains);

	if (!contractNames.includes(contractName)) {
		throw new Error("Invalid Contract Name");
	}

	if (!chainNames.includes(chainName)) {
		throw new Error("Invalid Chain Name");
	}

	if (chainName === "chaos" && isMainnet) {
		throw new Error("Chaos is Testnet Only");
	}

	const provider = new JsonRpcProvider(chains[chainName][isMainnet ? "mainnet" : "testnet"]);
	const wallet = new Wallet(privateKey).connect(provider);
	const contract = new Contract(contracts[contractName].address, contracts[contractName].abi, wallet);

	return { contract, provider, wallet };
}

module.exports = prepare_contract;