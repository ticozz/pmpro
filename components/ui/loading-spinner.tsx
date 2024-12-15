import { cn } from "@/lib/utils";
import { designSystem } from "@/lib/design-system";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <div
      className={cn(
        "animate-spin",
        sizeClasses[size],
        designSystem.colors.primary.gradient,
        className
      )}
    >
      <div className="h-full w-full rounded-full border-2 border-t-transparent" />
    </div>
  );
} 