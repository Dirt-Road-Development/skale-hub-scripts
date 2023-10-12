module.exports = {
	getTestnetRPC: (chainName) => `https://staging-v3.skalenodes.com/v1/staging-${chainName}`,
	getMainnetRPC: (chainName) => `https://mainnet.skalenodes.com/v1/${chainName}`,
};