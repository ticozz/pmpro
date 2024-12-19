'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash } from "lucide-react";

interface PricingFeature {
  id: string;
  name: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: PricingFeature[];
  isPopular: boolean;
}

export function PricingPlans() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/admin/system/pricing');
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFeature = async (planId: string, featureId: string, included: boolean) => {
    try {
      await fetch(`/api/admin/system/pricing/${planId}/features/${featureId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ included }),
      });
      fetchPlans();
    } catch (error) {
      console.error('Error updating feature:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Pricing Plans</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Plan
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">{plan.name}</h3>
                <p className="text-2xl font-bold">${plan.price}</p>
                <p className="text-sm text-muted-foreground">
                  per {plan.billingPeriod}
                </p>
              </div>
              <div className="space-x-2">
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {plan.features.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm">{feature.name}</span>
                  <Switch
                    checked={feature.included}
                    onCheckedChange={(checked: boolean) =>
                      toggleFeature(plan.id, feature.id, checked)
                    }
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm">Popular Plan</span>
                <Switch
                  checked={plan.isPopular}
                  onCheckedChange={async (checked: boolean) => {
                    try {
                      await fetch(`/api/admin/system/pricing/${plan.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ isPopular: checked }),
                      });
                      fetchPlans();
                    } catch (error) {
                      console.error('Error updating plan:', error);
                    }
                  }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 