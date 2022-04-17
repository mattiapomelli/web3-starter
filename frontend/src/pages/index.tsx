import { useEffect, useState } from 'react'
import type { NextPage } from 'next'

import { ethers } from 'ethers'

import contractAbi from '../artifacts/contracts/Store.sol/Store.json'
import { useWeb3Context } from '../contexts/Web3Provider'
import WalletStatus from '../components/WalletStatus'

const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

const Home: NextPage = () => {
  const {
    active,
    provider,
    account,
    chainId,
    error,
    balance,
    connect,
    disconnect,
  } = useWeb3Context()

  const [data, setData] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    const getData = async () => {
      if (active) {
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi.abi,
          provider
        )

        const data = await contract.getData()
        setData(data)
      }
    }

    getData()
  }, [provider, active])

  const execute = async () => {
    if (active && provider) {
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi.abi,
        signer
      )

      try {
        await contract.setData(text)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
      <div>
        <WalletStatus />
      </div>
      <div className="flex gap-1">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-gray-300 py-2 px-4 rounded-full"
        />
        <button
          onClick={execute}
          className="py-2 px-4 bg-blue-500 text-white rounded-full"
        >
          Execute
        </button>
      </div>
      <div>
        <p className="text-lg">Data: {data}</p>
      </div>
      {error && <div className="text-red-500">{error.message}</div>}
    </div>
  )
}

export default Home
