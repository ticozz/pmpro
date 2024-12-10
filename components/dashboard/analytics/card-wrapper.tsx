import { Card } from "@/components/ui/card";
import { designSystem } from '@/lib/design-system';
import { cn } from '@/lib/utils';

interface CardWrapperProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function CardWrapper({ title, children, action }: CardWrapperProps) {
  return (
    <Card className={cn(
      designSystem.effects.card,
      designSystem.effects.cardHover,
      "p-6"
    )}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={cn(
          "text-lg font-semibold",
          designSystem.colors.text.primary
        )}>
          {title}
        </h3>
        {action}
      </div>
      {children}
    </Card>
  );
} 