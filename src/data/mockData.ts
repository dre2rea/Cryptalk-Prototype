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
    currentPrice: 83241.0,
    change1d: -2.14,
    change7d: -5.72,
    change30d: -11.3,
    marketCap: "$1.65조",
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    nameKr: "이더리움",
    image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    currentPrice: 2187.0,
    change1d: -3.41,
    change7d: -8.15,
    change30d: -16.2,
    marketCap: "$2,632억",
  },
  {
    id: "ripple",
    symbol: "XRP",
    name: "XRP",
    nameKr: "리플",
    image: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
    currentPrice: 2.31,
    change1d: 4.82,
    change7d: 2.15,
    change30d: -5.7,
    marketCap: "$1,332억",
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    nameKr: "솔라나",
    image: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    currentPrice: 124.58,
    change1d: -1.87,
    change7d: -6.42,
    change30d: -14.8,
    marketCap: "$582억",
  },
  {
    id: "binancecoin",
    symbol: "BNB",
    name: "BNB",
    nameKr: "바이낸스코인",
    image: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
    currentPrice: 587.30,
    change1d: -0.95,
    change7d: -3.21,
    change30d: -7.4,
    marketCap: "$876억",
  },
  {
    id: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    nameKr: "도지코인",
    image: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
    currentPrice: 0.162,
    change1d: -4.12,
    change7d: -9.85,
    change30d: -22.1,
    marketCap: "$237억",
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    nameKr: "카르다노",
    image: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
    currentPrice: 0.684,
    change1d: -2.73,
    change7d: -7.41,
    change30d: -18.5,
    marketCap: "$243억",
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    nameKr: "폴카닷",
    image: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png",
    currentPrice: 4.82,
    change1d: -3.21,
    change7d: -8.94,
    change30d: -19.7,
    marketCap: "$72억",
  },
  {
    id: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    nameKr: "체인링크",
    image: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
    currentPrice: 13.47,
    change1d: -1.58,
    change7d: -5.82,
    change30d: -12.3,
    marketCap: "$86억",
  },
  {
    id: "avalanche-2",
    symbol: "AVAX",
    name: "Avalanche",
    nameKr: "아발란체",
    image: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
    currentPrice: 19.84,
    change1d: -2.67,
    change7d: -7.53,
    change30d: -15.1,
    marketCap: "$82억",
  },
];
