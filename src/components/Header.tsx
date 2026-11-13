import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageRoute } from '../data/courtifyData';
import { CourtifyLogo } from './CourtifyLogo';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onQuickBook: () => void;
}

const NAV_ITEMS: { id: PageRoute; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'book', label: 'Book Court' },
  { id: 'packages', label: 'Packages' },
  { id: 'app', label: 'Get the App' },
];

export function Header({ currentPage, onNavigate, onQuickBook }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FCFFEB]/95 backdrop-blur-sm border-b border-[#A1CEA7]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Official Courtify SVG Logo */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          aria-label="Courtify Home"
          className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#627F65] rounded cursor-pointer"
        >
          <CourtifyLogo size="header" />
        </button>

        {/* Zone 2: 4 clean single-line text nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#172819]/75"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#627F65] rounded ${
                  isActive
                    ? 'text-[#172E1B] font-semibold'
                    : 'text-[#172819]/75 hover:text-[#172E1B]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-[#627F65] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action (plus mobile menu button on small viewports) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onQuickBook();
            }}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#627F65]"
          >
            Quick Book
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#172E1B] hover:bg-[#A1CEA7]/25 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Sheet */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#A1CEA7]/50 bg-[#FCFFEB] px-4 py-4 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#A1CEA7]/30 text-[#172E1B] font-semibold'
                    : 'text-[#172819]/80 hover:bg-[#A1CEA7]/15'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#A1CEA7]/40">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onQuickBook();
              }}
              className="w-full py-2.5 px-4 text-sm font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors cursor-pointer"
            >
              Quick Book
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
