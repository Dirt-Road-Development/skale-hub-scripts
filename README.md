# SKALE Hub Management

The following scripts are designed to help hub managers take certain actions to help clean-up their SKALE Chain. 

## Setup

1. Run ```git clone git@github.com:Dirt-Road-Development/skale-hub-scripts.git```
2. Run ```npm install```
3. Run ```cp .env.sample .env``` and add a PRIVATE_KEY to your .env file (DO NOT SHARE or Upload to Source Control)

### Config

The config file in the root of the project called config.json allows you to configure the scripts quickly and efficienlty. 

Available Chains

|Chain Name| Key to Use | Testnet | Mainnet |
| -------- | -----------| ------- | --------|
| Chaos    | chaos		| Yes	  | No 		|
| Calypso  | calypso    | Yes	  | Yes 	|
| Europa   | europa     | Yes	  | Yes 	|
| nebula   | nebula     | Yes	  | Yes 	|
| titan    | titan      | Yes	  | Yes 	|
| -------- | ---------- | ------- | ------- |

### Available Scripts

#### Bulk Remove Deployer Role

The following script is designed to bulk remove the deployer role.
The PRIVATE_KEY added must have DEPLOYER_ADMIN_ROLE to run this script successfully. 

> Make sure that you have updated the network and chain in the config.json file.

**How to Run**
```shell
npm run config::bulk::revoke::deployer
```


#### Notes
- Calypso and Europa bulk actions may take longer to run due to lack of MTM Mode

Security & Liability
----------
SKALE Hub Scripts comes WITHOUT ANY WARRANTY; without even the implied warranty for any user commerical or otherwise. The creators and contributors of this package may not be held liable for any damages, losses, issues, or problems caused resulting in the use of this package for any reason.

<p style="font-weight: bold; color: red;">**EXPERIMENTAL NOTICE**<br />
This package is under heavy development. Use at your own risk.
</p>

License
----------
All contributions are made under the MIT License (including all sub projects). See [License](./LICENSE)