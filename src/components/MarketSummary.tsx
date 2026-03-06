import { MetricItem } from "./MetricItem";

const metrics = [
  { label: "환율", value: "1,394.12원", changePercent: 2.46, trend: "up" as const },
  { label: "달러 인덱스", value: "97.73", changePercent: 2.06, trend: "down" as const },
  { label: "금", value: "$1,990.12", changePercent: 4.02, trend: "down" as const },
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
