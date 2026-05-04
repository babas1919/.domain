'use client'

import { createConfig, http } from 'wagmi'
import { metaMask, walletConnect } from 'wagmi/connectors'
import { RITUAL_TESTNET } from './constants'

export const config = createConfig({
  chains: [RITUAL_TESTNET],
  connectors: [
    metaMask(),
    walletConnect({ 
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your_project_id' 
    }),
  ],
  transports: {
    [RITUAL_TESTNET.id]: http(),
  },
})

// Helper untuk switch ke Ritual Testnet
export async function switchToRitualTestnet() {
  if (typeof window === 'undefined' || !window.ethereum) return false
  
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x7bb' }],
    })
    return true
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x7bb',
          chainName: 'Ritual Testnet',
          nativeCurrency: {
            name: 'RITUAL',
            symbol: 'RITUAL',
            decimals: 18,
          },
          rpcUrls: ['https://rpc.ritualfoundation.org'],
          blockExplorerUrls: ['https://explorer.ritualfoundation.org'],
        }],
      })
      return true
    }
    return false
  }
}

// Extend Window interface untuk Ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}
