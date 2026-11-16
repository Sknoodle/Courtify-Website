export type PageRoute = 'home' | 'finder' | 'packages' | 'app';

export const COURTIFY_APP_URL = 'https://courtifyca.ai.studio';
export const COURTIFY_APP_ICON_IMAGE = '/assets/aistudio/Courtify_App_Icon_905f34d4.png';
export const HERO_IMAGE = '/src/assets/images/hero_courtify_pickleball_1794542298699.jpg';
export const CULDESAC_BANNER_IMAGE =
  '/src/assets/images/banner_culdesac_portable_court_1794802690667.jpg';

export interface CourtPackage {
  id: string;
  tierNumber: string;
  tierName: 'Standard' | 'Plus' | 'Pro' | 'Premier';
  name: string;
  tagline: string;
  priceUsd: number;
  retailValueUsd?: number;
  image: string;
  imageNote: string;
  footprint: string;
  setupTime: string;
  paddleSpec: string;
  netSpec: string;
  ballCount: number;
  linesIncluded: boolean;
  bestFor: string;
  colorways: { name: string; primaryHex: string; secondaryHex: string }[];
  includedItems: string[];
  description: string;
}

export interface GearLineupItem {
  id: string;
  category: string;
  name: string;
  priceDisplay: string;
  priceUsd: number;
  description: string;
}

export type CourtAvailabilityState = 'Open Now' | 'Waitlist' | 'Full' | 'Closed';

export interface CourtLocation {
  id: string;
  name: string;
  city: 'Irvine' | 'Newport Beach' | 'Huntington Beach' | 'Costa Mesa' | 'Laguna Niguel';
  address: string;
  coords: [number, number]; // [longitude, latitude]
  totalCourts: number;
  courtBreakdown: string;
  lighting: 'Lit Until 10 PM' | 'Daylight Only';
  openHour: number; // 24h local PT
  closeHour: number; // 24h local PT
  hoursLabel: string;
  baseDemand: number; // 0.35 - 0.92 typical occupancy curve
  notes: string;
}

export interface LiveCourtLocation extends CourtLocation {
  openCourts: number;
  occupiedCourts: number;
  waitMins: number;
  availability: CourtAvailabilityState;
  lastUpdatedLabel: string;
}

export interface EarlyAccessRecord {
  id: string;
  inviteCode: string;
  fullName: string;
  email: string;
  platform: 'iOS' | 'Android' | 'Both';
  city: string;
  createdAt: string;
}

export const COURTIFY_PILLARS = [
  {
    number: '01',
    title: 'Premium Quality',
    description:
      'High-grade paddles, tensioned portable nets, and consistent outdoor balls engineered for real play on driveways or park courts.',
  },
  {
    number: '02',
    title: 'Built for the Long Run',
    description:
      'Durable frames, wheeled ripstop carry bags, and coastal-ready components built for year-round Orange County sunshine.',
  },
  {
    number: '03',
    title: 'Players of All Levels',
    description:
      'From casual driveway rallies with beginner paddles to competitive open-play sessions across OC.',
  },
  {
    number: '04',
    title: 'A Greener Tomorrow',
    description:
      'Long-life modular hardware and thoughtful materials designed to reduce disposable gear waste on every court.',
  },
];

