import { useMemo } from 'react'
import { ContractInterface, ethers } from 'ethers'
import { useWeb3Context } from '../contexts/Web3Provider'

const useContract = (
  address: string,
  abi: ContractInterface,
  withSigner = true
) => {
  const { provider, account } = useWeb3Context()

  const contract = useMemo(() => {
    const providerOrSigner =
      withSigner && account ? provider?.getSigner() : provider

    try {
      return new ethers.Contract(address, abi, providerOrSigner)
    } catch (error) {
      return null
    }
  }, [address, abi, provider, withSigner, account])

  return contract
}

export default useContract
