import { useMemo, useState } from 'react';
import { ArrowRight, ExternalLink, MapPin, RefreshCw, Sun } from 'lucide-react';
import {
  COURTIFY_APP_URL,
  LiveCourtLocation,
  PageRoute,
} from '../data/courtifyData';
import { OrangeCountyHeatMap } from './OrangeCountyHeatMap';

interface CourtFinderViewProps {
  initialCity?: string;
  initialFilter?: 'All' | 'Open Now';
  courts: LiveCourtLocation[];
  lastSyncedLabel: string;
  onSyncNow: () => void;
  onReportCheckIn: (courtId: string, delta: number) => void;
  onNavigate: (page: PageRoute) => void;
}

const OC_CITIES = [
  'All OC',
  'Irvine',
  'Newport Beach',
  'Huntington Beach',
  'Costa Mesa',
  'Laguna Niguel',
] as const;

export function CourtFinderView({
  initialCity = 'All OC',
  initialFilter = 'All',
  courts,
  lastSyncedLabel,
  onSyncNow,
  onReportCheckIn,
  onNavigate,
}: CourtFinderViewProps) {
  const [selectedCity, setSelectedCity] = useState<string>(
    OC_CITIES.includes(initialCity as (typeof OC_CITIES)[number]) ? initialCity : 'All OC'
  );
  const [onlyOpenNow, setOnlyOpenNow] = useState<boolean>(initialFilter === 'Open Now');
  const [litOnly, setLitOnly] = useState<boolean>(false);
  const [reportedIds, setReportedIds] = useState<Record<string, boolean>>({});

  const filteredLocations = useMemo(() => {
    return courts.filter((loc) => {
      if (selectedCity !== 'All OC' && loc.city !== selectedCity) return false;
      if (onlyOpenNow && loc.availability !== 'Open Now') return false;
      if (litOnly && loc.lighting !== 'Lit Until 10 PM') return false;
      return true;
    });
  }, [courts, selectedCity, onlyOpenNow, litOnly]);

  const totalOpenCourts = useMemo(
    () => filteredLocations.reduce((sum, loc) => sum + loc.openCourts, 0),
    [filteredLocations]
  );

  const totalParkCourts = useMemo(
    () => filteredLocations.reduce((sum, loc) => sum + loc.totalCourts, 0),
    [filteredLocations]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#A1CEA7]/60 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-semibold text-[#627F65]">
            Orange County, California · Synced Live Availability (Pacific Time)
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172E1B] text-balance">
            Live Orange County court availability.
          </h1>
          <p className="text-sm sm:text-base text-[#172819]/80 leading-relaxed">
            Real-time court counts synced to Orange County park hours, dusk lighting schedules, and
            live player check-ins. No courts open nearby? Set up a portable court in your driveway,
            cul-de-sac, or parking lot.
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
          <div className="font-mono text-lg font-bold text-[#172E1B] tabular-nums">
            {totalOpenCourts} / {totalParkCourts} courts open
          </div>
          <div className="flex items-center gap-3 text-xs text-[#627F65]">
            <span className="font-mono tabular-nums">Synced {lastSyncedLabel}</span>
            <button
              type="button"
              onClick={onSyncNow}
              className="inline-flex items-center gap-1 font-semibold text-[#172E1B] hover:text-[#627F65] cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Sync Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* D3 Orange County Court Density Heat Map */}
      <OrangeCountyHeatMap
        courts={courts}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
      />

      {/* Filters Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Filter Orange County locations by city"
          className="flex flex-wrap items-center gap-1 p-1 bg-[#A1CEA7]/25 rounded-lg"
        >
          {OC_CITIES.map((city) => {
            const active = selectedCity === city;
            return (
              <button
                key={city}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCity(city)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-white text-[#172E1B] shadow-sm'
                    : 'text-[#172819]/75 hover:text-[#172E1B]'
                }`}
              >
                {city}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setOnlyOpenNow((prev) => !prev)}
            aria-pressed={onlyOpenNow}
            className={`h-10 px-3.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              onlyOpenNow
                ? 'border-[#172E1B] bg-[#172E1B] text-[#FCFFEB]'
                : 'border-[#A1CEA7]/80 bg-white text-[#172819]/80 hover:border-[#627F65]'
            }`}
          >
            Open Courts Only
          </button>

          <button
            type="button"
            onClick={() => setLitOnly((prev) => !prev)}
            aria-pressed={litOnly}
            className={`h-10 px-3.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              litOnly
                ? 'border-[#172E1B] bg-[#A1CEA7]/30 text-[#172E1B]'
                : 'border-[#A1CEA7]/80 bg-white text-[#172819]/80 hover:border-[#627F65]'
            }`}
          >
            Lit Until 10 PM
          </button>
        </div>
      </div>

      {/* Main Split: OC Court Locations (Left 7 cols) + Portable Anywhere Fallback Card (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          {filteredLocations.length === 0 ? (
            <div className="bg-white border border-[#A1CEA7]/70 rounded-xl p-8 text-center space-y-3">
              <p className="font-display text-lg font-bold text-[#172E1B]">
                No open courts match those filters right now.
              </p>
              <p className="text-sm text-[#627F65] max-w-md mx-auto">
                That&apos;s why Courtify builds portable courts—set up in minutes on a driveway,
                cul-de-sac, or open lot instead of waiting.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('packages')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors cursor-pointer"
              >
                <span>View Portable Court Packages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            filteredLocations.map((loc) => {
              const statusStyle =
                loc.availability === 'Open Now'
                  ? 'text-[#172E1B] bg-[#A1CEA7]/35 border-[#77AD78]'
                  : loc.availability === 'Waitlist'
                    ? 'text-[#172E1B] bg-[#FCFFAD] border-[#627F65]/40'
                    : loc.availability === 'Full'
                      ? 'text-[#172E1B] bg-[#FCFFEB] border-[#627F65]'
                      : 'text-[#627F65] bg-[#FCFFEB] border-[#A1CEA7]/50';

              const isClosed = loc.availability === 'Closed';
              const alreadyReported = reportedIds[loc.id];

              return (
                <article
                  key={loc.id}
                  className="bg-white border border-[#A1CEA7]/70 rounded-xl p-5 sm:p-6 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#627F65]">
                        <span className="font-semibold text-[#172E1B]">{loc.city}, CA</span>
                        <span aria-hidden="true">·</span>
                        <span>{loc.courtBreakdown}</span>
                        <span aria-hidden="true">·</span>
                        <span>{loc.hoursLabel}</span>
                      </div>
                      <h2 className="font-display text-lg font-bold text-[#172E1B]">{loc.name}</h2>
                      <p className="text-xs text-[#627F65] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{loc.address}</span>
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end gap-1.5 shrink-0">
                      <span
                        className={`px-2.5 py-1 rounded-md border text-xs font-semibold whitespace-nowrap ${statusStyle}`}
                      >
                        {isClosed
                          ? loc.lighting === 'Daylight Only'
                            ? 'Closed (Dusk)'
                            : 'Closed Now'
                          : loc.availability}
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#172E1B] tabular-nums">
                        {isClosed
                          ? `${loc.totalCourts} courts · Reopens AM`
                          : `${loc.openCourts} / ${loc.totalCourts} courts open`}
                      </span>
                      {!isClosed && loc.waitMins > 0 && (
                        <span className="font-mono text-[11px] text-[#627F65] tabular-nums">
                          ~{loc.waitMins} min paddle wait
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-[#A1CEA7]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-xs text-[#172819]/75 leading-relaxed">{loc.notes}</p>

                    {!isClosed && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          disabled={alreadyReported}
                          onClick={() => {
                            onReportCheckIn(loc.id, 1);
                            setReportedIds((prev) => ({ ...prev, [loc.id]: true }));
                          }}
                          className={`px-2.5 py-1 rounded border text-[11px] font-semibold transition-colors whitespace-nowrap ${
                            alreadyReported
                              ? 'border-[#A1CEA7]/50 text-[#627F65] bg-[#FCFFEB] cursor-default'
                              : 'border-[#A1CEA7] text-[#172E1B] hover:border-[#172E1B] cursor-pointer'
                          }`}
                        >
                          {alreadyReported ? 'Check-In Synced' : 'Check In (+1 Court Used)'}
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Right: App Finder + Driveway / Cul-de-Sac / Parking Lot Alternative */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="bg-[#172E1B] text-[#FCFFEB] rounded-2xl p-6 sm:p-7 space-y-5">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-[#FCFFAD]">
                Live Availability Synced with the App
              </div>
              <h2 className="font-display text-xl font-bold leading-snug">
                See real-time open courts across Orange County on your phone.
              </h2>
              <p className="text-sm text-[#FCFFEB]/80 leading-relaxed">
                Every court above shares live occupancy with the Courtify app across Irvine, Newport
                Beach, Huntington Beach, Costa Mesa, and Laguna Niguel.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={COURTIFY_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#172E1B] bg-[#FCFFAD] hover:bg-[#FCFFEB] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Open Courtify App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => onNavigate('app')}
                className="px-4 py-2.5 text-xs font-semibold text-[#FCFFEB] border border-[#A1CEA7]/60 hover:bg-[#627F65] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Join Early Access
              </button>
            </div>
          </div>

          <div className="bg-white border border-[#A1CEA7]/70 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#627F65]">
              <Sun className="w-4 h-4 text-[#627F65]" />
              <span>No Courts Open Nearby?</span>
            </div>
            <h3 className="font-display text-lg font-bold text-[#172E1B]">
              Turn any flat space into your own court in 10 minutes.
            </h3>
            <p className="text-sm text-[#172819]/75 leading-relaxed">
              Driveway, cul-de-sac, empty parking lot, or blacktop—every Courtify portable net and
              court line bundle sets up without tools so your group plays on your own schedule.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('packages')}
              className="w-full py-2.5 px-4 text-xs font-semibold text-[#FCFFEB] bg-[#627F65] hover:bg-[#172E1B] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Shop Portable Court Bundles (From $350)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