export const COURT_PACKAGES: CourtPackage[] = [
  {
    id: 'pkg-starter',
    tierNumber: '01',
    tierName: 'Standard',
    name: 'Starter Collection',
    tagline:
      '4 Beginner Paddles, 1 Beginner Portable Net, and 24 balls — turn any driveway or cul-de-sac into a court.',
    priceUsd: 350,
    retailValueUsd: 529.96,
    image: '/src/assets/images/package_standard_rally_1794542298970.jpg',
    imageNote: 'Temporary example image — actual product photos coming soon',
    footprint: '20 × 44 ft',
    setupTime: '10 min',
    paddleSpec: '4 Beginner Paddles',
    netSpec: 'Beginner Portable Net',
    ballCount: 24,
    linesIncluded: false,
    bestFor: 'Driveways, cul-de-sacs, neighborhood streets, and weekend rallies',
    colorways: [
      { name: 'Court Sage & Volt Yellow', primaryHex: '#627F65', secondaryHex: '#FCFFAD' },
      { name: 'Forest Green & Cream', primaryHex: '#172E1B', secondaryHex: '#FCFFEB' },
    ],
    includedItems: [
      '4 Courtify Beginner Paddles ($39.99 value each)',
      '1 Portable Pickleball Net — Beginner ($129.99 value)',
      '2 × 12-Pack Courtify Balls (24 balls total)',
      'Courtify wheeled carry bag (add Portable Court Lines for $104.99)',
    ],
    description:
      'When public courts nearby are packed, unroll your own game anywhere flat. Sets up in minutes on a driveway, cul-de-sac, or open lot with great feel right out of the bag.',
  },
  {
    id: 'pkg-premium',
    tierNumber: '02',
    tierName: 'Plus',
    name: 'Premium Package',
    tagline:
      '6 Advanced Paddles, 1 Portable Net, 1 Portable Court Line Set, and 36 balls for instant anywhere courts.',
    priceUsd: 635,
    image: '/src/assets/images/package_plus_modular_1794542299493.jpg',
    imageNote: 'Temporary example image — actual product photos coming soon',
    footprint: '20 × 44 ft',
    setupTime: '15 min',
    paddleSpec: '6 Advanced Paddles',
    netSpec: 'Portable Net + Court Line Set',
    ballCount: 36,
    linesIncluded: true,
    bestFor: 'Parking lots, cul-de-sacs, home concrete pads, and pop-up play',
    colorways: [
      { name: 'Court Sage & Mint', primaryHex: '#627F65', secondaryHex: '#A1CEA7' },
      { name: 'Deep Forest & Volt', primaryHex: '#172E1B', secondaryHex: '#FCFFAD' },
    ],
    includedItems: [
      '6 Courtify Advanced Paddles ($119.99 value each)',
      '1 Portable Pickleball Net with carry bag',
      '1 Portable Court Line Set ($104.99 value) for crisp 20 × 44 ft boundaries',
      '3 × 12-Pack Courtify Balls (36 balls total)',
    ],
    description:
      'More control, more power, and regulation boundary lines included. Lay out a complete pickleball court on a driveway, parking lot, or blacktop in 15 minutes.',
  },
  {
    id: 'pkg-club',
    tierNumber: '03',
    tierName: 'Pro',
    name: 'Club Court Bundle',
    tagline:
      '6 Advanced Paddles, 1 Advanced Portable Net ($1,500 tier), and 36 balls for serious match play anywhere.',
    priceUsd: 2300,
    retailValueUsd: 3019.94,
    image: '/src/assets/images/package_pro_tournament_1794542300579.jpg',
    imageNote: 'Temporary example image — actual product photos coming soon',
    footprint: '20 × 44 ft',
    setupTime: '15 min',
    paddleSpec: '6 Advanced Paddles',
    netSpec: 'Advanced Portable Net',
    ballCount: 36,
    linesIncluded: false,
    bestFor: 'Community lots, local leagues, HOAs, and multi-player meetups',
    colorways: [
      { name: 'Club Sage & Forest', primaryHex: '#627F65', secondaryHex: '#172E1B' },
      { name: 'Fresh Green & Volt', primaryHex: '#77AD78', secondaryHex: '#FCFFAD' },
    ],
    includedItems: [
      '6 Courtify Advanced Paddles ($119.99 value each)',
      '1 Courtify Advanced Portable Net ($1,500 value) with heavy-duty frame',
      '3 × 12-Pack Courtify Balls (36 balls total)',
      'Heavy-duty Courtify equipment & net storage bag',
    ],
    description:
      'Built around our $1,500 Advanced Portable Net system for true tournament-grade tension and stability, paired with six Advanced Paddles and 36 consistent-bounce balls.',
  },
  {
    id: 'pkg-ultimate',
    tierNumber: '04',
    tierName: 'Premier',
    name: 'Ultimate Facility Bundle',
    tagline:
      '12 Advanced Paddles, 1 Advanced Portable Net, and 60 balls — maximum gear and value for any venue or event.',
    priceUsd: 3400,
    retailValueUsd: 4299.88,
    image: '/src/assets/images/package_premier_estate_1794542300272.jpg',
    imageNote: 'Temporary example image — actual product photos coming soon',
    footprint: '20 × 44 ft',
    setupTime: '15 min',
    paddleSpec: '12 Advanced Paddles',
    netSpec: 'Advanced Portable Net',
    ballCount: 60,
    linesIncluded: false,
    bestFor: 'Private estates, corporate lots, resorts, schools, and large OC meetups',
    colorways: [
      { name: 'Premier Forest & Volt', primaryHex: '#172E1B', secondaryHex: '#FCFFAD' },
      { name: 'Sage & Cream', primaryHex: '#627F65', secondaryHex: '#FCFFEB' },
    ],
    includedItems: [
      '12 Courtify Advanced Paddles ($119.99 value each)',
      '1 Courtify Advanced Portable Net ($1,500 value)',
      '5 × 12-Pack Courtify Balls (60 balls total)',
      'Full Courtify facility carry bag & savings of $899.88 off retail',
    ],
    description:
      'More gear, more games, more value. Equips a full roster of 12 players with Advanced Paddles, our flagship Advanced Portable Net, and 60 Courtify balls—saving nearly $900 off retail.',
  },
];

