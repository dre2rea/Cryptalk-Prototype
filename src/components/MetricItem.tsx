import { ArrowDownIcon, ArrowUpIcon } from "./icons";

interface MetricItemProps {
  label: string;
  value: string;
  changePercent: number;
  trend: "up" | "down";
  badge?: string;
  badgeVariant?: "danger" | "success";
  showChart?: boolean;
  sparklineData?: number[];
}

function Change({ changePercent, trend }: { changePercent: number; trend: "up" | "down" }) {
  const isUp = trend === "up";
  const color = isUp ? "var(--fg-success-primary)" : "var(--fg-error-primary)";

  return (
    <div className="flex items-center gap-1">
      <span className="size-[10px] flex items-center justify-center" style={{ color }}>
        {isUp ? <ArrowUpIcon size={10} className="text-inherit" /> : <ArrowDownIcon size={10} className="text-inherit" />}
      </span>
      <span className="text-[length:var(--font-size-text-sm)] leading-[var(--line-height-text-sm)] font-[var(--font-weight-regular)] whitespace-nowrap" style={{ color }}>
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
    <span className={`text-[length:var(--font-size-text-xs)] leading-[var(--line-height-text-xs)] font-medium px-[var(--spacing-sm)] py-[var(--spacing-xxs)] rounded-[var(--radius-sm)] whitespace-nowrap ${styles}`}>
      {label}
    </span>
  );
}

export function MetricItem({ label, value, changePercent, trend, badge, badgeVariant, showChart, sparklineData }: MetricItemProps) {
  if (showChart) {
    return (
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-[var(--radius-lg)] px-4 py-3 flex flex-col gap-[var(--spacing-sm)] w-[216px] h-[86px] shrink-0 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between">
          <p className="text-[12px] leading-[24px] text-[var(--text-tertiary)] whitespace-nowrap">
            {label}
          </p>
          <Change changePercent={changePercent} trend={trend} />
        </div>
        <div className="flex items-center justify-between flex-1 min-h-0">
          <p className="text-[length:var(--font-size-text-lg)] leading-[var(--line-height-display-sm)] font-semibold text-[var(--text-primary)] whitespace-nowrap">
            {value}
          </p>
          <div className="w-[72px] h-[32px] flex-shrink-0">
            {sparklineData ? <MiniSparkline data={sparklineData} /> : <MiniChart trend={trend} />}
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
        <p className="text-[length:var(--font-size-text-lg)] leading-[var(--line-height-display-sm)] font-semibold text-[var(--text-primary)] whitespace-nowrap">
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

function MiniSparkline({ data }: { data: number[] }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const pad = 2;

  const baseline = data[0];
  const baselineY = pad + (h - 2 * pad) - ((baseline - min) / range) * (h - 2 * pad);

  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: pad + (h - 2 * pad) - ((v - min) / range) * (h - 2 * pad),
  }));

  const points = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  const firstX = pts[0].x;
  const lastX = pts[pts.length - 1].x;
  const areaPath = `M${firstX},${baselineY} ` +
    pts.map((p) => `L${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") +
    ` L${lastX},${baselineY} Z`;

  const uid = `ms-${data.slice(0, 3).map((d) => Math.round(d * 10)).join("-")}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      <defs>
        <clipPath id={`${uid}-up`}>
          <rect x="0" y="0" width={w} height={baselineY} />
        </clipPath>
        <clipPath id={`${uid}-down`}>
          <rect x="0" y={baselineY} width={w} height={h - baselineY} />
        </clipPath>
        <linearGradient id={`${uid}-gup`} gradientUnits="userSpaceOnUse" x1="0" y1={0} x2="0" y2={baselineY}>
          <stop offset="0%" stopColor="var(--fg-success-primary)" stopOpacity={0.6} />
          <stop offset="50%" stopColor="var(--fg-success-primary)" stopOpacity={0.2} />
          <stop offset="100%" stopColor="var(--fg-success-primary)" stopOpacity={0} />
        </linearGradient>
        <linearGradient id={`${uid}-gdown`} gradientUnits="userSpaceOnUse" x1="0" y1={h} x2="0" y2={baselineY}>
          <stop offset="0%" stopColor="var(--fg-error-primary)" stopOpacity={0.6} />
          <stop offset="50%" stopColor="var(--fg-error-primary)" stopOpacity={0.2} />
          <stop offset="100%" stopColor="var(--fg-error-primary)" stopOpacity={0} />
        </linearGradient>
      </defs>

      <path d={areaPath} fill={`url(#${uid}-gup)`} clipPath={`url(#${uid}-up)`} />
      <path d={areaPath} fill={`url(#${uid}-gdown)`} clipPath={`url(#${uid}-down)`} />

      <line
        x1="0" y1={baselineY} x2={w} y2={baselineY}
        stroke="var(--text-disabled)" strokeWidth="0.75" strokeDasharray="2 2" opacity={0.4}
      />

      <polyline
        points={points} fill="none" stroke="var(--fg-success-primary)"
        strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
        clipPath={`url(#${uid}-up)`}
      />
      <polyline
        points={points} fill="none" stroke="var(--fg-error-primary)"
        strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
        clipPath={`url(#${uid}-down)`}
      />
    </svg>
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
