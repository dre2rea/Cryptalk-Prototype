"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const newsItem = {
  keyword: "이란 공습",
  sentiment: "악재" as const,
  time: "2시간 전",
  coins: ["BTC", "ETH", "SOL"],
  summary: [
    "미국이 이란 핵 시설 및 군사 기지에 대한 정밀 공습을 단행했다. 바이든 행정부는 \"이란의 핵 무기 개발을 저지하기 위한 불가피한 조치\"라고 발표했으며, 이란 측은 즉각 보복을 예고했다.",
    "중동 지정학적 리스크가 급격히 확대되며 글로벌 리스크 자산이 일제히 하락했다. 나스닥 선물은 2.1% 하락했고, 원유 가격은 배럴당 $6 급등했다. 안전자산인 금은 $2,387로 상승하며 안전자산 선호 심리가 강화되었다.",
    "크립토 시장은 전통 금융시장과 동조화되며 비트코인을 중심으로 매도 압력이 집중되었다. 비트코인은 4시간 내 3.2% 급락했으며, 알트코인은 이보다 더 큰 낙폭을 기록했다. 다만 과거 지정학적 이벤트에서 크립토의 초기 급락 후 빠른 회복 패턴이 반복되어 왔다는 점은 주목할 만하다.",
  ],
  sources: [
    { title: "美, 이란 핵시설 정밀 공습 단행…중동 긴장 최고조", outlet: "코인니스" },
    { title: "Bitcoin drops 3% as U.S. strikes Iranian nuclear sites", outlet: "CoinDesk" },
    { title: "Oil surges, crypto falls as Middle East tensions escalate", outlet: "Reuters" },
    { title: "이란 공습 이후 글로벌 자산 시장 영향 분석", outlet: "블룸버그" },
  ],
  reactions: [
    {
      platform: "Telegram" as const,
      source: "국내 트레이딩 채널 (3개)",
      headline: "관망 우세 — 88K 지지선 확인 전까지 대기",
      detail: "일부는 러시아-우크라이나 개전 당시 48시간 내 회복 사례를 언급.",
      posts: [
        { author: "코인연구소", handle: "", time: "2시간 전", text: "이란 공습 뉴스에 비트 급락. 88K 지지 확인 전까지는 관망이 맞다고 봅니다. 섣부른 롱 진입 금지." },
        { author: "크립토마스터", handle: "", time: "2시간 전", text: "러-우 개전 때도 48시간 만에 회복했음. 지정학 이벤트는 보통 단기 충격 후 복구 패턴. 다만 확전 여부가 관건." },
        { author: "트레이딩룸A", handle: "", time: "1시간 전", text: "현물은 홀딩, 선물은 포지션 정리 추천. 변동성 너무 큼. 오늘은 쉬는 것도 실력." },
      ],
    },
    {
      platform: "X" as const,
      source: "해외 KOL (팔로워 100K+)",
      headline: "과매도 매수 기회 — 현물 분할 매수 언급",
      detail: "다만 추가 확전 시 2차 하락 가능성 경고.",
      posts: [
        { author: "@CryptoCapo_", handle: "142K followers", time: "3h", text: "Geopolitical selloffs are historically buyable within 24-48h. Starting to scale into spot BTC here. Not financial advice." },
        { author: "@inversebrah", handle: "89K followers", time: "2h", text: "If this escalates further we see 60K. If contained, this is a gift. I'm bidding 65K with tight stops." },
      ],
    },
  ],
  timeline: [
    { date: "5일 전", event: "이란, 우라늄 농축 60% 돌파 공식 확인", current: false },
    { date: "3일 전", event: "미국-이란 핵 협상 결렬 보도", current: false },
    { date: "2일 전", event: "미 항공모함 2척 중동 배치 명령", current: false },
    { date: "1일 전", event: "이스라엘, 이란 핵 시설 위성 사진 공개", current: false },
    { date: "오늘", event: "미국, 이란 군사시설 정밀 공습 단행", current: true },
  ],
  relatedNews: [
    { keyword: "트럼프 관세 발언", sentiment: "악재" as const, time: "11시간 전", summary: "중국산 반도체 추가 관세 25% 시사. 매크로 리스크 겹침." },
    { keyword: "BTC 도미넌스 신고점", sentiment: "중립" as const, time: "5시간 전", summary: "도미넌스 60.2%로 90일 내 최고. 알트 자금 BTC 회전 중." },
    { keyword: "김프 역전", sentiment: "악재" as const, time: "10시간 전", summary: "김치 프리미엄 -1.1%. 해외 매도 압력이 국내보다 강한 상태." },
  ],
};

