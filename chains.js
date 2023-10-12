const {
	getTestnetRPC,
	getMainnetRPC
} = require("./utils/rpcs");

const chains = {
	chaos: {
		testnet: getTestnetRPC("fast-active-bellatrix"),
	},
	calypso: {
		testnet: getTestnetRPC("utter-unripe-menkar"),
		mainnet: getMainnetRPC("honorable-steel-rasalhague")
	},
	europa: {
		testnet: getTestnetRPC("legal-crazy-castor"),
		mainnet: getMainnetRPC("elated-tan-skat")
	},
	nebula: {
		testnet: getTestnetRPC("faint-slimy-achird"),
		mainnet: getMainnetRPC("green-giddy-denebola")
	},
	titan: {
		testnet: getTestnetRPC("chief-aware-gianfar"),
		mainnet: getMainnetRPC("parallel-stormy-spica")
	}
};

module.exports = chains;