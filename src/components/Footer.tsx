import { PageRoute } from '../data/courtifyData';
import { CourtifyAppIcon } from './CourtifyAppIcon';
import { CourtifyLogo } from './CourtifyLogo';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#F4F9E6] text-[#172E1B] border-t border-[#A1CEA7]/70 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-sm">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              aria-label="Courtify Home"
              className="inline-flex items-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#627F65] rounded"
            >
              <CourtifyLogo size="footer" />
            </button>
            <p className="text-xs font-semibold tracking-wide text-[#627F65]">
              PLAY / CONNECT / REPEAT
            </p>
            <p className="text-sm text-[#172819]/80 leading-relaxed">
              More than a game. It&apos;s a lifestyle. Find open courts across Orange County or set
              up your own anywhere.
            </p>
          </div>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-6 text-sm font-medium text-[#172819]/80"
          >
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-[#172E1B] hover:underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => onNavigate('finder')}
              className="hover:text-[#172E1B] hover:underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap"
            >
              Find Courts
            </button>
            <button
              type="button"
              onClick={() => onNavigate('packages')}
              className="hover:text-[#172E1B] hover:underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap"
            >
              Bundles &amp; Gear
            </button>
            <button
              type="button"
              onClick={() => onNavigate('app')}
              className="hover:text-[#172E1B] hover:underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap"
            >
              Early Access
            </button>
          </nav>

          <div className="shrink-0">
            <CourtifyAppIcon variant="compact" />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#A1CEA7]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#627F65]">
          <p>© {new Date().getFullYear()} Courtify · Orange County, CA</p>
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
