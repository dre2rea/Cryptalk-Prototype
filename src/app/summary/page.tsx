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
  { day: "5", status: "bullish" as const, isToday: false },
  { day: "6", status: "neutral" as const, isToday: false },
  { day: "7", status: "neutral" as const, isToday: false },
  { day: "8", status: "bearish" as const, isToday: false },
  { day: "9", status: "bearish" as const, isToday: false },
  { day: "10", status: "bearish" as const, isToday: false },
  { day: "11", status: "bearish" as const, isToday: true },
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

interface SectionData {
  trend: string;
  headline: string;
  detail: string;
  context: string;
  timeline: { day: string; event: string }[];
}

const sections: SectionData[] = [
  {
    trend: "worsening",
    headline: "관망세 5일째, 점점 깊어지는 중",
    detail: "3/7부터 거래량 감소가 시작됐고, 시총도 동반 하락 중. 거래량 회복 없이 하락이 이어지면서 본격적인 관망 국면으로 전환.",
    context: "직전 유사 패턴: 2024년 8월. 당시 약 2주간 횡보 후 반등이 나왔으나, 그 전까지 거래량이 먼저 회복되는 시그널이 선행했음.",
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
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setIsDark(false);
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

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

      <Header isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} />

      <div className="flex-1 mx-auto max-w-[1440px] w-full px-8 pt-[100px] pb-32">
        {/* Back nav — matches news detail */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[length:var(--font-size-text-sm)] text-[color:var(--text-quaternary)] hover:text-[color:var(--text-secondary)] transition-colors mb-8 no-underline"
        >
          ← 시장 현황
        </Link>

        {/* Header: status + timestamp */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <span className="relative shrink-0 w-2.5 h-2.5">
              <span className="absolute inset-0 rounded-full" style={{ backgroundColor: sc.dot }} />
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full animate-[ripple-summary_2s_ease-out_infinite]"
                  style={{ backgroundColor: sc.dot }}
                />
              )}
            </span>
            <h1 className="text-[length:var(--font-size-display-xs)] font-[var(--font-weight-bold)]" style={{ color: sc.color }}>
              {marketStatus.label}
            </h1>
            <span className="text-[length:var(--font-size-text-md)] text-[color:var(--text-quaternary)]">
              ({marketStatus.phase})
            </span>
            <span className="text-[length:var(--font-size-text-sm)] text-[color:var(--text-disabled)] ml-4">
              2026.03.11 14:00 기준
            </span>
          </div>
        </div>

        {/* 7-day status strip */}
        <div className="mb-12">
          <h2 className="text-[length:var(--font-size-text-sm)] font-[var(--font-weight-medium)] tracking-widest text-[color:var(--text-quaternary)] uppercase mb-5">
            최근 7일 현황
          </h2>
          <div className="inline-block rounded-[var(--radius-xl)] border border-[var(--border-primary)] p-6">
            <div className="relative flex items-center" style={{ minWidth: 480 }}>
              <div className="absolute top-[14px] left-0 right-0 h-px" style={{ backgroundColor: "var(--border-primary)" }} />
              {weekStatus.map((d, i) => {
                const color = statusColors[d.status];
                const today = d.isToday;
                const active = d.status !== "neutral";
                return (
                  <div key={i} className="flex-1 flex flex-col items-center relative z-10">
                    {active ? (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `${color}20`,
                          border: `1.5px solid ${color}${today ? "AA" : "60"}`,
                        }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                      </div>
                    ) : (
                      <div className="w-7 h-7 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                      </div>
                    )}
                    <span
                      className={`text-[length:var(--font-size-text-sm)] mt-2.5 ${
                        today
                          ? "text-[color:var(--text-primary)] font-[var(--font-weight-medium)]"
                          : "text-[color:var(--text-quaternary)]"
                      }`}
                    >
                      {today ? `3/${d.day} (오늘)` : `3/${d.day}`}
                    </span>
                    <span
                      className="text-[length:var(--font-size-text-sm)] mt-0.5 font-[var(--font-weight-medium)]"
                      style={{ color }}
                    >
                      {statusLabels[d.status]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Verdict sections — 3 cards in a row */}
        <div className="flex gap-[var(--spacing-lg)]">
          {sections.map((section, si) => {
            const cfg = trendConfig[section.trend];
            return (
              <div
                key={si}
                className="flex-1 min-w-0 rounded-[var(--radius-xl)] border border-[var(--border-secondary)] bg-[var(--bg-secondary)] p-[var(--spacing-2xl)] shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[length:var(--font-size-text-xs)] font-[var(--font-weight-medium)] px-2 py-0.5 rounded-[var(--radius-sm)]"
                    style={{ color: cfg.color, backgroundColor: cfg.bg }}
                  >
                    {cfg.label}
                  </span>
                </div>

                <h2 className="text-[length:var(--font-size-text-md)] font-[var(--font-weight-semibold)] text-[color:var(--text-primary)] mb-3 leading-snug">
                  {section.headline}
                </h2>
                <p className="text-[length:var(--font-size-text-sm)] text-[color:var(--text-tertiary)] leading-relaxed mb-6">
                  {section.detail}
                </p>

                {/* Mini timeline */}
                <div className="relative mb-6">
                  <div className="absolute left-1 top-1 bottom-1 w-px" style={{ backgroundColor: `${cfg.color}20` }} />
                  <div className="space-y-2.5">
                    {section.timeline.map((t, ti) => {
                      const isLast = ti === section.timeline.length - 1;
                      return (
                        <div key={ti} className="flex items-start gap-2.5 relative">
                          <div
                            className="shrink-0 w-2 h-2 rounded-full mt-1"
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
                              isLast ? "text-[color:var(--text-secondary)]" : "text-[color:var(--text-disabled)]"
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
                <div className="pl-4" style={{ borderLeft: `2px solid ${cfg.color}25` }}>
                  <p className="text-[length:var(--font-size-text-sm)] text-[color:var(--text-quaternary)] leading-relaxed">
                    {section.context}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="border-t border-[var(--border-secondary)] mt-10 pt-6">
          <p className="text-[length:var(--font-size-text-xs)] text-[color:var(--text-disabled)]">
            AI가 주요 지표를 종합해 생성한 요약입니다
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
