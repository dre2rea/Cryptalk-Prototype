import { MetricItem } from "./MetricItem";

const metrics = [
  { label: "글로벌 전체 시총", value: "$2.87T", changePercent: 3.12, trend: "up" as const },
  { label: "글로벌 24시간 거래량 변동률", value: "$94.5B", changePercent: 12.38, trend: "up" as const },
  { label: "비트코인 도미넌스", value: "54.2%", changePercent: 0.87, trend: "up" as const },
  { label: "김치 프리미엄", value: "3.42%", changePercent: 1.15, trend: "down" as const },
  { label: "공탐지수", value: "72 (탐욕)", changePercent: 5.26, trend: "up" as const },
];

export function MarketSummary() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[18px] leading-[26px] font-medium text-[var(--text-primary)]">
        마켓요약
      </h2>
      <div className="flex gap-4">
        {metrics.map((m) => (
          <MetricItem key={m.label} {...m} />
        ))}
      </div>
    </section>
  );
}

export default MarketSummary;
