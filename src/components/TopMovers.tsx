"use client";

import { useState } from "react";

const gainersData = {
  "24h": [
    { rank: 1, name: "리플", ticker: "XRP", price: 2.31, change: 4.82 },
    { rank: 2, name: "모나드", ticker: "MON", price: 3.74, change: 3.95 },
    { rank: 3, name: "스택스", ticker: "STX", price: 1.18, change: 2.87 },
    { rank: 4, name: "인젝티브", ticker: "INJ", price: 14.52, change: 2.14 },
    { rank: 5, name: "체인링크", ticker: "LINK", price: 13.47, change: 1.73 },
  ],
  "1h": [
    { rank: 1, name: "모나드", ticker: "MON", price: 3.74, change: 1.84 },
    { rank: 2, name: "리플", ticker: "XRP", price: 2.31, change: 1.22 },
    { rank: 3, name: "인젝티브", ticker: "INJ", price: 14.52, change: 0.95 },
    { rank: 4, name: "스택스", ticker: "STX", price: 1.18, change: 0.71 },
    { rank: 5, name: "체인링크", ticker: "LINK", price: 13.47, change: 0.38 },
  ],
};

const losersData = {
  "24h": [
    { rank: 1, name: "월드코인", ticker: "WLD", price: 0.87, change: -11.24 },
    { rank: 2, name: "앱토스", ticker: "APT", price: 5.41, change: -9.73 },
    { rank: 3, name: "도지코인", ticker: "DOGE", price: 0.162, change: -4.12 },
    { rank: 4, name: "이더리움", ticker: "ETH", price: 2187.0, change: -3.41 },
    { rank: 5, name: "폴카닷", ticker: "DOT", price: 4.82, change: -3.21 },
  ],
  "1h": [
    { rank: 1, name: "앱토스", ticker: "APT", price: 5.41, change: -2.18 },
    { rank: 2, name: "월드코인", ticker: "WLD", price: 0.87, change: -1.74 },
    { rank: 3, name: "도지코인", ticker: "DOGE", price: 0.162, change: -1.35 },
    { rank: 4, name: "폴카닷", ticker: "DOT", price: 4.82, change: -0.92 },
    { rank: 5, name: "이더리움", ticker: "ETH", price: 2187.0, change: -0.67 },
  ],
};

const coinImages: Record<string, string> = {
  BTC: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  ETH: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  XRP: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
  SOL: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
  DOGE: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
  DOT: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png",
  LINK: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
  INJ: "https://assets.coingecko.com/coins/images/12882/small/Secondary_Symbol.png",
  STX: "https://assets.coingecko.com/coins/images/2069/small/Stacks_logo_full.png",
  MON: "https://assets.coingecko.com/coins/images/52490/small/monad.jpg",
  WLD: "https://assets.coingecko.com/coins/images/31069/small/worldcoin.jpeg",
  APT: "https://assets.coingecko.com/coins/images/26455/small/aptos_round.png",
};

function CoinIcon({ ticker }: { ticker: string }) {
  const src = coinImages[ticker];
  if (src) {
    return <img src={src} alt={ticker} className="w-[22px] h-[22px] rounded-full shrink-0 object-cover" />;
  }
  return (
    <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 bg-[#333]">
      <span className="text-[length:9px] font-bold text-white/90">{ticker.slice(0, 2)}</span>
    </div>
  );
}

function TimeToggle({
  value,
  onChange,
}: {
  value: "1h" | "24h";
  onChange: (v: "1h" | "24h") => void;
}) {
  return (
    <div className="flex rounded-[7px] bg-[var(--bg-primary)] border border-[var(--border-secondary)] p-px gap-0">
      {(["1h", "24h"] as const).map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-[9px] py-0.5 rounded-[var(--radius-base)] cursor-pointer text-[length:var(--font-size-text-xs)] leading-[var(--line-height-text-xs)] transition-all duration-150 ease-in-out ${
            value === option
              ? "border border-[var(--border-secondary)] font-[var(--font-weight-medium)] text-[color:var(--text-primary)] bg-[var(--bg-secondary)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              : "border border-transparent font-[var(--font-weight-regular)] text-[color:var(--text-quaternary)] bg-transparent shadow-none"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function MoverCard({
  title,
  data,
  type,
}: {
  title: string;
  data: Record<"1h" | "24h", typeof gainersData["24h"]>;
  type: "gainer" | "loser";
}) {
  const [timeframe, setTimeframe] = useState<"1h" | "24h">("24h");
  const [hovered, setHovered] = useState<number | null>(null);
  const items = data[timeframe];
  const isGainer = type === "gainer";
  const accentColor = isGainer
    ? "var(--fg-success-primary)"
    : "var(--fg-error-primary)";

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--border-secondary)] bg-[var(--bg-secondary)] pt-[var(--spacing-xl)] px-[var(--spacing-2xl)] pb-[var(--spacing-2xl)] shadow-[var(--shadow-card)] flex-1 min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-[var(--spacing-xl)]">
        <h2 className="text-[length:var(--font-size-text-md)] font-[var(--font-weight-medium)] leading-[var(--line-height-text-md)] text-[color:var(--text-primary)] m-0">
          {title}
        </h2>
        <TimeToggle value={timeframe} onChange={setTimeframe} />
      </div>

      {/* List */}
      <div className="flex flex-col gap-0.5">
        {items.map((item, i) => (
          <div
            key={`${item.ticker}-${i}`}
            role="button"
            tabIndex={0}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center gap-[var(--spacing-md)] py-[var(--spacing-md)] px-[var(--spacing-sm)] rounded-[var(--radius-base)] cursor-pointer transition-[background-color] duration-150 ease-in-out"
            style={{
              backgroundColor:
                hovered === i ? "var(--bg-active)" : "transparent",
            }}
          >
            {/* Rank */}
            <span className="w-[10px] text-right shrink-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] text-[color:var(--text-disabled)] tabular-nums">
              {item.rank}
            </span>

            {/* Icon */}
            <CoinIcon ticker={item.ticker} />

            {/* Name + Ticker */}
            <div className="flex items-center gap-[var(--spacing-md)] flex-1 min-w-0">
              <span className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] text-[color:var(--text-secondary)] whitespace-nowrap overflow-hidden text-ellipsis">
                {item.name}
              </span>
              <span className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-xs)] text-[color:var(--text-quaternary)] shrink-0">
                {item.ticker}
              </span>
            </div>

            {/* Price */}
            <span className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] text-[color:var(--text-secondary)] text-right shrink-0 tabular-nums">
              ${item.price < 1 ? item.price.toFixed(3) : item.price.toFixed(2)}
            </span>

            {/* Change */}
            <span
              className="flex items-center justify-end gap-1 w-[72px] shrink-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] tabular-nums"
              style={{ color: accentColor }}
            >
              <span className="text-[length:8px] leading-none">
                {isGainer ? "▲" : "▼"}
              </span>
              {Math.abs(item.change).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TopMovers() {
  return (
    <div className="flex gap-[var(--spacing-lg)] flex-1 min-w-0">
      <MoverCard title="상승 종목" data={gainersData} type="gainer" />
      <MoverCard title="하락 종목" data={losersData} type="loser" />
    </div>
  );
}

export default TopMovers;
