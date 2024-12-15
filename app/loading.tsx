import { designSystem } from "@/lib/design-system";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center min-h-[400px]">
      <div className={cn(
        "flex flex-col items-center gap-4 p-8 rounded-lg",
        designSystem.effects.card,
        designSystem.colors.background.card
      )}>
        <LoadingSpinner size="lg" />
        <p className={cn(
          "text-sm font-medium",
          designSystem.colors.text.muted
        )}>
          Loading...
        </p>
      </div>
    </div>
  );
} 