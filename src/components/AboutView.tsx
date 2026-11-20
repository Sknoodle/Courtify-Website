import { ArrowRight } from 'lucide-react';
import {
  COURTIFY_PILLARS,
  HERO_IMAGE,
  PageRoute,
  TEMPORARY_ABOUT_US,
} from '../data/courtifyData';
import { CourtifyAppIcon } from './CourtifyAppIcon';
import { ResilientImage } from './ResilientImage';

interface AboutViewProps {
  onNavigate: (page: PageRoute) => void;
}

export function AboutView({ onNavigate }: AboutViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-16">
      {/* Intro Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6 py-2">
          <div className="space-y-4">
            <p className="text-xs font-semibold text-[#627F65]">
              {TEMPORARY_ABOUT_US.eyebrow}
            </p>
            <h1
              className="font-display font-extrabold tracking-tight text-[#172E1B] text-balance leading-[1.08]"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)' }}
            >
              {TEMPORARY_ABOUT_US.headline}
            </h1>
            <p className="text-base text-[#172819]/80 leading-relaxed max-w-xl">
              {TEMPORARY_ABOUT_US.intro}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('packages')}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Browse Portable Packages</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('faq')}
              className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-[#172E1B] hover:text-[#627F65] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Read Common FAQs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#A1CEA7]/70 min-h-[280px] sm:min-h-[360px]">
          <ResilientImage
            src={HERO_IMAGE}
            alt="Courtify outdoor pickleball court setup"
            fallbackTitle="Courtify Pickleball"
            className="w-full h-full lg:h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#172E1B]/90 via-[#172E1B]/45 to-transparent p-6">
            <p className="text-xs font-semibold text-[#FCFFAD]">Play / Connect / Repeat</p>
            <p className="text-sm font-medium text-[#FCFFEB]/95 mt-0.5">
              Same Game. Bigger Possibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Strip */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-y border-[#A1CEA7]/60">
        {TEMPORARY_ABOUT_US.highlights.map((item) => (
          <div key={item.label}>
            <div className="text-xs font-medium text-[#627F65]">{item.label}</div>
            <div className="font-mono text-xl sm:text-2xl font-semibold text-[#172E1B] tabular-nums mt-1">
              {item.value}
            </div>
          </div>
        ))}
      </section>

      {/* Company Story + Core Pillars */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 space-y-4">
          <p className="text-xs font-semibold text-[#627F65]">Company Mission</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#172E1B] text-balance">
            {TEMPORARY_ABOUT_US.storyTitle}
          </h2>
          {TEMPORARY_ABOUT_US.storyParagraphs.map((para) => (
            <p key={para} className="text-sm sm:text-base text-[#172819]/80 leading-relaxed">
              {para}
            </p>
          ))}
          <p className="text-xs text-[#627F65] pt-2">
            Temporary company bio placeholder — update this section anytime with your team story,
            founders, and milestones.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {COURTIFY_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-white border border-[#A1CEA7]/70 rounded-xl p-6 space-y-2"
            >
              <h3 className="font-display text-base font-bold text-[#172E1B]">
                {pillar.number}. {pillar.title}
              </h3>
              <p className="text-sm text-[#172819]/75 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* App + Gear CTA */}
      <section className="bg-[#172E1B] text-[#FCFFEB] rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <p className="text-xs font-semibold text-[#FCFFAD]">More than a game. It&apos;s a lifestyle.</p>
          <h2 className="font-display text-2xl font-bold">
            Explore the Courtify app or pick a portable bundle.
          </h2>
          <p className="text-sm text-[#FCFFEB]/80 leading-relaxed">
            Find open public courts across the U.S. or set up your own driveway court with a
            package built for your crew.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <CourtifyAppIcon variant="card" />
          <button
            type="button"
            onClick={() => onNavigate('app')}
            className="px-5 py-3.5 text-sm font-semibold text-[#172E1B] bg-[#FCFFAD] hover:bg-[#FCFFEB] rounded-xl transition-colors cursor-pointer whitespace-nowrap"
          >
            Explore the App
          </button>
        </div>
      </section>
    </div>
  );
}
