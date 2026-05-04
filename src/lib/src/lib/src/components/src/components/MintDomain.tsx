'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { DOMAIN_REGISTRY_ABI, DOMAIN_REGISTRY_ADDRESS, MINT_FEE_WEI, MIN_DOMAIN_LENGTH, MAX_DOMAIN_LENGTH } from '@/lib/constants'
import { switchToRitualTestnet } from '@/lib/wagmi'

export function MintDomain() {
  const [domainName, setDomainName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { chain } = useAccount()
  
  const { 
    data: hash, 
    writeContract, 
    isPending,
    error: writeError
  } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  const validateDomain = (name: string): boolean => {
    const regex = new RegExp(`^[a-z0-9]{${MIN_DOMAIN_LENGTH},${MAX_DOMAIN_LENGTH}}$`)
    return regex.test(name)
  }

  const handleMint = async () => {
    setError('')
    setSuccess('')
    
    const name = domainName.toLowerCase().trim()
    
    if (!validateDomain(name)) {
      setError(`Nama domain harus ${MIN_DOMAIN_LENGTH}-${MAX_DOMAIN_LENGTH} karakter, hanya huruf kecil & angka`)
      return
    }
    
    // Pastikan berada di chain Ritual
    if (chain?.id !== 1979) {
      const switched = await switchToRitualTestnet()
      if (!switched) {
        setError('Gagal switch ke Ritual Testnet. Silakan switch manual di wallet.')
        return
      }
    }
    
    try {
      await writeContract({
        address: DOMAIN_REGISTRY_ADDRESS as `0x${string}`,
        abi: DOMAIN_REGISTRY_ABI,
        functionName: 'mintDomain',
        args: [name],
        value: BigInt(MINT_FEE_WEI),
      })
    } catch (err: any) {
      setError(err?.shortMessage || err?.message || 'Terjadi kesalahan saat mint')
    }
  }

  const resetForm = () => {
    setDomainName('')
    setError('')
    setSuccess('')
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">🔖 Mint Domain .ritual</h3>
        <p className="text-gray-400 text-sm">Claim your unique Web3 identity</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Nama Domain</label>
          <div className="relative">
            <input
              type="text"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value.toLowerCase())}
              placeholder="mydomain"
              className="w-full px-4 py-3 pr-20 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-mono"
              disabled={isPending || isConfirming}
              maxLength={MAX_DOMAIN_LENGTH}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-mono">
              .ritual
            </span>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{domainName.length}/{MAX_DOMAIN_LENGTH} karakter</span>
            <span>Hanya a-z dan 0-9</span>
          </div>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
          <span className="text-gray-400 text-sm">Total Biaya</span>
          <div className="text-right">
            <span className="text-purple-400 font-bold font-mono">0.001 RITUAL</span>
            <p className="text-xs text-gray-500">Termasuk gas fee</p>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-900/30 border border-red-700/50 rounded-lg text-red-300 text-sm flex items-start gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-900/30 border border-green-700/50 rounded-lg text-green-300 text-sm flex items-start gap-2">
            <span>✅</span>
            <span>{success}</span>
          </div>
        )}

        {hash && (
          <div className="p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg text-blue-300 text-sm">
            <p className="font-mono text-xs mb-2">
              TX: {hash.slice(0, 10)}...{hash.slice(-8)}
            </p>
            <a 
              href={`https://explorer.ritualfoundation.org/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline text-xs"
            >
              Lihat di Explorer ↗
            </a>
          </div>
        )}

        {isConfirmed && (
          <div className="p-4 bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-600/50 rounded-xl text-center">
            <p className="text-green-300 font-medium mb-2">
              🎉 Domain <strong className="text-white">{domainName}.ritual</strong> berhasil dimint!
            </p>
            <button
              onClick={resetForm}
              className="text-sm text-gray-400 hover:text-white underline"
            >
              Mint domain lain →
            </button>
          </div>
        )}

        <button
          onClick={handleMint}
          disabled={isPending || isConfirming || !domainName.trim()}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
            isPending || isConfirming || !domainName.trim()
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5'
          }`}
        >
          {isPending ? '⏳ Konfirmasi di Wallet...' : 
           isConfirming ? '🔗 Sedang Mining...' : 
           '🚀 Mint Sekarang (0.001 RITUAL)'}
        </button>
        
        <p className="text-center text-xs text-gray-500">
          Pastikan wallet memiliki minimal 0.01 RITUAL untuk gas + fee
        </p>
      </div>
    </div>
  )
}
