// CoinGecko image URLs for future-proof compatibility
// In production, these come from the /coins/{id} endpoint's `image.small` field

export interface CoinData {
  id: string; // CoinGecko coin ID
  symbol: string;
  name: string;
  nameKr: string;
  image: string;
  currentPrice: number;
  change1h: number;
  change1d: number;
  change7d: number;
  change30d: number;
  sparkline30d: number[];
  marketCap: string;
}

// Seeded PRNG for deterministic but unique sparklines
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface SparklineAnchor {
  t: number;
  value: number;
  variance?: number;
}

interface SparklineOptions {
  points?: number;
  anchors?: SparklineAnchor[];
  floor?: number;
  ceiling?: number;
  roughness?: number;
}

function easeInOut(t: number): number {
  return t * t * (3 - 2 * t);
}

function genSparkline(
  start: number,
  end: number,
  seed: number,
  options: SparklineOptions = {},
): number[] {
  const rand = mulberry32(seed);
  const points = options.points ?? 90;
  const anchors = [
    { t: 0, value: start, variance: 0.6 },
    ...(options.anchors ?? []),
    { t: 1, value: end, variance: 0.6 },
  ].sort((a, b) => a.t - b.t);
  const result: number[] = [];
  const baseRange = Math.max(Math.abs(end - start), Math.max(start, end) * 0.05);
  const floor = options.floor ?? Math.min(start, end) * 0.78;
  const ceiling = options.ceiling ?? Math.max(start, end) * 1.18;
  const roughness = options.roughness ?? 1;
  const waveCyclesA = 1.5 + rand() * 1.6;
  const waveCyclesB = 3.4 + rand() * 2.1;
  const waveCyclesC = 8.0 + rand() * 5.0;
  const phaseA = rand() * Math.PI * 2;
  const phaseB = rand() * Math.PI * 2;
  const phaseC = rand() * Math.PI * 2;

  for (let i = 0; i < points; i++) {
    if (i === 0) {
      result.push(start);
      continue;
    }

    if (i === points - 1) {
      result.push(end);
      continue;
    }

    const t = i / (points - 1);
    let segmentIndex = 0;
    while (
      segmentIndex < anchors.length - 2 &&
      t > anchors[segmentIndex + 1].t
    ) {
      segmentIndex += 1;
    }

    const left = anchors[segmentIndex];
    const right = anchors[segmentIndex + 1];
    const segmentSpan = right.t - left.t || 1;
    const segmentT = easeInOut((t - left.t) / segmentSpan);
    const baseValue = left.value + (right.value - left.value) * segmentT;
    const variance = ((left.variance ?? 1) + (right.variance ?? 1)) / 2;
    const wave =
      Math.sin(t * Math.PI * 2 * waveCyclesA + phaseA) * 0.55 +
      Math.sin(t * Math.PI * 2 * waveCyclesB + phaseB) * 0.45;
    const microWave = Math.sin(t * Math.PI * 2 * waveCyclesC + phaseC);
    const jitter = (rand() - 0.5) * 1.8;
    const spike = rand() > 0.87 ? (rand() - 0.5) * 2.2 : 0;
    const noise =
      baseRange * variance * (
        0.12 * (wave * 0.6 + microWave * 0.4) * roughness +
        0.06 * jitter * roughness +
        0.04 * spike * roughness
      );

    result.push(Math.min(ceiling, Math.max(floor, baseValue + noise)));
  }

  return result;
}

