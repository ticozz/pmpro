'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: Record<string, string | string[]>;
  setLanguage: (lang: Record<string, string | string[]>) => void;
}

const defaultLanguage: Record<string, string | string[]> = {
  "nav.signin": "Sign In",
  "nav.signup": "Sign Up",
  "features.title": "Features",
  "features.subtitle": "Everything you need to manage your properties",
  "features.analytics.title": "Analytics",
  "features.analytics.description": "Track your property performance",
  "features.property.title": "Property Management",
  "features.property.description": "Manage your properties efficiently",
  "features.tenant.title": "Tenant Management",
  "features.tenant.description": "Handle tenant relationships",
  "features.financial.title": "Financial Management",
  "features.financial.description": "Track income and expenses",
  "features.maintenance.title": "Maintenance",
  "features.maintenance.description": "Handle maintenance requests",
  "features.notifications.title": "Notifications",
  "features.notifications.description": "Stay updated in real-time",
  "pricing.title": "Pricing Plans",
  "pricing.subtitle": "Choose the perfect plan for your needs",
  "pricing.monthly": "/month",
  "pricing.getStarted": "Get Started",
  "pricing.basic.name": "Basic",
  "pricing.basic.description": "For small property owners",
  "pricing.basic.features": [
    "Up to 5 properties",
    "Basic analytics",
    "Email support"
  ],
  "pricing.pro.name": "Professional",
  "pricing.pro.description": "For growing portfolios",
  "pricing.pro.features": [
    "Up to 20 properties",
    "Advanced analytics",
    "Priority support"
  ],
  "pricing.enterprise.name": "Enterprise",
  "pricing.enterprise.description": "For large organizations",
  "pricing.enterprise.features": [
    "Unlimited properties",
    "Custom features",
    "24/7 support"
  ],
  "hero.title": "Property Management Simplified",
  "hero.description": "Streamline your property management with our comprehensive solution. From tenant management to maintenance tracking, we've got you covered.",
  "hero.getStarted": "Get Started",
  "hero.signIn": "Sign In"
};

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {}
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Record<string, string | string[]>>(defaultLanguage);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context;
} 