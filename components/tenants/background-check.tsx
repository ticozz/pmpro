"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";

interface BackgroundCheckProps {
  tenantId: string;
  onComplete?: () => void;
}

export function BackgroundCheck({ tenantId, onComplete }: BackgroundCheckProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    creditScore: "",
    criminalRecord: false,
    evictionHistory: false,
    verifiedIncome: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/tenants/${tenantId}/background-check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          creditScore: formData.creditScore ? parseInt(formData.creditScore) : null,
          verifiedIncome: formData.verifiedIncome ? parseFloat(formData.verifiedIncome) : null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit background check");
      }

      toast({
        title: "Success",
        description: "Background check submitted successfully",
      });

      onComplete?.();
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit background check",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Background Check</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="creditScore">Credit Score</Label>
              <Input
                id="creditScore"
                type="number"
                min="300"
                max="850"
                value={formData.creditScore}
                onChange={(e) => setFormData(prev => ({ ...prev, creditScore: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="verifiedIncome">Verified Annual Income</Label>
              <Input
                id="verifiedIncome"
                type="number"
                min="0"
                step="0.01"
                value={formData.verifiedIncome}
                onChange={(e) => setFormData(prev => ({ ...prev, verifiedIncome: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="criminalRecord"
                checked={formData.criminalRecord}
                onCheckedChange={(checked: boolean | 'indeterminate') => 
                  setFormData(prev => ({ ...prev, criminalRecord: checked === true }))
                }
              />
              <Label htmlFor="criminalRecord">Criminal Record Found</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="evictionHistory"
                checked={formData.evictionHistory}
                onCheckedChange={(checked: boolean | 'indeterminate') => 
                  setFormData(prev => ({ ...prev, evictionHistory: checked === true }))
                }
              />
              <Label htmlFor="evictionHistory">Eviction History Found</Label>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Submitting..." : "Submit Background Check"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 