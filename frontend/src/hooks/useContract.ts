import { useMemo } from 'react'
import { ContractInterface, ethers } from 'ethers'
import { Contract } from '@ethersproject/contracts'

import { useWeb3Context } from '../contexts/Web3Provider'

const useContract = <T extends Contract = Contract>(
  address: string,
  abi: ContractInterface,
  withSigner = true
): T | null => {
  const { provider, account } = useWeb3Context()

  const contract = useMemo(() => {
    const providerOrSigner =
      withSigner && account ? provider?.getSigner() : provider

    try {
      return new ethers.Contract(address, abi, providerOrSigner) as T
    } catch (error) {
      return null
    }
  }, [address, abi, provider, withSigner, account])

  return contract
}

export default useContract
