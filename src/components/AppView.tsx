import { useState } from 'react';
import {
  CheckCircle2,
  Compass,
  ExternalLink,
  MapPin,
  Users,
} from 'lucide-react';
import {
  COURTIFY_APP_URL,
  EarlyAccessRecord,
  LiveCourtLocation,
} from '../data/courtifyData';
import { CourtifyAppIcon } from './CourtifyAppIcon';

interface AppViewProps {
  signups: EarlyAccessRecord[];
  liveCourts: LiveCourtLocation[];
  onJoinWaitlist: (
    entry: Omit<EarlyAccessRecord, 'id' | 'inviteCode' | 'createdAt'>
  ) => EarlyAccessRecord;
}

export function AppView({ signups, liveCourts, onJoinWaitlist }: AppViewProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState<'iOS' | 'Android' | 'Both'>('iOS');
  const [city, setCity] = useState('Irvine');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedEntry, setConfirmedEntry] = useState<EarlyAccessRecord | null>(
    signups[0] ?? null
  );

  // Interactive phone preview tab
  const [previewTab, setPreviewTab] = useState<'nearby' | 'openplay' | 'anywhere'>('nearby');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (fullName.trim().length < 2) {
      setFormError('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }

    const record = onJoinWaitlist({
      fullName: fullName.trim(),
      email: email.trim(),
      platform,
      city,
    });
    setConfirmedEntry(record);
    setFullName('');
    setEmail('');
  };

  // Top 3 synced courts for the interactive phone preview
  const previewCourts = liveCourts.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-16">
      {/* Main Split: Early Access Signup (Left) + Live Interactive App Preview & Link Icon (Right) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left: Copy + App Link Icon + Early Access Form */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#627F65]">
              <span>Play / Connect / Repeat</span>
              <span aria-hidden="true">·</span>
              <span>Orange County, CA Early Access</span>
            </div>

            <h1
              className="font-display font-extrabold tracking-tight text-[#172E1B] text-balance leading-[1.08]"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.35rem)' }}
            >
              Find open courts across Orange County from your pocket.
            </h1>

            <p className="text-base text-[#172819]/80 leading-relaxed max-w-xl">
              See which parks and public courts have open nets before you head out—and if every
              court nearby is full, drop a portable Courtify pin for a driveway, cul-de-sac, or
              parking-lot rally with friends.
            </p>
          </div>

          {/* Dedicated Courtify App Icon Link to https://courtifyca.ai.studio */}
          <div className="flex flex-wrap items-center gap-4">
            <CourtifyAppIcon variant="card" />
            <p className="text-xs text-[#627F65] max-w-xs leading-relaxed">
              Click the Courtify App icon to explore the live web app directly at{' '}
              <a
                href={COURTIFY_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-semibold text-[#172E1B] underline underline-offset-2 hover:text-[#627F65]"
              >
                courtifyca.ai.studio
              </a>
              .
            </p>
          </div>

          {/* Early Access Download Signup Form */}
          <div className="bg-white border border-[#A1CEA7]/80 rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <h2 className="font-display text-xl font-bold text-[#172E1B]">
                Sign up for early access to download
              </h2>
              <p className="text-sm text-[#627F65]">
                Reserve your TestFlight / Google Play beta invite for Orange County launch.
              </p>
            </div>

            {confirmedEntry ? (
              <div className="space-y-4">
                <div className="bg-[#FCFFEB] border border-[#77AD78] rounded-xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#172E1B]">
                    <CheckCircle2 className="w-5 h-5 text-[#627F65] shrink-0" />
                    <span>Early Access Reserved — Invite #{confirmedEntry.inviteCode}</span>
                  </div>
                  <p className="text-xs text-[#172819]/80 leading-relaxed">
                    We added <span className="font-semibold">{confirmedEntry.email}</span> (
                    {confirmedEntry.platform} · {confirmedEntry.city}, CA) to Wave 1 download
                    invitations.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <a
                    href={COURTIFY_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors"
                  >
                    <span>Open Live Courtify App Now</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setConfirmedEntry(null)}
                    className="text-xs font-semibold text-[#627F65] hover:text-[#172E1B] cursor-pointer"
                  >
                    Register another email
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="ea-name"
                      className="block text-xs font-medium text-[#172E1B] mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="ea-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jordan Kim"
                      className="w-full h-11 px-3 rounded-lg border border-[#A1CEA7] text-sm text-[#172E1B] focus:outline-none focus:border-[#172E1B]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ea-email"
                      className="block text-xs font-medium text-[#172E1B] mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="ea-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jordan@example.com"
                      className="w-full h-11 px-3 rounded-lg border border-[#A1CEA7] text-sm text-[#172E1B] focus:outline-none focus:border-[#172E1B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs font-medium text-[#172E1B] mb-1">
                      Device Platform
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {(['iOS', 'Android', 'Both'] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPlatform(p)}
                          className={`h-11 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                            platform === p
                              ? 'border-[#172E1B] bg-[#172E1B] text-[#FCFFEB]'
                              : 'border-[#A1CEA7]/80 bg-white text-[#172E1B] hover:border-[#627F65]'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="ea-city"
                      className="block text-xs font-medium text-[#172E1B] mb-1"
                    >
                      Orange County City
                    </label>
                    <select
                      id="ea-city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg border border-[#A1CEA7] bg-white text-sm text-[#172E1B] focus:outline-none focus:border-[#172E1B]"
                    >
                      <option value="Irvine">Irvine, CA</option>
                      <option value="Newport Beach">Newport Beach, CA</option>
                      <option value="Huntington Beach">Huntington Beach, CA</option>
                      <option value="Costa Mesa">Costa Mesa, CA</option>
                      <option value="Laguna Niguel">Laguna Niguel, CA</option>
                      <option value="Other OC">Other Orange County City</option>
                    </select>
                  </div>
                </div>

                {formError && (
                  <p role="alert" className="text-xs font-medium text-red-700 bg-red-50 px-3 py-2 rounded-lg">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full h-12 px-5 text-sm font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors cursor-pointer"
                >
                  Request Early Access Download
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Interactive Mobile App Preview Frame (Synced to Live OC Courts) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[340px] bg-[#172E1B] rounded-[2.25rem] p-3 border border-[#627F65]/60 shadow-xl">
            <div className="bg-[#FCFFEB] rounded-[1.75rem] overflow-hidden flex flex-col min-h-[540px] justify-between">
              {/* Simulated App Top Bar */}
              <div>
                <div className="bg-[#172E1B] text-[#FCFFEB] px-5 pt-5 pb-4 flex items-center justify-between">
                  <div>
                    <div className="font-display text-base font-bold tracking-tight">Courtify</div>
                    <div className="text-[11px] text-[#A1CEA7]">Orange County, CA</div>
                  </div>
                  <a
                    href={COURTIFY_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open Courtify App"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#172E1B] bg-[#FCFFAD] hover:bg-[#FCFFEB] px-2.5 py-1 rounded-md transition-colors"
                  >
                    <span>Live URL</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Interactive App Preview Content */}
                <div className="p-4 space-y-3">
                  {previewTab === 'nearby' && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#172E1B]">
                          Live OC Courts
                        </span>
                        <span className="font-mono text-[10px] text-[#627F65] tabular-nums">
                          {previewCourts[0]?.lastUpdatedLabel}
                        </span>
                      </div>
                      {previewCourts.map((court) => (
                        <div
                          key={court.id}
                          className="bg-white border border-[#A1CEA7]/70 rounded-xl p-3.5 space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-[#172E1B] truncate">
                              {court.name}
                            </span>
                            <span className="font-mono text-[11px] font-semibold text-[#172E1B] bg-[#A1CEA7]/35 px-2 py-0.5 rounded tabular-nums shrink-0">
                              {court.availability === 'Closed'
                                ? 'Closed'
                                : `${court.openCourts} Open`}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#627F65]">
                            {court.city} · {court.totalCourts} courts · {court.lighting}
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {previewTab === 'openplay' && (
                    <>
                      <div className="text-xs font-semibold text-[#172E1B]">
                        Local Open Play &amp; Pop-Ups
                      </div>
                      <div className="bg-white border border-[#A1CEA7]/70 rounded-xl p-3.5 space-y-2">
                        <div className="text-xs font-semibold text-[#172E1B]">
                          Woodbridge Evening Rally
                        </div>
                        <div className="text-[11px] text-[#627F65]">
                          6:30 PM · Mike Ward Park Courts 1–4
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="font-mono text-[11px] text-[#627F65] tabular-nums">
                            6 / 8 players going
                          </span>
                          <span className="text-[11px] font-semibold text-[#172E1B]">All Levels</span>
                        </div>
                      </div>
                      <div className="bg-white border border-[#A1CEA7]/70 rounded-xl p-3.5 space-y-2">
                        <div className="text-xs font-semibold text-[#172E1B]">
                          Cul-de-Sac Pop-Up Court
                        </div>
                        <div className="text-[11px] text-[#627F65]">
                          5:00 PM · Portable Set · Irvine
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="font-mono text-[11px] text-[#627F65] tabular-nums">
                            4 / 4 players going
                          </span>
                          <span className="text-[11px] font-semibold text-[#172E1B]">Starter Kit</span>
                        </div>
                      </div>
                    </>
                  )}

                  {previewTab === 'anywhere' && (
                    <>
                      <div className="text-xs font-semibold text-[#172E1B]">
                        Play Anywhere Mode
                      </div>
                      <div className="bg-[#172E1B] text-[#FCFFEB] rounded-xl p-4 space-y-3">
                        <div className="text-xs text-[#FCFFAD] font-semibold">
                          No Parks Open Near You?
                        </div>
                        <p className="text-xs text-[#FCFFEB]/85 leading-relaxed">
                          Pin your driveway, cul-de-sac, or open parking lot in the app, roll out
                          your Courtify net &amp; lines, and invite friends in seconds.
                        </p>
                        <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono text-[#A1CEA7]">
                          <div className="bg-white/10 rounded-lg p-2">20 × 44 ft</div>
                          <div className="bg-white/10 rounded-lg p-2">10 min setup</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Interactive App Bottom Bar */}
              <div className="bg-white border-t border-[#A1CEA7]/50 px-3 py-2.5 grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => setPreviewTab('nearby')}
                  className={`flex flex-col items-center py-1 rounded-lg text-[11px] font-medium cursor-pointer transition-colors ${
                    previewTab === 'nearby'
                      ? 'text-[#172E1B] bg-[#A1CEA7]/30 font-semibold'
                      : 'text-[#627F65] hover:text-[#172E1B]'
                  }`}
                >
                  <MapPin className="w-4 h-4 mb-0.5" />
                  <span>Nearby</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('openplay')}
                  className={`flex flex-col items-center py-1 rounded-lg text-[11px] font-medium cursor-pointer transition-colors ${
                    previewTab === 'openplay'
                      ? 'text-[#172E1B] bg-[#A1CEA7]/30 font-semibold'
                      : 'text-[#627F65] hover:text-[#172E1B]'
                  }`}
                >
                  <Users className="w-4 h-4 mb-0.5" />
                  <span>Games</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('anywhere')}
                  className={`flex flex-col items-center py-1 rounded-lg text-[11px] font-medium cursor-pointer transition-colors ${
                    previewTab === 'anywhere'
                      ? 'text-[#172E1B] bg-[#A1CEA7]/30 font-semibold'
                      : 'text-[#627F65] hover:text-[#172E1B]'
                  }`}
                >
                  <Compass className="w-4 h-4 mb-0.5" />
                  <span>Anywhere</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="border-t border-[#A1CEA7]/60 pt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <h3 className="font-display text-base font-bold text-[#172E1B]">
            01. Live Court Availability
          </h3>
          <p className="text-sm text-[#172819]/75 leading-relaxed">
            Check which Orange County park courts actually have open spots before loading up your
            gear and driving over.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-base font-bold text-[#172E1B]">
            02. Pop-Up Anywhere Pins
          </h3>
          <p className="text-sm text-[#172819]/75 leading-relaxed">
            When local courts are full, host a match in a driveway, cul-de-sac, or parking lot and
            share the pin with your crew.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-base font-bold text-[#172E1B]">
            03. Gear Matched to Your Game
          </h3>
          <p className="text-sm text-[#172819]/75 leading-relaxed">
            Track which Courtify bundle or paddle setup fits your group, from casual driveways to
            full club nights.
          </p>
        </div>
      </section>
    </div>
  );
}
