import { ArrowDownIcon, ArrowUpIcon } from "./icons";

interface MetricItemProps {
  label: string;
  value: string;
  changePercent: number;
  trend: "up" | "down";
}

export function MetricItem({ label, value, changePercent, trend }: MetricItemProps) {
  const isUp = trend === "up";
  const color = isUp ? "var(--fg-success-primary)" : "var(--fg-error-primary)";

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-[12px] px-4 py-4 flex flex-col gap-2 flex-1 min-w-0 max-w-[309px] shadow-[var(--shadow-card)]">
      <p className="text-[14px] leading-[24px] text-[var(--text-tertiary)]">
        {label}
      </p>
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-[22px] leading-[38px] font-semibold text-[var(--text-primary)]">
            {value}
          </p>
          <div className="flex items-center gap-[2px]">
            <span className="size-4 flex items-center justify-center" style={{ color }}>
              {isUp ? <ArrowUpIcon size={16} className="text-inherit" /> : <ArrowDownIcon size={16} className="text-inherit" />}
            </span>
            <span className="text-[14px] leading-[20px] font-medium" style={{ color }}>
              {changePercent}%
            </span>
          </div>
        </div>
        <div className="w-[128px] h-[70px] flex-shrink-0">
          <MiniChart trend={trend} />
        </div>
      </div>
    </div>
  );
}

function MiniChart({ trend }: { trend: "up" | "down" }) {
  const isUp = trend === "up";
  const color = isUp ? "var(--fg-success-primary)" : "var(--fg-error-primary)";
  const id = `mc-${trend}`;

  const path = isUp
    ? "M2,55 C15,50 25,48 35,42 C50,34 60,38 75,30 C90,22 100,28 115,22 C125,18 135,15 152,12"
    : "M2,15 C15,18 25,22 40,28 C55,35 65,30 80,38 C95,45 105,40 120,48 C135,52 145,55 152,58";

  return (
    <svg viewBox="0 0 154 70" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L154,70 L0,70 Z`} fill={`url(#${id})`} />
      <path d={path} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default MetricItem;
