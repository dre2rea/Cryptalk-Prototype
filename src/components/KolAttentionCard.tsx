"use client";

import { useState, useRef } from "react";

// ─── Shared ─────────────────────────────────────────────────────────────────
const coinImages: Record<string, string> = {
  BTC: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  ETH: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  SOL: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
  SUI: "https://assets.coingecko.com/coins/images/26375/small/sui_asset.jpeg",
  INJ: "https://assets.coingecko.com/coins/images/12882/small/Secondary_Symbol.png",
  PEPE: "https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg",
  AVAX: "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
  ARB: "https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg",
  LINK: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
};

function getTrend(current: number, prev: number) {
  if (prev === 0) return { pct: 100, dir: "up" as const };
  const pct = Math.round(((current - prev) / prev) * 100);
  return {
    pct: Math.abs(pct),
    dir: pct > 0 ? ("up" as const) : pct < 0 ? ("down" as const) : ("flat" as const),
  };
}

function CoinIcon({ ticker, size = 22 }: { ticker: string; size?: number }) {
  const src = coinImages[ticker];
  if (src) {
    return <img src={src} alt={ticker} className="rounded-full shrink-0 object-cover" style={{ width: size, height: size }} />;
  }
  return (
    <div className="rounded-full flex items-center justify-center shrink-0 bg-[#555]" style={{ width: size, height: size }}>
      <span className="font-bold text-white/90" style={{ fontSize: size * 0.38 }}>{ticker.slice(0, 2)}</span>
    </div>
  );
}


// ─── Data ───────────────────────────────────────────────────────────────────
interface KolItem {
  rank: number;
  name: string;
  ticker: string;
  mentions: number;
  prevMentions: number;
  summary: string;
  spark: number[];
}

const kolDataKR: KolItem[] = [
  { rank: 1, name: "솔라나", ticker: "SOL", mentions: 47, prevMentions: 31, summary: "DEX 거래량 급증, Firedancer 업데이트 기대감", spark: [12, 14, 18, 15, 13, 19, 22, 20, 28, 25, 31, 35, 47] },
  { rank: 2, name: "수이", ticker: "SUI", mentions: 38, prevMentions: 15, summary: "TVL 신고점 경신, 디파이 생태계 확장 주목", spark: [5, 6, 8, 7, 9, 10, 12, 11, 15, 20, 24, 30, 38] },
  { rank: 3, name: "비트코인", ticker: "BTC", mentions: 34, prevMentions: 36, summary: "ETF 유입량 둔화, 단기 조정 가능성 언급", spark: [40, 42, 38, 44, 41, 36, 39, 35, 37, 33, 36, 35, 34] },
  { rank: 4, name: "인젝티브", ticker: "INJ", mentions: 22, prevMentions: 9, summary: "RWA 토큰화 파트너십 발표, 기관 관심 증가", spark: [3, 4, 3, 5, 6, 9, 8, 11, 9, 10, 14, 18, 22] },
  { rank: 5, name: "페페", ticker: "PEPE", mentions: 19, prevMentions: 21, summary: "밈코인 순환매 구간, 고래 물량 이동 포착", spark: [25, 30, 28, 32, 24, 26, 22, 24, 21, 18, 21, 20, 19] },
  { rank: 6, name: "이더리움", ticker: "ETH", mentions: 16, prevMentions: 28, summary: "Pectra 업그레이드 일정 관련 논의", spark: [32, 30, 33, 28, 31, 26, 29, 24, 28, 22, 19, 17, 16] },
  { rank: 7, name: "아발란체", ticker: "AVAX", mentions: 12, prevMentions: 14, summary: "서브넷 활용 사례 증가, 기관 RWA 파일럿", spark: [10, 11, 14, 12, 15, 13, 11, 14, 16, 13, 11, 13, 12] },
];