const sentimentConfig = {
  호재: { colorVar: "--fg-success-primary", bgVar: "--badge-success-bg" },
  악재: { colorVar: "--fg-error-primary", bgVar: "--badge-danger-bg" },
  중립: { colorVar: "--text-tertiary", bgVar: "--bg-quaternary" },
};

function TelegramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#0088CC">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--fg-primary)">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const coinImages: Record<string, string> = {
  BTC: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  ETH: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  SOL: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
};

function ExternalLinkIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function NewsDetailPage() {
  const sc = sentimentConfig[newsItem.sentiment];
  const [expandedSource, setExpandedSource] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") !== "light";
    }
    return true;
  });

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[color:var(--text-primary)]">
      <Header isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />
      <div className="flex-1 mx-auto max-w-[1440px] w-full px-8 pt-[100px] pb-32">

        {/* Back nav */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[length:var(--font-size-text-sm)] text-[color:var(--text-quaternary)] hover:text-[color:var(--text-secondary)] transition-colors mb-8 no-underline"
        >
          ← 시장 현황
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="flex items-center gap-3 text-[length:var(--font-size-display-sm)] font-[var(--font-weight-bold)] text-[color:var(--text-primary)] mb-4">
            <span
              className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-medium)] px-2.5 py-1 rounded-[var(--radius-sm)]"
              style={{
                color: `var(${sc.colorVar})`,
                backgroundColor: `var(${sc.bgVar})`,
              }}
            >
              {newsItem.sentiment}
            </span>
            {newsItem.keyword}
            <span className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-regular)] text-[color:var(--text-quaternary)] ml-1">
              {newsItem.time}
            </span>
          </h1>
        </div>

        {/* Main content: two columns */}
        <div className="grid gap-10" style={{ gridTemplateColumns: "1fr 360px" }}>

          {/* Left column */}
          <div className="space-y-10">

            {/* Summary */}
            <div>
              <h2 className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-medium)] tracking-widest text-[color:var(--text-quaternary)] uppercase mb-5">
                요약
              </h2>
              <div className="space-y-4">
                {newsItem.summary.map((para, i) => (
                  <p
                    key={i}
                    className="text-[length:var(--font-size-text-md)] text-[color:var(--text-tertiary)] leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {newsItem.sources.map((s, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] bg-[var(--bg-tertiary)] border border-[var(--border-primary)] hover:border-[var(--text-quaternary)] hover:bg-[var(--bg-quaternary)] transition-all text-[length:var(--font-size-text-xs)] no-underline group"
                  >
                    <span className="text-[color:var(--text-tertiary)] group-hover:text-[color:var(--text-secondary)] transition-colors truncate max-w-48">
                      {s.title}
                    </span>
                    <span className="text-[color:var(--text-quaternary)] flex-shrink-0">
                      {s.outlet}
                    </span>
                    <span className="text-[color:var(--text-quaternary)] flex-shrink-0">
                      <ExternalLinkIcon />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Reactions */}
            <div>
              <h2 className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-medium)] tracking-widest text-[color:var(--text-quaternary)] uppercase mb-5">
                주요 반응
              </h2>
              <div className="space-y-3">
                {newsItem.reactions.map((r, i) => {
                  const isSourceOpen = expandedSource === i;
                  return (
                    <div
                      key={i}
                      className="rounded-[var(--radius-xl)] border border-[var(--border-primary)]"
                    >
                      <div className="flex items-start gap-3 p-4">
                        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                          {r.platform === "X" ? <XIcon /> : <TelegramIcon />}
                        </div>
                        <div className="flex-1">
                          <p className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-medium)] text-[color:var(--text-secondary)]">
                            {r.headline}
                          </p>
                          <p className="text-[length:var(--font-size-text-sm)] text-[color:var(--text-quaternary)] mt-1">
                            {r.detail}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-[length:var(--font-size-text-xs)] text-[color:var(--text-disabled)]">
                              {r.source}
                            </p>
                            <button
                              onClick={() => setExpandedSource(isSourceOpen ? null : i)}
                              className="text-[length:var(--font-size-text-xs)] text-[color:var(--text-quaternary)] hover:text-[color:var(--text-secondary)] transition-colors"
                            >
                              {isSourceOpen ? "접기" : "원문 보기"}
                            </button>
                          </div>
                        </div>
                      </div>

                      {isSourceOpen && (
                        <div className="px-4 pb-4 ml-8 space-y-2">
                          {r.posts.map((post, pi) => (
                            <div
                              key={pi}
                              className="p-3 rounded-[var(--radius-md)] bg-[var(--bg-tertiary)] border border-[var(--border-secondary)]"
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-medium)] text-[color:var(--text-tertiary)]">
                                  {post.author}
                                </span>
                                <div className="flex items-center gap-2">
                                  {post.handle && (
                                    <span className="text-[length:var(--font-size-text-xs)] text-[color:var(--text-disabled)]">
                                      {post.handle}
                                    </span>
                                  )}
                                  <span className="text-[length:var(--font-size-text-xs)] text-[color:var(--text-disabled)]">
                                    {post.time}
                                  </span>
                                </div>
                              </div>
                              <p className="text-[length:var(--font-size-text-sm)] text-[color:var(--text-quaternary)] leading-relaxed">
                                {post.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Related news */}
            <div>
              <h2 className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-medium)] tracking-widest text-[color:var(--text-quaternary)] uppercase mb-5">
                관련 뉴스
              </h2>
              <div className="space-y-2">
                {newsItem.relatedNews.map((item, i) => {
                  const rsc = sentimentConfig[item.sentiment];
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-[var(--radius-xl)] border border-[var(--border-primary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
                    >
                      <span
                        className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-medium)] px-2 py-0.5 rounded-[var(--radius-sm)] flex-shrink-0 mt-0.5"
                        style={{
                          color: `var(${rsc.colorVar})`,
                          backgroundColor: `var(${rsc.bgVar})`,
                        }}
                      >
                        {item.sentiment}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-medium)] text-[color:var(--text-secondary)]">
                            {item.keyword}
                          </span>
                          <span className="text-[length:var(--font-size-text-xs)] text-[color:var(--text-disabled)]">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-[length:var(--font-size-text-sm)] text-[color:var(--text-quaternary)]">
                          {item.summary}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-10">
            {/* Timeline */}
            <div>
              <h2 className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-medium)] tracking-widest text-[color:var(--text-quaternary)] uppercase mb-5">
                관련 타임라인
              </h2>
              <div className="rounded-[var(--radius-xl)] border border-[var(--border-primary)] p-5 sticky top-8">
                <div className="space-y-0">
                  {newsItem.timeline.map((t, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
                          style={{
                            backgroundColor: t.current
                              ? `var(${sc.colorVar})`
                              : "var(--bg-quaternary)",
                          }}
                        />
                        {i < newsItem.timeline.length - 1 && (
                          <div className="w-px flex-1 my-1 bg-[var(--border-secondary)]" />
                        )}
                      </div>
                      <div className="pb-6">
                        <span className="text-[length:var(--font-size-text-xs)] text-[color:var(--text-disabled)]">
                          {t.date}
                        </span>
                        <p
                          className={`text-[length:var(--font-size-text-sm)] mt-1 leading-relaxed ${
                            t.current
                              ? "text-[color:var(--text-primary)] font-[var(--font-weight-medium)]"
                              : "text-[color:var(--text-tertiary)]"
                          }`}
                        >
                          {t.event}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 관련 종목 */}
            <div>
              <h2 className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-medium)] tracking-widest text-[color:var(--text-quaternary)] uppercase mb-5">
                관련 종목
              </h2>
              <div className="flex flex-wrap gap-2">
                {newsItem.coins.map((coin, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 text-[length:var(--font-size-text-sm)] text-[color:var(--text-quaternary)] pl-1.5 pr-2.5 py-1 rounded-[var(--radius-md)] bg-[var(--bg-tertiary)] border border-[var(--border-primary)]"
                  >
                    {coinImages[coin] ? (
                      <img src={coinImages[coin]} alt={coin} className="w-4 h-4 rounded-full object-cover" />
                    ) : (
                      <div className="w-4 h-4 rounded-full bg-[var(--bg-quaternary)] flex items-center justify-center">
                        <span className="text-[8px] font-bold text-[color:var(--text-tertiary)]">{coin.slice(0, 2)}</span>
                      </div>
                    )}
                    {coin}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
