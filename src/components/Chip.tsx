interface ChipProps {
  /** Chip label text */
  children: React.ReactNode;
  /** Color variant */
  color?: "white" | "success" | "error";
  /** Size variant */
  size?: "sm" | "md";
  /** Optional className for custom styling */
  className?: string;
}

const sizeClasses = {
  sm: "py-[2px] text-[12px] leading-[18px]",
  md: "py-[2px] text-[14px] leading-[20px]",
} as const;

const colorClasses = {
  white: {
    sm: "bg-[var(--fg-primary)] text-[var(--text-inverse)] px-[8px] rounded-[8px]",
    md: "bg-[var(--fg-primary)] text-[var(--text-inverse)] px-[10px] rounded-[8px]",
  },
  success: {
    sm: "bg-[var(--fg-success-primary)] text-[var(--text-inverse)] px-[6px] rounded-[6px]",
    md: "bg-[var(--fg-success-primary)] text-[var(--text-inverse)] px-[8px] rounded-[6px]",
  },
  error: {
    sm: "bg-[var(--fg-error-primary)] text-[var(--text-primary)] px-[6px] rounded-[6px]",
    md: "bg-[var(--fg-error-primary)] text-[var(--text-primary)] px-[8px] rounded-[6px]",
  },
} as const;

export function Chip({
  children,
  color = "white",
  size = "sm",
  className = "",
}: ChipProps) {
  return (
    <span
      className={`inline-flex items-center font-medium text-center ${sizeClasses[size]} ${colorClasses[color][size]} ${className}`}
    >
      {children}
    </span>
  );
}

export default Chip;
