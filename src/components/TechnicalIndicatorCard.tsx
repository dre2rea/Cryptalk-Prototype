"use client";

import { useState } from "react";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const volumeSurgeCoins = [
  { rank: 1, name: "그래비티", ticker: "G", value: 20354.62 },
  { rank: 2, name: "엑스와이오", ticker: "XYO", value: 2339.37 },
  { rank: 3, name: "디젠", ticker: "DEGEN", value: 1659.77 },
  { rank: 4, name: "바나", ticker: "VANA", value: 1167.03 },
  { rank: 5, name: "아짓", ticker: "AZIT", value: 1141.11 },
];

const volumeDropCoins = [
  { rank: 1, name: "솔라나", ticker: "SOL", value: -72.4 },
  { rank: 2, name: "이더리움", ticker: "ETH", value: -65.8 },
  { rank: 3, name: "도지코인", ticker: "DOGE", value: -58.2 },
  { rank: 4, name: "리플", ticker: "XRP", value: -51.0 },
  { rank: 5, name: "비트코인", ticker: "BTC", value: -44.3 },
];

const oversoldCoins = [
  { rank: 1, name: "피크", ticker: "PEAQ", value: 16.54 },
  { rank: 2, name: "오아시스", ticker: "OAS", value: 19.0 },
  { rank: 3, name: "얼라이언스", ticker: "AL", value: 21.14 },
  { rank: 4, name: "파이트", ticker: "FIGHT", value: 22.38 },
  { rank: 5, name: "인프라레드", ticker: "IR", value: 24.16 },
];

const overboughtCoins = [
  { rank: 1, name: "솔라나", ticker: "SOL", value: 82.3 },
  { rank: 2, name: "수이", ticker: "SUI", value: 78.5 },
  { rank: 3, name: "비트코인", ticker: "BTC", value: 76.1 },
  { rank: 4, name: "도지코인", ticker: "DOGE", value: 74.8 },
  { rank: 5, name: "리플", ticker: "XRP", value: 73.2 },
];

const oiSurgeCoins = [
  { rank: 1, name: "솔라나", ticker: "SOL", value: 42.3, priceChange: 8.7 },
  { rank: 2, name: "인젝티브", ticker: "INJ", value: 38.1, priceChange: -4.2 },
  { rank: 3, name: "수이", ticker: "SUI", value: 31.5, priceChange: 12.1 },
  { rank: 4, name: "페페", ticker: "PEPE", value: 27.8, priceChange: 5.3 },
  { rank: 5, name: "아비트럼", ticker: "ARB", value: 22.4, priceChange: -1.9 },
];

const oiDropCoins = [
  { rank: 1, name: "도지코인", ticker: "DOGE", value: -35.2, priceChange: -6.1 },
  { rank: 2, name: "리플", ticker: "XRP", value: -28.7, priceChange: 1.4 },
  { rank: 3, name: "비트코인", ticker: "BTC", value: -21.3, priceChange: -0.8 },
  { rank: 4, name: "이더리움", ticker: "ETH", value: -18.9, priceChange: -2.3 },
  { rank: 5, name: "아발란체", ticker: "AVAX", value: -15.4, priceChange: 0.6 },
];

const fundingHighCoins = [
  { rank: 1, name: "페페", ticker: "PEPE", value: 0.078 },
  { rank: 2, name: "수이", ticker: "SUI", value: 0.045 },
  { rank: 3, name: "솔라나", ticker: "SOL", value: 0.031 },
  { rank: 4, name: "비트코인", ticker: "BTC", value: 0.012 },
  { rank: 5, name: "아비트럼", ticker: "ARB", value: 0.005 },
];

const fundingLowCoins = [
  { rank: 1, name: "도지코인", ticker: "DOGE", value: -0.042 },
  { rank: 2, name: "인젝티브", ticker: "INJ", value: -0.024 },
  { rank: 3, name: "이더리움", ticker: "ETH", value: -0.011 },
  { rank: 4, name: "리플", ticker: "XRP", value: -0.006 },
  { rank: 5, name: "아발란체", ticker: "AVAX", value: -0.002 },
];

