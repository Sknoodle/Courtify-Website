import { useState, useMemo } from 'react';
import { Calendar, CheckCircle2, Clock, MapPin, ShieldCheck, Trash2 } from 'lucide-react';
import {
  BookingRecord,
  COURT_VENUES,
  CourtVenue,
  getUpcomingDates,
} from '../data/courtifyData';

interface BookingViewProps {
  initialCity?: string;
  initialDate?: string;
  initialWindow?: string;
  bookings: BookingRecord[];
  onCreateBooking: (booking: Omit<BookingRecord, 'id' | 'code' | 'createdAt'>) => BookingRecord;
  onCancelBooking: (bookingId: string) => void;
}

const CITIES = ['All Cities', 'Toronto', 'Vancouver', 'Calgary', 'Montreal'] as const;

export function BookingView({
  initialCity = 'All Cities',
  initialDate,
  initialWindow = 'All',
  bookings,
  onCreateBooking,
  onCancelBooking,
}: BookingViewProps) {
  const dates = useMemo(() => getUpcomingDates(7), []);
  const [selectedCity, setSelectedCity] = useState<string>(
    CITIES.includes(initialCity as (typeof CITIES)[number]) ? initialCity : 'All Cities'
  );
  const [selectedDate, setSelectedDate] = useState<string>(initialDate || dates[0].iso);
  const [timeWindow, setTimeWindow] = useState<string>(initialWindow || 'All');
  const [litOnly, setLitOnly] = useState<boolean>(false);

  const [selectedSlot, setSelectedSlot] = useState<{ venue: CourtVenue; time: string } | null>(
    null
  );
  const [durationMins, setDurationMins] = useState<60 | 90 | 120>(60);
  const [includeGear, setIncludeGear] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>('');
  const [playerEmail, setPlayerEmail] = useState<string>('');
  const [skillLevel, setSkillLevel] = useState<'Recreational' | 'Intermediate' | 'Competitive'>(
    'Intermediate'
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [latestConfirmation, setLatestConfirmation] = useState<BookingRecord | null>(null);

  const filteredVenues = useMemo(() => {
    return COURT_VENUES.filter((v) => {
      if (selectedCity !== 'All Cities' && v.city !== selectedCity) return false;
      if (litOnly && v.lighting !== 'LED Floodlit') return false;
      return true;
    });
  }, [selectedCity, litOnly]);

  const filterSlotsByWindow = (slots: string[]) => {
    if (timeWindow === 'All') return slots;
    return slots.filter((s) => {
      const hour = parseInt(s.split(':')[0], 10);
      if (timeWindow === 'Morning') return hour < 12;
      if (timeWindow === 'Midday') return hour >= 12 && hour < 16;
      if (timeWindow === 'Evening') return hour >= 16;
      return true;
    });
  };

  const isSlotBookedByUser = (venueId: string, time: string) =>
    bookings.some(
      (b) => b.venueId === venueId && b.date === selectedDate && b.timeSlot === time
    );

  const computedTotalCad = useMemo(() => {
    if (!selectedSlot) return 0;
    const baseHourly = selectedSlot.venue.hourlyRateCad;
    const courtFee = Math.round((baseHourly * durationMins) / 60);
    return courtFee + (includeGear ? 12 : 0);
  }, [selectedSlot, durationMins, includeGear]);

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!selectedSlot) {
      setFormError('Select a court time slot first.');
      return;
    }
    if (playerName.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(playerEmail.trim())) {
      setFormError('Please enter a valid email address for your court pass.');
      return;
    }

    const record = onCreateBooking({
      venueId: selectedSlot.venue.id,
      venueName: selectedSlot.venue.name,
      city: selectedSlot.venue.city,
      date: selectedDate,
      timeSlot: selectedSlot.time,
      durationMins,
      includeGear,
      playerName: playerName.trim(),
      playerEmail: playerEmail.trim(),
      skillLevel,
      totalCad: computedTotalCad,
    });

    setLatestConfirmation(record);
    setSelectedSlot(null);
  };

  const selectedDateLabel =
    dates.find((d) => d.iso === selectedDate)?.label ?? selectedDate;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#A1CEA7]/60 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="text-xs font-semibold text-[#627F65]">
            Play / Connect / Repeat · Instant Court Reservations
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172E1B] text-balance">
            Book a court in three clicks.
          </h1>
          <p className="text-sm sm:text-base text-[#172819]/80">
            Tap any available time slot below to lock your court and optionally add a Courtify
            4-paddle &amp; ball locker kit.
          </p>
        </div>

        <div className="text-xs text-[#627F65] font-mono tabular-nums">
          {filteredVenues.length} {filteredVenues.length === 1 ? 'venue' : 'venues'} available
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* City Segmented Tabs */}
          <div
            role="tablist"
            aria-label="Filter venues by city"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#A1CEA7]/25 rounded-lg"
          >
            {CITIES.map((c) => {
              const active = selectedCity === c;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCity(c)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-white text-[#172E1B] shadow-sm'
                      : 'text-[#172819]/75 hover:text-[#172E1B]'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Time Window + Lighting Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              aria-label="Filter by time window"
              value={timeWindow}
              onChange={(e) => setTimeWindow(e.target.value)}
              className="h-10 px-3 rounded-lg border border-[#A1CEA7]/80 bg-white text-xs font-semibold text-[#172E1B] focus:outline-none focus:border-[#627F65]"
            >
              <option value="All">All Hours</option>
              <option value="Morning">Morning (Before 12:00)</option>
              <option value="Midday">Midday (12:00–16:00)</option>
              <option value="Evening">Evening (16:00+)</option>
            </select>

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
              LED Floodlit Only
            </button>
          </div>
        </div>

        {/* Date Selector Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {dates.map((d) => {
            const active = selectedDate === d.iso;
            return (
              <button
                key={d.iso}
                type="button"
                onClick={() => setSelectedDate(d.iso)}
                className={`px-3.5 py-2 rounded-lg border text-left transition-colors cursor-pointer shrink-0 ${
                  active
                    ? 'border-[#172E1B] bg-[#172E1B] text-[#FCFFEB]'
                    : 'border-[#A1CEA7]/70 bg-white text-[#172E1B] hover:border-[#627F65]'
                }`}
              >
                <div className="text-[11px] font-medium opacity-80 whitespace-nowrap">
                  {d.shortDay}
                </div>
                <div className="text-xs font-semibold font-mono tabular-nums whitespace-nowrap">
                  {d.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split: Venue Slots (Left 7 cols) + Sticky Booking Summary (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Venues & Slots */}
        <div className="lg:col-span-7 space-y-5">
          {filteredVenues.map((venue) => {
            const visibleSlots = filterSlotsByWindow(venue.slots);
            return (
              <article
                key={venue.id}
                className="bg-white border border-[#A1CEA7]/70 rounded-xl p-5 sm:p-6 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#627F65]">
                      <span className="font-semibold text-[#172E1B]">{venue.city}</span>
                      <span aria-hidden="true">·</span>
                      <span>{venue.neighborhood}</span>
                      <span aria-hidden="true">·</span>
                      <span>{venue.surface}</span>
                      <span aria-hidden="true">·</span>
                      <span>{venue.lighting}</span>
                    </div>
                    <h2 className="font-display text-lg font-bold text-[#172E1B]">
                      {venue.name}
                    </h2>
                    <p className="text-xs text-[#627F65] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#627F65] shrink-0" />
                      <span>
                        {venue.distanceNote} · {venue.courtCount} courts
                      </span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <div className="font-mono text-lg font-semibold text-[#172E1B] tabular-nums">
                      ${venue.hourlyRateCad}{' '}
                      <span className="text-xs font-normal text-[#627F65]">/hr</span>
                    </div>
                  </div>
                </div>

                {visibleSlots.length === 0 ? (
                  <p className="text-xs text-[#627F65] py-2">
                    No open slots in the selected time window. Switch to All Hours to see more.
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {visibleSlots.map((slot) => {
                      const alreadyBooked = isSlotBookedByUser(venue.id, slot);
                      const isSelected =
                        selectedSlot?.venue.id === venue.id && selectedSlot?.time === slot;

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={alreadyBooked}
                          onClick={() => {
                            setLatestConfirmation(null);
                            setSelectedSlot({ venue, time: slot });
                          }}
                          className={`px-3.5 py-2 rounded-lg font-mono text-xs font-semibold tabular-nums transition-colors whitespace-nowrap ${
                            alreadyBooked
                              ? 'bg-[#A1CEA7]/30 text-[#172E1B] border border-[#77AD78] cursor-default'
                              : isSelected
                                ? 'bg-[#172E1B] text-[#FCFFAD] border border-[#172E1B] cursor-pointer'
                                : 'bg-[#FCFFEB] text-[#172E1B] border border-[#A1CEA7]/80 hover:border-[#172E1B] hover:bg-white cursor-pointer'
                          }`}
                        >
                          {alreadyBooked ? `${slot} · Reserved` : slot}
                        </button>
                      );
                    })}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Right: Contiguous Reservation Module */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="bg-white border border-[#A1CEA7]/70 rounded-xl p-6 space-y-5">
            <h2 className="font-display text-lg font-bold text-[#172E1B] border-b border-[#A1CEA7]/40 pb-3">
              Reservation Summary
            </h2>

            {latestConfirmation && !selectedSlot ? (
              <div className="space-y-4 py-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#627F65] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[#172E1B]">
                      Court Confirmed — Pass #{latestConfirmation.code}
                    </p>
                    <p className="text-xs text-[#172819]/75 leading-relaxed">
                      Your gate access code and receipt have been prepared for{' '}
                      <span className="font-medium text-[#172E1B]">
                        {latestConfirmation.playerEmail}
                      </span>
                      .
                    </p>
                  </div>
                </div>

                <div className="bg-[#FCFFEB] border border-[#A1CEA7]/70 rounded-lg p-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#627F65]">Venue</span>
                    <span className="font-semibold text-[#172E1B]">
                      {latestConfirmation.venueName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#627F65]">Date &amp; Time</span>
                    <span className="font-mono font-semibold text-[#172E1B] tabular-nums">
                      {latestConfirmation.date} · {latestConfirmation.timeSlot}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#627F65]">Duration</span>
                    <span className="font-mono font-semibold text-[#172E1B] tabular-nums">
                      {latestConfirmation.durationMins} min
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#A1CEA7]/50">
                    <span className="font-medium text-[#172E1B]">Total Due on Arrival</span>
                    <span className="font-mono font-bold text-[#172E1B] tabular-nums">
                      ${latestConfirmation.totalCad}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#627F65]">
                  Need another slot? Tap any available time on the left to start a new booking.
                </p>
              </div>
            ) : !selectedSlot ? (
              <div className="py-8 text-center space-y-2">
                <Clock className="w-7 h-7 text-[#A1CEA7] mx-auto" strokeWidth={1.5} />
                <p className="text-sm font-medium text-[#172E1B]">No time slot selected</p>
                <p className="text-xs text-[#627F65] max-w-xs mx-auto">
                  Choose any available time button beside a venue to configure duration and lock your
                  court.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirm} className="space-y-4">
                <div className="bg-[#FCFFEB] border border-[#A1CEA7]/50 rounded-lg p-4 space-y-1">
                  <div className="text-xs font-semibold text-[#627F65]">
                    {selectedSlot.venue.city} · {selectedSlot.venue.surface}
                  </div>
                  <div className="font-display text-base font-bold text-[#172E1B]">
                    {selectedSlot.venue.name}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#627F65] tabular-nums pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#627F65]" />
                      {selectedDateLabel}
                    </span>
                    <span>·</span>
                    <span>{selectedSlot.time}</span>
                  </div>
                </div>

                {/* Duration Selector */}
                <div className="space-y-1.5">
                  <span className="block text-xs font-medium text-[#172E1B]">Session Duration</span>
                  <div className="grid grid-cols-3 gap-2">
                    {([60, 90, 120] as const).map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => setDurationMins(mins)}
                        className={`py-2 px-3 rounded-lg border font-mono text-xs font-semibold tabular-nums transition-colors cursor-pointer ${
                          durationMins === mins
                            ? 'border-[#172E1B] bg-[#172E1B] text-[#FCFFEB]'
                            : 'border-[#A1CEA7]/70 bg-white text-[#172E1B] hover:border-[#627F65]'
                        }`}
                      >
                        {mins} min
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gear Add-on */}
                <label className="flex items-center justify-between p-3 rounded-lg border border-[#A1CEA7]/70 hover:border-[#627F65] cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={includeGear}
                      onChange={(e) => setIncludeGear(e.target.checked)}
                      className="w-4 h-4 accent-[#627F65] rounded"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#172E1B]">
                        Courtify Paddle &amp; Ball Locker
                      </div>
                      <div className="text-[11px] text-[#627F65]">
                        4 Courtify paddles + outdoor balls
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#172E1B] tabular-nums">
                    +$12
                  </span>
                </label>

                {/* Player Details */}
                <div className="space-y-3 pt-1">
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="block text-xs font-medium text-[#172E1B] mb-1"
                    >
                      Player Name
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      placeholder="Jordan Patel"
                      className="w-full h-10 px-3 rounded-lg border border-[#A1CEA7] text-sm text-[#172E1B] focus:outline-none focus:border-[#172E1B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="booking-email"
                      className="block text-xs font-medium text-[#172E1B] mb-1"
                    >
                      Email for Gate Code
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      required
                      value={playerEmail}
                      onChange={(e) => setPlayerEmail(e.target.value)}
                      placeholder="jordan@example.com"
                      className="w-full h-10 px-3 rounded-lg border border-[#A1CEA7] text-sm text-[#172E1B] focus:outline-none focus:border-[#172E1B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="booking-skill"
                      className="block text-xs font-medium text-[#172E1B] mb-1"
                    >
                      Match Pace
                    </label>
                    <select
                      id="booking-skill"
                      value={skillLevel}
                      onChange={(e) =>
                        setSkillLevel(
                          e.target.value as 'Recreational' | 'Intermediate' | 'Competitive'
                        )
                      }
                      className="w-full h-10 px-3 rounded-lg border border-[#A1CEA7] bg-white text-sm text-[#172E1B] focus:outline-none focus:border-[#172E1B]"
                    >
                      <option value="Recreational">Recreational (2.5–3.0)</option>
                      <option value="Intermediate">Intermediate (3.5)</option>
                      <option value="Competitive">Competitive (4.0+)</option>
                    </select>
                  </div>
                </div>

                {formError && (
                  <p role="alert" className="text-xs font-medium text-red-700 bg-red-50 px-3 py-2 rounded-lg">
                    {formError}
                  </p>
                )}

                <div className="pt-3 border-t border-[#A1CEA7]/50 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#172E1B]">Estimated Total</span>
                  <span className="font-mono text-xl font-bold text-[#172E1B] tabular-nums">
                    ${computedTotalCad}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors cursor-pointer"
                >
                  Confirm Quick Booking
                </button>

                <p className="flex items-center justify-center gap-1.5 text-[11px] text-[#627F65]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#627F65]" />
                  <span>Free cancellation up to 4 hours before court time</span>
                </p>
              </form>
            )}
          </div>

          {/* Upcoming Bookings List */}
          {bookings.length > 0 && (
            <div className="bg-white border border-[#A1CEA7]/70 rounded-xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-sm font-bold text-[#172E1B]">
                  Your Upcoming Reservations ({bookings.length})
                </h3>
              </div>
              <div className="divide-y divide-[#A1CEA7]/35">
                {bookings.map((b) => (
                  <div key={b.id} className="py-3 first:pt-1 last:pb-0 flex items-start justify-between gap-3">
                    <div className="space-y-0.5 min-w-0">
                      <div className="text-xs font-semibold text-[#172E1B] truncate">
                        {b.venueName}
                      </div>
                      <div className="text-xs font-mono text-[#627F65] tabular-nums">
                        {b.date} · {b.timeSlot} ({b.durationMins}m) · #{b.code}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onCancelBooking(b.id)}
                      aria-label={`Cancel reservation ${b.code}`}
                      title="Cancel booking"
                      className="p-1.5 text-[#627F65] hover:text-red-700 transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
