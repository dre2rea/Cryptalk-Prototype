"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MetricItem } from "./MetricItem";
import { coins } from "@/data/mockData";

const standardMetrics = [
  { label: "글로벌 거래량", value: "$782억", changePercent: 34.2, trend: "down" as const },
  { label: "글로벌 시가총액", value: "$2.71조", changePercent: 2.87, trend: "down" as const },
  { label: "비트코인 도미넌스", value: "60.22%", changePercent: 1.84, trend: "up" as const },
  { label: "공포탐욕지수", value: "18", changePercent: 0, trend: "down" as const, badge: "극단적 공포", badgeVariant: "danger" as const },
  { label: "김치 프리미엄", value: "-1.11%", changePercent: 0, trend: "down" as const, badge: "역전", badgeVariant: "danger" as const },
  { label: "변동성 인덱스", value: "38.7", changePercent: 12.4, trend: "up" as const },
];

const btc = coins.find((c) => c.id === "bitcoin")!;
const eth = coins.find((c) => c.id === "ethereum")!;

const chartMetrics = [
  { label: "비트코인", value: "$83,241.00", changePercent: 2.14, trend: "down" as const, showChart: true, sparklineData: btc.sparkline30d },
  { label: "이더리움", value: "$2,187.00", changePercent: 3.41, trend: "down" as const, showChart: true, sparklineData: eth.sparkline30d },
  { label: "금", value: "$3,042.50", changePercent: 1.52, trend: "up" as const, showChart: true, sparklineData: [2980, 2995, 3010, 2998, 3025, 3018, 3035, 3042] },
];

const allMetrics = [...standardMetrics, ...chartMetrics];
const GAP = 10;

function ChevronButton({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "이전 슬라이드" : "다음 슬라이드"}
      className="absolute top-1/2 -translate-y-1/2 z-10 w-[32px] h-[32px] rounded-full border border-[var(--border-primary)] bg-[var(--bg-secondary)] flex items-center justify-center cursor-pointer hover:bg-[var(--bg-tertiary)] transition-colors duration-150"
      style={{ [direction === "left" ? "left" : "right"]: -16 }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d={direction === "left" ? "M12.5 15L7.5 10L12.5 5" : "M7.5 15L12.5 10L7.5 5"}
          stroke="var(--text-quaternary)"
          strokeWidth="1.667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export function MarketSummary() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);

  // Measure the width of one full set of cards
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Total scroll width is 2 sets; one set = scrollWidth / 2
    setWidthRef.current = el.scrollWidth / 2;
  }, []);

  const [canScrollLeft, setCanScrollLeft] = useState(false);

  // Infinite loop: when scrolled past the first set, jump back seamlessly
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || setWidthRef.current === 0) return;
    if (el.scrollLeft >= setWidthRef.current) {
      el.scrollLeft -= setWidthRef.current;
    }
    setCanScrollLeft(el.scrollLeft > 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = 184;
    el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
  }, []);

  // Auto-scroll right every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      scroll("right");
    }, 3000);
    return () => clearInterval(interval);
  }, [scroll]);

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[16px] leading-[24px] font-semibold text-[var(--text-secondary)]">
        시장 현황
      </h2>
      <div className="relative">
        {canScrollLeft && (
          <>
            <div className="absolute left-0 top-0 bottom-0 w-[48px] z-[5] pointer-events-none" style={{ background: "linear-gradient(to right, var(--bg-primary), transparent)" }} />
            <ChevronButton direction="left" onClick={() => scroll("left")} />
          </>
        )}
        <div
          ref={scrollRef}
          className="flex items-center overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", gap: GAP }}
        >
          {/* Render two sets for seamless infinite loop */}
          {[0, 1].map((setIndex) =>
            allMetrics.map((m) => (
              <MetricItem key={`${setIndex}-${m.label}`} {...m} />
            ))
          )}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-[48px] z-[5] pointer-events-none" style={{ background: "linear-gradient(to left, var(--bg-primary), transparent)" }} />
        <ChevronButton direction="right" onClick={() => scroll("right")} />
      </div>
    </section>
  );
}

export default MarketSummary;
