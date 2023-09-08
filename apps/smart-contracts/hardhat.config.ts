/* eslint-disable turbo/no-undeclared-env-vars */

import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import DotEnv from 'dotenv';

DotEnv.config({ path: '.env' });

const {
  ACCOUNT_PRIVATE_KEY = '',
  ALCHEMY_KEY = ''
} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.21'
      }
    ]
  },
  defaultNetwork: 'goerli',
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_KEY}`,
      accounts: [ACCOUNT_PRIVATE_KEY],
      gasPrice: 20000000000
    }
  }
};

export default config;
