import { useMemo, useState } from 'react';
import { Check, ExternalLink, Search, X } from 'lucide-react';
import {
  COURT_PACKAGES,
  CourtPackage,
  GEAR_LINEUP,
  GearLineupItem,
} from '../data/courtifyData';
import { ResilientImage } from './ResilientImage';

interface PackagesViewProps {
  initialSelectedPackageId?: string | null;
  initialSearchQuery?: string;
}

type CategoryFilter =
  | 'All Products'
  | 'Balls'
  | 'Paddles'
  | 'Court Lines'
  | 'Portable Nets'
  | 'Court Bundles';

const CATEGORIES: CategoryFilter[] = [
  'All Products',
  'Balls',
  'Paddles',
  'Court Lines',
  'Portable Nets',
  'Court Bundles',
];

interface HierarchicalCatalogEntry {
  kind: 'gear' | 'package';
  id: string;
  sku: string;
  name: string;
  category: Exclude<CategoryFilter, 'All Products'>;
  priceUsd: number;
  priceDisplay: string;
  tierGroup: 'essentials' | 'bundles';
  gear?: GearLineupItem;
  pkg?: CourtPackage;
  searchCorpus: string;
}

export function PackagesView({
  initialSelectedPackageId = null,
  initialSearchQuery = '',
}: PackagesViewProps) {
  const [viewMode, setViewMode] = useState<'hierarchy' | 'compare'>('hierarchy');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All Products');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  const [activePackage, setActivePackage] = useState<CourtPackage | null>(() => {
    if (!initialSelectedPackageId) return null;
    return COURT_PACKAGES.find((p) => p.id === initialSelectedPackageId) ?? null;
  });
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  // Combine all 10 VE-linked items (gear + packages) and sort strictly ascending by priceUsd ($8.99 -> $1,850)
  const allProductsSorted = useMemo<HierarchicalCatalogEntry[]>(() => {
    const gearEntries: HierarchicalCatalogEntry[] = GEAR_LINEUP.map((gear) => ({
      kind: 'gear',
      id: gear.id,
      sku: gear.sku,
      name: gear.name,
      category: gear.category,
      priceUsd: gear.priceUsd,
      priceDisplay: gear.priceDisplay,
      tierGroup: gear.priceUsd >= 300 ? 'bundles' : 'essentials',
      gear,
      searchCorpus: [
        gear.sku,
        gear.name,
        gear.category,
        gear.priceDisplay,
        gear.description,
        ...gear.highlights,
      ]
        .join(' ')
        .toLowerCase(),
    }));

    const packageEntries: HierarchicalCatalogEntry[] = COURT_PACKAGES.map((pkg) => ({
      kind: 'package',
      id: pkg.id,
      sku: pkg.sku,
      name: pkg.name,
      category: 'Court Bundles',
      priceUsd: pkg.priceUsd,
      priceDisplay: `$${pkg.priceUsd.toLocaleString()}`,
      tierGroup: 'bundles',
      pkg,
      searchCorpus: [
        pkg.sku,
        pkg.name,
        pkg.tierName,
        'Court Bundles',
        pkg.tagline,
        pkg.description,
        pkg.paddleSpec,
        pkg.netSpec,
        pkg.bestFor,
        ...pkg.includedItems,
      ]
        .join(' ')
        .toLowerCase(),
    }));

    return [...gearEntries, ...packageEntries].sort((a, b) => a.priceUsd - b.priceUsd);
  }, []);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allProductsSorted.filter((entry) => {
      if (selectedCategory !== 'All Products' && entry.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      return entry.searchCorpus.includes(q);
    });
  }, [allProductsSorted, selectedCategory, searchQuery]);

  const isGroupedHierarchy =
    viewMode === 'hierarchy' &&
    selectedCategory === 'All Products' &&
    searchQuery.trim() === '';

  const tierEssentials = useMemo(
    () => filteredProducts.filter((p) => p.tierGroup === 'essentials'),
    [filteredProducts]
  );
  const tierBundles = useMemo(
    () => filteredProducts.filter((p) => p.tierGroup === 'bundles'),
    [filteredProducts]
  );

  const handleOpenDetail = (pkg: CourtPackage) => {
    setActivePackage(pkg);
    setSelectedColorIndex(0);
  };

  const renderBuyButton = (veUrl: string) => (
    <a
      href={veUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-1 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#627F65]"
    >
      <span>Buy Now</span>
      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
    </a>
  );

  const renderCatalogCard = (entry: HierarchicalCatalogEntry) => {
    if (entry.kind === 'gear' && entry.gear) {
      const gear = entry.gear;
      return (
        <article
          key={gear.id}
          className="bg-white border border-[#A1CEA7]/70 rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow"
        >
          <div className="aspect-[4/3] bg-white border-b border-[#A1CEA7]/40 overflow-hidden relative">
            <ResilientImage
              src={gear.image}
              alt={`${gear.name} (${gear.sku})`}
              fallbackTitle={gear.name}
              className="w-full h-full object-contain p-4"
            />
            <div className="absolute bottom-3 left-3 bg-[#172E1B]/85 text-[#FCFFEB] text-[11px] font-medium px-2.5 py-1 rounded">
              {gear.sku} · {gear.category}
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-bold text-[#172E1B]">{gear.name}</h3>
                <div className="font-mono text-xl font-bold text-[#172E1B] tabular-nums shrink-0">
                  {gear.priceDisplay}
                </div>
              </div>

              <p className="text-sm text-[#172819]/75 leading-relaxed">{gear.description}</p>

              <ul className="space-y-1.5 pt-2 border-t border-[#A1CEA7]/40">
                {gear.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-[#172819]/85">
                    <Check className="w-3.5 h-3.5 text-[#627F65] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-[#A1CEA7]/40">
              {renderBuyButton(gear.veCheckoutUrl)}
            </div>
          </div>
        </article>
      );
    }

    if (entry.kind === 'package' && entry.pkg) {
      const pkg = entry.pkg;
      return (
        <article
          key={pkg.id}
          className="bg-white border border-[#A1CEA7]/70 rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow"
        >
          <div className="aspect-[4/3] bg-white border-b border-[#A1CEA7]/40 overflow-hidden relative">
            <ResilientImage
              src={pkg.image}
              alt={`${pkg.tierName} portable pickleball court — ${pkg.name}`}
              fallbackTitle={`${pkg.tierName}: ${pkg.name}`}
              className="w-full h-full object-contain p-4"
            />
            <div className="absolute bottom-3 left-3 bg-[#172E1B]/85 text-[#FCFFEB] text-[11px] font-medium px-2.5 py-1 rounded">
              {pkg.sku} · {pkg.tierName} Bundle
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl font-bold text-[#172E1B]">{pkg.name}</h3>
                <div className="text-right shrink-0">
                  <span className="font-mono text-xl font-bold text-[#172E1B] tabular-nums">
                    ${pkg.priceUsd.toLocaleString()}
                  </span>
                  {pkg.retailValueUsd && (
                    <span className="block font-mono text-xs text-[#627F65] tabular-nums">
                      Retail Value: ${pkg.retailValueUsd.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-[#172819]/75 leading-relaxed">{pkg.description}</p>

              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#A1CEA7]/40 text-xs">
                <div>
                  <div className="text-[#627F65]">Paddles</div>
                  <div className="font-mono font-semibold text-[#172E1B] tabular-nums mt-0.5">
                    {pkg.paddleSpec}
                  </div>
                </div>
                <div>
                  <div className="text-[#627F65]">Net System</div>
                  <div className="font-mono font-semibold text-[#172E1B] mt-0.5">
                    {pkg.netSpec}
                  </div>
                </div>
                <div>
                  <div className="text-[#627F65]">Balls Included</div>
                  <div className="font-mono font-semibold text-[#172E1B] tabular-nums mt-0.5">
                    {pkg.ballCount} Balls
                  </div>
                </div>
              </div>

              <ul className="space-y-1.5 pt-2">
                {pkg.includedItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-[#172819]/85">
                    <Check className="w-3.5 h-3.5 text-[#627F65] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#A1CEA7]/40">
              {renderBuyButton(pkg.veCheckoutUrl)}
              <button
                type="button"
                onClick={() => handleOpenDetail(pkg)}
                className="py-2.5 px-4 text-sm font-semibold text-[#172E1B] bg-[#FCFFEB] border border-[#A1CEA7] hover:bg-[#A1CEA7]/25 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Inspect Specs
              </button>
            </div>
          </div>
        </article>
      );
    }

    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#A1CEA7]/60 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#627F65]">
            <span className="font-semibold">Gear Up &amp; Save</span>
            <span aria-hidden="true">·</span>
            <span>Sorted Ascending ($8.99 → $1,850)</span>
            <span aria-hidden="true">·</span>
            <span>Ships Across the United States</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172E1B] text-balance">
            Portable court packages &amp; gear, ordered from essentials to complete setups.
          </h1>
          <p className="text-sm sm:text-base text-[#172819]/80 leading-relaxed">
            Start with individual balls, paddles, and court lines or step up to full portable
            packages for driveways, cul-de-sacs, and parking lots. Click Buy Now on any item to
            check out directly via Virtual Enterprises.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            role="tablist"
            aria-label="Package view mode"
            className="flex items-center gap-1 p-1 bg-[#A1CEA7]/25 rounded-lg"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'hierarchy'}
              onClick={() => setViewMode('hierarchy')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                viewMode === 'hierarchy'
                  ? 'bg-white text-[#172E1B] shadow-sm'
                  : 'text-[#172819]/70 hover:text-[#172E1B]'
              }`}
            >
              Price Hierarchy
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'compare'}
              onClick={() => setViewMode('compare')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                viewMode === 'compare'
                  ? 'bg-white text-[#172E1B] shadow-sm'
                  : 'text-[#172819]/70 hover:text-[#172E1B]'
              }`}
            >
              Compare Bundles
            </button>
          </div>
        </div>
      </div>

      {/* Product Search & Category Filter System */}
      {viewMode === 'hierarchy' && (
        <section
          aria-label="Search and filter Courtify products"
          className="bg-white border border-[#A1CEA7]/70 rounded-xl p-4 sm:p-5 space-y-4"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-xl">
              <Search
                aria-hidden="true"
                className="w-4 h-4 text-[#627F65] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, SKU (e.g. BU03, PN02, PP01), or spec..."
                aria-label="Search Courtify packages and gear"
                className="w-full h-11 pl-10 pr-10 rounded-lg border border-[#A1CEA7] bg-[#FCFFEB]/50 text-sm text-[#172E1B] placeholder:text-[#627F65]/75 focus:outline-none focus:border-[#172E1B]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear product search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#627F65] hover:text-[#172E1B] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="font-mono text-xs font-semibold text-[#627F65] tabular-nums shrink-0">
              Showing {filteredProducts.length} of {allProductsSorted.length} products · Low → High
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Filter catalog by product type"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#A1CEA7]/25 rounded-lg"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-white text-[#172E1B] shadow-sm'
                      : 'text-[#172819]/75 hover:text-[#172E1B]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Main Content: Hierarchical Catalog OR Bundle Comparison Table */}
      {viewMode === 'compare' ? (
        <div className="bg-white border border-[#A1CEA7]/70 rounded-2xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[740px]">
            <thead>
              <tr className="border-b border-[#A1CEA7]/60 bg-[#FCFFEB]">
                <th className="p-5 text-xs font-semibold text-[#627F65] w-44">Package Spec</th>
                {COURT_PACKAGES.map((pkg) => (
                  <th key={pkg.id} className="p-5 align-top">
                    <div className="text-xs font-semibold text-[#627F65]">
                      {pkg.sku} · {pkg.tierName}
                    </div>
                    <div className="font-display text-base font-bold text-[#172E1B] mt-0.5">
                      {pkg.name}
                    </div>
                    <div className="font-mono text-sm font-bold text-[#172E1B] tabular-nums mt-1">
                      ${pkg.priceUsd.toLocaleString()}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#A1CEA7]/35 text-sm">
              <tr>
                <td className="p-5 font-medium text-[#627F65]">Retail Value</td>
                {COURT_PACKAGES.map((pkg) => (
                  <td key={pkg.id} className="p-5 font-mono text-[#172E1B] tabular-nums">
                    {pkg.retailValueUsd ? `$${pkg.retailValueUsd.toLocaleString()}` : 'Bundle Pricing'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-5 font-medium text-[#627F65]">Paddles Included</td>
                {COURT_PACKAGES.map((pkg) => (
                  <td key={pkg.id} className="p-5 text-[#172E1B] font-medium">
                    {pkg.paddleSpec}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-5 font-medium text-[#627F65]">Net System</td>
                {COURT_PACKAGES.map((pkg) => (
                  <td key={pkg.id} className="p-5 text-[#172E1B]">
                    {pkg.netSpec}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-5 font-medium text-[#627F65]">Pickleballs Included</td>
                {COURT_PACKAGES.map((pkg) => (
                  <td key={pkg.id} className="p-5 font-mono text-[#172E1B] tabular-nums">
                    {pkg.ballCount} balls
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-5 font-medium text-[#627F65]">Court Footprint</td>
                {COURT_PACKAGES.map((pkg) => (
                  <td key={pkg.id} className="p-5 font-mono text-[#172E1B] tabular-nums">
                    {pkg.footprint}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-5 font-medium text-[#627F65]">Setup Time</td>
                {COURT_PACKAGES.map((pkg) => (
                  <td key={pkg.id} className="p-5 font-mono text-[#172E1B] tabular-nums">
                    {pkg.setupTime}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-5 font-medium text-[#627F65]">Ideal For</td>
                {COURT_PACKAGES.map((pkg) => (
                  <td key={pkg.id} className="p-5 text-xs text-[#172819]/75 leading-relaxed">
                    {pkg.bestFor}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-5" />
                {COURT_PACKAGES.map((pkg) => (
                  <td key={pkg.id} className="p-5">
                    {renderBuyButton(pkg.veCheckoutUrl)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white border border-[#A1CEA7]/70 rounded-2xl p-10 text-center space-y-3">
          <p className="font-display text-lg font-bold text-[#172E1B]">
            No products matched &ldquo;{searchQuery}&rdquo;.
          </p>
          <p className="text-sm text-[#627F65]">
            Try searching for &ldquo;Paddle&rdquo;, &ldquo;Net&rdquo;, &ldquo;Backyard&rdquo;,
            &ldquo;Balls&rdquo;, or a SKU like &ldquo;BU03&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All Products');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors cursor-pointer"
          >
            Reset Search &amp; Filters
          </button>
        </div>
      ) : isGroupedHierarchy ? (
        <div className="space-y-14">
          {/* Level 01: Individual Essentials ($8.99 -> $129.99) */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#A1CEA7]/50 pb-3">
              <div>
                <p className="text-xs font-semibold text-[#627F65]">Level 01 · Entry &amp; Add-Ons</p>
                <h2 className="font-display text-2xl font-bold text-[#172E1B]">
                  Individual Gear &amp; Court Essentials
                </h2>
              </div>
              <span className="font-mono text-sm font-semibold text-[#627F65] tabular-nums">
                $8.99 – $129.99
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tierEssentials.map(renderCatalogCard)}
            </div>
          </section>

          {/* Level 02: Portable Court Packages & Pro Net ($350 -> $1,850) */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#A1CEA7]/50 pb-3">
              <div>
                <p className="text-xs font-semibold text-[#627F65]">
                  Level 02 · Driveway, Cul-de-Sac &amp; Backyard Systems
                </p>
                <h2 className="font-display text-2xl font-bold text-[#172E1B]">
                  Portable Court Packages &amp; Pro Net
                </h2>
              </div>
              <span className="font-mono text-sm font-semibold text-[#627F65] tabular-nums">
                $350 – $1,850
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {tierBundles.map(renderCatalogCard)}
            </div>
          </section>
        </div>
      ) : (
        /* Filtered / Search Results Grid (strictly sorted ascending by price) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(renderCatalogCard)}
        </div>
      )}

      {/* Package Detail Modal */}
      {activePackage && (
        <div
          className="fixed inset-0 z-50 bg-[#172E1B]/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdp-title"
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-12 border border-[#A1CEA7] shadow-xl">
            <div className="md:col-span-6 bg-white border-b md:border-b-0 md:border-r border-[#A1CEA7]/40 relative min-h-[260px] flex items-center justify-center">
              <ResilientImage
                src={activePackage.image}
                alt={activePackage.name}
                className="w-full h-full object-contain p-6"
              />
              <div className="absolute bottom-3 left-3 bg-[#172E1B]/85 text-[#FCFFEB] text-[11px] px-2.5 py-1 rounded">
                {activePackage.sku} · {activePackage.imageNote}
              </div>
            </div>

            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold text-[#627F65]">
                      {activePackage.sku} · {activePackage.tierName} Bundle
                    </div>
                    <h2 id="pdp-title" className="font-display text-2xl font-bold text-[#172E1B] mt-1">
                      {activePackage.name}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActivePackage(null)}
                    aria-label="Close package details"
                    className="p-2 text-[#627F65] hover:text-[#172E1B] rounded-lg cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-2xl font-bold text-[#172E1B] tabular-nums">
                    ${activePackage.priceUsd.toLocaleString()}
                  </span>
                  {activePackage.retailValueUsd && (
                    <span className="font-mono text-xs text-[#627F65] line-through tabular-nums">
                      Retail ${activePackage.retailValueUsd.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#172819]/80 leading-relaxed">
                  {activePackage.description}
                </p>

                {/* Colorway Picker */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-[#627F65]">
                    Finish / Colorway:{' '}
                    <span className="font-semibold text-[#172E1B]">
                      {activePackage.colorways[selectedColorIndex]?.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activePackage.colorways.map((cw, idx) => (
                      <button
                        key={cw.name}
                        type="button"
                        onClick={() => setSelectedColorIndex(idx)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                          selectedColorIndex === idx
                            ? 'border-[#172E1B] bg-[#FCFFEB] text-[#172E1B]'
                            : 'border-[#A1CEA7]/70 text-[#172819]/75 hover:border-[#627F65]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-sm border border-black/15"
                          style={{ backgroundColor: cw.primaryHex }}
                        />
                        <span>{cw.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Full Included List */}
                <div className="space-y-2 pt-2 border-t border-[#A1CEA7]/40">
                  <div className="text-xs font-semibold text-[#172E1B]">Included in Bundle</div>
                  <ul className="space-y-1.5">
                    {activePackage.includedItems.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[#172819]/85">
                        <Check className="w-3.5 h-3.5 text-[#627F65] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {renderBuyButton(activePackage.veCheckoutUrl)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
