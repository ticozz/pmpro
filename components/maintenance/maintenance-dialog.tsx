
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MaintenanceDialogProps {
  property: {
    id: string;
    units?: any[];
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestAdded?: () => void;
}

export function MaintenanceDialog({ 
  property,
  open,
  onOpenChange,
  onRequestAdded
}: MaintenanceDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Maintenance Request</DialogTitle>
        </DialogHeader>
        {/* Form will be added later */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 