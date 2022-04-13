import { ethers } from 'hardhat'

async function main() {
  const [owner] = await ethers.getSigners()

  // Deploy contract
  const Store = await ethers.getContractFactory('Store')
  const store = await Store.deploy('Hello, Hardhat!')

  await store.deployed()

  console.log('Store deployed to:', store.address)
  console.log('Deployed by:', owner.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
