import { ArrowDownIcon, ArrowUpIcon } from "./icons";

interface MetricItemProps {
  /** Label displayed at the top (e.g., "환율") */
  label: string;
  /** Main value displayed (e.g., "1,394.12원") */
  value: string;
  /** Percentage change (e.g., "2.46" for 2.46%) */
  changePercent: number;
  /** Trend direction - determines color and icon */
  trend: "up" | "down";
  /** Optional className for custom styling */
  className?: string;
}

export function MetricItem({
  label,
  value,
  changePercent,
  trend,
  className = "",
}: MetricItemProps) {
  const isUp = trend === "up";
  const formattedPercent = `${isUp ? "+" : "-"}${Math.abs(changePercent)}%`;

  return (
    <div
      className={`bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-[12px] px-[20px] py-[24px] flex flex-col gap-[16px] w-[388px] ${className}`}
    >
      {/* Label */}
      <p className="text-[var(--text-secondary)] text-[16px] leading-[24px] font-semibold">
        {label}
      </p>

      {/* Value and Chart */}
      <div className="flex items-end justify-between w-full">
        {/* Value and Change */}
        <div className="flex flex-col gap-[12px]">
          {/* Main Value */}
          <p className="text-[var(--text-primary)] text-[30px] leading-[38px] font-semibold">
            {value}
          </p>

          {/* Change Indicator */}
          <div className="flex items-center gap-[2px]">
            <span className="size-5 flex items-center justify-center">
              {isUp ? (
                <ArrowUpIcon className="text-[var(--fg-success-primary)]" />
              ) : (
                <ArrowDownIcon className="text-[var(--fg-error-primary)]" />
              )}
            </span>
            <span
              className={`text-[14px] leading-[20px] font-medium ${isUp ? "text-[var(--fg-success-primary)]" : "text-[var(--fg-error-primary)]"}`}
            >
              {formattedPercent}
            </span>
          </div>
        </div>

        {/* Mini Chart Placeholder */}
        <div className="flex-1 h-[70px] ml-4">
          <MiniChart trend={trend} />
        </div>
      </div>
    </div>
  );
}

/** Simple mini chart visualization */
function MiniChart({ trend }: { trend: "up" | "down" }) {
  const isUp = trend === "up";
  const color = isUp ? "var(--fg-success-primary)" : "var(--fg-error-primary)";
  const gradientId = `gradient-${trend}`;

  // Generate a simple wave path
  const path = isUp
    ? "M0,50 Q20,45 40,40 T80,30 T120,35 T154,20"
    : "M0,20 Q20,25 40,30 T80,40 T120,35 T154,50";

  return (
    <svg
      viewBox="0 0 154 70"
      fill="none"
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Gradient fill */}
      <path
        d={`${path} L154,70 L0,70 Z`}
        fill={`url(#${gradientId})`}
      />
      {/* Line */}
      <path
        d={path}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default MetricItem;
