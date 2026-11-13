import { PageRoute } from '../data/courtifyData';
import { CourtifyAppIcon } from './CourtifyAppIcon';
import { CourtifyLogo } from './CourtifyLogo';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#172E1B] text-[#FCFFEB] border-t border-[#627F65]/40 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2.5 max-w-sm">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              aria-label="Courtify Home"
              className="inline-block bg-[#FCFFEB] px-3 py-1 rounded-xl cursor-pointer"
            >
              <CourtifyLogo size="footer" />
            </button>
            <p className="text-xs font-medium tracking-wide text-[#FCFFAD]">
              PLAY / CONNECT / REPEAT
            </p>
            <p className="text-sm text-[#FCFFEB]/80 leading-relaxed">
              More than a game. It&apos;s a lifestyle. Real gear, real players, real impact.
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-6 text-sm font-medium text-[#FCFFEB]/80"
          >
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-[#FCFFAD] transition-colors cursor-pointer whitespace-nowrap"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => onNavigate('book')}
              className="hover:text-[#FCFFAD] transition-colors cursor-pointer whitespace-nowrap"
            >
              Book Court
            </button>
            <button
              type="button"
              onClick={() => onNavigate('packages')}
              className="hover:text-[#FCFFAD] transition-colors cursor-pointer whitespace-nowrap"
            >
              Bundles &amp; Gear
            </button>
            <button
              type="button"
              onClick={() => onNavigate('app')}
              className="hover:text-[#FCFFAD] transition-colors cursor-pointer whitespace-nowrap"
            >
              Early Access
            </button>
          </nav>

          <div className="shrink-0">
            <CourtifyAppIcon variant="compact" />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#627F65]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A1CEA7]">
          <p>© {new Date().getFullYear()} Courtify. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>@courtify</span>
            <span aria-hidden="true">|</span>
            <span>courtify.com</span>
            <span aria-hidden="true">·</span>
            <span>Same Game. Bigger Possibilities.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
