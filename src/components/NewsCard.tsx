"use client";

import { useState } from "react";

const newsData = [
  {
    keyword: "이란 공습",
    sentiment: "악재" as const,
    summary:
      "미국의 이란 군사시설 공습으로 글로벌 리스크 자산 일제 하락. BTC 4시간 내 $85K에서 $83K로 급락, 안전자산 선호 심리 확대.",
    coins: ["BTC", "ETH"],
    time: "2시간 전",
  },
  {
    keyword: "BTC 도미넌스 신고점",
    sentiment: "중립" as const,
    summary:
      "BTC 도미넌스가 60.2%로 90일 내 최고치 돌파. 알트 자금이 BTC로 회전 중이며, 알트 시즌 지연 가능성.",
    coins: ["BTC"],
    time: "5시간 전",
  },
  {
    keyword: "바이낸스 신규 상장",
    sentiment: "호재" as const,
    summary:
      "바이낸스가 MON(모나드) 현물 상장 발표. 상장 전 텔레그램에서 이미 화제였으며 $2.8에서 $3.7로 급등.",
    coins: ["MON"],
    time: "7시간 전",
  },
  {
    keyword: "SEC 소송 기각",
    sentiment: "호재" as const,
    summary:
      "SEC의 리플 대상 항소가 기각됨. XRP $2.1에서 $2.3으로 반등, 규제 불확실성 해소 기대감 확산.",
    coins: ["XRP"],
    time: "8시간 전",
  },
  {
    keyword: "김프 역전",
    sentiment: "악재" as const,
    summary:
      "김치 프리미엄이 -1.1%로 역전. 해외 매도 압력이 국내보다 강한 상태로, 단기 하방 압력 시그널.",
    coins: ["BTC", "ETH"],
    time: "10시간 전",
  },
  {
    keyword: "트럼프 관세 발언",
    sentiment: "악재" as const,
    summary:
      "트럼프 대통령이 중국산 반도체에 추가 관세 25% 부과를 시사. 나스닥 선물 하락, 크립토 동반 약세.",
    coins: ["BTC"],
    time: "11시간 전",
  },
  {
    keyword: "이더리움 레이어2 TVL",
    sentiment: "호재" as const,
    summary:
      "이더리움 L2 총 TVL이 $50B 돌파. Base, Arbitrum 중심으로 자금 유입 가속. 생태계 확장 시그널.",
    coins: ["ETH", "ARB"],
    time: "14시간 전",
  },
];

const sentimentConfig = {
  호재: { colorVar: "--fg-success-primary", bgVar: "--badge-success-bg" },
  악재: { colorVar: "--fg-error-primary", bgVar: "--badge-danger-bg" },
  중립: { colorVar: "--text-tertiary", bgVar: "--bg-quaternary" },
};

export function NewsCard() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div
      style={{
        width: "30%",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--border-primary)",
        backgroundColor: "var(--bg-secondary)",
        padding: "var(--spacing-2xl)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <h2
        style={{
          fontSize: "var(--font-size-text-md)",
          fontWeight: "var(--font-weight-semibold)" as unknown as number,
          lineHeight: "var(--line-height-text-md)",
          color: "var(--text-primary)",
          margin: 0,
          marginBottom: "var(--spacing-xl)",
          paddingLeft: 0,
        }}
      >
        오늘의 뉴스
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {newsData.map((item, i) => {
          const sc = sentimentConfig[item.sentiment];
          const isOpen = expanded === i;

          return (
            <div key={i}>
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-lg)",
                  padding: "var(--spacing-md) var(--spacing-sm)",
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  background: isOpen ? "var(--bg-active)" : "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background-color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isOpen)
                    e.currentTarget.style.backgroundColor = "var(--bg-active)";
                }}
                onMouseLeave={(e) => {
                  if (!isOpen)
                    e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span
                  style={{
                    fontSize: "var(--font-size-text-xs)",
                    fontWeight: "var(--font-weight-medium)" as unknown as number,
                    lineHeight: "var(--line-height-text-xs)",
                    color: `var(${sc.colorVar})`,
                    backgroundColor: `var(${sc.bgVar})`,
                    padding: "2px var(--spacing-md)",
                    borderRadius: "var(--radius-sm)",
                    flexShrink: 0,
                  }}
                >
                  {item.sentiment}
                </span>

                <span
                  style={{
                    fontSize: "var(--font-size-text-sm)",
                    fontWeight: "var(--font-weight-medium)" as unknown as number,
                    lineHeight: "var(--line-height-text-sm)",
                    color: "var(--text-secondary)",
                    flex: 1,
                  }}
                >
                  {item.keyword}
                </span>

                <span
                  style={{
                    fontSize: "var(--font-size-text-xs)",
                    lineHeight: "var(--line-height-text-xs)",
                    color: "var(--text-quaternary)",
                    flexShrink: 0,
                  }}
                >
                  {item.time}
                </span>

                <span
                  style={{
                    fontSize: "var(--font-size-text-sm)",
                    color: "var(--text-quaternary)",
                    transition: "transform 0.2s ease",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  ▾
                </span>
              </button>

              {isOpen && (
                <div
                  style={{
                    paddingLeft: 54,
                    paddingRight: "var(--spacing-lg)",
                    paddingBottom: "var(--spacing-lg)",
                    paddingTop: "var(--spacing-xs)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "var(--font-size-text-sm)",
                      fontWeight: "var(--font-weight-regular)" as unknown as number,
                      lineHeight: "22px",
                      color: "var(--text-tertiary)",
                      margin: 0,
                    }}
                  >
                    {item.summary}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "var(--spacing-sm)",
                      marginTop: "var(--spacing-md)",
                    }}
                  >
                    {item.coins.map((coin, ci) => (
                      <span
                        key={ci}
                        style={{
                          fontSize: "var(--font-size-text-xs)",
                          lineHeight: "var(--line-height-text-xs)",
                          color: "var(--text-quaternary)",
                          padding: "1px var(--spacing-sm)",
                          borderRadius: "var(--radius-sm)",
                          backgroundColor: "var(--bg-quaternary)",
                        }}
                      >
                        {coin}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NewsCard;
