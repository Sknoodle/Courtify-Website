import { useState } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  MapPin,
  QrCode,
  Smartphone,
  Users,
} from 'lucide-react';
import { COURTIFY_APP_URL, EarlyAccessRecord } from '../data/courtifyData';
import { CourtifyAppIcon } from './CourtifyAppIcon';

interface AppViewProps {
  signups: EarlyAccessRecord[];
  onJoinWaitlist: (
    entry: Omit<EarlyAccessRecord, 'id' | 'inviteCode' | 'createdAt'>
  ) => EarlyAccessRecord;
}

export function AppView({ signups, onJoinWaitlist }: AppViewProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [platform, setPlatform] = useState<'iOS' | 'Android' | 'Both'>('iOS');
  const [city, setCity] = useState('Toronto');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedEntry, setConfirmedEntry] = useState<EarlyAccessRecord | null>(
    signups[0] ?? null
  );

  // Interactive phone preview tab
  const [previewTab, setPreviewTab] = useState<'courts' | 'openplay' | 'pass'>('courts');

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
              <span>iOS &amp; Android Early Access</span>
            </div>

            <h1
              className="font-display font-extrabold tracking-tight text-[#172E1B] text-balance leading-[1.08]"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.35rem)' }}
            >
              Same game. Bigger possibilities, in your pocket.
            </h1>

            <p className="text-base text-[#172819]/80 leading-relaxed max-w-xl">
              Book Courtify courts in seconds, join local open-play ladders, split court fees with
              your doubles group, and unlock LED court gates with one tap.
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
                Reserve your TestFlight / Google Play beta invite before public store launch.
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
                    {confirmedEntry.platform} · {confirmedEntry.city}) to Wave 1 download
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
                      placeholder="Alex Tremblay"
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
                      placeholder="alex@example.com"
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
                      Home City
                    </label>
                    <select
                      id="ea-city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg border border-[#A1CEA7] bg-white text-sm text-[#172E1B] focus:outline-none focus:border-[#172E1B]"
                    >
                      <option value="Toronto">Toronto, ON</option>
                      <option value="Vancouver">Vancouver, BC</option>
                      <option value="Calgary">Calgary, AB</option>
                      <option value="Montreal">Montreal, QC</option>
                      <option value="Ottawa">Ottawa, ON</option>
                      <option value="Other">Other City</option>
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

        {/* Right: Interactive Mobile App Preview Frame */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-[340px] bg-[#172E1B] rounded-[2.25rem] p-3 border border-[#627F65]/60 shadow-xl">
            <div className="bg-[#FCFFEB] rounded-[1.75rem] overflow-hidden flex flex-col min-h-[540px] justify-between">
              {/* Simulated App Top Bar */}
              <div>
                <div className="bg-[#172E1B] text-[#FCFFEB] px-5 pt-5 pb-4 flex items-center justify-between">
                  <div>
                    <div className="font-display text-base font-bold tracking-tight">Courtify</div>
                    <div className="text-[11px] text-[#A1CEA7]">Toronto · Waterfront</div>
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
                  {previewTab === 'courts' && (
                    <>
                      <div className="text-xs font-semibold text-[#172E1B]">
                        Open Courts Near You
                      </div>
                      <div className="bg-white border border-[#A1CEA7]/70 rounded-xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#172E1B]">
                            Harbourfront Court A
                          </span>
                          <span className="font-mono text-xs font-semibold text-[#627F65] tabular-nums">
                            $38/hr
                          </span>
                        </div>
                        <div className="text-[11px] text-[#627F65]">
                          0.4 km · Advanced Portable · LED Lit
                        </div>
                        <div className="flex gap-1.5 pt-1">
                          <span className="font-mono text-[11px] px-2 py-1 rounded bg-[#172E1B] text-[#FCFFAD]">
                            17:30
                          </span>
                          <span className="font-mono text-[11px] px-2 py-1 rounded bg-[#FCFFEB] text-[#172E1B] border border-[#A1CEA7]/60">
                            19:00
                          </span>
                          <span className="font-mono text-[11px] px-2 py-1 rounded bg-[#FCFFEB] text-[#172E1B] border border-[#A1CEA7]/60">
                            20:30
                          </span>
                        </div>
                      </div>

                      <div className="bg-white border border-[#A1CEA7]/70 rounded-xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#172E1B]">
                            Liberty Village Deck 02
                          </span>
                          <span className="font-mono text-xs font-semibold text-[#627F65] tabular-nums">
                            $42/hr
                          </span>
                        </div>
                        <div className="text-[11px] text-[#627F65]">
                          1.6 km · Club Court · Covered Parking
                        </div>
                        <div className="flex gap-1.5 pt-1">
                          <span className="font-mono text-[11px] px-2 py-1 rounded bg-[#FCFFEB] text-[#172E1B] border border-[#A1CEA7]/60">
                            18:00
                          </span>
                          <span className="font-mono text-[11px] px-2 py-1 rounded bg-[#FCFFEB] text-[#172E1B] border border-[#A1CEA7]/60">
                            19:30
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {previewTab === 'openplay' && (
                    <>
                      <div className="text-xs font-semibold text-[#172E1B]">
                        Tonight’s Open Play Ladders
                      </div>
                      <div className="bg-white border border-[#A1CEA7]/70 rounded-xl p-3.5 space-y-2">
                        <div className="text-xs font-semibold text-[#172E1B]">
                          3.5+ Intermediate Mixer
                        </div>
                        <div className="text-[11px] text-[#627F65]">
                          18:30–20:30 · Harbourfront Courts 1–2
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="font-mono text-[11px] text-[#627F65] tabular-nums">
                            6 / 8 players joined
                          </span>
                          <span className="text-[11px] font-semibold text-[#172E1B]">$14/player</span>
                        </div>
                      </div>
                      <div className="bg-white border border-[#A1CEA7]/70 rounded-xl p-3.5 space-y-2">
                        <div className="text-xs font-semibold text-[#172E1B]">
                          Saturday Morning Social
                        </div>
                        <div className="text-[11px] text-[#627F65]">
                          09:00–11:00 · Kitsilano Pier North
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <span className="font-mono text-[11px] text-[#627F65] tabular-nums">
                            11 / 12 players joined
                          </span>
                          <span className="text-[11px] font-semibold text-[#172E1B]">$12/player</span>
                        </div>
                      </div>
                    </>
                  )}

                  {previewTab === 'pass' && (
                    <>
                      <div className="text-xs font-semibold text-[#172E1B]">Active Court Pass</div>
                      <div className="bg-[#172E1B] text-[#FCFFEB] rounded-xl p-4 space-y-4 text-center">
                        <div className="text-xs text-[#FCFFAD] font-medium">
                          Harbourfront Pop-Up Court A
                        </div>
                        <div className="bg-white text-[#172E1B] rounded-xl p-4 inline-flex flex-col items-center">
                          <QrCode className="w-20 h-20 text-[#172E1B]" strokeWidth={1.5} />
                          <span className="font-mono text-xs font-bold mt-2 tracking-wider">
                            CTY-4829
                          </span>
                        </div>
                        <div className="text-[11px] text-[#A1CEA7]">
                          Scan at north keypad to unlock gate &amp; lights
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
                  onClick={() => setPreviewTab('courts')}
                  className={`flex flex-col items-center py-1 rounded-lg text-[11px] font-medium cursor-pointer transition-colors ${
                    previewTab === 'courts'
                      ? 'text-[#172E1B] bg-[#A1CEA7]/30 font-semibold'
                      : 'text-[#627F65] hover:text-[#172E1B]'
                  }`}
                >
                  <MapPin className="w-4 h-4 mb-0.5" />
                  <span>Courts</span>
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
                  <span>Open Play</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('pass')}
                  className={`flex flex-col items-center py-1 rounded-lg text-[11px] font-medium cursor-pointer transition-colors ${
                    previewTab === 'pass'
                      ? 'text-[#172E1B] bg-[#A1CEA7]/30 font-semibold'
                      : 'text-[#627F65] hover:text-[#172E1B]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mb-0.5" />
                  <span>Pass</span>
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
            01. Instant Slot Alerts
          </h3>
          <p className="text-sm text-[#172819]/75 leading-relaxed">
            Follow your favourite neighbourhood courts and get notified the moment prime evening
            hours open up.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-base font-bold text-[#172E1B]">
            02. One-Tap Split Billing
          </h3>
          <p className="text-sm text-[#172819]/75 leading-relaxed">
            Book the court once and send automatic split links to your three doubles partners with
            zero spreadsheets.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-base font-bold text-[#172E1B]">
            03. Smart Gate &amp; Lighting
          </h3>
          <p className="text-sm text-[#172819]/75 leading-relaxed">
            Your mobile pass activates court perimeter LED towers automatically 5 minutes before
            your reserved slot.
          </p>
        </div>
      </section>
    </div>
  );
}
