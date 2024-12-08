import React from 'react';
import { 
  Building2, Users, ClipboardList, Wrench, 
  BarChart3, Shield, CreditCard, MessageSquare 
} from 'lucide-react';

const features = [
  {
    name: 'Property Management',
    description: 'Efficiently manage your properties, units, and amenities all in one place.',
    icon: Building2,
  },
  {
    name: 'Tenant Portal',
    description: 'Give tenants easy access to pay rent, submit maintenance requests, and more.',
    icon: Users,
  },
  {
    name: 'Lease Management',
    description: 'Streamline lease creation, renewals, and document management.',
    icon: ClipboardList,
  },
  {
    name: 'Maintenance Tracking',
    description: 'Track and manage maintenance requests, vendors, and work orders.',
    icon: Wrench,
  },
  {
    name: 'Financial Reporting',
    description: 'Comprehensive financial reporting and analytics for your properties.',
    icon: BarChart3,
  },
  {
    name: 'Secure Platform',
    description: 'Enterprise-grade security to protect your data and transactions.',
    icon: Shield,
  },
  {
    name: 'Online Payments',
    description: 'Accept online rent payments and automate payment processing.',
    icon: CreditCard,
  },
  {
    name: 'Communication Tools',
    description: 'Built-in messaging and notification system for better communication.',
    icon: MessageSquare,
  },
];

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Comprehensive Solution
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to manage your properties
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform provides all the tools you need to efficiently manage your properties,
            tenants, and maintenance requests in one place.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
} 