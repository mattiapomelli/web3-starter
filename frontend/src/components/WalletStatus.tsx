import { useLayoutEffect, useMemo, useRef } from 'react'
import jazzicon from '@metamask/jazzicon'

import { useWeb3Context } from '../contexts/Web3Provider'
import { UnsupportedChainIdError } from '@web3-react/core'

const WalletStatus = () => {
  const { active, account, balance, connect, error } = useWeb3Context()

  const iconRef = useRef<HTMLSpanElement>(null)
  const icon = useMemo(
    () => (account ? jazzicon(16, parseInt(account.slice(2, 10), 16)) : null),
    [account]
  )

  useLayoutEffect(() => {
    const current = iconRef.current
    if (icon) {
      current?.appendChild(icon)
    }

    return () => {
      if (icon) {
        current?.removeChild(icon)
      }
    }
  }, [icon, iconRef])

  if (error && error instanceof UnsupportedChainIdError) {
    return <div className="text-red-500">Wrong network</div>
  }

  if (active) {
    return (
      <div>
        {balance} - {account}
        <span ref={iconRef} />
      </div>
    )
  }

  return (
    <button
      onClick={connect}
      className="py-2 px-4 bg-blue-500 text-white rounded-full"
    >
      Connect
    </button>
  )
}

export default WalletStatus
