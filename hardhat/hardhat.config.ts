import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-waffle'
import { task, HardhatUserConfig } from 'hardhat/config'

task('accounts', 'Prints the list of accounts', async (_, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

const config: HardhatUserConfig = {
  solidity: '0.8.4',
  paths: {
    artifacts: '../frontend/artifacts',
  },
}

export default config
