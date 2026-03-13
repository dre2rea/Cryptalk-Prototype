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

const iconColors: Record<string, string> = {
  XRP: "#23292F",
  MON: "#836EF9",
  STX: "#5546FF",
  INJ: "#00F2FE",
  LINK: "#2A5ADA",
  WLD: "#1A1A2E",
  APT: "#2DD8A3",
  DOGE: "#C2A633",
  ETH: "#627EEA",
  DOT: "#E6007A",
};

function CoinIcon({ ticker }: { ticker: string }) {
  return (
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        backgroundColor: iconColors[ticker] || "#333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        opacity: 0.85,
      }}
    >
      <span
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: "rgba(255,255,255,0.9)",
        }}
      >
        {ticker.slice(0, 2)}
      </span>
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
    <div
      style={{
        display: "flex",
        borderRadius: 7,
        backgroundColor: "var(--bg-primary)",
        border: "1px solid var(--border-primary)",
        padding: 1,
        gap: 0,
      }}
    >
      {(["1h", "24h"] as const).map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          style={{
            padding: "2px 9px",
            borderRadius: 6,
            border: value === option
              ? "1px solid var(--border-primary)"
              : "1px solid transparent",
            cursor: "pointer",
            fontSize: "var(--font-size-text-xs)",
            fontWeight:
              value === option
                ? "var(--font-weight-medium)"
                : ("var(--font-weight-regular)" as unknown as number),
            lineHeight: "var(--line-height-text-xs)",
            color:
              value === option
                ? "var(--text-primary)"
                : "var(--text-quaternary)",
            backgroundColor:
              value === option ? "var(--bg-secondary)" : "transparent",
            boxShadow:
              value === option
                ? "0 1px 2px rgba(0,0,0,0.04)"
                : "none",
            transition: "all 0.15s ease",
          }}
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
    <div
      style={{
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border-primary)",
        backgroundColor: "var(--bg-secondary)",
        padding: "var(--spacing-xl) var(--spacing-2xl) var(--spacing-2xl)",
        boxShadow: "var(--shadow-card)",
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "var(--spacing-xl)",
        }}
      >
        <h2
          style={{
            fontSize: "var(--font-size-text-md)",
            fontWeight: "var(--font-weight-medium)" as unknown as number,
            lineHeight: "var(--line-height-text-md)",
            color: "var(--text-primary)",
            margin: 0,
          }}
        >
          {title}
        </h2>
        <TimeToggle value={timeframe} onChange={setTimeframe} />
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map((item, i) => (
          <div
            key={`${item.ticker}-${i}`}
            role="button"
            tabIndex={0}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-md)",
              padding: "var(--spacing-md) var(--spacing-sm)",
              borderRadius: "var(--radius-base)",
              cursor: "pointer",
              transition: "background-color 0.15s ease",
              backgroundColor:
                hovered === i ? "var(--bg-active)" : "transparent",
            }}
          >
            {/* Rank */}
            <span
              style={{
                width: 10,
                textAlign: "right",
                flexShrink: 0,
                fontSize: "var(--font-size-text-sm)",
                fontWeight: "var(--font-weight-regular)" as unknown as number,
                lineHeight: "var(--line-height-text-sm)",
                color: "var(--text-disabled)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {item.rank}
            </span>

            {/* Icon */}
            <CoinIcon ticker={item.ticker} />

            {/* Name + Ticker */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-md)",
                flex: 1,
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontSize: "var(--font-size-text-sm)",
                  fontWeight:
                    "var(--font-weight-regular)" as unknown as number,
                  lineHeight: "var(--line-height-text-sm)",
                  color: "var(--text-secondary)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  fontSize: "var(--font-size-text-xs)",
                  fontWeight:
                    "var(--font-weight-regular)" as unknown as number,
                  lineHeight: "var(--line-height-text-xs)",
                  color: "var(--text-quaternary)",
                  flexShrink: 0,
                }}
              >
                {item.ticker}
              </span>
            </div>

            {/* Price */}
            <span
              style={{
                fontSize: "var(--font-size-text-sm)",
                fontWeight: "var(--font-weight-regular)" as unknown as number,
                lineHeight: "var(--line-height-text-sm)",
                color: "var(--text-secondary)",
                textAlign: "right",
                flexShrink: 0,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              ${item.price < 1 ? item.price.toFixed(3) : item.price.toFixed(2)}
            </span>

            {/* Change */}
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 4,
                width: 72,
                flexShrink: 0,
                fontSize: 13,
                fontWeight: "var(--font-weight-medium)" as unknown as number,
                lineHeight: "var(--line-height-text-sm)",
                color: accentColor,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <span style={{ fontSize: 8, lineHeight: 1 }}>
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
    <div style={{ display: "flex", gap: "var(--spacing-lg)", flex: 1, minWidth: 0 }}>
      <MoverCard title="상승 종목" data={gainersData} type="gainer" />
      <MoverCard title="하락 종목" data={losersData} type="loser" />
    </div>
  );
}

export default TopMovers;
