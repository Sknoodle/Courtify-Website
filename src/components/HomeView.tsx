import { useState } from 'react';
import { ArrowRight, Calendar, Check, Clock, MapPin } from 'lucide-react';
import {
  COURTIFY_PILLARS,
  COURT_PACKAGES,
  HERO_IMAGE,
  PageRoute,
  getUpcomingDates,
} from '../data/courtifyData';
import { ResilientImage } from './ResilientImage';
import { CourtifyAppIcon } from './CourtifyAppIcon';

interface HomeViewProps {
  onNavigate: (page: PageRoute) => void;
  onQuickSearch: (city: string, date: string, windowPeriod: string) => void;
  onSelectPackage: (packageId: string) => void;
}

export function HomeView({ onNavigate, onQuickSearch, onSelectPackage }: HomeViewProps) {
  const dates = getUpcomingDates(7);
  const [city, setCity] = useState<string>('Toronto');
  const [selectedDate, setSelectedDate] = useState<string>(dates[0].iso);
  const [timeWindow, setTimeWindow] = useState<string>('Evening');

  const handleQuickFind = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickSearch(city, selectedDate, timeWindow);
  };

  return (
    <div className="space-y-20">
      {/* Hero Section + Full-Width Quick-Booking Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Proposition from Courtify Flyer */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2 space-y-8">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#627F65]">
                <span>Play</span>
                <span aria-hidden="true">/</span>
                <span>Connect</span>
                <span aria-hidden="true">/</span>
                <span>Repeat</span>
              </div>

              <h1
                className="font-display font-extrabold tracking-tight text-[#172E1B] text-balance leading-[1.06]"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.35rem)' }}
              >
                Premium pickleball gear for every court.
              </h1>

              <p className="text-base sm:text-lg text-[#172819]/80 leading-relaxed max-w-xl">
                Whether you&apos;re just getting started or chasing your next match, Courtify brings
                you high-quality gear designed for performance, durability, and style—plus instant
                court reservations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('book')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#627F65]"
              >
                <span>Book a Court</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('packages')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#172E1B] hover:text-[#627F65] transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Explore 4 Court Bundles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Full-bleed Architectural Court Photo */}
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
                  Set up in minutes · Play anywhere · Open daily 07:00–21:30
                </p>
              </div>
              <span className="font-mono text-xs tabular-nums text-[#FCFFEB] bg-[#172E1B]/85 border border-[#A1CEA7]/40 px-3 py-1.5 rounded-md whitespace-nowrap self-start sm:self-auto">
                20 × 44 ft Regulation
              </span>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quick-Booking Strip */}
        <form
          onSubmit={handleQuickFind}
          aria-label="Quick court finder"
          className="mt-8 bg-white border border-[#A1CEA7]/70 rounded-xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
        >
          <div className="space-y-1.5">
            <label
              htmlFor="quick-city"
              className="flex items-center gap-1.5 text-xs font-medium text-[#627F65]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#627F65]" />
              <span>City Hub</span>
            </label>
            <select
              id="quick-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-[#A1CEA7]/70 bg-[#FCFFEB] text-sm font-medium text-[#172E1B] focus:outline-none focus:border-[#627F65]"
            >
              <option value="Toronto">Toronto, ON</option>
              <option value="Vancouver">Vancouver, BC</option>
              <option value="Calgary">Calgary, AB</option>
              <option value="Montreal">Montreal, QC</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="quick-date"
              className="flex items-center gap-1.5 text-xs font-medium text-[#627F65]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#627F65]" />
              <span>Play Date</span>
            </label>
            <select
              id="quick-date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-[#A1CEA7]/70 bg-[#FCFFEB] text-sm font-medium text-[#172E1B] focus:outline-none focus:border-[#627F65]"
            >
              {dates.map((d) => (
                <option key={d.iso} value={d.iso}>
                  {d.shortDay} — {d.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="quick-window"
              className="flex items-center gap-1.5 text-xs font-medium text-[#627F65]"
            >
              <Clock className="w-3.5 h-3.5 text-[#627F65]" />
              <span>Preferred Window</span>
            </label>
            <select
              id="quick-window"
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-[#A1CEA7]/70 bg-[#FCFFEB] text-sm font-medium text-[#172E1B] focus:outline-none focus:border-[#627F65]"
            >
              <option value="All">Any Time (07:00–21:00)</option>
              <option value="Morning">Morning (07:00–11:30)</option>
              <option value="Midday">Midday (12:00–16:00)</option>
              <option value="Evening">Evening (16:30–21:00)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full h-11 px-5 text-sm font-semibold text-[#FCFFEB] bg-[#627F65] hover:bg-[#172E1B] rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#627F65]"
          >
            <span>Find Open Courts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
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
              Courtify is for the ones who show up — for the games, the friends, and the moments
              that make it all worth it.
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
                <div className="text-xs text-[#627F65] mt-1">Beginner paddles ready to play</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-semibold text-[#172E1B] tabular-nums">
                  10–15m
                </div>
                <div className="text-xs text-[#627F65] mt-1">Portable net setup anywhere</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-semibold text-[#172E1B] tabular-nums">
                  18 courts
                </div>
                <div className="text-xs text-[#627F65] mt-1">Bookable across 4 metro hubs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Courtify Bundles Preview (4 Tiers: Standard -> Premier) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold text-[#627F65] mb-1.5">
              Gear Up &amp; Save · Temporary Example Imagery
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#172E1B]">
              The Courtify Bundles — More gear. More games. More value.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('packages')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#172E1B] hover:text-[#627F65] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Shop bundles &amp; individual lineup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURT_PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className="group bg-white border border-[#A1CEA7]/70 rounded-xl overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="aspect-[4/3] bg-[#FCFFEB] overflow-hidden">
                <ResilientImage
                  src={pkg.image}
                  alt={`${pkg.tierName} package — ${pkg.name}`}
                  fallbackTitle={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#627F65]">
                    <span className="font-medium">
                      {pkg.tierNumber} · {pkg.tierName}
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
                      ${pkg.priceCad.toLocaleString()}
                    </span>
                    {pkg.retailValueCad && (
                      <span className="block font-mono text-[11px] text-[#627F65] line-through tabular-nums">
                        Retail ${pkg.retailValueCad.toLocaleString()}
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

      {/* Courtify App Early Access Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#172E1B] rounded-2xl p-8 sm:p-12 text-[#FCFFEB] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-semibold text-[#FCFFAD]">
              Real Gear. Real Players. Real Impact.
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-balance">
              Book courts, find open rallies, and track your Courtify gear in one app.
            </h2>
            <ul className="space-y-2 text-sm text-[#FCFFEB]/85 pt-1">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FCFFAD] shrink-0" />
                <span>Live court availability alerts across Toronto, Vancouver, Calgary, and Montreal</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FCFFAD] shrink-0" />
                <span>QR gate entry and one-tap split billing for your doubles group</span>
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
              Join Early Access
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
