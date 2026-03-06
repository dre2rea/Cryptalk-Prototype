// CoinGecko image URLs for future-proof compatibility
// In production, these come from the /coins/{id} endpoint's `image.small` field

export interface CoinData {
  id: string; // CoinGecko coin ID
  symbol: string;
  name: string;
  nameKr: string;
  image: string;
  currentPrice: number;
  change1d: number;
  change7d: number;
  change30d: number;
  marketCap: string;
}

export const coins: CoinData[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    nameKr: "비트코인",
    image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    currentPrice: 121412.0,
    change1d: -1.7,
    change7d: -1.3,
    change30d: 1.0,
    marketCap: "$2.02조",
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    nameKr: "이더리움",
    image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    currentPrice: 4052.0,
    change1d: 3.55,
    change7d: 3.15,
    change30d: -2.5,
    marketCap: "$475억",
  },
  {
    id: "ripple",
    symbol: "XRP",
    name: "XRP",
    nameKr: "리플",
    image: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
    currentPrice: 0.8,
    change1d: -12.5,
    change7d: 1.0,
    change30d: -2.5,
    marketCap: "$40억",
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    nameKr: "솔라나",
    image: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    currentPrice: 185.3,
    change1d: 2.8,
    change7d: -0.45,
    change30d: 5.2,
    marketCap: "$82억",
  },
  {
    id: "binancecoin",
    symbol: "BNB",
    name: "BNB",
    nameKr: "바이낸스코인",
    image: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
    currentPrice: 610.5,
    change1d: 1.2,
    change7d: -0.8,
    change30d: 3.1,
    marketCap: "$91억",
  },
  {
    id: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    nameKr: "도지코인",
    image: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
    currentPrice: 0.06,
    change1d: 5.0,
    change7d: 5.0,
    change30d: 1.44,
    marketCap: "$8억",
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    nameKr: "카르다노",
    image: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
    currentPrice: 0.35,
    change1d: -2.5,
    change7d: 1.75,
    change30d: 1.75,
    marketCap: "$12억",
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    nameKr: "폴카닷",
    image: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png",
    currentPrice: 15.5,
    change1d: -0.5,
    change7d: -0.5,
    change30d: -0.5,
    marketCap: "$18억",
  },
  {
    id: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    nameKr: "체인링크",
    image: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
    currentPrice: 25.0,
    change1d: 2.0,
    change7d: -2.5,
    change30d: 2.0,
    marketCap: "$10억",
  },
  {
    id: "avalanche-2",
    symbol: "AVAX",
    name: "Avalanche",
    nameKr: "아발란체",
    image: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
    currentPrice: 38.2,
    change1d: 1.3,
    change7d: -1.8,
    change30d: 4.2,
    marketCap: "$14억",
  },
];
