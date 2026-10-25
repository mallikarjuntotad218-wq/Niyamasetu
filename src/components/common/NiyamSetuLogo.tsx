import React from 'react';

interface NiyamSetuLogoProps {
  variant?: 'full' | 'compact' | 'mark-only' | 'image';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

/**
 * Geometric "N" bridge emblem for NiyamSetu
 * Symbolizes the "Setu" (bridge) connecting citizens/businesses to legal clarity
 */
export const NiyamSetuMark: React.FC<{ size?: number; className?: string; onClick?: () => void }> = ({
  size = 32,
  className = '',
  onClick
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`shrink-0 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      aria-hidden={!onClick}
      aria-label={onClick ? 'NiyamSetu Logo' : undefined}
    >
      <defs>
        {/* Navy to dark blue for left pillar */}
        <linearGradient id="niyamNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B1C3D" />
          <stop offset="100%" stopColor="#122A5E" />
        </linearGradient>

        {/* Vivid electric blue for right pillar */}
        <linearGradient id="niyamBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>

        {/* Luminous cyan-blue curve for the bridge arch */}
        <linearGradient id="niyamArchGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="45%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>

        <linearGradient id="niyamSubtleHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Left Vertical Pillar of the "N" */}
      <path
        d="M16 12 C16 10 18 8 21 8 H34 C36 8 38 10 38 13 V78 C38 84 32 88 26 88 H21 C18 88 16 86 16 83 V12 Z"
        fill="url(#niyamNavyGrad)"
      />

      {/* Right Vertical Pillar of the "N" */}
      <path
        d="M62 20 C62 17 64 15 67 15 H80 C83 15 85 17 85 20 V84 C85 87 83 89 80 89 H67 C64 89 62 87 62 84 V20 Z"
        fill="url(#niyamBlueGrad)"
      />

      {/* The Setu (Arch Bridge) sweeping dynamically across the pillars */}
      <path
        d="M16 76 C24 52 48 38 72 48 L85 54 C72 74 46 88 24 88 C19 88 16 84 16 76 Z"
        fill="url(#niyamArchGrad)"
      />

      {/* Bridge Arch Highlight Ribbon */}
      <path
        d="M16 70 C28 50 52 38 85 52 C72 44 42 42 16 70 Z"
        fill="url(#niyamSubtleHighlight)"
      />
    </svg>
  );
};

export const NiyamSetuLogo: React.FC<NiyamSetuLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  onClick
}) => {
  const isClickable = Boolean(onClick);

  // Size configurations
  const markSizes = {
    sm: 26,
    md: 34,
    lg: 42
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const subtitleSizes = {
    sm: 'text-[10px]',
    md: 'text-[11px]',
    lg: 'text-xs'
  };

  // If using the official image asset
  if (variant === 'image') {
    return (
      <div
        onClick={onClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={(e) => {
          if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
          }
        }}
        className={`inline-flex items-center gap-2.5 transition-transform duration-150 ${
          isClickable ? 'cursor-pointer hover:opacity-95 active:scale-[0.99]' : ''
        } ${className}`}
        aria-label="NiyamSetu - Legal notices. Made clear."
      >
        <div className="relative flex items-center p-1 rounded-xl bg-white/95 dark:bg-[#1B3040]/80 border border-slate-200/80 dark:border-[#294251] shadow-2xs">
          <img
            src="/assets/aistudio/image_2c157827.png"
            alt="NiyamSetu Logo"
            className="h-8 md:h-9 w-auto object-contain select-none"
            loading="eager"
          />
        </div>
      </div>
    );
  }

  // Mark-only variant (ideal for collapsed sidebar or compact icons)
  if (variant === 'mark-only') {
    return (
      <div
        onClick={onClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={(e) => {
          if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
          }
        }}
        className={`inline-flex items-center justify-center p-1.5 rounded-xl bg-white/90 dark:bg-[#1B3040] border border-[#DCE9E5] dark:border-[#294251] shadow-2xs transition-all ${
          isClickable ? 'cursor-pointer hover:border-[#238C88] dark:hover:border-[#65D5C5] active:scale-95' : ''
        } ${className}`}
        title="NiyamSetu — Overview"
        aria-label="NiyamSetu Logo"
      >
        <NiyamSetuMark size={markSizes[size]} />
      </div>
    );
  }

  // Compact variant (mark + "NiyamSetu" on one line, no subtitle)
  if (variant === 'compact') {
    return (
      <div
        onClick={onClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={(e) => {
          if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
          }
        }}
        className={`inline-flex items-center gap-2 select-none transition-all ${
          isClickable ? 'cursor-pointer group' : ''
        } ${className}`}
        aria-label="NiyamSetu"
      >
        <div className="p-1 rounded-lg bg-white/90 dark:bg-[#1B3040] border border-[#DCE9E5] dark:border-[#294251] shadow-2xs group-hover:border-[#238C88] dark:group-hover:border-[#65D5C5] transition-colors">
          <NiyamSetuMark size={markSizes[size]} />
        </div>
        <div className="flex items-baseline font-bold tracking-tight">
          <span className="text-[#0B1B3D] dark:text-[#ECF5F5] font-extrabold">Niyam</span>
          <span className="text-[#1D63FF] dark:text-[#65D5C5] font-black">Setu</span>
        </div>
      </div>
    );
  }

  // Full variant: Mark + stylized wordmark + "Legal notices. Made clear." tagline
  return (
    <div
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`inline-flex items-center gap-3 select-none transition-all ${
        isClickable ? 'cursor-pointer group' : ''
      } ${className}`}
      aria-label="NiyamSetu - Legal notices. Made clear."
    >
      <div className="p-1.5 rounded-xl bg-white/95 dark:bg-[#1B3040] border border-[#DCE9E5] dark:border-[#294251] shadow-2xs group-hover:border-[#238C88] dark:group-hover:border-[#65D5C5] group-hover:shadow-xs transition-all shrink-0">
        <NiyamSetuMark size={markSizes[size]} />
      </div>
      <div className="min-w-0 text-left">
        <div className={`font-extrabold tracking-tight leading-none ${titleSizes[size]} flex items-baseline`}>
          <span className="text-[#0B1B3D] dark:text-[#ECF5F5]">Niyam</span>
          <span className="text-[#1D63FF] dark:text-[#65D5C5] ml-0.5 font-black">Setu</span>
        </div>
        <p className={`mt-1 font-medium text-[#5F7279] dark:text-[#A6BBC3] tracking-normal leading-none truncate ${subtitleSizes[size]}`}>
          Legal notices. Made clear.
        </p>
      </div>
    </div>
  );
};
