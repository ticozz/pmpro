'use client';
import React from 'react';
import { X } from 'lucide-react';

interface AnnouncementBannerProps {
  text: string;
  link?: {
    text: string;
    href: string;
  };
}

export function AnnouncementBanner({ text, link }: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-blue-600">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <p className="ml-3 truncate font-medium text-white">
              <span className="md:hidden">{text}</span>
              <span className="hidden md:inline">{text}</span>
              {link && (
                <a
                  href={link.href}
                  className="ml-2 font-semibold text-white underline"
                >
                  {link.text} <span aria-hidden="true">&rarr;</span>
                </a>
              )}
            </p>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className="-mr-1 flex rounded-md p-2 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
              onClick={() => setIsVisible(false)}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 