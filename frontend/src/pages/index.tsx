import { useEffect, useState } from 'react'
import type { NextPage } from 'next'

import contractAbi from '../abis/contracts/Store.json'
import { useWeb3Context } from '../contexts/Web3Provider'
import WalletStatus from '../components/WalletStatus'
import useContract from '../hooks/useContract'
import { Store } from '../abis/types'
import useTransaction from '../hooks/useTransaction'

const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

const Home: NextPage = () => {
  const { active, provider, error } = useWeb3Context()

  const [data, setData] = useState('')
  const [text, setText] = useState('')

  const contract = useContract<Store>(contractAddress, contractAbi.abi)
  const { handleTransaction, pending, error: txError } = useTransaction()

  useEffect(() => {
    const getData = async () => {
      if (active && contract) {
        const data = await contract.getData()
        setData(data)
      }
    }

    getData()
  }, [provider, active, contract])

  const execute = async () => {
    if (!contract) return

    const res = await handleTransaction(() => contract.setData(text))
    console.log(res)
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
      <div>{pending && <p>Waiting for confirmation</p>}</div>
      <div>{txError && <p>Something went wrong</p>}</div>
      <div>
        <p className="text-lg">Data: {data}</p>
      </div>
      {error && <div className="text-red-500">{error.message}</div>}
    </div>
  )
}

export default Home
