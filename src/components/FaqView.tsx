import { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, Search, X } from 'lucide-react';
import { FaqItem, PageRoute, TEMPORARY_FAQ_ITEMS } from '../data/courtifyData';

interface FaqViewProps {
  onNavigate: (page: PageRoute) => void;
}

const FAQ_CATEGORIES: ('All Topics' | FaqItem['category'])[] = [
  'All Topics',
  'Portable Courts & Gear',
  'Orders & Checkout',
  'Courtify App',
];

export function FaqView({ onNavigate }: FaqViewProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof FAQ_CATEGORIES)[number]>('All Topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-3': true,
  });

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return TEMPORARY_FAQ_ITEMS.filter((item) => {
      if (selectedCategory !== 'All Topics' && item.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-10">
      {/* Page Header */}
      <div className="space-y-3 border-b border-[#A1CEA7]/60 pb-6">
        <p className="text-xs font-semibold text-[#627F65]">
          FAQ · Frequently Asked Questions (Temporary Q&amp;A)
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#172E1B] text-balance">
          Answers about Courtify portable courts, checkout, and the Courtify app.
        </h1>
        <p className="text-sm sm:text-base text-[#172819]/80 leading-relaxed max-w-2xl">
          Temporary questions and answers covering portable court footprints, paddle tiers, VE
          checkout links, and the Courtify app across the U.S. You can personalize every item later.
        </p>
      </div>

      {/* Search + Category Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Filter questions by topic"
          className="flex flex-wrap items-center gap-1 p-1 bg-[#A1CEA7]/25 rounded-lg"
        >
          {FAQ_CATEGORIES.map((category) => {
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

        <div className="relative w-full md:w-72">
          <Search
            aria-hidden="true"
            className="w-4 h-4 text-[#627F65] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            aria-label="Search FAQ questions"
            className="w-full h-10 pl-9 pr-9 rounded-lg border border-[#A1CEA7] bg-white text-sm text-[#172E1B] placeholder:text-[#627F65]/70 focus:outline-none focus:border-[#172E1B]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#627F65] hover:text-[#172E1B] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="bg-white border border-[#A1CEA7]/70 rounded-xl p-8 text-center space-y-3">
            <p className="font-display text-base font-bold text-[#172E1B]">
              No questions matched &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All Topics');
                setSearchQuery('');
              }}
              className="text-xs font-semibold text-[#627F65] hover:text-[#172E1B] underline underline-offset-4 cursor-pointer"
            >
              Reset topic filter &amp; search
            </button>
          </div>
        ) : (
          filteredItems.map((item, idx) => {
            const isOpen = Boolean(openIds[item.id]);
            return (
              <div
                key={item.id}
                className="bg-white border border-[#A1CEA7]/70 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#FCFFEB]/60 transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-[#627F65]">
                      {String(idx + 1).padStart(2, '0')} · {item.category}
                    </span>
                    <h2 className="font-display text-base sm:text-lg font-bold text-[#172E1B]">
                      {item.question}
                    </h2>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#627F65] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#172E1B]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm text-[#172819]/80 leading-relaxed border-t border-[#A1CEA7]/35">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Next Steps */}
      <div className="bg-[#F4F9E6] border border-[#A1CEA7]/70 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-display text-lg font-bold text-[#172E1B]">
            Ready to build your portable court?
          </h3>
          <p className="text-sm text-[#627F65]">
            Compare paddles, nets, balls, and complete packages sorted by tier and price.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('packages')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#FCFFEB] bg-[#172E1B] hover:bg-[#627F65] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Shop Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('app')}
            className="px-4 py-2.5 text-xs font-semibold text-[#172E1B] bg-white border border-[#A1CEA7] hover:border-[#172E1B] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            Courtify App
          </button>
        </div>
      </div>
    </div>
  );
}
