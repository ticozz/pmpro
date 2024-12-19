import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingCard() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-[250px]" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 