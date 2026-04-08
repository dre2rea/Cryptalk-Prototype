"use client";

// ─── Types ──────────────────────────────────────────────────────────────────
interface PlatformSentiment {
  name: string;
  icon: React.ReactNode;
  sentiment: "긍정" | "부정" | "혼조";
  positive: number;
  neutral: number;
  negative: number;
  topics: string[];
}

// ─── Platform Icons ─────────────────────────────────────────────────────────
function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="#0088CC">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="var(--fg-primary)">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function RedditIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="#FF4500">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 13.38c.15.36.23.75.23 1.15 0 2.34-2.72 4.24-6.08 4.24s-6.08-1.9-6.08-4.24c0-.4.08-.79.23-1.15a1.55 1.55 0 0 1-.65-1.27c0-.86.7-1.56 1.56-1.56.4 0 .78.15 1.05.42 1.04-.72 2.47-1.18 4.04-1.24l.68-3.22a.3.3 0 0 1 .36-.24l2.28.48a1.1 1.1 0 0 1 2.06.52 1.1 1.1 0 0 1-1.1 1.1 1.1 1.1 0 0 1-1.06-.82l-2.03-.42-.6 2.86c1.54.07 2.94.53 3.96 1.24.28-.27.65-.42 1.05-.42.86 0 1.56.7 1.56 1.56 0 .53-.27 1-.65 1.27zM8.28 12.53a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zm5.34 3.2c-.65.65-1.9.7-1.62.7s-.97-.05-1.62-.7a.24.24 0 0 1 .34-.34c.41.41 1.02.47 1.28.47s.87-.06 1.28-.47a.24.24 0 0 1 .34.34zm.2-1a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2z" />
    </svg>
  );
}

// ─── Mock Data ──────────────────────────────────────────────────────────────
const platforms: PlatformSentiment[] = [
  {
    name: "Telegram",
    icon: <TelegramIcon />,
    sentiment: "혼조",
    positive: 35,
    neutral: 30,
    negative: 35,
    topics: ["BTC 횡보 관망세", "알트 순환매 기대", "추가 하락 경계", "ETH 업그레이드 호재"],
  },
  {
    name: "X (Twitter)",
    icon: <XIcon />,
    sentiment: "부정",
    positive: 22,
    neutral: 17,
    negative: 61,
    topics: ["SEC 규제 강화 우려", "대형 거래소 조사설", "매크로 불확실성", "BTC 반감기 내러티브"],
  },
  {
    name: "Reddit",
    icon: <RedditIcon />,
    sentiment: "긍정",
    positive: 68,
    neutral: 18,
    negative: 14,
    topics: ["SOL ETF 승인 기대", "DeFi TVL 신고점", "Solana 생태계 확장", "밈코인 과열 경고"],
  },
];

// ─── Sentiment badge style helper ───────────────────────────────────────────
function sentimentStyle(sentiment: PlatformSentiment["sentiment"]) {
  switch (sentiment) {
    case "긍정":
      return {
        background: "var(--badge-success-bg)",
        color: "var(--fg-success-primary)",
      };
    case "부정":
      return {
        background: "var(--badge-danger-bg)",
        color: "var(--fg-error-primary)",
      };
    case "혼조":
      return {
        background: "var(--bg-quaternary)",
        color: "var(--text-tertiary)",
      };
  }
}

// ─── Component ──────────────────────────────────────────────────────────────
export function CommunitySentimentCard() {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[var(--border-secondary)] bg-[var(--bg-secondary)] p-[var(--spacing-2xl)] shadow-[var(--shadow-card)] flex-1 min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-[var(--spacing-xl)]">
        <h2 className="text-[length:var(--font-size-text-md)] font-[var(--font-weight-medium)] leading-[var(--line-height-text-md)] text-[color:var(--text-primary)] m-0">
          커뮤니티 분위기
        </h2>
        <span className="text-[11px] leading-[var(--line-height-text-xs)] text-[color:var(--text-quaternary)]">
          3월 26일 기준
        </span>
      </div>

      {/* Platform rows */}
      <div className="flex flex-col">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className="flex items-start gap-[var(--spacing-lg)] py-[var(--spacing-xl)]"
          >
            {/* Icon */}
            <div
              className="w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 mt-px"
              style={{ background: "var(--bg-quaternary)" }}
            >
              {platform.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Name + sentiment badge */}
              <div className="flex items-center gap-[var(--spacing-md)] mb-[var(--spacing-md)]">
                <span className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-semibold)] text-[color:var(--text-primary)]">
                  {platform.name}
                </span>
                <span
                  className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-text-xs)] py-[2px] px-[var(--spacing-md)] rounded-[var(--radius-sm)] shrink-0"
                  style={sentimentStyle(platform.sentiment)}
                >
                  {platform.sentiment}
                </span>
              </div>

              {/* Gauge bar */}
              <div className="mb-[var(--spacing-lg)]">
                <div
                  className="h-[3px] rounded-full flex gap-px overflow-hidden"
                  style={{ background: "var(--bg-quaternary)" }}
                >
                  <div
                    className="h-full rounded-l-full"
                    style={{
                      width: `${(platform.positive / (platform.positive + platform.negative)) * 100}%`,
                      background: `rgba(var(--fg-success-rgb), 0.5)`,
                    }}
                  />
                  <div
                    className="h-full rounded-r-full"
                    style={{
                      width: `${(platform.negative / (platform.positive + platform.negative)) * 100}%`,
                      background: `rgba(var(--fg-error-rgb), 0.5)`,
                    }}
                  />
                </div>
              </div>

              {/* Topic pills */}
              <div className="flex flex-wrap gap-[var(--spacing-sm)]">
                {platform.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-regular)] leading-[1.4] px-[var(--spacing-md)] py-[var(--spacing-xs)] rounded-[var(--radius-base)] whitespace-nowrap"
                    style={{
                      background: "var(--bg-tertiary)",
                      color: "var(--text-quaternary)",
                    }}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunitySentimentCard;