export const coins: CoinData[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    nameKr: "비트코인",
    image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    currentPrice: 83241.0,
    change1h: -0.32,
    change1d: -2.14,
    change7d: -5.72,
    change30d: -11.3,
    sparkline30d: genSparkline(93800, 83241, 1001, {
      anchors: [
        { t: 0.14, value: 96900, variance: 0.7 },
        { t: 0.33, value: 91150, variance: 1.1 },
        { t: 0.54, value: 93600, variance: 0.8 },
        { t: 0.76, value: 84800, variance: 1.3 },
      ],
      floor: 81000,
      ceiling: 98600,
      roughness: 0.9,
    }),
    marketCap: "$1.65조",
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    nameKr: "이더리움",
    image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    currentPrice: 2187.0,
    change1h: -0.58,
    change1d: -3.41,
    change7d: -8.15,
    change30d: -16.2,
    sparkline30d: genSparkline(2610, 2187, 2749, {
      anchors: [
        { t: 0.18, value: 2685, variance: 0.7 },
        { t: 0.4, value: 2390, variance: 1.2 },
        { t: 0.61, value: 2465, variance: 0.9 },
        { t: 0.82, value: 2225, variance: 1.4 },
      ],
      floor: 2100,
      ceiling: 2725,
      roughness: 1.1,
    }),
    marketCap: "$2,632억",
  },
  {
    id: "ripple",
    symbol: "XRP",
    name: "XRP",
    nameKr: "리플",
    image: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
    currentPrice: 2.31,
    change1h: 0.45,
    change1d: 4.82,
    change7d: 2.15,
    change30d: 8.4,
    sparkline30d: genSparkline(2.13, 2.31, 5503, {
      anchors: [
        { t: 0.12, value: 2.08, variance: 1.1 },
        { t: 0.29, value: 2.42, variance: 1.6 },
        { t: 0.46, value: 2.27, variance: 1.1 },
        { t: 0.67, value: 2.36, variance: 1.3 },
        { t: 0.84, value: 2.24, variance: 0.9 },
      ],
      floor: 2.02,
      ceiling: 2.48,
      roughness: 1.5,
    }),
    marketCap: "$1,332억",
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    nameKr: "솔라나",
    image: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    currentPrice: 124.58,
    change1h: -0.21,
    change1d: -1.87,
    change7d: -6.42,
    change30d: -14.8,
    sparkline30d: genSparkline(146, 124.58, 8317, {
      anchors: [
        { t: 0.1, value: 152, variance: 0.8 },
        { t: 0.29, value: 138, variance: 1.2 },
        { t: 0.47, value: 142, variance: 0.8 },
        { t: 0.69, value: 126.8, variance: 1.3 },
        { t: 0.88, value: 129.6, variance: 0.6 },
      ],
      floor: 121,
      ceiling: 154,
      roughness: 1.2,
    }),
    marketCap: "$582억",
  },
  {
    id: "binancecoin",
    symbol: "BNB",
    name: "BNB",
    nameKr: "바이낸스코인",
    image: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
    currentPrice: 587.30,
    change1h: 0.12,
    change1d: -0.95,
    change7d: -3.21,
    change30d: 3.1,
    sparkline30d: genSparkline(569.6, 587.3, 12041, {
      anchors: [
        { t: 0.15, value: 562, variance: 0.8 },
        { t: 0.34, value: 598, variance: 1.0 },
        { t: 0.53, value: 581, variance: 0.7 },
        { t: 0.77, value: 603, variance: 0.9 },
      ],
      floor: 554,
      ceiling: 608,
      roughness: 1.0,
    }),
    marketCap: "$876억",
  },
  {
    id: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    nameKr: "도지코인",
    image: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
    currentPrice: 0.162,
    change1h: -0.87,
    change1d: -4.12,
    change7d: -9.85,
    change30d: -22.1,
    sparkline30d: genSparkline(0.208, 0.162, 17389, {
      anchors: [
        { t: 0.08, value: 0.221, variance: 1.2 },
        { t: 0.23, value: 0.198, variance: 1.1 },
        { t: 0.37, value: 0.214, variance: 1.4 },
        { t: 0.56, value: 0.176, variance: 1.2 },
        { t: 0.78, value: 0.169, variance: 0.9 },
      ],
      floor: 0.155,
      ceiling: 0.225,
      roughness: 1.6,
    }),
    marketCap: "$237억",
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    nameKr: "카르다노",
    image: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
    currentPrice: 0.684,
    change1h: -0.41,
    change1d: -2.73,
    change7d: -7.41,
    change30d: -18.5,
    sparkline30d: genSparkline(0.840, 0.684, 23671, {
      anchors: [
        { t: 0.14, value: 0.826, variance: 0.8 },
        { t: 0.31, value: 0.754, variance: 1.0 },
        { t: 0.48, value: 0.777, variance: 0.8 },
        { t: 0.66, value: 0.709, variance: 0.9 },
        { t: 0.84, value: 0.695, variance: 0.6 },
      ],
      floor: 0.668,
      ceiling: 0.85,
      roughness: 1.3,
    }),
    marketCap: "$243억",
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    nameKr: "폴카닷",
    image: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png",
    currentPrice: 4.82,
    change1h: -0.65,
    change1d: -3.21,
    change7d: -8.94,
    change30d: -19.7,
    sparkline30d: genSparkline(6.00, 4.82, 31337, {
      anchors: [
        { t: 0.15, value: 5.91, variance: 0.7 },
        { t: 0.34, value: 5.36, variance: 1.0 },
        { t: 0.55, value: 5.52, variance: 0.9 },
        { t: 0.75, value: 4.93, variance: 1.0 },
        { t: 0.9, value: 5.01, variance: 0.6 },
      ],
      floor: 4.7,
      ceiling: 6.08,
      roughness: 1.25,
    }),
    marketCap: "$72억",
  },
  {
    id: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    nameKr: "체인링크",
    image: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
    currentPrice: 13.47,
    change1h: 0.28,
    change1d: -1.58,
    change7d: -5.82,
    change30d: 6.8,
    sparkline30d: genSparkline(12.61, 13.47, 42069, {
      anchors: [
        { t: 0.13, value: 12.38, variance: 1.0 },
        { t: 0.3, value: 13.12, variance: 1.1 },
        { t: 0.52, value: 12.88, variance: 0.8 },
        { t: 0.72, value: 13.71, variance: 1.0 },
        { t: 0.88, value: 13.22, variance: 0.8 },
      ],
      floor: 12.2,
      ceiling: 13.95,
      roughness: 1.35,
    }),
    marketCap: "$86억",
  },
  {
    id: "avalanche-2",
    symbol: "AVAX",
    name: "Avalanche",
    nameKr: "아발란체",
    image: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
    currentPrice: 19.84,
    change1h: -0.53,
    change1d: -2.67,
    change7d: -7.53,
    change30d: -15.1,
    sparkline30d: genSparkline(23.38, 19.84, 55555, {
      anchors: [
        { t: 0.11, value: 24.22, variance: 1.0 },
        { t: 0.27, value: 21.56, variance: 1.2 },
        { t: 0.44, value: 22.31, variance: 0.9 },
        { t: 0.67, value: 19.96, variance: 1.2 },
        { t: 0.85, value: 20.58, variance: 0.8 },
      ],
      floor: 19.35,
      ceiling: 24.5,
      roughness: 1.4,
    }),
    marketCap: "$82억",
  },
];
