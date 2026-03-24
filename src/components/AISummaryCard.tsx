"use client";

const marketStatus = {
  label: "현황 : 약세",
  phase: "관망 국면",
  level: "bearish" as "bearish" | "neutral" | "bullish",
};

const summaryPoints = [
  {
    title: "관망세 뚜렷",
    text: "글로벌 시총 $2.71조로 30일 내 최저치 후퇴. 거래량 $782억으로 7일 평균 대비 34% 감소. 매수·매도 모두 위축.",
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
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(3.2); opacity: 0; }
        }
      `}</style>

      <div
        className="rounded-[var(--radius-xl)] border border-[var(--border-secondary)] bg-[var(--bg-secondary)] p-[var(--spacing-2xl)] shadow-[var(--shadow-card)]"
      >
        {/* Status indicator */}
        <div
          className="flex items-center gap-[var(--spacing-md)] pb-[var(--spacing-xl)] border-b border-[var(--border-secondary)] mb-[var(--spacing-2xl)]"
        >
          <span
            className="relative shrink-0 w-1.5 h-1.5"
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: `var(${sc.colorVar})` }}
            />
            {isActive && (
              <span
                className="absolute inset-0 rounded-full animate-[ripple_1.6s_ease-out_infinite]"
                style={{ backgroundColor: `var(${sc.colorVar})` }}
              />
            )}
          </span>
          <span
            className="text-[length:var(--font-size-text-md)] font-[var(--font-weight-bold)] leading-[var(--line-height-text-md)]"
            style={{ color: `var(${sc.colorVar})` }}
          >
            {marketStatus.label}
          </span>
          <span
            className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-sm)] text-[color:var(--text-tertiary)]"
          >
            ({marketStatus.phase})
          </span>
          <span
            className="ml-auto text-[length:var(--font-size-text-xs)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-xs)] text-[color:var(--text-quaternary)]"
          >
            2026.03.13 09:00 기준
          </span>
        </div>

        {/* Summary points */}
        <div
          className="flex flex-col gap-[var(--spacing-2xl)]"
        >
          {summaryPoints.map((point, i) => (
            <div key={i}>
              <p
                className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-semibold)] leading-[var(--line-height-text-sm)] text-[color:var(--text-primary)] m-0 mb-[var(--spacing-sm)]"
              >
                {point.title}
              </p>
              <p
                className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-2sm)] text-[color:var(--text-quaternary)] m-0"
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
