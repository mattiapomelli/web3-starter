import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [account, setAccount] = useState(null)

  useEffect(() => {
    const getConnectedAccount = async () => {
      if (!window.ethereum) return
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })

      if (accounts.length !== 0) {
        setAccount(accounts[0])
      }
    }

    getConnectedAccount()
  }, [])

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      setAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button
        onClick={connectWallet}
        className="py-2 px-4 bg-blue-500 text-white rounded-full"
      >
        Connect
      </button>
      <h1>{account}</h1>
    </div>
  )
}

export default Home
