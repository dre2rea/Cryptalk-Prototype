"use client";

import { useState } from "react";
import { coins } from "@/data/mockData";

type SortField = "price" | "1h" | "1d" | "7d" | null;
type SortDir = "asc" | "desc";
type Tab = "all" | "favorites";

const iconColors: Record<string, string> = {
  BTC: "#F7931A",
  ETH: "#627EEA",
  XRP: "#23292F",
  SOL: "#9945FF",
  BNB: "#F3BA2F",
  DOGE: "#C2A633",
  ADA: "#0033AD",
  DOT: "#E6007A",
  LINK: "#2A5ADA",
  AVAX: "#E84142",
};

const favoriteIds = new Set(["bitcoin", "ethereum", "solana", "ripple"]);

function CoinIcon({ symbol }: { symbol: string }) {
  return (
    <div
      className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 opacity-85"
      style={{ backgroundColor: iconColors[symbol] || "#333" }}
    >
      <span className="text-[length:9px] font-bold text-white/90">
        {symbol.slice(0, 2)}
      </span>
    </div>
  );
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 24;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SortArrow({
  active,
  dir,
}: {
  active: boolean;
  dir: SortDir;
}) {
  return (
    <span className="inline-flex flex-col ml-1 leading-none gap-[1px]">
      <span
        className="text-[7px] leading-none"
        style={{
          color:
            active && dir === "asc"
              ? "var(--text-primary)"
              : "var(--text-disabled)",
        }}
      >
        ▲
      </span>
      <span
        className="text-[7px] leading-none"
        style={{
          color:
            active && dir === "desc"
              ? "var(--text-primary)"
              : "var(--text-disabled)",
        }}
      >
        ▼
      </span>
    </span>
  );
}

function formatPrice(price: number): string {
  if (price >= 1000) return `$${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  if (price >= 1) return `$${price.toFixed(2)}`;
  return `$${price.toFixed(3)}`;
}

export function PriceTable() {
  const [tab, setTab] = useState<Tab>("all");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [hovered, setHovered] = useState<number | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDir === "desc") setSortDir("asc");
      else {
        setSortField(null);
        setSortDir("desc");
      }
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const filtered = tab === "favorites"
    ? coins.filter((c) => favoriteIds.has(c.id))
    : coins;

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) return 0;
    const mul = sortDir === "asc" ? 1 : -1;
    switch (sortField) {
      case "price": return (a.currentPrice - b.currentPrice) * mul;
      case "1h": return (a.change1h - b.change1h) * mul;
      case "1d": return (a.change1d - b.change1d) * mul;
      case "7d": return (a.change7d - b.change7d) * mul;
      default: return 0;
    }
  });

  const displayCoins = sorted.slice(0, 7);

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-[var(--spacing-2xl)] shadow-[var(--shadow-card)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-[var(--spacing-xl)]">
        <h2 className="text-[length:var(--font-size-text-md)] font-[var(--font-weight-semibold)] leading-[var(--line-height-text-md)] text-[color:var(--text-primary)] m-0">
          가격 정보
        </h2>
        <div className="flex rounded-[7px] bg-[var(--bg-primary)] border border-[var(--border-primary)] p-px gap-0">
          {(["all", "favorites"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setTab(option)}
              className={`px-[9px] py-0.5 rounded-[var(--radius-base)] cursor-pointer text-[length:var(--font-size-text-xs)] leading-[var(--line-height-text-xs)] transition-all duration-150 ease-in-out ${
                tab === option
                  ? "border border-[var(--border-primary)] font-[var(--font-weight-medium)] text-[color:var(--text-primary)] bg-[var(--bg-secondary)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                  : "border border-transparent font-[var(--font-weight-regular)] text-[color:var(--text-quaternary)] bg-transparent shadow-none"
              }`}
            >
              {option === "all" ? "전체" : "즐겨찾기"}
            </button>
          ))}
        </div>
      </div>

      {/* Table Header */}
      <div className="flex items-center gap-[var(--spacing-md)] px-[var(--spacing-sm)] pb-[var(--spacing-md)] border-b border-[var(--border-primary)]">
        <span className="flex-1 min-w-0 text-[length:var(--font-size-text-xs)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-xs)] text-[color:var(--text-quaternary)]">
          종목
        </span>
        <button
          onClick={() => handleSort("price")}
          className="w-[80px] text-right shrink-0 text-[length:var(--font-size-text-xs)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-xs)] text-[color:var(--text-quaternary)] bg-transparent border-none cursor-pointer flex items-center justify-end p-0"
        >
          현재가
          <SortArrow active={sortField === "price"} dir={sortDir} />
        </button>
        <button
          onClick={() => handleSort("1h")}
          className="w-[64px] text-right shrink-0 text-[length:var(--font-size-text-xs)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-xs)] text-[color:var(--text-quaternary)] bg-transparent border-none cursor-pointer flex items-center justify-end p-0"
        >
          1H
          <SortArrow active={sortField === "1h"} dir={sortDir} />
        </button>
        <button
          onClick={() => handleSort("1d")}
          className="w-[64px] text-right shrink-0 text-[length:var(--font-size-text-xs)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-xs)] text-[color:var(--text-quaternary)] bg-transparent border-none cursor-pointer flex items-center justify-end p-0"
        >
          24H
          <SortArrow active={sortField === "1d"} dir={sortDir} />
        </button>
        <button
          onClick={() => handleSort("7d")}
          className="w-[64px] text-right shrink-0 text-[length:var(--font-size-text-xs)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-xs)] text-[color:var(--text-quaternary)] bg-transparent border-none cursor-pointer flex items-center justify-end p-0"
        >
          7D
          <SortArrow active={sortField === "7d"} dir={sortDir} />
        </button>
        <span className="w-[80px] ml-[var(--spacing-md)] text-right shrink-0 text-[length:var(--font-size-text-xs)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-xs)] text-[color:var(--text-quaternary)]">
          30D
        </span>
      </div>

      {/* Table Body */}
      <div className="flex flex-col gap-0.5 mt-0.5">
        {displayCoins.map((coin, i) => {
          const sparklineColor = coin.change30d >= 0
            ? "var(--fg-success-primary)"
            : "var(--fg-error-primary)";

          return (
            <div
              key={coin.id}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center gap-[var(--spacing-md)] py-[var(--spacing-md)] px-[var(--spacing-sm)] rounded-[var(--radius-base)] cursor-pointer transition-[background-color] duration-150 ease-in-out"
              style={{
                backgroundColor:
                  hovered === i ? "var(--bg-active)" : "transparent",
              }}
            >
              {/* Coin name */}
              <div className="flex items-center gap-[var(--spacing-md)] flex-1 min-w-0">
                <CoinIcon symbol={coin.symbol} />
                <span className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] text-[color:var(--text-secondary)] whitespace-nowrap overflow-hidden text-ellipsis">
                  {coin.nameKr}
                </span>
                <span className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-xs)] text-[color:var(--text-quaternary)] shrink-0">
                  {coin.symbol}
                </span>
              </div>

              {/* Price */}
              <span className="w-[80px] text-right shrink-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] text-[color:var(--text-secondary)] tabular-nums">
                {formatPrice(coin.currentPrice)}
              </span>

              {/* 1H change */}
              <span
                className="w-[64px] text-right shrink-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] tabular-nums"
                style={{
                  color: coin.change1h >= 0
                    ? "var(--fg-success-primary)"
                    : "var(--fg-error-primary)",
                }}
              >
                {coin.change1h >= 0 ? "+" : ""}
                {coin.change1h.toFixed(2)}%
              </span>

              {/* 24H change */}
              <span
                className="w-[64px] text-right shrink-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] tabular-nums"
                style={{
                  color: coin.change1d >= 0
                    ? "var(--fg-success-primary)"
                    : "var(--fg-error-primary)",
                }}
              >
                {coin.change1d >= 0 ? "+" : ""}
                {coin.change1d.toFixed(2)}%
              </span>

              {/* 7D change */}
              <span
                className="w-[64px] text-right shrink-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] tabular-nums"
                style={{
                  color: coin.change7d >= 0
                    ? "var(--fg-success-primary)"
                    : "var(--fg-error-primary)",
                }}
              >
                {coin.change7d >= 0 ? "+" : ""}
                {coin.change7d.toFixed(2)}%
              </span>

              {/* 30D sparkline */}
              <div className="w-[80px] ml-[var(--spacing-lg)] flex justify-end shrink-0">
                <Sparkline data={coin.sparkline30d} color={sparklineColor} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PriceTable;
