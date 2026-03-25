"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// --- Data ---

const marketStatus = {
  label: "시장 약세",
  phase: "관망 국면",
  level: "bearish" as const,
};

const statusColors: Record<string, string> = {
  bearish: "#E05252",
  neutral: "#A0A0A0",
  bullish: "#4CAF7D",
};

const weekStatus = [
  { day: "5", status: "bullish" as const, isToday: false, desc: "거래량 반등, 시총 소폭 회복" },
  { day: "6", status: "neutral" as const, isToday: false, desc: "횡보 지속, 뚜렷한 방향성 없음" },
  { day: "7", status: "neutral" as const, isToday: false, desc: "거래량 감소 시작" },
  { day: "8", status: "bearish" as const, isToday: false, desc: "시총 하락 전환, 매도 압력 증가" },
  { day: "9", status: "bearish" as const, isToday: false, desc: "BTC 도미넌스 급등 시작" },
  { day: "10", status: "bearish" as const, isToday: false, desc: "김프 역전, 해외 매도 압력 우세" },
  { day: "11", status: "bearish" as const, isToday: true, desc: "관망 5일째, 거래량 34% 감소" },
];

const statusLabels: Record<string, string> = {
  bearish: "약세",
  neutral: "중립",
  bullish: "강세",
};

const trendConfig: Record<string, { label: string; color: string; bg: string }> = {
  worsening: { label: "심화", color: "#E05252", bg: "rgba(224, 82, 82, 0.08)" },
  improving: { label: "개선", color: "#4CAF7D", bg: "rgba(76, 175, 125, 0.08)" },
  new_signal: { label: "신규", color: "#F59E0B", bg: "rgba(245, 158, 11, 0.08)" },
};

interface Metric {
  label: string;
  value: string;
  change: string;
  changeDir: "up" | "down";
}

interface SectionData {
  trend: string;
  headline: string;
  detail: string;
  context: string;
  metrics: Metric[];
  timeline: { day: string; event: string }[];
}

const sections: SectionData[] = [
  {
    trend: "worsening",
    headline: "관망세 5일째, 점점 깊어지는 중",
    detail: "3/7부터 거래량 감소가 시작됐고, 시총도 동반 하락 중. 거래량 회복 없이 하락이 이어지면서 본격적인 관망 국면으로 전환.",
    context: "직전 유사 패턴: 2024년 8월. 당시 약 2주간 횡보 후 반등이 나왔으나, 그 전까지 거래량이 먼저 회복되는 시그널이 선행했음.",
    metrics: [
      { label: "글로벌 시가총액", value: "$2.71조", change: "-4.2%", changeDir: "down" },
      { label: "거래량 (24h)", value: "$782억", change: "-34%", changeDir: "down" },
    ],
    timeline: [
      { day: "3/7", event: "거래량 감소 시작" },
      { day: "3/9", event: "시총 동반 하락 시작" },
      { day: "오늘", event: "관망 5일째, 거래량 34% 감소" },
    ],
  },
  {
    trend: "worsening",
    headline: "BTC 쏠림 가속 — 알트 시즌 멀어지는 중",
    detail: "BTC 도미넌스가 7일 동안 56.8% → 60.2%로 +3.4%p 상승. 올해 들어 가장 빠른 쏠림 속도. 알트 시총은 같은 기간 -8.5% 하락.",
    context: "도미넌스 60% 이상 구간에서는 역사적으로 알트 시즌이 시작된 적 없음. 55% 아래로 내려와야 알트 자금 유입이 본격화.",
    metrics: [
      { label: "BTC 도미넌스", value: "60.2%", change: "+3.4%p", changeDir: "up" },
    ],
    timeline: [
      { day: "3/5", event: "도미넌스 57% 돌파" },
      { day: "3/8", event: "59% 돌파, 알트 매도 가속" },
      { day: "오늘", event: "60.2%, 90일 최고치" },
    ],
  },
  {
    trend: "new_signal",
    headline: "김프 역전 — 어제 처음 나타난 시그널",
    detail: "일주일 전 +2.1%였던 김프가 지속 하락하다 어제 마이너스로 전환. 해외 매도 압력이 국내보다 강하다는 의미.",
    context: "김프 역전은 2024년 이후 총 4회 발생. 평균 3.2일 지속됐으며, 역전 해소 시점에서 단기 반등이 나온 경우가 3회.",
    metrics: [
      { label: "김치 프리미엄", value: "-1.11%", change: "역전 2일차", changeDir: "down" },
    ],
    timeline: [
      { day: "3/5", event: "김프 +2.1%" },
      { day: "3/9", event: "+0.2%로 축소" },
      { day: "3/10", event: "역전 시작 (-0.1%)" },
      { day: "오늘", event: "-1.11%" },
    ],
  },
];

