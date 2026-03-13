"use client";

const marketStatus = {
  label: "시장 약세",
  phase: "관망 국면",
  level: "bearish" as "bearish" | "neutral" | "bullish",
};

const summaryPoints = [
  {
    title: "관망세 뚜렷",
    text: "글로벌 시총이 30일 내 최저치로 후퇴하고, 거래량도 7일 평균 대비 34% 감소. 매수·매도 모두 위축된 상태.",
  },
  {
    title: "알트 자금 이탈 중",
    text: "BTC 도미넌스가 90일 최고치를 돌파하며 알트에서 BTC로 자금 회전이 진행 중. 알트 시즌 지연 가능성.",
  },
  {
    title: "해외 매도 압력 우세",
    text: "김치 프리미엄 역전 2일차. 해외 시장의 매도 압력이 국내보다 강한 상태로, 단기 하방 시그널.",
  },
];

const statusConfig = {
  bearish: { colorVar: "--fg-error-primary" },
  neutral: { colorVar: "--text-tertiary" },
  bullish: { colorVar: "--fg-success-primary" },
};

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
          flex: "0 0 38%",
          minWidth: 0,
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
            paddingBottom: "var(--spacing-xl)",
            borderBottom: "1px solid var(--border-primary)",
            marginBottom: "var(--spacing-2xl)",
          }}
        >
          <span
            style={{
              position: "relative",
              flexShrink: 0,
              width: 6,
              height: 6,
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
              fontWeight: "var(--font-weight-bold)" as unknown as number,
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
          <span
            style={{
              marginLeft: "auto",
              fontSize: "var(--font-size-text-xs)",
              fontWeight: "var(--font-weight-regular)" as unknown as number,
              lineHeight: "var(--line-height-text-xs)",
              color: "var(--text-quaternary)",
            }}
          >
            2026.03.11 14:00 기준
          </span>
        </div>

        {/* Summary points */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-2xl)",
          }}
        >
          {summaryPoints.map((point, i) => (
            <div key={i}>
              <p
                style={{
                  fontSize: "var(--font-size-text-sm)",
                  fontWeight: "var(--font-weight-bold)" as unknown as number,
                  lineHeight: "var(--line-height-text-sm)",
                  color: "var(--text-primary)",
                  margin: 0,
                  marginBottom: "var(--spacing-sm)",
                }}
              >
                {point.title}
              </p>
              <p
                style={{
                  fontSize: "var(--font-size-text-sm)",
                  fontWeight: "var(--font-weight-regular)" as unknown as number,
                  lineHeight: "22px",
                  color: "var(--text-tertiary)",
                  margin: 0,
                }}
              >
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AISummaryCard;

