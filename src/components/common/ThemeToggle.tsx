import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  showLabel = false,
  className = ''
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode (Current: ${isDark ? 'Dark Mode' : 'Light Mode'})`}
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#238C88]/40 dark:focus:ring-[#65D5C5]/40 ${
        isDark
          ? 'bg-[#142332] hover:bg-[#1B3040] text-[#65D5C5] border border-[#294251] shadow-xs'
          : 'bg-white hover:bg-[#EAF5F0] text-[#238C88] border border-[#DCE9E5] shadow-xs'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100 text-[#65D5C5]" />
        ) : (
          <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100 text-[#238C88]" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-semibold select-none">
          {isDark ? 'Night Theme' : 'Day Theme'}
        </span>
      )}
    </button>
  );
};
