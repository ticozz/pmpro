'use client';

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PricingSection({ translations }: { translations: any }) {
  const pricingPlans = [
    {
      name: translations["pricing.basic.name"],
      price: 29,
      description: translations["pricing.basic.description"],
      features: translations["pricing.basic.features"],
      highlighted: false
    },
    {
      name: translations["pricing.pro.name"],
      price: 79,
      description: translations["pricing.pro.description"],
      features: translations["pricing.pro.features"],
      highlighted: true
    },
    {
      name: translations["pricing.enterprise.name"],
      price: 199,
      description: translations["pricing.enterprise.description"],
      features: translations["pricing.enterprise.features"],
      highlighted: false
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {translations["pricing.title"]}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {translations["pricing.subtitle"]}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-blue-600 text-white ring-4 ring-blue-600 ring-opacity-50'
                  : 'bg-white border'
              } transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className={`mt-2 ${plan.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>
                {plan.description}
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className={plan.highlighted ? 'text-blue-100' : 'text-gray-500'}>
                  {translations["pricing.monthly"]}
                </span>
              </div>
              <ul className="mt-8 space-y-4">
                {Array.isArray(plan.features) ? plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className={`h-5 w-5 mr-3 ${
                      plan.highlighted ? 'text-blue-200' : 'text-blue-500'
                    }`} />
                    <span>{feature}</span>
                  </li>
                )) : null}
              </ul>
              <Button
                className={`mt-8 w-full ${
                  plan.highlighted
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {translations["pricing.getStarted"]}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 