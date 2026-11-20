import heroCourtifyImage from '../assets/images/hero_courtify_pickleball_1794542298699.jpg';
import culdesacBannerImage from '../assets/images/banner_culdesac_portable_court_1794802690667.jpg';
import bundleStarterImage from '../assets/images/bundle_starter_collection_1795133208582.jpg';
import bundlePremiumImage from '../assets/images/bundle_premium_package_1795133211772.jpg';
import bundleBackyardImage from '../assets/images/bundle_backyard_court_1795133212144.jpg';

export type PageRoute = 'home' | 'about' | 'packages' | 'faq' | 'app';

export const COURTIFY_APP_URL = 'https://courtifyca.ai.studio';
export const COURTIFY_APP_ICON_IMAGE = '/assets/aistudio/Courtify_App_Icon_905f34d4.png';
export const HERO_IMAGE = heroCourtifyImage;
export const CULDESAC_BANNER_IMAGE = culdesacBannerImage;

export interface CourtPackage {
  id: string;
  sku: string;
  tierNumber: string;
  tierName: 'Standard' | 'Plus' | 'Backyard';
  name: string;
  tagline: string;
  priceUsd: number;
  retailValueUsd?: number;
  veCheckoutUrl: string;
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
  sku: string;
  category: 'Balls' | 'Paddles' | 'Court Lines' | 'Portable Nets';
  name: string;
  priceDisplay: string;
  priceUsd: number;
  veCheckoutUrl: string;
  image: string;
  description: string;
  highlights: string[];
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
      'Durable frames, wheeled ripstop carry bags, and weather-resistant components built for year-round play anywhere in the U.S.',
  },
  {
    number: '03',
    title: 'Players of All Levels',
    description:
      'From casual driveway rallies with beginner paddles to competitive open-play sessions in neighborhoods nationwide.',
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
    sku: 'BU01',
    tierNumber: '01',
    tierName: 'Standard',
    name: 'Starter Collection',
    tagline:
      '4 Standard Paddles, 1 Portable Pickleball Net, and 24 balls — turn any driveway or cul-de-sac into a court.',
    priceUsd: 350,
    retailValueUsd: 529.96,
    veCheckoutUrl:
      'https://portal.veinternational.org/buybuttons/us0110636/btn/starter-collection-bu01/',
    image: bundleStarterImage,
    imageNote: 'BU01 Studio Bundle Set',
    footprint: '20 × 44 ft',
    setupTime: '10 min',
    paddleSpec: '4 Standard Paddles',
    netSpec: 'Portable Pickleball Net (PN01)',
    ballCount: 24,
    linesIncluded: false,
    bestFor: 'Driveways, cul-de-sacs, neighborhood streets, and weekend rallies',
    colorways: [
      { name: 'Court Sage & Volt Yellow', primaryHex: '#627F65', secondaryHex: '#FCFFAD' },
      { name: 'Forest Green & Cream', primaryHex: '#172E1B', secondaryHex: '#FCFFEB' },
    ],
    includedItems: [
      '4 Courtify Standard Paddles ($39.99 value each)',
      '1 Portable Pickleball Net — PN01 ($129.99 value)',
      '2 × 12-Pack Courtify Balls (24 balls total)',
      'Courtify wheeled carry bag (add Portable Court Lines for $104.99)',
    ],
    description:
      'When public courts nearby are packed, unroll your own game anywhere flat. Sets up in minutes on a driveway, cul-de-sac, or open lot with great feel right out of the bag.',
  },
  {
    id: 'pkg-premium',
    sku: 'BU02',
    tierNumber: '02',
    tierName: 'Plus',
    name: 'Premium Package',
    tagline:
      '6 Advanced Paddles, 1 Portable Pickleball Net, Portable Court Lines, and 36 balls for instant anywhere courts.',
    priceUsd: 635,
    veCheckoutUrl:
      'https://portal.veinternational.org/buybuttons/us0110636/btn/premium-package-bu02/',
    image: bundlePremiumImage,
    imageNote: 'BU02 Studio Bundle Set',
    footprint: '20 × 44 ft',
    setupTime: '15 min',
    paddleSpec: '6 Advanced Paddles',
    netSpec: 'Portable Net + Court Lines',
    ballCount: 36,
    linesIncluded: true,
    bestFor: 'Parking lots, cul-de-sacs, home concrete pads, and pop-up play',
    colorways: [
      { name: 'Court Sage & Mint', primaryHex: '#627F65', secondaryHex: '#A1CEA7' },
      { name: 'Deep Forest & Volt', primaryHex: '#172E1B', secondaryHex: '#FCFFAD' },
    ],
    includedItems: [
      '6 Courtify Advanced Paddles — PP02 ($119.99 value each)',
      '1 Portable Pickleball Net — PN01 with carry bag',
      '1 Portable Court Lines Set — CL01 ($104.99 value) for 20 × 44 ft boundaries',
      '3 × 12-Pack Courtify Balls (36 balls total)',
    ],
    description:
      'More control, more power, and regulation boundary lines included. Lay out a complete pickleball court on a driveway, parking lot, or blacktop in 15 minutes.',
  },
  {
    id: 'pkg-backyard',
    sku: 'BU03',
    tierNumber: '03',
    tierName: 'Backyard',
    name: 'Backyard Bundle',
    tagline:
      '4 Advanced Paddles, 1 Premium Pickleball Net, Portable Court Lines, and 36 balls built for permanent-feel home courts.',
    priceUsd: 1850,
    retailValueUsd: 2159.92,
    veCheckoutUrl:
      'https://portal.veinternational.org/buybuttons/us0110636/btn/backyard-bundle-bu03/',
    image: bundleBackyardImage,
    imageNote: 'BU03 Studio Bundle Set',
    footprint: '20 × 44 ft',
    setupTime: '15 min',
    paddleSpec: '4 Advanced Paddles',
    netSpec: 'Premium Pickleball Net (PN02)',
    ballCount: 36,
    linesIncluded: true,
    bestFor: 'Home sport pads, wide driveways, cul-de-sac setups, and private backyards',
    colorways: [
      { name: 'Backyard Sage & Forest', primaryHex: '#627F65', secondaryHex: '#172E1B' },
      { name: 'Mint & Volt Yellow', primaryHex: '#A1CEA7', secondaryHex: '#FCFFAD' },
    ],
    includedItems: [
      '1 Courtify Premium Pickleball Net — PN02 ($1,500 value)',
      '4 Courtify Advanced Paddles — PP02 ($119.99 value each)',
      '1 Portable Court Lines Set — CL01 ($104.99 value)',
      '3 × 12-Pack Courtify Balls (36 balls total)',
    ],
    description:
      'Pairs our flagship heavy-duty Premium Pickleball Net with four Advanced Paddles, regulation Portable Court Lines, and 36 outdoor balls—everything needed for tournament-tension matches right at home.',
  },
];

