'use client';

import { 
  BarChart3, Building2, Users, 
  Wallet, ClipboardCheck, Bell 
} from 'lucide-react';

export function FeaturesSection({ translations }: { translations: any }) {
  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: translations["features.analytics.title"],
      description: translations["features.analytics.description"]
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: translations["features.property.title"],
      description: translations["features.property.description"]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: translations["features.tenant.title"],
      description: translations["features.tenant.description"]
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      title: translations["features.financial.title"],
      description: translations["features.financial.description"]
    },
    {
      icon: <ClipboardCheck className="h-6 w-6" />,
      title: translations["features.maintenance.title"],
      description: translations["features.maintenance.description"]
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: translations["features.notifications.title"],
      description: translations["features.notifications.description"]
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {translations["features.title"]}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {translations["features.subtitle"]}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 