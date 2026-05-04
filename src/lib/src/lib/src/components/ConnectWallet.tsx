'use client'

import { useAccount, useConnect, useDisconnect, useChainId } from 'wagmi'
import { RITUAL_TESTNET } from '@/lib/constants'
import { switchToRitualTestnet } from '@/lib/wagmi'

export function ConnectWallet() {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const chainId = useChainId()

  const isOnRitual = chainId === RITUAL_TESTNET.id

  const handleConnect = async (connector: any) => {
    await connect({ connector })
    await switchToRitualTestnet()
  }

  if (!isConnected) {
    return (
      <div className="flex gap-2 flex-wrap">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => handleConnect(connector)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
          >
            {connector.name === 'MetaMask' ? '🦊 MetaMask' : '🔗 WalletConnect'}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        <span className="text-sm font-mono text-gray-300">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      </div>
      
      {!isOnRitual && (
        <button
          onClick={switchToRitualTestnet}
          className="px-3 py-2 text-xs bg-yellow-600/80 hover:bg-yellow-600 text-white rounded-lg transition font-medium"
        >
          🔄 Switch to Ritual
        </button>
      )}
      
      <button
        onClick={() => disconnect()}
        className="px-3 py-2 text-xs bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition"
        title="Disconnect"
      >
        ✕
      </button>
    </div>
  )
}
