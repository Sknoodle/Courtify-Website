import { useState } from 'react';
import { Check, CheckCircle2, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import {
  COURT_PACKAGES,
  CourtPackage,
  GEAR_LINEUP,
  GearLineupItem,
} from '../data/courtifyData';
import { ResilientImage } from './ResilientImage';

interface CartItem {
  id: string;
  tierLabel: string;
  name: string;
  variantName: string;
  priceCad: number;
  quantity: number;
}

interface PackagesViewProps {
  initialSelectedPackageId?: string | null;
}

export function PackagesView({ initialSelectedPackageId = null }: PackagesViewProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'compare'>('grid');
  const [activePackage, setActivePackage] = useState<CourtPackage | null>(() => {
    if (!initialSelectedPackageId) return null;
    return COURT_PACKAGES.find((p) => p.id === initialSelectedPackageId) ?? null;
  });
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [bagOpen, setBagOpen] = useState<boolean>(false);

  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [orderSubmittedId, setOrderSubmittedId] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalCad = cart.reduce((sum, item) => sum + item.priceCad * item.quantity, 0);

  const handleOpenDetail = (pkg: CourtPackage) => {
    setActivePackage(pkg);
    setSelectedColorIndex(0);
  };

  const addItemToBag = (item: Omit<CartItem, 'quantity'>) => {
    setOrderSubmittedId(null);
    setCart((prev) => {
      const existing = prev.find(
        (c) => c.id === item.id && c.variantName === item.variantName
      );
      if (existing) {
        return prev.map((c) =>
          c.id === item.id && c.variantName === item.variantName
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setBagOpen(true);
  };

  const handleAddPackage = (pkg: CourtPackage, colorwayName: string) => {
    addItemToBag({
      id: pkg.id,
      tierLabel: `${pkg.tierName} Bundle`,
      name: pkg.name,
      variantName: colorwayName,
      priceCad: pkg.priceCad,
    });
  };

  const handleAddGear = (gear: GearLineupItem) => {
    addItemToBag({
      id: gear.id,
      tierLabel: gear.category,
      name: gear.name,
      variantName: 'Courtify Standard Finish',
      priceCad: gear.priceCad,
    });
  };

  const updateQuantity = (id: string, variantName: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.variantName === variantName
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError(null);
    if (buyerName.trim().length < 2) {
      setCheckoutError('Please enter a contact name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail.trim())) {
      setCheckoutError('Please enter a valid email address.');
      return;
    }
    if (postalCode.trim().length < 5) {
      setCheckoutError('Please enter a delivery postal code.');
      return;
    }
    const orderNum = `CTY-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderSubmittedId(orderNum);
    setCart([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-14">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#A1CEA7]/60 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#627F65]">
            <span className="font-semibold">Gear Up &amp; Save</span>
            <span aria-hidden="true">·</span>
            <span>4 Courtify Packages (Standard to Premier)</span>
            <span aria-hidden="true">·</span>
            <span>Temporary example photos until actual photography is uploaded</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172E1B] text-balance">
            The Courtify Bundles &amp; Gear Lineup.
          </h1>
          <p className="text-sm sm:text-base text-[#172819]/80 leading-relaxed">
            More gear. More games. More value. Choose from four portable pickleball court bundles or
            shop individual paddles, nets, court lines, and balls below.
          </p>
        </div>

        {/* View Toggle + Bag Button */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            role="tablist"
            aria-label="Package view mode"
            className="flex items-center gap-1 p-1 bg-[#A1CEA7]/25 rounded-lg"
          >
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                viewMode === 'grid'
                  ? 'bg-white text-[#172E1B] shadow-sm'
                  : 'text-[#172819]/70 hover:text-[#172E1B]'
              }`}
            >
              Bundle Grid
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

          <button
            type="button"
            onClick={() => setBagOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="font-mono tabular-nums">Bag ({totalItems})</span>
          </button>
        </div>
      </div>

      {/* Mode 1: 4-Tier Portable Court Packages Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COURT_PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className="bg-white border border-[#A1CEA7]/70 rounded-2xl overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] bg-[#FCFFEB] overflow-hidden relative">
                <ResilientImage
                  src={pkg.image}
                  alt={`${pkg.tierName} portable pickleball court — ${pkg.name}`}
                  fallbackTitle={`${pkg.tierName}: ${pkg.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-[#172E1B]/85 text-[#FCFFEB] text-[11px] font-medium px-2.5 py-1 rounded">
                  Example Photo · Tier {pkg.tierNumber}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-semibold text-[#627F65]">
                      {pkg.tierNumber} · {pkg.tierName} Tier
                    </span>
                    <div className="text-right">
                      <span className="font-mono text-xl font-bold text-[#172E1B] tabular-nums">
                        ${pkg.priceCad.toLocaleString()}
                      </span>
                      {pkg.retailValueCad && (
                        <span className="block font-mono text-xs text-[#627F65] tabular-nums">
                          Retail Value: ${pkg.retailValueCad.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <h2 className="font-display text-2xl font-bold text-[#172E1B]">{pkg.name}</h2>
                  <p className="text-sm text-[#172819]/75 leading-relaxed">{pkg.description}</p>

                  {/* Key Spec Line */}
                  <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#A1CEA7]/40 text-xs">
                    <div>
                      <div className="text-[#627F65]">Paddles</div>
                      <div className="font-mono font-semibold text-[#172E1B] tabular-nums mt-0.5">
                        {pkg.paddleSpec}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#627F65]">Portable Net</div>
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
                  <button
                    type="button"
                    onClick={() => handleAddPackage(pkg, pkg.colorways[0].name)}
                    className="flex-1 py-2.5 px-4 text-sm font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Add Bundle to Bag
                  </button>
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
          ))}
        </div>
      ) : (
        /* Mode 2: Side-by-Side Technical Comparison Table */
        <div className="bg-white border border-[#A1CEA7]/70 rounded-2xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-[#A1CEA7]/60 bg-[#FCFFEB]">
                <th className="p-5 text-xs font-semibold text-[#627F65] w-48">Package Spec</th>
                {COURT_PACKAGES.map((pkg) => (
                  <th key={pkg.id} className="p-5 align-top">
                    <div className="text-xs font-semibold text-[#627F65]">
                      {pkg.tierNumber} · {pkg.tierName}
                    </div>
                    <div className="font-display text-base font-bold text-[#172E1B] mt-0.5">
                      {pkg.name}
                    </div>
                    <div className="font-mono text-sm font-bold text-[#172E1B] tabular-nums mt-1">
                      ${pkg.priceCad.toLocaleString()}
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
                    {pkg.retailValueCad ? `$${pkg.retailValueCad.toLocaleString()}` : 'Bundle Pricing'}
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
                <td className="p-5 font-medium text-[#627F65]">Portable Net</td>
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
                    <button
                      type="button"
                      onClick={() => handleAddPackage(pkg, pkg.colorways[0].name)}
                      className="w-full py-2 px-3 text-xs font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Select {pkg.name}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* The Lineup: Individual Courtify Gear from Flyer */}
      <section className="border-t border-[#A1CEA7]/60 pt-12 space-y-6">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#627F65]">The Lineup · Individual Gear</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#172E1B]">
            Add paddles, nets, court lines, or balls individually.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {GEAR_LINEUP.map((gear) => (
            <article
              key={gear.id}
              className="bg-white border border-[#A1CEA7]/70 rounded-xl p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#627F65]">
                  <span className="font-medium">{gear.category}</span>
                  <span className="font-mono font-bold text-sm text-[#172E1B] tabular-nums">
                    {gear.priceDisplay}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-[#172E1B]">{gear.name}</h3>
                <p className="text-xs text-[#172819]/75 leading-relaxed">{gear.description}</p>
              </div>

              <button
                type="button"
                onClick={() => handleAddGear(gear)}
                className="w-full py-2 px-3 text-xs font-semibold text-[#172E1B] bg-[#FCFFEB] border border-[#A1CEA7] hover:bg-[#172E1B] hover:text-[#FCFFEB] hover:border-[#172E1B] rounded-lg transition-colors cursor-pointer"
              >
                Add to Bag — {gear.priceDisplay}
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Package Detail Modal */}
      {activePackage && (
        <div
          className="fixed inset-0 z-50 bg-[#172E1B]/60 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdp-title"
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-12 border border-[#A1CEA7] shadow-xl">
            <div className="md:col-span-6 bg-[#FCFFEB] relative min-h-[260px]">
              <ResilientImage
                src={activePackage.image}
                alt={activePackage.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-[#172E1B]/85 text-[#FCFFEB] text-[11px] px-2.5 py-1 rounded">
                {activePackage.imageNote}
              </div>
            </div>

            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold text-[#627F65]">
                      {activePackage.tierNumber} · {activePackage.tierName} Bundle
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
                    ${activePackage.priceCad.toLocaleString()}
                  </span>
                  {activePackage.retailValueCad && (
                    <span className="font-mono text-xs text-[#627F65] line-through tabular-nums">
                      Retail ${activePackage.retailValueCad.toLocaleString()}
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

              <button
                type="button"
                onClick={() => {
                  const chosenColor =
                    activePackage.colorways[selectedColorIndex]?.name ??
                    activePackage.colorways[0].name;
                  handleAddPackage(activePackage, chosenColor);
                  setActivePackage(null);
                }}
                className="w-full py-3 px-4 text-sm font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors cursor-pointer"
              >
                Add to Bag — ${activePackage.priceCad.toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-Over Package Bag Drawer */}
      {bagOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#172E1B]/50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Courtify Order Bag"
        >
          <div className="bg-white w-full max-w-md h-full flex flex-col justify-between p-6 overflow-y-auto shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#A1CEA7]/50 pb-4">
                <h2 className="font-display text-lg font-bold text-[#172E1B]">
                  Courtify Bag ({totalItems})
                </h2>
                <button
                  type="button"
                  onClick={() => setBagOpen(false)}
                  aria-label="Close bag"
                  className="p-2 text-[#627F65] hover:text-[#172E1B] rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {orderSubmittedId ? (
                <div className="bg-[#FCFFEB] border border-[#77AD78] rounded-xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[#172E1B] font-semibold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#627F65]" />
                    <span>Order #{orderSubmittedId} Confirmed</span>
                  </div>
                  <p className="text-xs text-[#172819]/80 leading-relaxed">
                    Thank you, {buyerName}. Our Courtify team will send shipping and delivery
                    details to <span className="font-semibold">{buyerEmail}</span> within 1 business
                    day.
                  </p>
                </div>
              ) : cart.length === 0 ? (
                <div className="py-16 text-center space-y-2">
                  <ShoppingBag className="w-8 h-8 text-[#A1CEA7] mx-auto" strokeWidth={1.5} />
                  <p className="text-sm font-medium text-[#172E1B]">Your Courtify bag is empty</p>
                  <p className="text-xs text-[#627F65]">
                    Select a portable court bundle or individual gear item to get started.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[#A1CEA7]/35">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.variantName}`}
                      className="py-4 flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-[#627F65]">{item.tierLabel}</div>
                        <div className="text-sm font-semibold text-[#172E1B]">{item.name}</div>
                        <div className="text-xs text-[#172819]/65">{item.variantName}</div>
                        <div className="font-mono text-xs font-semibold text-[#172E1B] tabular-nums pt-1">
                          ${(item.priceCad * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 border border-[#A1CEA7]/70 rounded-lg p-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.variantName, -1)}
                          aria-label="Decrease quantity"
                          className="p-1 text-[#627F65] hover:text-[#172E1B] cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs font-semibold w-5 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.variantName, 1)}
                          aria-label="Increase quantity"
                          className="p-1 text-[#627F65] hover:text-[#172E1B] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && !orderSubmittedId && (
              <form
                onSubmit={handleSubmitOrder}
                className="pt-6 border-t border-[#A1CEA7]/50 space-y-4"
              >
                <div className="space-y-2.5">
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Full Name or Organization"
                    className="w-full h-10 px-3 rounded-lg border border-[#A1CEA7] text-sm focus:outline-none focus:border-[#172E1B]"
                  />
                  <input
                    type="email"
                    required
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="Email for Order Confirmation"
                    className="w-full h-10 px-3 rounded-lg border border-[#A1CEA7] text-sm focus:outline-none focus:border-[#172E1B]"
                  />
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Postal / ZIP Code"
                    className="w-full h-10 px-3 rounded-lg border border-[#A1CEA7] text-sm focus:outline-none focus:border-[#172E1B]"
                  />
                </div>

                {checkoutError && (
                  <p role="alert" className="text-xs text-red-700 bg-red-50 px-3 py-2 rounded-lg">
                    {checkoutError}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#627F65]">Subtotal</span>
                  <span className="font-mono font-bold text-[#172E1B] tabular-nums">
                    ${subtotalCad.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors cursor-pointer"
                >
                  Submit Courtify Order
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
