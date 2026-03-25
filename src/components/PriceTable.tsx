"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { coins } from "@/data/mockData";

type SortField = "price" | "1h" | "1d" | "7d" | null;
type SortDir = "asc" | "desc";
type Tab = "all" | "favorites";

const initialFavorites = new Set(["bitcoin", "ethereum", "solana", "ripple"]);

function StarIcon({ filled, onClick }: { filled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className="shrink-0 p-0 border-none bg-transparent cursor-pointer flex items-center justify-center transition-transform duration-150 ease-in-out hover:scale-[1.1]"
    >
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 1.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 10.67l-3.52 1.68.67-3.93L2.3 5.64l3.94-.57L8 1.5z"
          fill={filled ? "var(--star-filled)" : "none"}
          stroke={filled ? "var(--star-filled)" : "var(--text-disabled)"}
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function CoinIcon({ symbol, image }: { symbol: string; image: string }) {
  return (
    <img
      src={image}
      alt={symbol}
      className="w-[22px] h-[22px] rounded-full shrink-0 object-cover"
    />
  );
}

function Sparkline({ data }: { data: number[] }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const pad = 2; // vertical padding so strokes aren't clipped

  const baseline = data[0]; // starting price as baseline
  const baselineY = pad + (h - 2 * pad) - ((baseline - min) / range) * (h - 2 * pad);

  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: pad + (h - 2 * pad) - ((v - min) / range) * (h - 2 * pad),
  }));

  const points = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  // closed polygon that hugs the baseline for area fill
  const firstX = pts[0].x;
  const lastX = pts[pts.length - 1].x;
  const areaPath = `M${firstX},${baselineY} ` +
    pts.map((p) => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") +
    ` L${lastX},${baselineY} Z`;

  // unique id for clip paths & gradients
  const uid = `sp-${data.slice(0, 3).map((d) => Math.round(d * 10)).join("-")}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0">
      <defs>
        {/* Clip region above baseline (green) */}
        <clipPath id={`${uid}-up`}>
          <rect x="0" y="0" width={w} height={baselineY} />
        </clipPath>
        {/* Clip region below baseline (red) */}
        <clipPath id={`${uid}-down`}>
          <rect x="0" y={baselineY} width={w} height={h - baselineY} />
        </clipPath>
        {/* Green gradient: top (line) → baseline (fade out) */}
        <linearGradient id={`${uid}-gup`} gradientUnits="userSpaceOnUse" x1="0" y1={0} x2="0" y2={baselineY}>
          <stop offset="0%" stopColor="var(--fg-success-primary)" stopOpacity={0.6} />
          <stop offset="50%" stopColor="var(--fg-success-primary)" stopOpacity={0.2} />
          <stop offset="100%" stopColor="var(--fg-success-primary)" stopOpacity={0} />
        </linearGradient>
        {/* Red gradient: bottom (line) → baseline (fade out) */}
        <linearGradient id={`${uid}-gdown`} gradientUnits="userSpaceOnUse" x1="0" y1={h} x2="0" y2={baselineY}>
          <stop offset="0%" stopColor="var(--fg-error-primary)" stopOpacity={0.6} />
          <stop offset="50%" stopColor="var(--fg-error-primary)" stopOpacity={0.2} />
          <stop offset="100%" stopColor="var(--fg-error-primary)" stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* Green area fill (above baseline) */}
      <path
        d={areaPath}
        fill={`url(#${uid}-gup)`}
        clipPath={`url(#${uid}-up)`}
      />

      {/* Red area fill (below baseline) */}
      <path
        d={areaPath}
        fill={`url(#${uid}-gdown)`}
        clipPath={`url(#${uid}-down)`}
      />

      {/* Baseline dotted line */}
      <line
        x1="0"
        y1={baselineY}
        x2={w}
        y2={baselineY}
        stroke="var(--text-disabled)"
        strokeWidth="0.75"
        strokeDasharray="2 2"
        opacity={0.4}
      />

      {/* Green line (above baseline) */}
      <polyline
        points={points}
        fill="none"
        stroke="var(--fg-success-primary)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath={`url(#${uid}-up)`}
      />

      {/* Red line (below baseline) */}
      <polyline
        points={points}
        fill="none"
        stroke="var(--fg-error-primary)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath={`url(#${uid}-down)`}
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
      <svg width="6" height="4" viewBox="0 0 6 4">
        <path
          d="M3 0L6 4H0L3 0Z"
          fill={active && dir === "asc" ? "var(--text-primary)" : "var(--border-primary)"}
        />
      </svg>
      <svg width="6" height="4" viewBox="0 0 6 4">
        <path
          d="M3 4L0 0H6L3 4Z"
          fill={active && dir === "desc" ? "var(--text-primary)" : "var(--border-primary)"}
        />
      </svg>
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
  const [animateLayout, setAnimateLayout] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState(initialFavorites);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleTabChange = (t: Tab) => {
    setAnimateLayout(false);
    setTab(t);
  };

  const handleSort = (field: SortField) => {
    setAnimateLayout(true);
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

  const displayCoins = sorted.slice(0, 10);

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--border-secondary)] bg-[var(--bg-secondary)] p-[var(--spacing-2xl)] shadow-[var(--shadow-card)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-[var(--spacing-xl)]">
        <h2 className="text-[length:var(--font-size-text-md)] font-[var(--font-weight-medium)] leading-[var(--line-height-text-md)] text-[color:var(--text-primary)] m-0">
          가격 정보
        </h2>
        <div className="flex rounded-[7px] bg-[var(--bg-primary)] border border-[var(--border-secondary)] p-px gap-0">
          {(["all", "favorites"] as const).map((option) => (
            <button
              key={option}
              onClick={() => handleTabChange(option)}
              className={`px-[9px] py-0.5 rounded-[var(--radius-base)] cursor-pointer text-[length:var(--font-size-text-xs)] leading-[var(--line-height-text-xs)] transition-all duration-150 ease-in-out ${
                tab === option
                  ? "border border-[var(--border-secondary)] font-[var(--font-weight-medium)] text-[color:var(--text-primary)] bg-[var(--bg-secondary)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                  : "border border-transparent font-[var(--font-weight-regular)] text-[color:var(--text-quaternary)] bg-transparent shadow-none"
              }`}
            >
              {option === "all" ? "전체" : "즐겨찾기"}
            </button>
          ))}
        </div>
      </div>

      {/* Table Header */}
      <div className="flex items-center gap-[16px] px-[var(--spacing-sm)] pb-[var(--spacing-md)] border-b border-[var(--border-secondary)]">
        <span className="flex-1 min-w-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] text-[color:var(--text-quaternary)]">
          종목
        </span>
        {/* Spacer matching rank column */}
        <span className="w-[10px] shrink-0" />
        <button
          onClick={() => handleSort("price")}
          className="w-[80px] text-right shrink-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] text-[color:var(--text-quaternary)] bg-transparent border-none cursor-pointer flex items-center justify-end p-0"
        >
          현재가
          <SortArrow active={sortField === "price"} dir={sortDir} />
        </button>
        <button
          onClick={() => handleSort("1h")}
          className="w-[64px] text-right shrink-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] text-[color:var(--text-quaternary)] bg-transparent border-none cursor-pointer flex items-center justify-end p-0"
        >
          1h
          <SortArrow active={sortField === "1h"} dir={sortDir} />
        </button>
        <button
          onClick={() => handleSort("1d")}
          className="w-[64px] text-right shrink-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] text-[color:var(--text-quaternary)] bg-transparent border-none cursor-pointer flex items-center justify-end p-0"
        >
          24h
          <SortArrow active={sortField === "1d"} dir={sortDir} />
        </button>
        <button
          onClick={() => handleSort("7d")}
          className="w-[64px] text-right shrink-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] text-[color:var(--text-quaternary)] bg-transparent border-none cursor-pointer flex items-center justify-end p-0"
        >
          7d
          <SortArrow active={sortField === "7d"} dir={sortDir} />
        </button>
        <span className="w-[80px] ml-[var(--spacing-lg)] text-right shrink-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] text-[color:var(--text-quaternary)]">
          30d
        </span>
      </div>

      {/* Table Body */}
      <div className="flex flex-col gap-0.5 mt-0.5">
        {displayCoins.map((coin, i) => {
          return (
            <motion.div
              key={coin.id}
              layout={animateLayout}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center gap-[16px] py-[var(--spacing-md)] px-[var(--spacing-sm)] rounded-[var(--radius-base)] cursor-pointer transition-[background-color] duration-150 ease-in-out"
              style={{
                backgroundColor:
                  hovered === i ? "var(--bg-active)" : "transparent",
              }}
            >
              {/* Star */}
              <StarIcon
                filled={favoriteIds.has(coin.id)}
                onClick={() => toggleFavorite(coin.id)}
              />

              {/* Rank */}
              <span className="w-[16px] text-center shrink-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] text-[color:var(--text-disabled)] tabular-nums">
                {i + 1}
              </span>

              {/* Coin name */}
              <div className="flex items-center gap-[var(--spacing-md)] flex-1 min-w-0">
                <CoinIcon symbol={coin.symbol} image={coin.image} />
                <span className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-medium)] leading-[var(--line-height-text-sm)] text-[color:var(--text-secondary)] whitespace-nowrap overflow-hidden text-ellipsis">
                  {coin.nameKr}
                </span>
                <span className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-xs)] text-[color:var(--text-quaternary)] shrink-0">
                  {coin.symbol}
                </span>
              </div>

              {/* Price */}
              <span className="w-[80px] text-right shrink-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-medium)] leading-[var(--line-height-text-sm)] text-[color:var(--text-secondary)] tabular-nums">
                {formatPrice(coin.currentPrice)}
              </span>

              {/* 1H change */}
              <span
                className="w-[64px] text-right shrink-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-medium)] leading-[var(--line-height-text-sm)] tabular-nums"
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
                className="w-[64px] text-right shrink-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-medium)] leading-[var(--line-height-text-sm)] tabular-nums"
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
                className="w-[64px] text-right shrink-0 text-[length:var(--font-size-text-sm)] font-[var(--font-weight-medium)] leading-[var(--line-height-text-sm)] tabular-nums"
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
                <Sparkline data={coin.sparkline30d} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default PriceTable;
