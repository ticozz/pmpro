'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/lib/i18n/translations';
import { languages, type Language } from '@/lib/i18n/languages';

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string | readonly string[]>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  useEffect(() => {
    // Load saved language preference
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      setCurrentLanguage(JSON.parse(savedLang));
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', JSON.stringify(lang));
    document.documentElement.lang = lang.code;
  };

  const getTranslations = (langCode: string) => {
    return {
      ...translations.en, // Use English as fallback
      ...(translations[langCode as keyof typeof translations] || {})
    };
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        currentLanguage, 
        setLanguage,
        translations: getTranslations(currentLanguage.code)
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 