/**
 * Individual gear lineup sorted hierarchically from lowest price ($8.99) to highest ($1,500),
 * each mapped directly to its matching studio product image and VE checkout button URL.
 */
export const GEAR_LINEUP: GearLineupItem[] = [
  {
    id: 'gear-balls-3',
    sku: 'PB01',
    category: 'Balls',
    name: '3-Pack Balls',
    priceDisplay: '$8.99',
    priceUsd: 8.99,
    veCheckoutUrl:
      'https://portal.veinternational.org/buybuttons/us0110636/btn/3-pack-balls-pb01/',
    image: '/assets/aistudio/3_ball_package_3a8c29a5.png',
    description: 'Consistent bounce outdoor pickleballs built for driveway and park rallies.',
    highlights: ['3 outdoor-rated pickleballs', 'High-visibility volt tone', 'True seam flight'],
  },
  {
    id: 'gear-balls-12',
    sku: 'PB02',
    category: 'Balls',
    name: '12-Pack Balls',
    priceDisplay: '$24.99',
    priceUsd: 24.99,
    veCheckoutUrl:
      'https://portal.veinternational.org/buybuttons/us0110636/btn/12-pack-balls-pb02/',
    image: '/assets/aistudio/12_ball_package_e16a9d68.png',
    description: '12 outdoor pickleballs for group sessions, drills, and neighborhood open play.',
    highlights: ['12 tournament-weight balls', 'Crack-resistant shell', 'Reusable mesh pack'],
  },
  {
    id: 'gear-std-paddle',
    sku: 'PP01',
    category: 'Paddles',
    name: 'Standard Paddle',
    priceDisplay: '$39.99',
    priceUsd: 39.99,
    veCheckoutUrl:
      'https://portal.veinternational.org/buybuttons/us0110636/btn/standard-paddle-pp01/',
    image: '/assets/aistudio/standard_paddle_b8867313.png',
    description: 'Great feel and reliable control. Ideal for casual rallies and new players.',
    highlights: ['Balanced sweet spot', 'Cushioned non-slip grip', 'Lightweight all-court face'],
  },
  {
    id: 'gear-lines',
    sku: 'CL01',
    category: 'Court Lines',
    name: 'Portable Court Lines',
    priceDisplay: '$104.99',
    priceUsd: 104.99,
    veCheckoutUrl:
      'https://portal.veinternational.org/buybuttons/us0110636/btn/portable-court-lines-cl01/',
    image: '/assets/aistudio/portable_court_tape_6127be65.png',
    description: 'Regulation 20 × 44 ft boundary lines for driveways, cul-de-sacs, and parking lots.',
    highlights: ['Non-marking rubber strips', 'Sets 20 × 44 ft court', 'Carry reel included'],
  },
  {
    id: 'gear-adv-paddle',
    sku: 'PP02',
    category: 'Paddles',
    name: 'Advanced Paddle',
    priceDisplay: '$119.99',
    priceUsd: 119.99,
    veCheckoutUrl:
      'https://portal.veinternational.org/buybuttons/us0110636/btn/advanced-paddle-pp02/',
    image: '/assets/aistudio/advanced_paddle__flip_upright__d25197d7.png',
    description: 'More control and responsive pop. Built for players seeking extra spin and edge.',
    highlights: ['Textured carbon-style face', 'Polymer honeycomb core', 'Extended handle control'],
  },
  {
    id: 'gear-std-net',
    sku: 'PN01',
    category: 'Portable Nets',
    name: 'Portable Pickleball Net',
    priceDisplay: '$129.99',
    priceUsd: 129.99,
    veCheckoutUrl:
      'https://portal.veinternational.org/buybuttons/us0110636/btn/portable-pickleball-net-pn01/',
    image: '/assets/aistudio/standard_net_0e32225f.png',
    description: 'Sets up in minutes on any flat surface. Includes interlocking frame and carry bag.',
    highlights: ['22 ft regulation net width', 'Tool-free assembly', 'Wheeled storage bag'],
  },
  {
    id: 'gear-prem-net',
    sku: 'PN02',
    category: 'Portable Nets',
    name: 'Premium Pickleball Net',
    priceDisplay: '$1,500',
    priceUsd: 1500,
    veCheckoutUrl:
      'https://portal.veinternational.org/buybuttons/us0110636/btn/premium-pickeball-net-pn02/',
    image: '/assets/aistudio/premium_net_36b97b50.png',
    description: 'Heavy-duty tournament-grade portable net system built for daily backyard or club play.',
    highlights: ['Locking steel rolling base', 'Crank-tensioned center cable', 'All-weather powder coat'],
  },
];