export const GEAR_LINEUP: GearLineupItem[] = [
  {
    id: 'gear-beg-paddle',
    category: 'Paddles',
    name: 'Beginner Paddle',
    priceDisplay: '$39.99',
    priceUsd: 39.99,
    description: 'Great feel. Reliable performance. Perfect for casual and competitive play.',
  },
  {
    id: 'gear-adv-paddle',
    category: 'Paddles',
    name: 'Advanced Paddle',
    priceDisplay: '$119.99',
    priceUsd: 119.99,
    description: 'More control. More power. Built for players who want an edge.',
  },
  {
    id: 'gear-beg-net',
    category: 'Portable Nets',
    name: 'Portable Net (Beginner)',
    priceDisplay: '$129.99',
    priceUsd: 129.99,
    description: 'Set up in minutes. Play anywhere. Includes wheeled carry bag.',
  },
  {
    id: 'gear-adv-net',
    category: 'Portable Nets',
    name: 'Portable Net (Advanced)',
    priceDisplay: '$1,500',
    priceUsd: 1500,
    description: 'Heavy-duty tournament-grade portable net system built for daily play.',
  },
  {
    id: 'gear-lines',
    category: 'Court Lines',
    name: 'Portable Court Lines',
    priceDisplay: '$104.99',
    priceUsd: 104.99,
    description: 'Regulation 20 × 44 ft boundary lines for driveways, cul-de-sacs, and parking lots.',
  },
  {
    id: 'gear-balls-3',
    category: 'Balls',
    name: 'Courtify Balls (3 Pack)',
    priceDisplay: '$8.99',
    priceUsd: 8.99,
    description: 'Consistent bounce. Built for real play.',
  },
  {
    id: 'gear-balls-12',
    category: 'Balls',
    name: 'Courtify Balls (12 Pack)',
    priceDisplay: '$24.99',
    priceUsd: 24.99,
    description: '12 outdoor pickleballs for group sessions and practice.',
  },
];

/**
 * Verified Orange County public pickleball court facilities with accurate court counts,
 * operating windows, and lighting rules.
 */