const kolDataGlobal: KolItem[] = [
  { rank: 1, name: "비트코인", ticker: "BTC", mentions: 112, prevMentions: 98, summary: "ETF inflows steady, post-halving supply squeeze narrative", spark: [85, 88, 90, 86, 92, 95, 91, 98, 96, 100, 104, 108, 112] },
  { rank: 2, name: "이더리움", ticker: "ETH", mentions: 89, prevMentions: 74, summary: "Pectra upgrade hype, blob fee market discussion", spark: [60, 58, 65, 62, 68, 64, 70, 72, 74, 78, 80, 84, 89] },
  { rank: 3, name: "솔라나", ticker: "SOL", mentions: 76, prevMentions: 82, summary: "Firedancer mainnet timeline, DEX volume dominance", spark: [90, 92, 88, 86, 85, 82, 84, 80, 78, 82, 79, 77, 76] },
  { rank: 4, name: "수이", ticker: "SUI", mentions: 54, prevMentions: 18, summary: "Fastest-growing Move chain, TVL milestones", spark: [8, 9, 10, 11, 14, 16, 18, 22, 28, 35, 40, 46, 54] },
  { rank: 5, name: "아비트럼", ticker: "ARB", mentions: 31, prevMentions: 27, summary: "Stylus launch driving dev activity, L2 fee wars", spark: [20, 21, 22, 23, 24, 22, 25, 26, 27, 28, 29, 30, 31] },
  { rank: 6, name: "인젝티브", ticker: "INJ", mentions: 24, prevMentions: 11, summary: "BlackRock RWA tokenization infrastructure partnership", spark: [5, 4, 6, 7, 8, 10, 11, 12, 14, 16, 18, 20, 24] },
  { rank: 7, name: "체인링크", ticker: "LINK", mentions: 18, prevMentions: 22, summary: "CCIP adoption by TradFi, cross-chain bridge traction", spark: [28, 27, 26, 28, 24, 25, 22, 23, 20, 22, 21, 19, 18] },
];

