"use client";

const marketStatus = {
  label: "시장 약세",
  phase: "관망 국면",
  level: "bearish" as "bearish" | "neutral" | "bullish",
};

const summaryPoints = [
  {
    text: "글로벌 시총이 30일 내 최저치인 {$2.12조}로 후퇴. 글로벌 거래량도 7일 평균 대비 {34%} 감소. 시장 관망세가 뚜렷.",
  },
  {
    text: "BTC 도미넌스가 90일 최고치({60.2%}) 돌파. 알트에서 BTC로 자금 회전 진행 중.",
  },
  {
    text: "김치 프리미엄 역전 2일차. 해외 매도 압력이 국내보다 강한 상태.",
  },
];

const statusConfig = {
  bearish: { colorVar: "--fg-error-primary", badgeBgVar: "--badge-danger-bg" },
  neutral: { colorVar: "--text-tertiary", badgeBgVar: "--bg-quaternary" },
  bullish: { colorVar: "--fg-success-primary", badgeBgVar: "--badge-success-bg" },
};

function parseHighlights(text: string, colorVar: string) {
  const parts = text.split(/(\{[^}]+\})/g);
  return parts.map((part, i) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      return (
        <span
          key={i}
          style={{ color: `var(${colorVar})`, fontWeight: "var(--font-weight-semibold)" as unknown as number }}
        >
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
}

export function AISummaryCard() {
  const sc = statusConfig[marketStatus.level];
  const isActive = marketStatus.level !== "neutral";

  return (
    <>
      <style>{`
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.45; }
          100% { transform: scale(2.8); opacity: 0; }
        }
      `}</style>

      <div
        style={{
          borderRadius: "var(--radius-base)",
          border: "1px solid var(--border-primary)",
          backgroundColor: "var(--bg-secondary)",
          padding: "var(--spacing-2xl)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Status indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-md)",
            marginBottom: "var(--spacing-xl)",
          }}
        >
          <span
            style={{
              position: "relative",
              flexShrink: 0,
              width: 8,
              height: 8,
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "9999px",
                backgroundColor: `var(${sc.colorVar})`,
              }}
            />
            {isActive && (
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "9999px",
                  backgroundColor: `var(${sc.colorVar})`,
                  animation: "ripple 2s ease-out infinite",
                }}
              />
            )}
          </span>
          <span
            style={{
              fontSize: "var(--font-size-text-md)",
              fontWeight: "var(--font-weight-semibold)" as unknown as number,
              lineHeight: "var(--line-height-text-md)",
              color: `var(${sc.colorVar})`,
            }}
          >
            {marketStatus.label}
          </span>
          <span
            style={{
              fontSize: "var(--font-size-text-sm)",
              fontWeight: "var(--font-weight-regular)" as unknown as number,
              lineHeight: "var(--line-height-text-sm)",
              color: "var(--text-tertiary)",
            }}
          >
            ({marketStatus.phase})
          </span>
        </div>

        {/* Summary paragraphs */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-lg)",
          }}
        >
          {summaryPoints.map((point, i) => (
            <p
              key={i}
              style={{
                fontSize: "var(--font-size-text-sm)",
                fontWeight: "var(--font-weight-regular)" as unknown as number,
                lineHeight: "var(--line-height-text-sm)",
                color: "var(--text-secondary)",
                margin: 0,
              }}
            >
              {parseHighlights(point.text, sc.colorVar)}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default AISummaryCard;