export const OC_COURTS: CourtLocation[] = [
  {
    id: 'oc-irv-mikeward',
    name: 'Mike Ward Community Park (Woodbridge)',
    city: 'Irvine',
    address: '20 Lake Rd, Irvine, CA 92604',
    coords: [-117.7988, 33.6716],
    totalCourts: 8,
    courtBreakdown: '8 dedicated courts · Sound barriers',
    lighting: 'Lit Until 10 PM',
    openHour: 6.5,
    closeHour: 22,
    hoursLabel: 'Dawn – 10:00 PM',
    baseDemand: 0.78,
    notes: 'Dedicated courts with shade canopies and acoustic baffling; paddle rack rotation during peak evening hours.',
  },
  {
    id: 'oc-irv-portola',
    name: 'Portola Springs Community Park',
    city: 'Irvine',
    address: '900 Tomato Springs, Irvine, CA 92618',
    coords: [-117.7056, 33.6948],
    totalCourts: 8,
    courtBreakdown: '6 dedicated · 2 hybrid courts',
    lighting: 'Lit Until 10 PM',
    openHour: 6.5,
    closeHour: 22,
    hoursLabel: 'Dawn – 10:00 PM',
    baseDemand: 0.64,
    notes: 'City reservations active 7 AM–12 PM & 4 PM–10 PM; remaining courts open for walk-up rotation.',
  },
  {
    id: 'oc-irv-heritage',
    name: 'Heritage Community Park',
    city: 'Irvine',
    address: '14301 Yale Ave, Irvine, CA 92604',
    coords: [-117.7818, 33.6924],
    totalCourts: 6,
    courtBreakdown: '6 dedicated & hybrid courts',
    lighting: 'Lit Until 10 PM',
    openHour: 6.5,
    closeHour: 22,
    hoursLabel: 'Dawn – 10:00 PM',
    baseDemand: 0.72,
    notes: 'High-demand evening neighborhood hub with full court illumination until 10 PM.',
  },
  {
    id: 'oc-nb-coast',
    name: 'Newport Coast Community Center',
    city: 'Newport Beach',
    address: '6401 San Joaquin Hills Rd, Newport Beach, CA 92657',
    coords: [-117.8184, 33.6063],
    totalCourts: 9,
    courtBreakdown: '6 outdoor hard · 3 indoor gym',
    lighting: 'Daylight Only',
    openHour: 7,
    closeHour: 17.5,
    hoursLabel: '7:00 AM – Dusk (Outdoor)',
    baseDemand: 0.68,
    notes: 'Outdoor courts close strictly at dusk (no outdoor lights); indoor gym follows center schedule.',
  },
  {
    id: 'oc-nb-bonita',
    name: 'Bonita Canyon Sports Park',
    city: 'Newport Beach',
    address: '1990 Ford Rd, Newport Beach, CA 92660',
    coords: [-117.8559, 33.6352],
    totalCourts: 4,
    courtBreakdown: '4 dedicated outdoor hard courts',
    lighting: 'Daylight Only',
    openHour: 7,
    closeHour: 17.5,
    hoursLabel: '7:00 AM – Dusk',
    baseDemand: 0.82,
    notes: 'No night lighting; open morning & midday windows before dusk closure.',
  },
  {
    id: 'oc-hb-gwc',
    name: 'Huntington Beach Pickleball (Golden West)',
    city: 'Huntington Beach',
    address: '15744 Goldenwest St, Huntington Beach, CA 92647',
    coords: [-118.0033, 33.7336],
    totalCourts: 24,
    courtBreakdown: '24 dedicated outdoor courts',
    lighting: 'Lit Until 10 PM',
    openHour: 8,
    closeHour: 22,
    hoursLabel: '8:00 AM – 10:00 PM',
    baseDemand: 0.74,
    notes: 'Largest public pickleball hub in North OC with organized skill-level open play and full LED lighting.',
  },
  {
    id: 'oc-hb-worthy',
    name: 'Worthy Park Courts',
    city: 'Huntington Beach',
    address: '1831 17th St, Huntington Beach, CA 92648',
    coords: [-117.9912, 33.6683],
    totalCourts: 4,
    courtBreakdown: '4 permanent outdoor courts',
    lighting: 'Lit Until 10 PM',
    openHour: 7,
    closeHour: 22,
    hoursLabel: '7:00 AM – 10:00 PM',
    baseDemand: 0.85,
    notes: 'Popular neighborhood 4-court layout near downtown HB; evenings regularly run a paddle wait rack.',
  },
  {
    id: 'oc-cm-tewinkle',
    name: 'Costa Mesa Tennis & Pickleball Center (TeWinkle)',
    city: 'Costa Mesa',
    address: '880 Junipero Dr, Costa Mesa, CA 92626',
    coords: [-117.9052, 33.6725],
    totalCourts: 8,
    courtBreakdown: '8 dedicated LED-lit courts',
    lighting: 'Lit Until 10 PM',
    openHour: 7,
    closeHour: 22,
    hoursLabel: '7:00 AM – 10:00 PM',
    baseDemand: 0.79,
    notes: 'Renovated surface with upgraded energy-efficient LED floodlighting for evening play.',
  },
  {
    id: 'oc-ln-regional',
    name: 'Laguna Niguel Regional Park',
    city: 'Laguna Niguel',
    address: '28241 La Paz Rd, Laguna Niguel, CA 92677',
    coords: [-117.7042, 33.5416],
    totalCourts: 12,
    courtBreakdown: '12 dedicated outdoor hard courts',
    lighting: 'Lit Until 10 PM',
    openHour: 7,
    closeHour: 21,
    hoursLabel: '7:00 AM – 9:00 PM',
    baseDemand: 0.62,
    notes: 'Recently expanded 12-court OC Parks complex ($3 weekday / $5 weekend parking entry).',
  },
  {
    id: 'oc-ln-crown',
    name: 'Crown Valley Elementary Courts',
    city: 'Laguna Niguel',
    address: '29292 Crown Valley Pkwy, Laguna Niguel, CA 92677',
    coords: [-117.6949, 33.5322],
    totalCourts: 8,
    courtBreakdown: '8 dedicated outdoor courts',
    lighting: 'Daylight Only',
    openHour: 15.5,
    closeHour: 17.5,
    hoursLabel: 'After School & Weekends – Dusk',
    baseDemand: 0.55,
    notes: 'City-managed drop-in access outside school hours; no night lighting.',
  },
];

