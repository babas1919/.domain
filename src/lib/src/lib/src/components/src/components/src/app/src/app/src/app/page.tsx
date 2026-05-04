import { ConnectWallet } from '@/components/ConnectWallet'
import { MintDomain } from '@/components/MintDomain'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl">
              🔮
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              .domain Ritual
            </h1>
          </div>
          <ConnectWallet />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 border border-purple-700/50 rounded-full text-purple-300 text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Ritual Testnet Live
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Claim Your <br/>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              .ritual Domain
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Mint your unique Web3 identity on Ritual Chain. 
            Fast, secure, and powered by AI-native infrastructure.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>0.001 RITUAL mint fee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>1 year registration</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span>Instant confirmation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mint Section */}
      <section className="relative px-4 pb-20">
        <MintDomain />
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800/50 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p className="mb-2">
            Built on <span className="text-purple-400 font-medium">Ritual Chain</span> • Chain ID: 1979
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://docs.ritualfoundation.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition"
            >
              📚 Docs
            </a>
            <a 
              href="https://faucet.ritualfoundation.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition"
            >
              💧 Faucet
            </a>
            <a 
              href="https://explorer.ritualfoundation.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition"
            >
              🔍 Explorer
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