// ─── Icon Colors ────────────────────────────────────────────────────────────

const iconColors: Record<string, string> = {
  G: "#FF6B6B", XYO: "#7C5CFC", DEGEN: "#A29BFE", VANA: "#6C5CE7",
  AZIT: "#2D3436", PEAQ: "#6C5CE7", OAS: "#00B894", AL: "#55EFC4",
  FIGHT: "#FF7675", IR: "#E17055", SOL: "#9945FF", SUI: "#4DA2FF",
  BTC: "#F7931A", DOGE: "#C2A633", XRP: "#23292F", ETH: "#627EEA",
  INJ: "#00F2FE", PEPE: "#3CB043", ARB: "#2D374B", AVAX: "#E84142",
};

// ─── Shared Components ──────────────────────────────────────────────────────

function CoinIcon({ ticker }: { ticker: string }) {
  return (
    <div
      className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 opacity-85"
      style={{ backgroundColor: iconColors[ticker] || "#333" }}
    >
      <span className="text-[length:9px] font-bold text-white/90">
        {ticker.slice(0, 2)}
      </span>
    </div>
  );
}

function ModeToggle({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex rounded-[7px] bg-[var(--bg-primary)] border border-[var(--border-primary)] p-px gap-0">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`px-[9px] py-0.5 rounded-[var(--radius-base)] cursor-pointer text-[length:var(--font-size-text-xs)] leading-[var(--line-height-text-xs)] transition-all duration-150 ease-in-out ${
            value === option
              ? "border border-[var(--border-primary)] font-[var(--font-weight-medium)] text-[color:var(--text-primary)] bg-[var(--bg-secondary)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              : "border border-transparent font-[var(--font-weight-regular)] text-[color:var(--text-quaternary)] bg-transparent shadow-none"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

// ─── OI Signal Badge ────────────────────────────────────────────────────────

function OiSignal({ oiChange, priceChange }: { oiChange: number; priceChange: number }) {
  const oiUp = oiChange > 0;
  const priceUp = priceChange > 0;

  let label: string;
  let isPositive: boolean;
  if (oiUp && priceUp) {
    label = "롱 유입";
    isPositive = true;
  } else if (oiUp && !priceUp) {
    label = "숏 유입";
    isPositive = false;
  } else if (!oiUp && !priceUp) {
    label = "롱 청산";
    isPositive = false;
  } else {
    label = "숏 청산";
    isPositive = true;
  }

  return (
    <span
      className="text-[length:10px] font-[var(--font-weight-medium)] px-1.5 py-0.5 rounded-[var(--radius-sm)]"
      style={{
        color: isPositive ? "var(--fg-success-primary)" : "var(--fg-error-primary)",
        backgroundColor: isPositive
          ? "rgba(var(--fg-success-rgb), 0.1)"
          : "rgba(var(--fg-error-rgb), 0.1)",
      }}
    >
      {label}
    </span>
  );
}

// ─── Format Helpers ─────────────────────────────────────────────────────────

function formatVolume(v: number) {
  const abs = Math.abs(v);
  const prefix = v >= 0 ? "+" : "-";
  if (abs >= 1000) return `${prefix}${(abs / 1000).toFixed(1)}K%`;
  return `${prefix}${abs.toFixed(1)}%`;
}

// ─── Card Types ─────────────────────────────────────────────────────────────

type CardType = "volume" | "rsi" | "oi" | "funding";

interface CoinItem {
  rank: number;
  name: string;
  ticker: string;
  value: number;
  priceChange?: number;
}

interface CardConfig {
  title: string;
  toggleOptions: readonly string[];
  getData: (mode: string) => CoinItem[];
  formatValue: (item: CoinItem, mode: string) => React.ReactNode;
  footer: string;
}

const cardConfigs: Record<CardType, CardConfig> = {
  volume: {
    title: "거래량",
    toggleOptions: ["급등", "급감"],
    getData: (mode) => (mode === "급등" ? volumeSurgeCoins : volumeDropCoins),
    formatValue: (item, mode) => {
      const color = mode === "급등" ? "var(--fg-success-primary)" : "var(--fg-error-primary)";
      return (
        <span
          className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] tabular-nums text-right shrink-0"
          style={{ color }}
        >
          {formatVolume(item.value)}
        </span>
      );
    },
    footer: "24시간 기준 · 바이낸스",
  },
  rsi: {
    title: "RSI",
    toggleOptions: ["과매도", "과매수"],
    getData: (mode) => (mode === "과매도" ? oversoldCoins : overboughtCoins),
    formatValue: (item) => (
      <span className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] tabular-nums text-[color:var(--text-secondary)] text-right shrink-0">
        {item.value.toFixed(1)}
      </span>
    ),
    footer: "RSI 14 기준 · 바이낸스 · 24h",
  },
  oi: {
    title: "미결제약정",
    toggleOptions: ["급증", "급감"],
    getData: (mode) => (mode === "급증" ? oiSurgeCoins : oiDropCoins),
    formatValue: (item) => (
      <div className="flex items-center gap-[var(--spacing-sm)] shrink-0">
        <OiSignal oiChange={item.value} priceChange={item.priceChange!} />
        <span className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] tabular-nums text-[color:var(--text-secondary)] text-right">
          {item.value > 0 ? "+" : ""}{item.value}%
        </span>
      </div>
    ),
    footer: "24시간 기준 · 바이낸스 선물",
  },
  funding: {
    title: "펀딩피",
    toggleOptions: ["롱 과열", "숏 과열"],
    getData: (mode) => (mode === "롱 과열" ? fundingHighCoins : fundingLowCoins),
    formatValue: (item, mode) => {
      const color = mode === "롱 과열" ? "var(--fg-success-primary)" : "var(--fg-error-primary)";
      return (
        <span
          className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] tabular-nums text-right shrink-0"
          style={{ color }}
        >
          {item.value >= 0 ? "+" : ""}{item.value.toFixed(3)}%
        </span>
      );
    },
    footer: "최근 정산 기준 · 바이낸스 선물",
  },
};