export interface FaqItem {
  id: string;
  category: 'Portable Courts & Gear' | 'Orders & Checkout' | 'Courtify App';
  question: string;
  answer: string;
}

export const TEMPORARY_FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Portable Courts & Gear',
    question: 'How fast can I set up a Courtify portable pickleball court?',
    answer:
      'Most Courtify portable nets and court line sets go up in 10 to 15 minutes with no tools required. Interlocking frame pieces snap together cleanly so you can start rallying on a driveway, cul-de-sac, or open parking lot right away.',
  },
  {
    id: 'faq-2',
    category: 'Portable Courts & Gear',
    question: 'How much flat space do I need for a regulation pickleball court?',
    answer:
      'A standard pickleball court measures 20 × 44 feet. For comfortable movement beyond the sidelines and baselines, we recommend roughly 26 × 54 feet of flat concrete or asphalt—though casual driveway and cul-de-sac rallies work great in tighter neighborhood spaces too.',
  },
  {
    id: 'faq-3',
    category: 'Portable Courts & Gear',
    question: 'What is the difference between the Starter Collection, Premium Package, and Backyard Bundle?',
    answer:
      'Starter Collection ($350) equips 4 players with Standard Paddles, our Portable Pickleball Net (PN01), and 24 balls. Premium Package ($635) steps up to 6 Advanced Paddles, Portable Court Lines (CL01), and 36 balls. Backyard Bundle ($1,850) upgrades to our heavy-duty $1,500 Premium Pickleball Net (PN02) paired with 4 Advanced Paddles, court lines, and 36 balls.',
  },
  {
    id: 'faq-4',
    category: 'Portable Courts & Gear',
    question: 'What is the difference between the Standard Paddle (PP01) and Advanced Paddle (PP02)?',
    answer:
      'The Standard Paddle ($39.99) offers an approachable sweet spot and lightweight balance for casual play and beginners. The Advanced Paddle ($119.99) adds a textured spin-friendly hitting surface, upgraded core response, and extra power for competitive matches.',
  },
  {
    id: 'faq-5',
    category: 'Portable Courts & Gear',
    question: 'Will Portable Court Lines (CL01) damage my driveway or asphalt?',
    answer:
      'No. Courtify Portable Court Lines sit flat without adhesive, paint, or stakes, making them safe for residential driveways, HOA cul-de-sacs, gym floors, and multi-use blacktops.',
  },
  {
    id: 'faq-6',
    category: 'Orders & Checkout',
    question: 'How does clicking "Buy Now" check out my order?',
    answer:
      'Every "Buy Now" button connects directly to its matching product checkout page on Virtual Enterprises International (portal.veinternational.org), ensuring accurate SKU pricing and instant order processing.',
  },
  {
    id: 'faq-7',
    category: 'Courtify App',
    question: 'Do I need the Courtify app to use portable court packages?',
    answer:
      'No—your net, paddles, lines, and balls work anywhere out of the bag. The Courtify app (courtifyca.ai.studio) complements your gear by helping players across the United States locate open public courts or invite friends to a pop-up driveway or cul-de-sac game when nearby parks are full.',
  },
  {
    id: 'faq-8',
    category: 'Courtify App',
    question: 'Where can I open and use the Courtify app?',
    answer:
      'You can launch the Courtify app directly anytime by visiting the Courtify App tab in the top navigation or clicking the Courtify App icon to open courtifyca.ai.studio.',
  },
];

export const TEMPORARY_ABOUT_US = {
  eyebrow: 'About Courtify · Temporary Company Overview',
  headline: 'Built so pickleball is possible anywhere across the U.S.',
  intro:
    'Courtify started with a simple frustration players nationwide know well: driving to a neighborhood park only to find every pickleball court full for the next hour. Instead of waiting on a paddle rack, we pair a live court-locator app with portable, regulation-ready gear you can set up anywhere flat.',
  storyTitle: 'Why we pair an app with portable courts',
  storyParagraphs: [
    'On one side, the Courtify app helps players check open public courts across communities nationwide before leaving home.',
    'On the other side, when local courts are packed—or when you just want to play steps from your front door—our portable nets, boundary lines, paddles, and balls turn any driveway, cul-de-sac, or parking lot into a real 20 × 44 ft pickleball court in minutes.',
  ],
  highlights: [
    { label: 'Availability', value: 'Nationwide (U.S.)' },
    { label: 'Setup Time', value: '10–15 Minutes' },
    { label: 'Court Footprint', value: '20 × 44 ft' },
    { label: 'Gear Range', value: '$8.99 – $1,850' },
  ],
};
