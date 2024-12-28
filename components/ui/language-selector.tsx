'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/contexts/language-context';

const languages = [
  {
    name: 'English',
    code: 'en',
    label: 'EN',
    translations: {
      "nav.signin": "Sign In",
      "nav.signup": "Sign Up",
      // ... other English translations
    }
  },
  {
    name: 'Spanish',
    code: 'es',
    label: 'ES',
    translations: {
      "nav.signin": "Iniciar Sesión",
      "nav.signup": "Registrarse",
      // ... other Spanish translations
    }
  }
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { setLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setSelectedLanguage(lang);
    setLanguage(lang.translations);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm">{selectedLanguage.label}</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleLanguageChange(lang)}
              >
                {lang.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 