// ─── Indicator Card ─────────────────────────────────────────────────────────

function IndicatorCard({ type }: { type: CardType }) {
  const config = cardConfigs[type];
  const [mode, setMode] = useState(config.toggleOptions[0]);
  const [hovered, setHovered] = useState<number | null>(null);
  const items = config.getData(mode);

  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--border-primary)] bg-[var(--bg-secondary)] pt-[var(--spacing-xl)] px-[var(--spacing-2xl)] pb-[var(--spacing-2xl)] shadow-[var(--shadow-card)] flex-1 min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-[var(--spacing-xl)]">
        <h2 className="text-[length:var(--font-size-text-md)] font-[var(--font-weight-medium)] leading-[var(--line-height-text-md)] text-[color:var(--text-primary)] m-0">
          {config.title}
        </h2>
        <ModeToggle options={config.toggleOptions} value={mode} onChange={setMode} />
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
              backgroundColor: hovered === i ? "var(--bg-active)" : "transparent",
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

            {/* Value */}
            {config.formatValue(item, mode)}
          </div>
        ))}
      </div>

      {/* Footer */}
      <p className="text-[length:var(--font-size-text-xs)] leading-[var(--line-height-text-xs)] text-[color:var(--text-disabled)] mt-[var(--spacing-xl)] mb-0">
        {config.footer}
      </p>
    </div>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────

export function TechnicalIndicatorCard() {
  return (
    <div className="flex gap-[var(--spacing-lg)] flex-1 min-w-0">
      <IndicatorCard type="volume" />
      <IndicatorCard type="rsi" />
      <IndicatorCard type="oi" />
      <IndicatorCard type="funding" />
    </div>
  );
}

export default TechnicalIndicatorCard;
