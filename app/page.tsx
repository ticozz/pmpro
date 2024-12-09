'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Building2,
  Users,
  Wallet,
  ClipboardCheck,
  Bell,
  Check,
} from 'lucide-react';
import { BuildingsPattern } from '@/components/ui/buildings-pattern';
import { PlatformDemo } from "@/components/marketing/platform-demo";
import { LanguageSelector } from '@/components/ui/language-selector';
import { useLanguage } from '@/contexts/language-context';

// Keep only the BackgroundPattern since it's specific to the hero section
const BackgroundPattern = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <svg
      className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-blue-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="e813992c-7d03-4cc4-a2bd-151760b470a0"
          width={200}
          height={200}
          x="50%"
          y={-1}
          patternUnits="userSpaceOnUse"
        >
          <path d="M100 200V.5M.5 .5H200" fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
      />
    </svg>
  </div>
);

export default function HomePage() {
  const { translations } = useLanguage();

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
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                PropertyPro
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Link href="/auth/login">
                <Button variant="ghost">{translations['nav.signin']}</Button>
              </Link>
              <Link href="/auth/register">
                <Button>{translations['nav.getStarted']}</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - without PlatformDemo */}
      <section className="relative min-h-[600px] bg-gradient-to-b from-blue-50 via-white to-blue-50 py-24">
        <BackgroundPattern />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {translations['hero.title']}
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-8">
              {translations['hero.description']}
            </p>
            <div className="mt-10">
              <Link href="/auth/register">
                <Button size="lg" className="rounded-full px-8">
                  {translations['hero.cta']}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <BuildingsPattern />
        </div>
      </section>

      {/* Platform Demo Section - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/50 relative overflow-hidden">
        {/* Background Pattern */}
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
              See It in Action
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Experience how PropertyPro transforms your daily operations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Real-time Analytics</h3>
                <p className="text-sm text-gray-600">Monitor your properties' performance with live data and insights</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Smart Notifications</h3>
                <p className="text-sm text-gray-600">Stay informed with automated alerts and updates</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Tenant Management</h3>
                <p className="text-sm text-gray-600">Handle tenant interactions and requests effortlessly</p>
              </div>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="relative">
            <div className="absolute -inset-x-4 -top-16 -bottom-8 bg-blue-50/50 rounded-3xl -z-10" />
            <PlatformDemo />
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                This is just a glimpse of what PropertyPro can do. Start your free trial to explore all features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Pricing Section */}
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

      {/* Footer */}
      <footer className="bg-gradient-to-b from-white to-blue-50 border-t mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                PropertyPro
              </Link>
              <p className="mt-4 text-gray-600">
                Making property management easier, faster, and more efficient.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Features</li>
                <li>Pricing</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li>About</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} PropertyPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 