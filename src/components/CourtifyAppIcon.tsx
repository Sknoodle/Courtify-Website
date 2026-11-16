import { ExternalLink } from 'lucide-react';
import { COURTIFY_APP_ICON_IMAGE, COURTIFY_APP_URL } from '../data/courtifyData';

interface CourtifyAppIconProps {
  variant?: 'card' | 'compact' | 'inline';
  className?: string;
}

/**
 * Uses the user's uploaded Courtify App Icon (/assets/aistudio/Courtify_App_Icon_905f34d4.png)
 * linking directly to https://courtifyca.ai.studio.
 */
export function CourtifyAppIcon({ variant = 'card', className = '' }: CourtifyAppIconProps) {
  const appIconImg = (
    <div
      className={`rounded-xl overflow-hidden border border-[#A1CEA7]/70 bg-[#0A381D] shrink-0 ${
        variant === 'compact' ? 'w-8 h-8' : 'w-12 h-12'
      }`}
    >
      <img
        src={COURTIFY_APP_ICON_IMAGE}
        alt="Courtify App Icon"
        className="w-full h-full object-cover"
      />
    </div>
  );

  if (variant === 'compact') {
    return (
      <a
        href={COURTIFY_APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Open Courtify App (courtifyca.ai.studio)"
        aria-label="Open Courtify App at courtifyca.ai.studio"
        className={`inline-flex items-center gap-2.5 rounded-xl border border-[#A1CEA7]/60 bg-[#FCFFEB] px-3 py-1.5 text-xs font-semibold text-[#172E1B] hover:border-[#FCFFAD] hover:bg-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FCFFAD] whitespace-nowrap shrink-0 ${className}`}
      >
        {appIconImg}
        <span>Open Courtify App</span>
        <ExternalLink className="w-3.5 h-3.5 text-[#627F65]" />
      </a>
    );
  }

  if (variant === 'inline') {
    return (
      <a
        href={COURTIFY_APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Launch Courtify App at courtifyca.ai.studio"
        className={`inline-flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#627F65] rounded-lg ${className}`}
      >
        {appIconImg}
        <span className="text-sm font-semibold text-[#172E1B] group-hover:text-[#627F65] transition-colors flex items-center gap-1.5 whitespace-nowrap">
          Launch Web App
          <ExternalLink className="w-3.5 h-3.5 text-[#627F65]" />
        </span>
      </a>
    );
  }

  return (
    <a
      href={COURTIFY_APP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open the live Courtify App at courtifyca.ai.studio"
      className={`group inline-flex items-center gap-3.5 rounded-xl border border-[#A1CEA7] bg-white px-4 py-3 hover:border-[#627F65] hover:shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#627F65] ${className}`}
    >
      {appIconImg}
      <div className="min-w-0 text-left">
        <div className="text-sm font-semibold text-[#172E1B] group-hover:text-[#627F65] transition-colors flex items-center gap-1.5">
          <span>Courtify App</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#627F65] shrink-0" />
        </div>
        <div className="text-xs font-mono text-[#627F65] truncate">courtifyca.ai.studio</div>
      </div>
    </a>
  );
}
