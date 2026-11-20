import { Check, ExternalLink } from 'lucide-react';
import { COURTIFY_APP_URL } from '../data/courtifyData';
import { CourtifyAppIcon } from './CourtifyAppIcon';

export function AppView() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-16">
      {/* Main Split: Copy (Left) + Direct Courtify Web App Launch Card (Right) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left: Proposition */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#627F65]">
              <span>Play / Connect / Repeat</span>
              <span aria-hidden="true">·</span>
              <span>Nationwide U.S. Court Finder</span>
            </div>

            <h1
              className="font-display font-extrabold tracking-tight text-[#172E1B] text-balance leading-[1.08]"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.35rem)' }}
            >
              Find open courts anywhere across the U.S. from your pocket.
            </h1>

            <p className="text-base text-[#172819]/80 leading-relaxed max-w-xl">
              See which parks and public courts have open nets before you head out—and if every
              court nearby is full, drop a portable Courtify pin for a driveway, cul-de-sac, or
              parking-lot rally with friends.
            </p>
          </div>
        </div>

        {/* Right: Dedicated Courtify App Card & Direct Launch CTA */}
        <div className="lg:col-span-6">
          <div className="bg-white border border-[#A1CEA7]/80 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="font-display text-xl font-bold text-[#172E1B]">
                  Launch the Courtify Web App
                </h2>
                <p className="text-sm text-[#627F65]">
                  Open courts, live availability checks, and Play Anywhere pop-up pins in one place.
                </p>
              </div>
              <CourtifyAppIcon variant="card" />
            </div>

            <ul className="space-y-2.5 text-sm text-[#172819]/85 border-t border-[#A1CEA7]/40 pt-5">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#627F65] shrink-0 mt-0.5" />
                <span>
                  Browse open pickleball courts and check current court availability before leaving home
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#627F65] shrink-0 mt-0.5" />
                <span>
                  Host your own pop-up driveway, cul-de-sac, or parking-lot game whenever local parks are busy
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#627F65] shrink-0 mt-0.5" />
                <span>
                  Accessible directly from any browser on iOS, Android, or desktop at{' '}
                  <a
                    href={COURTIFY_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-semibold text-[#172E1B] underline underline-offset-2 hover:text-[#627F65]"
                  >
                    courtifyca.ai.studio
                  </a>
                </span>
              </li>
            </ul>

            <div className="pt-1">
              <a
                href={COURTIFY_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 px-5 text-sm font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#627F65]"
              >
                <span>Open Courtify App</span>
                <ExternalLink className="w-4 h-4" />
              </a>
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
            Check which local park courts across the U.S. actually have open spots before loading up
            your gear and driving over.
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
            Pair the app with the Courtify bundle or paddle setup built for your group, from
            driveway rallies to competitive backyard play.
          </p>
        </div>
      </section>
    </div>
  );
}
