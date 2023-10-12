const prepare_contract = require("../utils/prepare_contract");
const config = require("../config");
const {
	id
} = require("ethers");

/**
 * @description The following function removes deployer role from all addresses unless specified in the config.json file or hardcoded into the list in this function
 */
async function main() {

	/// Addresses to Ignore
	let addressesToIgnore = ["0x2c20ef3fc0248fca2dc57bcb202f2cae504a9a66"]; /// string[];

	/// Uses Config.json addresses too
	addressesToIgnore = addressesToIgnore.concat(config.config_controller.ignore.bulk_remove_deployer_role);

	addressesToIgnore = addressesToIgnore.map((addr) => addr.toLowerCase());

	const { contract: ConfigController, provider, wallet } = prepare_contract("config_controller", config.active_chain, config.active_network === "mainnet");
	const { contract: Multicall } = prepare_contract("multicall", config.active_chain, config.active_network === "mainnet");

	const DEPLOYER_ROLE = id("DEPLOYER_ROLE");

	const deployerCount = await ConfigController.getRoleMemberCount(DEPLOYER_ROLE);
	let nonce = await wallet.getNonce();

	const getAddressesEncodedData = Array.from({ length: Number(deployerCount) }, (_, i) => {
		return [
			ConfigController.target,
			false,
			ConfigController.interface.encodeFunctionData(
				"getRoleMember",
				[DEPLOYER_ROLE, i]
			)
		]
	});
	
	const addressesFromMulticall = await Multicall.aggregate3.staticCall(getAddressesEncodedData);

	const results = addressesFromMulticall.map(({ success, returnData }, i) => {
		if (!success) throw new Error("Failed to get deployer role address");
		return ConfigController.interface.decodeFunctionResult('getRoleMember', returnData)[0];
	});

	let addressesRemoved = [];
	
	for (let i = 0; i < results.length; i++) {
		if (!addressesToIgnore.includes(results[i].toLowerCase())) {
			await ConfigController.revokeRole(DEPLOYER_ROLE, results[i], {
				nonce: nonce++
			});

			addressesRemoved.push(results[i]);
		}
	}

	console.log("Addresses Removed: ", {
		total: addressesRemoved.length,
		addressesRemoved
	})


}

main()
	.catch((err) => {
		console.error(err);
		process.exitCode = 1;
	})