import React from 'react';

const stats = [
  { id: 1, name: 'Properties Managed', value: '10,000+' },
  { id: 2, name: 'Happy Tenants', value: '50,000+' },
  { id: 3, name: 'Property Managers', value: '1,000+' },
  { id: 4, name: 'Maintenance Requests', value: '100,000+' },
];

export function Stats() {
  return (
    <div className="bg-blue-600 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Trusted by property managers worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-200">
              Join thousands of property managers who trust our platform
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-blue-200">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
} 