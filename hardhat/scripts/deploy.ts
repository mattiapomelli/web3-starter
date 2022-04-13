import { ethers } from 'hardhat'

async function main() {
  const [owner] = await ethers.getSigners()

  // Deploy contract
  const Greeter = await ethers.getContractFactory('Greeter')
  const greeter = await Greeter.deploy('Hello, Hardhat!')

  await greeter.deployed()

  console.log('Greeter deployed to:', greeter.address)
  console.log('Deployed by:', owner.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
