'use client';

import { BarChart3, Bell, Users } from 'lucide-react';

export function DemoFeatures() {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      <Feature
        icon={<BarChart3 className="w-5 h-5 text-blue-600" />}
        title="Real-time Analytics"
        description="Monitor your properties' performance with live data and insights"
      />
      <Feature
        icon={<Bell className="w-5 h-5 text-blue-600" />}
        title="Smart Notifications"
        description="Stay informed with automated alerts and updates"
      />
      <Feature
        icon={<Users className="w-5 h-5 text-blue-600" />}
        title="Tenant Management"
        description="Handle tenant interactions and requests effortlessly"
      />
    </div>
  );
}

function Feature({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start space-x-4">
      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
} 