export interface OcCityHub {
  city: CourtLocation['city'];
  coords: [number, number];
  labelOffset: [number, number];
}

export const OC_CITY_HUBS: OcCityHub[] = [
  { city: 'Huntington Beach', coords: [-117.997, 33.702], labelOffset: [-6, -16] },
  { city: 'Costa Mesa', coords: [-117.9052, 33.6725], labelOffset: [0, -16] },
  { city: 'Newport Beach', coords: [-117.837, 33.621], labelOffset: [-8, 22] },
  { city: 'Irvine', coords: [-117.762, 33.686], labelOffset: [12, -16] },
  { city: 'Laguna Niguel', coords: [-117.700, 33.537], labelOffset: [-12, 22] },
];

/**
 * Simplified geographic outline of Orange County, California for D3 projection framing.
 */
export const OC_BOUNDARY_GEOJSON = {
  type: 'Feature' as const,
  properties: { name: 'Orange County, CA' },
  geometry: {
    type: 'Polygon' as const,
    coordinates: [
      [
        [-118.115, 33.742], // Seal Beach coast
        [-118.105, 33.805], // Los Alamitos
        [-118.065, 33.870], // Cypress / Buena Park
        [-117.985, 33.928], // La Habra West
        [-117.810, 33.942], // Brea / La Habra
        [-117.650, 33.875], // Yorba Linda / Chino Hills
        [-117.530, 33.780], // Santiago Peak border
        [-117.465, 33.640], // Cleveland NF / Ortega
        [-117.510, 33.505], // Rancho Mission Viejo
        [-117.568, 33.435], // San Mateo Pt inland
        [-117.612, 33.408], // San Clemente
        [-117.705, 33.465], // Dana Point
        [-117.785, 33.542], // Laguna Beach
        [-117.875, 33.595], // Corona del Mar
        [-117.932, 33.612], // Newport peninsula
        [-118.015, 33.662], // Huntington Beach pier
        [-118.115, 33.742], // Close polygon
      ],
    ],
  },
};

