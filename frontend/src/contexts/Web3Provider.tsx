import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from 'react'

import { ethers, providers } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

const injected = new InjectedConnector({
  supportedChainIds: [31337],
})

interface Web3ContextValue {
  provider?: providers.Web3Provider
  chainId?: number
  account?: null | string
  active: boolean
  error?: Error
  balance: number
  connect: () => void
  disconnect: () => void
}

const Web3Context = createContext<Web3ContextValue | undefined>(undefined)

interface Web3ProviderProps {
  children: ReactNode
}

const Web3ContextProvider = ({ children }: Web3ProviderProps) => {
  const {
    active,
    library: provider,
    activate,
    deactivate,
    account,
    chainId,
    error,
  } = useWeb3React<providers.Web3Provider>()

  const [disconnected, setDisconnected] = useState(false)
  const [balance, setBalance] = useState(0)

  // Connect wallet on load
  useEffect(() => {
    const connectWallet = async () => {
      try {
        const isAuthorized = await injected.isAuthorized()

        if (isAuthorized && !active) {
          await activate(injected)
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (!active && !disconnected) {
      connectWallet()
    }
  }, [active, activate, disconnected])

  // Get account balance
  useEffect(() => {
    const getBalance = async () => {
      if (provider && account) {
        const signer = provider.getSigner()
        const balance = await signer.getBalance()
        const formattedBalance = Number(ethers.utils.formatEther(balance))
        setBalance(formattedBalance)
      }
    }

    getBalance()
  }, [provider, active, account])

  // Connect to wallet
  const connect = async () => {
    try {
      await activate(injected)
    } catch (error) {
      console.error(error)
    }
  }

  // Disconnect wallet
  const disconnect = async () => {
    try {
      setDisconnected(true)
      await deactivate()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Web3Context.Provider
      value={{
        active,
        provider,
        account,
        chainId,
        error,
        connect,
        disconnect,
        balance,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export default Web3ContextProvider

export const useWeb3Context = () => {
  const context = useContext(Web3Context)

  if (context === undefined) {
    throw new Error('useWeb3Context must be used within an Web3Provider')
  }

  return context
}
