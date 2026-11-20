import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Check, ExternalLink, Search } from 'lucide-react';
import {
  COURTIFY_APP_URL,
  COURTIFY_PILLARS,
  COURT_PACKAGES,
  CULDESAC_BANNER_IMAGE,
  HERO_IMAGE,
  PageRoute,
} from '../data/courtifyData';
import { ResilientImage } from './ResilientImage';
import { CourtifyAppIcon } from './CourtifyAppIcon';
import { CourtifyLogo } from './CourtifyLogo';

interface HomeViewProps {
  onNavigate: (page: PageRoute) => void;
  onSearchPackages: (query: string) => void;
  onSelectPackage: (packageId: string) => void;
}

export function HomeView({ onNavigate, onSearchPackages, onSelectPackage }: HomeViewProps) {
  const [quickSearch, setQuickSearch] = useState<string>('');

  const bannerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '26%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.18]);
  const overlayY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchPackages(quickSearch.trim());
  };

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Top Scrolling Parallax Banner: Cul-de-Sac Portable Court */}
      <div
        ref={bannerRef}
        className="relative w-full h-[420px] sm:h-[520px] overflow-hidden border-b border-[#A1CEA7]/70 bg-[#172E1B]"
      >
        <motion.div
          style={{ y: bgY, scale: bgScale }}
          className="absolute inset-0 -top-12 -bottom-12 will-change-transform"
        >
          <ResilientImage
            src={CULDESAC_BANNER_IMAGE}
            alt="Friends playing pickleball on a portable court in the middle of a sunny cul-de-sac"
            fallbackTitle="Portable Court in a Cul-de-Sac"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#FCFFEB]/55 via-transparent via-40% to-[#172E1B]/85"
        />

        <motion.div
          style={{ y: overlayY, opacity: overlayOpacity }}
          className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col justify-between items-center text-center"
        >
          {/* Top of Banner: Unboxed Primary Courtify Logo */}
          <div className="pt-1">
            <CourtifyLogo
              size="hero"
              className="drop-shadow-[0_2px_12px_rgba(252,255,235,0.9)]"
            />
          </div>

          {/* Bottom of Banner: PICKLEBALL IS POSSIBLE ANYWHERE. */}
          <div className="space-y-2 max-w-3xl">
            <p className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FCFFEB] drop-shadow-sm">
              PICKLEBALL IS POSSIBLE ANYWHERE.
            </p>
            <p className="text-xs sm:text-sm font-medium text-[#FCFFAD]">
              Driveways · Cul-de-Sacs · Parking Lots · Public Parks Across the U.S.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Proposition */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2 space-y-8">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#627F65]">
                <span>Play</span>
                <span aria-hidden="true">/</span>
                <span>Connect</span>
                <span aria-hidden="true">/</span>
                <span>Repeat</span>
                <span aria-hidden="true">·</span>
                <span>United States</span>
              </div>

              <h1
                className="font-display font-extrabold tracking-tight text-[#172E1B] text-balance leading-[1.06]"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.35rem)' }}
              >
                Pickleball is possible anywhere.
              </h1>

              <p className="text-base sm:text-lg text-[#172819]/80 leading-relaxed max-w-xl">
                Check live court availability across the U.S. in the Courtify app. If every nearby
                park is packed, turn your driveway, cul-de-sac, or parking lot into a court in
                minutes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('packages')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#627F65]"
              >
                <span>Shop Portable Bundles</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#172E1B] hover:text-[#627F65] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>About Courtify</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Court Photo */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-[#A1CEA7]/70 min-h-[280px] sm:min-h-[380px]">
            <ResilientImage
              src={HERO_IMAGE}
              alt="Courtify outdoor pickleball court"
              fallbackTitle="Courtify Pickleball Court"
              className="w-full h-full lg:h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#172E1B]/90 via-[#172E1B]/45 to-transparent p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="text-[#FCFFEB]">
                <p className="text-xs font-semibold text-[#FCFFAD]">
                  Better Gear. Bigger Rallies.
                </p>
                <p className="text-sm sm:text-base font-medium text-[#FCFFEB]/95 mt-0.5">
                  Driveways · Cul-de-sacs · Parking lots · Community parks
                </p>
              </div>
              <span className="font-mono text-xs tabular-nums text-[#FCFFEB] bg-[#172E1B]/85 border border-[#A1CEA7]/40 px-3 py-1.5 rounded-md whitespace-nowrap self-start sm:self-auto">
                Sets Up in Minutes
              </span>
            </div>
          </div>
        </div>

        {/* Full-Width Quick Gear Search & Live App Bar */}
        <form
          onSubmit={handleSearchSubmit}
          aria-label="Search Courtify gear or open the court-finder app"
          className="mt-8 bg-white border border-[#A1CEA7]/70 rounded-xl p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
        >
          <div className="md:col-span-6 space-y-1.5">
            <label
              htmlFor="home-gear-search"
              className="flex items-center gap-1.5 text-xs font-medium text-[#627F65]"
            >
              <Search className="w-3.5 h-3.5 text-[#627F65]" />
              <span>Find Portable Courts, Paddles, Nets, or Balls</span>
            </label>
            <input
              id="home-gear-search"
              type="search"
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              placeholder="Search Starter Collection, Backyard Bundle, Advanced Paddle..."
              className="w-full h-11 px-3 rounded-lg border border-[#A1CEA7]/70 bg-[#FCFFEB] text-sm font-medium text-[#172E1B] placeholder:text-[#627F65]/70 focus:outline-none focus:border-[#627F65]"
            />
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full h-11 px-5 text-sm font-semibold text-[#FCFFEB] bg-[#627F65] hover:bg-[#172E1B] rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#627F65]"
            >
              <span>Search Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="md:col-span-3">
            <a
              href={COURTIFY_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 px-4 text-sm font-semibold text-[#172E1B] bg-[#FCFFEB] border border-[#A1CEA7] hover:border-[#172E1B] rounded-lg transition-colors whitespace-nowrap flex items-center justify-center gap-2"
            >
              <span>Open App Locator</span>
              <ExternalLink className="w-4 h-4 text-[#627F65]" />
            </a>
          </div>
        </form>
      </section>

      {/* Core Pillars from Courtify Flyer + Adjacent Proof Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-[#A1CEA7]/60 pt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-3">
            <p className="text-xs font-semibold text-[#627F65]">Same Game. Bigger Possibilities.</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#172E1B] text-balance">
              More than a game. It&apos;s a lifestyle.
            </h2>
            <p className="text-sm sm:text-base text-[#172819]/75 leading-relaxed">
              Whether you&apos;re locating an open park court on the app or laying down lines in
              your own driveway, Courtify brings premium pickleball gear anywhere you play.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {COURTIFY_PILLARS.map((pillar) => (
                <div key={pillar.number} className="space-y-2">
                  <h3 className="font-display text-base font-bold text-[#172E1B]">
                    {pillar.number}. {pillar.title}
                  </h3>
                  <p className="text-sm text-[#172819]/75 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>

            {/* Quantified Lineup & Pricing Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#A1CEA7]/50">
              <div>
                <div className="font-mono text-2xl font-semibold text-[#172E1B] tabular-nums">
                  $350
                </div>
                <div className="text-xs text-[#627F65] mt-1">Starter Collection ($529.96 value)</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-semibold text-[#172E1B] tabular-nums">
                  $39.99
                </div>
                <div className="text-xs text-[#627F65] mt-1">Standard paddles ready to play</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-semibold text-[#172E1B] tabular-nums">
                  10–15m
                </div>
                <div className="text-xs text-[#627F65] mt-1">Set up in any driveway or lot</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-semibold text-[#172E1B] tabular-nums">
                  U.S.-Wide
                </div>
                <div className="text-xs text-[#627F65] mt-1">Open courts or play anywhere</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Courtify Portable Court Bundles Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#627F65] mb-1.5">
              Play Anywhere · Complete Portable Bundles
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#172E1B]">
              No open court nearby? Bring the court to you.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('packages')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#172E1B] hover:text-[#627F65] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Shop all packages &amp; gear</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURT_PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className="group bg-white border border-[#A1CEA7]/70 rounded-xl overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="aspect-[4/3] bg-white border-b border-[#A1CEA7]/40 overflow-hidden">
                <ResilientImage
                  src={pkg.image}
                  alt={`${pkg.tierName} package — ${pkg.name}`}
                  fallbackTitle={pkg.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#627F65]">
                    <span className="font-medium">
                      {pkg.sku} · {pkg.tierName}
                    </span>
                    <span className="font-mono tabular-nums">{pkg.paddleSpec}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-[#172E1B]">{pkg.name}</h3>
                  <p className="text-sm text-[#172819]/75 leading-snug line-clamp-2">
                    {pkg.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#A1CEA7]/40 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-sm font-bold text-[#172E1B] tabular-nums">
                      ${pkg.priceUsd.toLocaleString()}
                    </span>
                    {pkg.retailValueUsd && (
                      <span className="block font-mono text-[11px] text-[#627F65] line-through tabular-nums">
                        Retail ${pkg.retailValueUsd.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg.id)}
                    className="text-xs font-semibold text-[#627F65] hover:text-[#172E1B] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    View bundle →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Courtify App Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#172E1B] rounded-2xl p-8 sm:p-12 text-[#FCFFEB] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-semibold text-[#FCFFAD]">
              Real Gear. Real Players. Real Impact.
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-balance">
              Find open courts nationwide in real time with the Courtify app.
            </h2>
            <ul className="space-y-2 text-sm text-[#FCFFEB]/85 pt-1">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FCFFAD] shrink-0" />
                <span>
                  Check live open-court availability across parks and recreation centers throughout the U.S.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FCFFAD] shrink-0" />
                <span>
                  Share your own pop-up driveway, cul-de-sac, or parking-lot game when local parks
                  are full
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-end justify-end gap-4">
            <CourtifyAppIcon variant="card" />
            <button
              type="button"
              onClick={() => onNavigate('app')}
              className="px-5 py-3.5 text-sm font-semibold text-[#172E1B] bg-[#FCFFAD] hover:bg-[#FCFFEB] rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Explore the App
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