/**
 * Returns the current Pacific Time (Orange County) decimal hour & formatted timestamp.
 */
export function getOrangeCountyTimeInfo(now: Date = new Date()): {
  hourDecimal: number;
  dayOfWeek: number;
  formattedTime: string;
} {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour12: false,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(now);

  const getPart = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  const h = parseInt(getPart('hour'), 10) % 24;
  const m = parseInt(getPart('minute'), 10);
  const s = parseInt(getPart('second'), 10);
  const weekday = getPart('weekday');
  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(now);

  return {
    hourDecimal: h + m / 60 + s / 3600,
    dayOfWeek: dayMap[weekday] ?? now.getDay(),
    formattedTime,
  };
}

/**
 * Computes realistic live availability for each Orange County facility based on
 * actual operating hours, lighting limits (dusk vs 10 PM), time-of-day curve,
 * deterministic live jitter, and any user-submitted check-in offsets.
 */
export function computeLiveCourts(
  now: Date,
  userAdjustments: Record<string, number> = {}
): LiveCourtLocation[] {
  const { hourDecimal, dayOfWeek, formattedTime } = getOrangeCountyTimeInfo(now);
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const minuteBucket = Math.floor(now.getTime() / 15000); // shifts smoothly every 15s

  // Time-of-day demand multiplier in Orange County
  let timeFactor = 0.55;
  if (hourDecimal >= 7.5 && hourDecimal < 11) {
    timeFactor = isWeekend ? 1.18 : 0.96; // morning peak
  } else if (hourDecimal >= 11 && hourDecimal < 15.5) {
    timeFactor = isWeekend ? 0.85 : 0.62; // midday lull
  } else if (hourDecimal >= 15.5 && hourDecimal < 20.5) {
    timeFactor = 1.15; // after-work prime time
  } else if (hourDecimal >= 20.5) {
    timeFactor = 0.72; // late night wind-down
  }

  return OC_COURTS.map((court, idx) => {
    const isSchoolWeekday =
      court.id === 'oc-ln-crown' && !isWeekend && hourDecimal < court.openHour;
    const isClosed =
      isSchoolWeekday || hourDecimal < court.openHour || hourDecimal >= court.closeHour;

    if (isClosed) {
      return {
        ...court,
        openCourts: 0,
        occupiedCourts: 0,
        waitMins: 0,
        availability: 'Closed',
        lastUpdatedLabel: `${formattedTime} PT`,
      };
    }

    // Small deterministic fluctuation every 15s per venue
    const wave = Math.sin(minuteBucket * 0.7 + idx * 1.9);
    const delta = Math.round(wave * 1);
    const adjustment = userAdjustments[court.id] ?? 0;

    const rawOccupied = Math.round(court.totalCourts * court.baseDemand * timeFactor) + delta + adjustment;
    const occupiedCourts = Math.max(0, Math.min(court.totalCourts, rawOccupied));
    const openCourts = Math.max(0, court.totalCourts - occupiedCourts);

    let availability: CourtAvailabilityState = 'Open Now';
    let waitMins = 0;

    if (openCourts === 0) {
      availability = 'Full';
      waitMins = 20 + ((idx * 5 + minuteBucket) % 15);
    } else if (openCourts <= 2 && court.totalCourts >= 6) {
      availability = 'Waitlist';
      waitMins = 8;
    }

    return {
      ...court,
      openCourts,
      occupiedCourts,
      waitMins,
      availability,
      lastUpdatedLabel: `${formattedTime} PT`,
    };
  });
}
