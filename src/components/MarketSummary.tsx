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
];

export function MarketSummary() {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-[16px] leading-[24px] font-semibold text-[var(--text-secondary)]">
        시장 현황
      </h2>
      <div className="flex items-center gap-[10px]">
        {standardMetrics.map((m) => (
          <MetricItem key={m.label} {...m} />
        ))}
        {chartMetrics.map((m) => (
          <MetricItem key={m.label} {...m} />
        ))}
      </div>
    </section>
  );
}

export default MarketSummary;
