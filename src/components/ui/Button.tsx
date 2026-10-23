import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "secondaryStrong";
  size?: "sm" | "md" | "lg" | "header";
  icon?: LucideIcon;
}

const baseClass =
  "flex cursor-pointer items-center justify-center font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80";

const sizeClass = {
  sm: "text-xs gap-1 px-3 py-1.5",
  md: "text-sm gap-2 px-4 py-3",
  lg: "text-base gap-2.5 px-6 py-4",
  header: "text-sm gap-1.5 p-2 sm:px-3 sm:py-2 shrink-0",
};

const variantClass = {
  primary: "bg-primary text-primary-foreground font-semibold rounded-xl",
  secondary: "bg-secondary-button border border-border rounded-full",
  secondaryStrong: "bg-secondary-button-strong border border-border rounded-full",
  ghost: "rounded-lg text-foreground",
};

export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={[baseClass, sizeClass[size], variantClass[variant], className]
        .filter(Boolean)
        .join(" ")}
    >
      {Icon && <Icon size={18} className="shrink-0" />}
      {children}
    </button>
  );
}