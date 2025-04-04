import React, { useState, useRef, useEffect } from 'react';
import { Globe2 } from 'lucide-react';
import { LANGUAGES } from '../config/languages';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (code: string) => void;
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center space-x-2"
      >
        <Globe2 className="h-5 w-5" />
        <span className="hidden sm:inline">{LANGUAGES[selectedLanguage].name}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black/40 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg overflow-hidden z-50">
          {Object.entries(LANGUAGES).map(([code, lang]) => (
            <button
              key={code}
              onClick={() => {
                onLanguageChange(code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-white/20 transition-colors flex items-center space-x-2 text-sm ${
                selectedLanguage === code ? 'bg-blue-500/30' : ''
              }`}
            >
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}