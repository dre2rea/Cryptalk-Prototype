import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: "primary" | "outline";
  /** Button size */
  size?: "small" | "medium" | "large";
  /** Button content */
  children: React.ReactNode;
}

const sizeClasses = {
  small: "h-8 py-[8px] text-[12px] leading-[18px] font-normal",
  medium: "h-8 py-[8px] text-[14px] leading-[20px] font-medium",
  large: "py-[8px] text-[14px] leading-[20px] font-semibold",
} as const;

const variantClasses = {
  primary: "bg-[var(--bg-brand-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-brand-primary)]",
  outline: "bg-transparent text-[var(--text-secondary)] border border-[var(--border-disabled)] hover:bg-[var(--bg-secondary)]",
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "medium", children, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-[8px] px-[12px] gap-[4px] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        <span className="px-[2px]">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
