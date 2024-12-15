'use client';

export function DemoInteractive() {
  return (
    <div className="relative">
      <div className="absolute -inset-x-4 -top-16 -bottom-8 bg-blue-50/50 rounded-3xl -z-10" />
      {/* Your interactive demo content */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          This is just a glimpse of what PropertyPro can do. Start your free trial to explore all features.
        </p>
      </div>
    </div>
  );
} 