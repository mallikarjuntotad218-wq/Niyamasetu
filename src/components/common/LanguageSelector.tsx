import React, { useState, useRef, useEffect } from 'react';
import { Languages, Search, Check, ChevronDown, X } from 'lucide-react';
import {
  INDIAN_LANGUAGES,
  DEFAULT_LANGUAGE_CODE,
  IndianLanguage
} from '../../data/indianLanguages';

interface LanguageSelectorProps {
  onLanguageChange?: (language: IndianLanguage) => void;
  className?: string;
}

const STORAGE_KEY_LANGUAGE = 'notice_desk_language';

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onLanguageChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCode, setSelectedCode] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_LANGUAGE);
      if (stored && INDIAN_LANGUAGES.some((lang) => lang.code === stored)) {
        return stored;
      }
    } catch {
      // fallback
    }
    return DEFAULT_LANGUAGE_CODE;
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const currentLanguage =
    INDIAN_LANGUAGES.find((lang) => lang.code === selectedCode) || INDIAN_LANGUAGES[0];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const handleSelect = (lang: IndianLanguage) => {
    setSelectedCode(lang.code);
    try {
      localStorage.setItem(STORAGE_KEY_LANGUAGE, lang.code);
    } catch {
      // ignore
    }
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
    setIsOpen(false);
  };

  const filteredLanguages = INDIAN_LANGUAGES.filter((lang) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      lang.name.toLowerCase().includes(q) ||
      lang.nativeName.toLowerCase().includes(q) ||
      lang.code.toLowerCase().includes(q) ||
      lang.region.toLowerCase().includes(q) ||
      lang.script.toLowerCase().includes(q)
    );
  });

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select Indian Language"
        title={`Selected Language: ${currentLanguage.name} (${currentLanguage.nativeName})`}
        className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#238C88]/40 dark:focus:ring-[#65D5C5]/40 border ${
          isOpen
            ? 'bg-[#EAF5F0] dark:bg-[#1B3040] text-[#238C88] dark:text-[#65D5C5] border-[#238C88] dark:border-[#65D5C5] shadow-xs'
            : 'bg-white dark:bg-[#142332] hover:bg-[#EAF5F0] dark:hover:bg-[#1B3040] text-[#172C35] dark:text-[#ECF5F5] border-[#DCE9E5] dark:border-[#294251] shadow-xs'
        }`}
      >
        <Languages className="w-4 h-4 text-[#238C88] dark:text-[#65D5C5] shrink-0" />
        <span className="hidden sm:inline font-bold">{currentLanguage.nativeName}</span>
        <span className="sm:hidden font-mono uppercase text-[11px] font-bold">
          {currentLanguage.code.split('-')[0]}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#5F7279] dark:text-[#A6BBC3] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#238C88] dark:text-[#65D5C5]' : ''
          }`}
        />
      </button>

      {/* Searchable Dropdown Modal */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Indian Languages list"
          className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] bg-white dark:bg-[#142332] rounded-2xl shadow-2xl border border-[#DCE9E5] dark:border-[#294251] overflow-hidden z-40 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header & Search Bar */}
          <div className="p-3 bg-[#EAF5F0]/60 dark:bg-[#1B3040] border-b border-[#DCE9E5] dark:border-[#294251] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#172C35] dark:text-[#ECF5F5]">
              <span className="flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5 text-[#238C88] dark:text-[#65D5C5]" />
                Select Language (23 Languages)
              </span>
              <span className="text-[10px] font-mono font-semibold text-[#5F7279] dark:text-[#A6BBC3]">
                {filteredLanguages.length} / {INDIAN_LANGUAGES.length}
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#5F7279] dark:text-[#A6BBC3] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by English name, script, or state..."
                className="w-full pl-8 pr-7 py-1.5 text-xs rounded-xl border border-[#DCE9E5] dark:border-[#294251] bg-white dark:bg-[#0D1722] text-[#172C35] dark:text-[#ECF5F5] placeholder-[#5F7279] dark:placeholder-[#A6BBC3] focus:outline-none focus:ring-2 focus:ring-[#238C88]/30 dark:focus:ring-[#65D5C5]/30 focus:border-[#238C88] dark:focus:border-[#65D5C5]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Languages List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-[#DCE9E5]/50 dark:divide-[#294251]/60">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang) => {
                const isSelected = lang.code === selectedCode;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelect(lang)}
                    role="option"
                    aria-selected={isSelected}
                    className={`w-full p-2.5 px-3.5 text-left transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#EAF5F0] dark:bg-[#1B3040] text-[#238C88] dark:text-[#65D5C5]'
                        : 'hover:bg-[#EAF5F0]/60 dark:hover:bg-[#1B3040]/60 text-[#172C35] dark:text-[#ECF5F5]'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold truncate">{lang.name}</span>
                        <span className="text-xs font-medium text-[#238C88] dark:text-[#65D5C5] font-sans">
                          {lang.nativeName}
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-[10px] text-[#5F7279] dark:text-[#A6BBC3] truncate">
                        <span className="font-mono bg-slate-100 dark:bg-[#0D1722] px-1 py-0.2 rounded border border-[#DCE9E5]/60 dark:border-[#294251]/60 font-semibold">
                          {lang.code}
                        </span>
                        <span>·</span>
                        <span className="truncate">{lang.region}</span>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="p-1 rounded-full bg-[#238C88] dark:bg-[#65D5C5] text-white dark:text-[#0D1722] shrink-0">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="p-6 text-center text-xs text-[#5F7279] dark:text-[#A6BBC3]">
                No language found matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-2.5 bg-[#EAF5F0]/40 dark:bg-[#1B3040]/40 border-t border-[#DCE9E5] dark:border-[#294251] text-[10px] text-[#5F7279] dark:text-[#A6BBC3] flex items-center justify-between px-3.5">
            <span>22 Scheduled Languages + English</span>
            <span className="font-semibold text-[#238C88] dark:text-[#65D5C5]">Saved locally</span>
          </div>
        </div>
      )}
    </div>
  );
};
