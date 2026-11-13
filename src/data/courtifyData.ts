export type PageRoute = 'home' | 'book' | 'packages' | 'app';

export const COURTIFY_APP_URL = 'https://courtifyca.ai.studio';

export interface CourtPackage {
  id: string;
  tierNumber: string;
  tierName: 'Standard' | 'Plus' | 'Pro' | 'Premier';
  name: string;
  tagline: string;
  priceCad: number;
  retailValueCad?: number;
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
  priceCad: number;
  variantLabel?: string;
  description: string;
}

export interface CourtVenue {
  id: string;
  name: string;
  city: 'Toronto' | 'Vancouver' | 'Calgary' | 'Montreal';
  neighborhood: string;
  surface: string;
  lighting: 'LED Floodlit' | 'Daylight Only';
  hourlyRateCad: number;
  courtCount: number;
  slots: string[];
  distanceNote: string;
}

export interface BookingRecord {
  id: string;
  code: string;
  venueId: string;
  venueName: string;
  city: string;
  date: string;
  timeSlot: string;
  durationMins: 60 | 90 | 120;
  includeGear: boolean;
  playerName: string;
  playerEmail: string;
  skillLevel: 'Recreational' | 'Intermediate' | 'Competitive';
  totalCad: number;
  createdAt: string;
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

export const HERO_IMAGE = '/src/assets/images/hero_courtify_pickleball_1794542298699.jpg';

export const COURTIFY_PILLARS = [
  {
    number: '01',
    title: 'Premium Quality',
    description:
      'High-grade carbon and composite paddles, tensioned portable nets, and consistent outdoor balls engineered for clean play.',
  },
  {
    number: '02',
    title: 'Built for the Long Run',
    description:
      'Durable frames, wheeled ripstop carry bags, and weather-ready components designed to hold up season after season.',
  },
  {
    number: '03',
    title: 'Players of All Levels',
    description:
      'From first-time driveway rallies with beginner paddles to competitive club nights and full facility setups.',
  },
  {
    number: '04',
    title: 'A Greener Tomorrow',
    description:
      'Long-life modular hardware and responsible materials built to reduce disposable gear waste across every court.',
  },
];

export const COURT_PACKAGES: CourtPackage[] = [
  {
    id: 'pkg-starter',
    tierNumber: '01',
    tierName: 'Standard',
    name: 'Starter Collection',
    tagline:
      '4 Beginner Paddles, 1 Beginner Portable Net, and 24 outdoor balls — everything needed to play right out of the bag.',
    priceCad: 350,
    retailValueCad: 529.96,
    image: '/src/assets/images/package_standard_rally_1794542298970.jpg',
    imageNote: 'Temporary example image — actual product photos coming soon',
    footprint: '20 × 44 ft',
    setupTime: '10 min',
    paddleSpec: '4 Beginner Paddles',
    netSpec: 'Beginner Portable Net',
    ballCount: 24,
    linesIncluded: false,
    bestFor: 'First-time players, families, driveways, and weekend park rallies',
    colorways: [
      { name: 'Court Sage & Volt Yellow', primaryHex: '#627F65', secondaryHex: '#FCFFAD' },
      { name: 'Forest Green & Cream', primaryHex: '#172E1B', secondaryHex: '#FCFFEB' },
    ],
    includedItems: [
      '4 Courtify Beginner Paddles ($39.99 value each)',
      '1 Portable Pickleball Net — Beginner ($129.99 value)',
      '2 × 12-Pack Courtify Balls (24 balls total)',
      'Courtify wheeled carry bag (add Portable Court Lines for +$25 bundle / $104.99 solo)',
    ],
    description:
      'Great feel and reliable performance right out of the carry bag. Ideal for casual doubles, driveways, and community spaces—available with optional Portable Court Lines ($375 line-included configuration).',
  },
  {
    id: 'pkg-premium',
    tierNumber: '02',
    tierName: 'Plus',
    name: 'Premium Package',
    tagline:
      '6 Advanced Paddles, 1 Portable Net, 1 Portable Court Line Set, and 36 balls for competitive backyard & park games.',
    priceCad: 635,
    image: '/src/assets/images/package_plus_modular_1794542299493.jpg',
    imageNote: 'Temporary example image — actual product photos coming soon',
    footprint: '20 × 44 ft',
    setupTime: '15 min',
    paddleSpec: '6 Advanced Paddles',
    netSpec: 'Portable Net + Court Line Set',
    ballCount: 36,
    linesIncluded: true,
    bestFor: 'Competitive groups, backyard concrete pads, and pop-up court hosts',
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
      'More control, more power, and complete court marking anywhere there is flat pavement. Built for players who want an edge plus full boundary lines in one portable kit.',
  },
  {
    id: 'pkg-club',
    tierNumber: '03',
    tierName: 'Pro',
    name: 'Club Court Bundle',
    tagline:
      '6 Advanced Paddles, 1 Advanced Portable Net ($1,500 tier), and 36 balls for clubs and serious match play.',
    priceCad: 2300,
    retailValueCad: 3019.94,
    image: '/src/assets/images/package_pro_tournament_1794542300579.jpg',
    imageNote: 'Temporary example image — actual product photos coming soon',
    footprint: '20 × 44 ft',
    setupTime: '15 min',
    paddleSpec: '6 Advanced Paddles',
    netSpec: 'Advanced Portable Net',
    ballCount: 36,
    linesIncluded: false,
    bestFor: 'Pickleball clubs, schools, leagues, and multi-court community venues',
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
      '12 Advanced Paddles, 1 Advanced Portable Net, and 60 balls — maximum gear and value for facilities & events.',
    priceCad: 3400,
    retailValueCad: 4299.88,
    image: '/src/assets/images/package_premier_estate_1794542300272.jpg',
    imageNote: 'Temporary example image — actual product photos coming soon',
    footprint: '20 × 44 ft',
    setupTime: '15 min',
    paddleSpec: '12 Advanced Paddles',
    netSpec: 'Advanced Portable Net',
    ballCount: 60,
    linesIncluded: false,
    bestFor: 'Athletic facilities, tournaments, resorts, and corporate court activations',
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
    priceCad: 39.99,
    description: 'Great feel. Reliable performance. Perfect for casual and competitive play.',
  },
  {
    id: 'gear-adv-paddle',
    category: 'Paddles',
    name: 'Advanced Paddle',
    priceDisplay: '$119.99',
    priceCad: 119.99,
    description: 'More control. More power. Built for players who want an edge.',
  },
  {
    id: 'gear-beg-net',
    category: 'Portable Nets',
    name: 'Portable Net (Beginner)',
    priceDisplay: '$129.99',
    priceCad: 129.99,
    description: 'Set up in minutes. Play anywhere. Includes wheeled carry bag.',
  },
  {
    id: 'gear-adv-net',
    category: 'Portable Nets',
    name: 'Portable Net (Advanced)',
    priceDisplay: '$1,500',
    priceCad: 1500,
    description: 'Heavy-duty tournament-grade portable net system built for club & facility use.',
  },
  {
    id: 'gear-lines',
    category: 'Court Lines',
    name: 'Portable Court Lines',
    priceDisplay: '$104.99',
    priceCad: 104.99,
    description: 'Regulation 20 × 44 ft boundary line set for driveways, parks, and gyms.',
  },
  {
    id: 'gear-balls-3',
    category: 'Balls',
    name: 'Courtify Balls (3 Pack)',
    priceDisplay: '$8.99',
    priceCad: 8.99,
    description: 'Consistent bounce. Built for real play.',
  },
  {
    id: 'gear-balls-12',
    category: 'Balls',
    name: 'Courtify Balls (12 Pack)',
    priceDisplay: '$24.99',
    priceCad: 24.99,
    description: '12 outdoor pickleballs for club sessions and practice.',
  },
];

export const COURT_VENUES: CourtVenue[] = [
  {
    id: 'ven-tor-harbour',
    name: 'Harbourfront Pop-Up Court A',
    city: 'Toronto',
    neighborhood: 'Queens Quay West',
    surface: 'Advanced Portable Court',
    lighting: 'LED Floodlit',
    hourlyRateCad: 38,
    courtCount: 4,
    slots: ['07:30', '09:00', '10:30', '12:00', '15:30', '17:00', '18:30', '20:00'],
    distanceNote: '4 min walk from Union Station',
  },
  {
    id: 'ven-tor-liberty',
    name: 'Liberty Village Deck 02',
    city: 'Toronto',
    neighborhood: 'Atlantic Ave',
    surface: 'Club Court Setup',
    lighting: 'LED Floodlit',
    hourlyRateCad: 42,
    courtCount: 2,
    slots: ['08:00', '09:30', '11:30', '13:30', '16:30', '18:00', '19:30'],
    distanceNote: 'Covered parking on-site',
  },
  {
    id: 'ven-van-kits',
    name: 'Kitsilano Pier Modular North',
    city: 'Vancouver',
    neighborhood: 'Cornwall Ave',
    surface: 'Advanced Portable Court',
    lighting: 'LED Floodlit',
    hourlyRateCad: 36,
    courtCount: 4,
    slots: ['07:00', '08:30', '10:00', '13:00', '16:00', '17:30', '19:00'],
    distanceNote: 'Waterfront court · Wind screens installed',
  },
  {
    id: 'ven-van-falsecreek',
    name: 'False Creek Plaza Court',
    city: 'Vancouver',
    neighborhood: 'Olympic Village',
    surface: 'Starter Portable Court',
    lighting: 'Daylight Only',
    hourlyRateCad: 30,
    courtCount: 3,
    slots: ['08:00', '09:30', '11:00', '12:30', '14:00', '15:30'],
    distanceNote: '2 min from SkyTrain',
  },
  {
    id: 'ven-cal-bow',
    name: 'Bow Valley Riverbank Court',
    city: 'Calgary',
    neighborhood: 'Eau Claire',
    surface: 'Club Court Setup',
    lighting: 'LED Floodlit',
    hourlyRateCad: 32,
    courtCount: 3,
    slots: ['07:30', '09:00', '11:00', '14:00', '17:00', '18:30', '20:00'],
    distanceNote: 'Heated winter pavilion access',
  },
  {
    id: 'ven-mtl-mileend',
    name: 'Mile End Courtyard 01',
    city: 'Montreal',
    neighborhood: 'Rue Saint-Viateur',
    surface: 'Facility Portable Court',
    lighting: 'LED Floodlit',
    hourlyRateCad: 34,
    courtCount: 2,
    slots: ['08:30', '10:00', '12:00', '15:00', '17:30', '19:00', '20:30'],
    distanceNote: 'Indoor-outdoor courtyard shelter',
  },
];

export function getUpcomingDates(days = 7): { iso: string; label: string; shortDay: string }[] {
  const result: { iso: string; label: string; shortDay: string }[] = [];
  const base = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const iso = d.toISOString().split('T')[0];
    const shortDay =
      i === 0
        ? 'Today'
        : i === 1
          ? 'Tomorrow'
          : d.toLocaleDateString('en-CA', { weekday: 'short' });
    const label = d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' });
    result.push({ iso, label, shortDay });
  }
  return result;
}
