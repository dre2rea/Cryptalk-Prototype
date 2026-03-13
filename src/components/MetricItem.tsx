import { ArrowDownIcon, ArrowUpIcon } from "./icons";

interface MetricItemProps {
  label: string;
  value: string;
  changePercent: number;
  trend: "up" | "down";
  badge?: string;
  badgeVariant?: "danger" | "success";
  showChart?: boolean;
}

function Change({ changePercent, trend }: { changePercent: number; trend: "up" | "down" }) {
  const isUp = trend === "up";
  const color = isUp ? "var(--fg-success-primary)" : "var(--fg-error-primary)";

  return (
    <div className="flex items-center gap-1">
      <span className="size-[10px] flex items-center justify-center" style={{ color }}>
        {isUp ? <ArrowUpIcon size={10} className="text-inherit" /> : <ArrowDownIcon size={10} className="text-inherit" />}
      </span>
      <span className="text-[12px] leading-[18px] font-medium whitespace-nowrap" style={{ color }}>
        {changePercent}%
      </span>
    </div>
  );
}

function Badge({ label, variant }: { label: string; variant: "danger" | "success" }) {
  const styles = variant === "danger"
    ? "bg-[var(--badge-danger-bg)] text-[var(--fg-error-primary)]"
    : "bg-[var(--badge-success-bg)] text-[var(--fg-success-primary)]";

  return (
    <span className={`text-[12px] leading-[18px] font-medium px-[6px] py-[2px] rounded-[4px] whitespace-nowrap ${styles}`}>
      {label}
    </span>
  );
}

export function MetricItem({ label, value, changePercent, trend, badge, badgeVariant, showChart }: MetricItemProps) {
  if (showChart) {
    return (
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-[var(--radius-lg)] px-4 py-3 flex flex-col gap-[6px] w-[216px] h-[86px] shrink-0 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between">
          <p className="text-[12px] leading-[24px] text-[var(--text-tertiary)] whitespace-nowrap">
            {label}
          </p>
          <Change changePercent={changePercent} trend={trend} />
        </div>
        <div className="flex items-center justify-between flex-1 min-h-0">
          <p className="text-[18px] leading-[38px] font-semibold text-[var(--text-primary)] whitespace-nowrap">
            {value}
          </p>
          <div className="w-[72px] h-[32px] flex-shrink-0">
            <MiniChart trend={trend} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-[var(--radius-lg)] px-4 py-3 flex flex-col w-[174px] shrink-0 shadow-[var(--shadow-card)]">
      <p className="text-[12px] leading-[24px] text-[var(--text-tertiary)] whitespace-nowrap">
        {label}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-[18px] leading-[38px] font-semibold text-[var(--text-primary)] whitespace-nowrap">
          {value}
        </p>
        {badge && badgeVariant ? (
          <Badge label={badge} variant={badgeVariant} />
        ) : (
          <Change changePercent={changePercent} trend={trend} />
        )}
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