const statusConfig: Record<string, { color: string; dot: string }> = {
  bearish: { color: "#E05252", dot: "#E05252" },
  neutral: { color: "#A0A0A0", dot: "#A0A0A0" },
  bullish: { color: "#4CAF7D", dot: "#4CAF7D" },
};

// --- Page ---

export default function SummaryDetail() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  const handleThemeToggle = () => {
    setIsDark((prev) => !prev);
  };

  const sc = statusConfig[marketStatus.level];
  const isActive = marketStatus.level !== "neutral";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[color:var(--text-primary)]">
      <style>{`
        @keyframes ripple-summary {
          0% { transform: scale(1); opacity: 0.45; }
          100% { transform: scale(2.8); opacity: 0; }
        }
      `}</style>

      <Header isDark={isDark} onThemeToggle={handleThemeToggle} />

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
          <div className="flex items-center gap-3 mb-2">
            <span
              className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-medium)] px-2.5 py-1 rounded-[var(--radius-sm)]"
              style={{ color: sc.color, backgroundColor: `${sc.color}12` }}
            >
              <span className="relative shrink-0 inline-block w-1.5 h-1.5 mr-1.5 -translate-y-px">
                <span className="absolute inset-0 rounded-full" style={{ backgroundColor: sc.dot }} />
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-full animate-[ripple-summary_2s_ease-out_infinite]"
                    style={{ backgroundColor: sc.dot }}
                  />
                )}
              </span>
              {statusLabels[marketStatus.level]}
            </span>
            <span className="text-[length:var(--font-size-text-sm)] text-[color:var(--text-disabled)]">
              2026.03.11 14:00 기준
            </span>
          </div>
          <h1 className="flex items-center gap-3 text-[length:var(--font-size-display-xs)] font-[var(--font-weight-bold)] text-[color:var(--text-primary)]">
            {marketStatus.label}
            <span className="text-[length:var(--font-size-text-lg)] font-[var(--font-weight-regular)] text-[color:var(--text-quaternary)]">
              — {marketStatus.phase}
            </span>
          </h1>
        </div>

        {/* Main content: two columns */}
        <div className="grid gap-10" style={{ gridTemplateColumns: "1fr 360px" }}>

          {/* Left column: section cards */}
          <div className="space-y-4">
            {sections.map((section, si) => {
              const cfg = trendConfig[section.trend];
              return (
                <div
                  key={si}
                  className="rounded-[var(--radius-xl)] border border-[var(--border-secondary)] bg-[var(--bg-secondary)] p-6 shadow-[var(--shadow-card)]"
                >
                  {/* Top row: badge + headline */}
                  <div className="flex items-start gap-3 mb-4">
                    <span
                      className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-medium)] px-2 py-0.5 rounded-[var(--radius-sm)] shrink-0 mt-0.5"
                      style={{ color: cfg.color, backgroundColor: cfg.bg }}
                    >
                      {cfg.label}
                    </span>
                    <h2 className="text-[length:var(--font-size-text-lg)] font-[var(--font-weight-semibold)] text-[color:var(--text-primary)] leading-snug">
                      {section.headline}
                    </h2>
                  </div>

                  {/* Key metrics */}
                  <div className="flex gap-4 mb-5">
                    {section.metrics.map((m, mi) => {
                      const mColor = m.changeDir === "down" ? cfg.color : "#4CAF7D";
                      return (
                        <div
                          key={mi}
                          className="rounded-[var(--radius-lg)] bg-[var(--bg-primary)] border border-[var(--border-secondary)] px-4 py-3 min-w-[140px]"
                        >
                          <span className="text-[length:var(--font-size-text-xs)] text-[color:var(--text-quaternary)] block mb-1">
                            {m.label}
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-[length:var(--font-size-text-lg)] font-[var(--font-weight-bold)] text-[color:var(--text-primary)]">
                              {m.value}
                            </span>
                            <span
                              className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-medium)]"
                              style={{ color: mColor }}
                            >
                              {m.change}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Detail text */}
                  <p className="text-[length:var(--font-size-text-sm)] text-[color:var(--text-secondary)] leading-relaxed mb-5">
                    {section.detail}
                  </p>

                  {/* Mini timeline */}
                  <div className="relative mb-5">
                    <div className="absolute left-1 top-1 bottom-1 w-px" style={{ backgroundColor: `${cfg.color}20` }} />
                    <div className="space-y-2.5">
                      {section.timeline.map((t, ti) => {
                        const isLast = ti === section.timeline.length - 1;
                        return (
                          <div key={ti} className="flex items-start gap-2.5 relative">
                            <div
                              className="shrink-0 w-2 h-2 rounded-full mt-1.5"
                              style={{ backgroundColor: isLast ? cfg.color : `${cfg.color}40` }}
                            />
                            <span
                              className={`text-[length:var(--font-size-text-sm)] shrink-0 ${
                                isLast
                                  ? "text-[color:var(--text-tertiary)] font-[var(--font-weight-medium)]"
                                  : "text-[color:var(--text-disabled)]"
                              }`}
                              style={{ width: 38 }}
                            >
                              {t.day}
                            </span>
                            <span
                              className={`text-[length:var(--font-size-text-sm)] ${
                                isLast ? "text-[color:var(--text-primary)]" : "text-[color:var(--text-quaternary)]"
                              }`}
                            >
                              {t.event}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Historical context */}
                  <div
                    className="rounded-[var(--radius-md)] px-4 py-3"
                    style={{ backgroundColor: `${cfg.color}06`, borderLeft: `3px solid ${cfg.color}30` }}
                  >
                    <p className="text-[length:var(--font-size-text-xs)] text-[color:var(--text-quaternary)] leading-relaxed m-0">
                      <span className="font-[var(--font-weight-medium)] text-[color:var(--text-tertiary)]">과거 패턴 </span>
                      {section.context}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Footer note */}
            <div className="pt-6">
              <p className="text-[length:var(--font-size-text-xs)] text-[color:var(--text-disabled)]">
                AI가 주요 지표를 종합해 생성한 요약입니다. 투자 조언이 아닙니다.
              </p>
            </div>
          </div>

          {/* Right column: 7-day status history */}
          <div>
            <h2 className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-medium)] tracking-widest text-[color:var(--text-quaternary)] uppercase mb-5">
              최근 7일 현황
            </h2>
            <div className="rounded-[var(--radius-xl)] border border-[var(--border-primary)] p-5 sticky top-[76px]">
              <div className="space-y-0">
                {[...weekStatus].reverse().map((d, i) => {
                  const color = statusColors[d.status];
                  const today = d.isToday;
                  const reversed = [...weekStatus].reverse();
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0 mt-1"
                          style={{ backgroundColor: color }}
                        />
                        {i < reversed.length - 1 && (
                          <div className="w-px flex-1 my-1 bg-[var(--border-secondary)]" />
                        )}
                      </div>
                      <div className="pb-5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[length:var(--font-size-text-xs)] ${
                              today
                                ? "text-[color:var(--text-primary)] font-[var(--font-weight-medium)]"
                                : "text-[color:var(--text-disabled)]"
                            }`}
                          >
                            {today ? `3/${d.day} (오늘)` : `3/${d.day}`}
                          </span>
                          <span
                            className="text-[length:10px] font-[var(--font-weight-medium)] px-1.5 py-px rounded-[var(--radius-sm)]"
                            style={{ color, backgroundColor: `${color}15` }}
                          >
                            {statusLabels[d.status]}
                          </span>
                        </div>
                        <p
                          className={`text-[length:var(--font-size-text-sm)] leading-relaxed ${
                            today
                              ? "text-[color:var(--text-primary)] font-[var(--font-weight-medium)]"
                              : "text-[color:var(--text-tertiary)]"
                          }`}
                        >
                          {d.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
