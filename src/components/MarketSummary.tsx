import { MetricItem } from "./MetricItem";

const standardMetrics = [
  { label: "글로벌 거래량", value: "$782억", changePercent: 34.2, trend: "down" as const },
  { label: "글로벌 시가총액", value: "$2.71조", changePercent: 2.87, trend: "down" as const },
  { label: "비트코인 도미넌스", value: "60.22%", changePercent: 1.84, trend: "up" as const },
  { label: "공포탐욕지수", value: "18", changePercent: 0, trend: "down" as const, badge: "극단적 공포", badgeVariant: "danger" as const },
  { label: "김치 프리미엄", value: "-1.11%", changePercent: 0, trend: "down" as const, badge: "역전", badgeVariant: "danger" as const },
];

const chartMetrics = [
  { label: "비트코인", value: "$83,241.00", changePercent: 2.14, trend: "down" as const, showChart: true },
  { label: "이더리움", value: "$2,187.00", changePercent: 3.41, trend: "down" as const, showChart: true },
];

export function MarketSummary() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[16px] leading-[24px] font-medium text-[var(--text-secondary)]">
        시장 현황
      </h2>
      <div className="flex items-center gap-3">
        <div className="flex gap-[10px]">
          {standardMetrics.map((m) => (
            <MetricItem key={m.label} {...m} />
          ))}
        </div>
        <div className="w-[0.5px] h-[25px] bg-[var(--border-secondary)]" />
        <div className="flex gap-[10px]">
          {chartMetrics.map((m) => (
            <MetricItem key={m.label} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MarketSummary;
