// Ritual Chain Testnet Configuration
export const RITUAL_TESTNET = {
  id: 1979,
  name: 'Ritual Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'RITUAL',
    symbol: 'RITUAL',
  },
  rpcUrls: {
    default: { http: ['https://rpc.ritualfoundation.org'] },
    public: { http: ['https://rpc.ritualfoundation.org'] },
  },
  blockExplorers: {
    default: {
      name: 'Ritual Explorer',
      url: 'https://explorer.ritualfoundation.org',
    },
  },
  testnet: true,
} as const

export const MINT_FEE_WEI = '1000000000000000' // 0.001 RITUAL in wei
export const MIN_DOMAIN_LENGTH = 3
export const MAX_DOMAIN_LENGTH = 20
export const REGISTRATION_DURATION = 365 * 24 * 60 * 60 // 1 year in seconds

export const DOMAIN_REGISTRY_ABI = [
  {
    type: 'function',
    name: 'mintDomain',
    inputs: [{ name: 'name', type: 'string', internalType: 'string' }],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'getDomain',
    inputs: [{ name: 'name', type: 'string' }],
    outputs: [{
      type: 'tuple',
      components: [
        { name: 'name', type: 'string' },
        { name: 'owner', type: 'address' },
        { name: 'registeredAt', type: 'uint256' },
        { name: 'expiresAt', type: 'uint256' },
        { name: 'isActive', type: 'bool' },
      ],
    }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getUserDomains',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [{ type: 'string[]' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'DomainMinted',
    inputs: [
      { name: 'name', type: 'string', indexed: true },
      { name: 'owner', type: 'address', indexed: true },
      { name: 'timestamp', type: 'uint256', indexed: true },
    ],
    anonymous: false,
  },
] as const

export const DOMAIN_REGISTRY_ADDRESS = 
  process.env.NEXT_PUBLIC_DOMAIN_REGISTRY_ADDRESS || 
  '0x0000000000000000000000000000000000000000'
