'use client';

import { DemoFeatures } from "./demo-features";
import { DemoHeader } from "./demo-header";
import { DemoInteractive } from "./demo-interactive";
export function PlatformDemo() {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50/50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <svg
          className="absolute w-full h-full opacity-[0.15]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-600" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <DemoHeader />
      <DemoFeatures />
      <DemoInteractive />
    </div>
  );
} 