"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

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

function ExpandedContent({ item, href }: { item: typeof newsData[number]; href: string }) {
  const [moreInline, setMoreInline] = useState(false);

  const pRefCallback = useCallback((el: HTMLParagraphElement | null) => {
    if (!el) return;
    const containerWidth = el.clientWidth;
    const textNode = el.lastChild;
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
      setMoreInline(false);
      return;
    }
    const range = document.createRange();
    range.setStart(textNode, Math.max(0, textNode.textContent!.length - 1));
    range.setEnd(textNode, textNode.textContent!.length);
    const rect = range.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const endX = rect.right - elRect.left;
    setMoreInline(containerWidth - endX > 50);
  }, []);

  return (
    <div className="pl-[54px] pr-[var(--spacing-lg)] pb-[var(--spacing-lg)] pt-[var(--spacing-sm)]">
      <p
        ref={pRefCallback}
        className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] leading-[var(--line-height-text-2sm)] text-[color:var(--text-tertiary)] m-0"
      >
        {item.summary}
        {moreInline && (
          <>
            {" "}
            <Link
              href={href}
              className="text-[length:var(--font-size-text-2xs)] leading-[var(--line-height-text-xs)] text-blue-600 dark:text-blue-400 no-underline hover:underline ml-[2px]"
            >
              더보기
            </Link>
          </>
        )}
      </p>
      <div className="flex items-center mt-[10px]">
        <div className="flex flex-wrap items-center gap-[var(--spacing-sm)]">
          {item.coins.map((coin, ci) => (
            <span
              key={ci}
              className="text-[length:var(--font-size-text-xs)] leading-[var(--line-height-text-xs)] text-[color:var(--text-quaternary)] py-[1px] px-[var(--spacing-sm)] rounded-[var(--radius-sm)] bg-[var(--bg-quaternary)]"
            >
              {coin}
            </span>
          ))}
        </div>
        {!moreInline && (
          <Link
            href={href}
            className="ml-auto text-[length:var(--font-size-text-2xs)] leading-[var(--line-height-text-xs)] text-blue-600 dark:text-blue-400 no-underline hover:underline"
          >
            더보기
          </Link>
        )}
      </div>
    </div>
  );
}

export function NewsCard() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div
      className="rounded-[var(--radius-xl)] border border-[var(--border-secondary)] bg-[var(--bg-secondary)] p-[var(--spacing-2xl)] shadow-[var(--shadow-card)]"
    >
      <h2
        className="text-[length:var(--font-size-text-md)] font-[var(--font-weight-medium)] leading-[var(--line-height-text-md)] text-[color:var(--text-primary)] m-0 mb-[var(--spacing-xl)] pl-0"
      >
        오늘의 뉴스
      </h2>

      <div className="flex flex-col gap-0.5">
        {newsData.map((item, i) => {
          const sc = sentimentConfig[item.sentiment];
          const isOpen = expanded === i;

          return (
            <div key={i}>
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className={`w-full flex items-center gap-[var(--spacing-lg)] py-[var(--spacing-md)] px-[var(--spacing-sm)] rounded-[var(--radius-md)] border-none cursor-pointer text-left transition-colors duration-150 ease-in-out ${
                  isOpen ? "bg-[var(--bg-active)]" : "bg-transparent hover:bg-[var(--bg-active)]"
                }`}
              >
                <span
                  className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-medium)] leading-[var(--line-height-text-xs)] py-[2px] px-[var(--spacing-md)] rounded-[var(--radius-sm)] shrink-0"
                  style={{
                    color: `var(${sc.colorVar})`,
                    backgroundColor: `var(${sc.bgVar})`,
                  }}
                >
                  {item.sentiment}
                </span>

                <span
                  className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-medium)] leading-[var(--line-height-text-sm)] text-[color:var(--text-secondary)] flex-1"
                >
                  {item.keyword}
                </span>

                <span
                  className="text-[length:var(--font-size-text-xs)] leading-[var(--line-height-text-xs)] text-[color:var(--text-quaternary)] shrink-0"
                >
                  {item.time}
                </span>

                <span
                  className={`text-[length:var(--font-size-text-sm)] text-[color:var(--text-quaternary)] transition-transform duration-200 ease-in-out ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▾
                </span>
              </button>

              {isOpen && (
                <ExpandedContent item={item} href={i === 0 ? "/news/iran" : "#"} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NewsCard;