// ─── Component ──────────────────────────────────────────────────────────────
export function KolAttentionCard() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const [kolRegion, setKolRegion] = useState<"국내" | "해외">("국내");
  const cardRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mousePosRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        setMousePos({ ...mousePosRef.current });
        rafRef.current = null;
      });
    }
  };

  const handleBlockEnter = (idx: number) => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setHovered(idx);
  };

  const handleBlockLeave = () => {
    leaveTimer.current = setTimeout(() => {
      setHovered(null);
    }, 30);
  };

  const handleRegionSwitch = (region: "국내" | "해외") => {
    if (region === kolRegion) return;
    setKolRegion(region);
    setHovered(null);
  };

  const activeData = kolRegion === "국내" ? kolDataKR : kolDataGlobal;

  const topRow = activeData.slice(0, 3);
  const bottomRow = activeData.slice(3, 7);
  const topTotal = topRow.reduce((a, b) => a + b.mentions, 0);
  const bottomTotal = bottomRow.reduce((a, b) => a + b.mentions, 0);

  // Plain render function (NOT a component) — prevents unmount/remount on re-render,
  // which would swallow onMouseLeave events and leave the tooltip stuck.
  function renderTreeBlock(item: KolItem, idx: number, widthPct: number) {
    const trend = getTrend(item.mentions, item.prevMentions);
    const isHovered = hovered === idx;

    const bgColor = isHovered
      ? "var(--kol-block-bg-hover)"
      : "var(--kol-block-bg)";

    const trendColor =
      trend.dir === "up"
        ? "var(--fg-success-primary)"
        : trend.dir === "down"
          ? "var(--fg-error-primary)"
          : "var(--text-disabled)";

    return (
      <button
        key={item.ticker}
        className="relative flex flex-col items-end justify-end p-[var(--spacing-lg)] text-left border border-white/[0.04] rounded-[var(--radius-base)] cursor-pointer transition-[background-color] duration-200 ease-in-out"
        style={{
          width: `${widthPct}%`,
          backgroundColor: bgColor,
        }}
        onMouseEnter={() => handleBlockEnter(idx)}
        onMouseMove={(e) => {
          handleBlockEnter(idx);
          handleMouseMove(e);
        }}
        onMouseLeave={handleBlockLeave}
      >
        <div className="w-full mt-auto flex flex-col items-start gap-[var(--spacing-xs)]">
          <CoinIcon ticker={item.ticker} size={18} />
          <div className="flex items-center gap-[var(--spacing-sm)]">
            <span className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-medium)] text-[color:var(--text-primary)]">
              {item.name}
            </span>
            <span
              className="flex items-center gap-0.5 text-[10px] font-[var(--font-weight-medium)]"
              style={{ color: trendColor }}
            >
              <span className="text-[length:8px] leading-none">
                {trend.dir === "up" ? "▲" : trend.dir === "down" ? "▼" : "—"}
              </span>
              {trend.dir !== "flat" ? `${trend.pct}%` : ""}
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div
      ref={cardRef}
      className="rounded-[var(--radius-xl)] border border-[var(--border-secondary)] bg-[var(--bg-secondary)] p-[var(--spacing-2xl)] shadow-[var(--shadow-card)] relative flex-1 min-w-0 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-[var(--spacing-xl)]">
        <h2 className="text-[length:var(--font-size-text-md)] font-[var(--font-weight-medium)] leading-[var(--line-height-text-md)] text-[color:var(--text-primary)] m-0">
          KOL 관심 종목
        </h2>
        <div className="flex rounded-[7px] bg-[var(--bg-primary)] border border-[var(--border-secondary)] p-px gap-0">
          {(["국내", "해외"] as const).map((label) => (
            <button
              key={label}
              onClick={() => handleRegionSwitch(label)}
              className={`px-[9px] py-[2px] rounded-[var(--radius-base)] cursor-pointer text-[length:var(--font-size-text-xs)] leading-[var(--line-height-text-xs)] transition-all duration-150 ease-in-out ${
                kolRegion === label
                  ? "border border-[var(--border-secondary)] font-[var(--font-weight-medium)] text-[color:var(--text-primary)] bg-[var(--bg-secondary)] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                  : "border border-transparent font-[var(--font-weight-regular)] text-[color:var(--text-quaternary)] bg-transparent shadow-none"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Treemap */}
      <div
        className="flex flex-col gap-[var(--spacing-xs)] flex-1"
        onMouseLeave={() => {
          if (leaveTimer.current) clearTimeout(leaveTimer.current);
          setHovered(null);
        }}
      >
        {/* Top row */}
        <div className="flex gap-[var(--spacing-xs)] flex-[6]">
          {topRow.map((item, i) =>
            renderTreeBlock(item, i, (item.mentions / topTotal) * 100)
          )}
        </div>
        {/* Bottom row */}
        <div className="flex gap-[var(--spacing-xs)] flex-[4]">
          {bottomRow.map((item, i) =>
            renderTreeBlock(item, i + 3, (item.mentions / bottomTotal) * 100)
          )}
        </div>
      </div>

      {/* Cursor-following tooltip */}
      {hovered !== null &&
        activeData[hovered] &&
        (() => {
          const item = activeData[hovered];
          const trend = getTrend(item.mentions, item.prevMentions);
          const trendColor =
            trend.dir === "up"
              ? "var(--fg-success-primary)"
              : trend.dir === "down"
                ? "var(--fg-error-primary)"
                : "var(--text-disabled)";
          const sparkRawColor =
            trend.dir === "up" ? "var(--fg-success-primary)" : trend.dir === "down" ? "var(--fg-error-primary)" : "var(--text-disabled)";
          return (
            <div
              className="absolute -translate-x-1/2 w-[140px] rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-secondary)] px-[var(--spacing-md)] py-[var(--spacing-md)] z-30 pointer-events-none overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
              style={{
                left: mousePos.x,
                top: mousePos.y - 140,
              }}
            >
              <div className="flex items-center gap-[var(--spacing-xs)] mb-[var(--spacing-md)]">
                <CoinIcon ticker={item.ticker} size={18} />
                <span className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-medium)] text-[color:var(--text-primary)]">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-[var(--spacing-md)] mb-[var(--spacing-md)]">
                <span className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-semibold)] text-[color:var(--text-primary)]">
                  {item.mentions}회
                </span>
                <span
                  className="flex items-center gap-0.5 text-[length:var(--font-size-text-xs)] font-[var(--font-weight-medium)]"
                  style={{ color: trendColor }}
                >
                  <span className="text-[length:8px] leading-none">
                    {trend.dir === "up" ? "▲" : trend.dir === "down" ? "▼" : "—"}
                  </span>
                  {trend.dir !== "flat" ? `${trend.pct}%` : ""}
                </span>
              </div>
              <svg viewBox="0 0 124 50" className="w-full h-[50px] block">
                <defs>
                  <linearGradient id={`tt-${item.ticker}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={sparkRawColor} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={sparkRawColor} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {(() => {
                  const min = Math.min(...item.spark);
                  const max = Math.max(...item.spark);
                  const range = max - min || 1;
                  const pts = item.spark.map((v: number, si: number) => ({
                    x: (si / (item.spark.length - 1)) * 124,
                    y: 50 - ((v - min) / range) * 46 - 2,
                  }));
                  const line = pts.map((p: {x: number; y: number}) => `${p.x},${p.y}`).join(" ");
                  const area = `0,50 ${line} 124,50`;
                  return (
                    <>
                      <polygon points={area} fill={`url(#tt-${item.ticker})`} />
                      <polyline points={line} fill="none" stroke={sparkRawColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                    </>
                  );
                })()}
              </svg>
            </div>
          );
        })()}

      <p className="text-[11px] leading-[var(--line-height-text-xs)] text-[color:var(--text-quaternary)] m-0 mt-[var(--spacing-lg)]">
        국내외 KOL {kolRegion === "국내" ? "32" : "55"}명 · 지난 24시간 언급량 기준
      </p>
    </div>
  );
}

export default KolAttentionCard;
